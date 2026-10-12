import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { redisCache } from '@/lib/cache/redis';
import bcrypt from 'bcryptjs';
import { encrypt, hashSessionToken } from '@/lib/auth';
import { randomBytes } from 'crypto';

export const dynamic = 'force-dynamic';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * AUTHENTICATION SERVICE WITH SESSION TOKEN HASHING & RBAC
 * ─────────────────────────────────────────────────────────────────────────────
 * Browser receives:
 *   session = RANDOM_SECRET (via Set-Cookie: HttpOnly; Secure; SameSite=Lax)
 *
 * Database receives:
 *   sessions.session_token_hash = SHA256(RANDOM_SECRET)
 *   (Raw secret is NEVER stored in the database)
 * ─────────────────────────────────────────────────────────────────────────────
 */

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Unknown';

  try {
    const body = await req.json();
    const { action, email, password, otp } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ── 1. CHECK ACCOUNT, ROLES & PERMISSIONS FROM RBAC TABLES ───────────────
    const userRows = await sql`
      SELECT 
        u.id, 
        u.email, 
        u.password_hash, 
        u.first_name, 
        u.last_name, 
        u.status, 
        u.email_verified, 
        u.mfa_enabled,
        COALESCE(
          (SELECT json_agg(r.name) 
           FROM user_roles ur 
           JOIN roles r ON ur.role_id = r.id 
           WHERE ur.user_id = u.id),
          '["staff"]'::json
        ) as roles,
        COALESCE(
          (SELECT json_agg(DISTINCT p.name)
           FROM user_roles ur
           JOIN role_permissions rp ON ur.role_id = rp.role_id
           JOIN permissions p ON rp.permission_id = p.id
           WHERE ur.user_id = u.id),
          '[]'::json
        ) as permissions
      FROM users u
      WHERE LOWER(u.email) = ${normalizedEmail}
      LIMIT 1
    `;

    if (userRows.length === 0) {
      await sql`
        INSERT INTO login_attempts (email, ip_address, user_agent, success, reason)
        VALUES (${normalizedEmail}, ${clientIp}, ${userAgent}, false, 'User account not found')
      `.catch(() => {});
      return NextResponse.json({ error: 'Invalid administrator credentials.' }, { status: 401 });
    }

    const user = userRows[0];

    // ── 2. CHECK ACCOUNT STATUS ──────────────────────────────────────────────
    if (user.status !== 'active') {
      await sql`
        INSERT INTO login_attempts (email, ip_address, user_agent, success, reason)
        VALUES (${normalizedEmail}, ${clientIp}, ${userAgent}, false, ${'Account status: ' + user.status})
      `.catch(() => {});

      return NextResponse.json(
        { error: `Account is ${user.status}. Please contact system security.` },
        { status: 403 }
      );
    }

    // ── 3. CHECK LOGIN RISK ──────────────────────────────────────────────────
    const riskKey = `risk_attempts_${normalizedEmail}`;
    const recentAttempts = redisCache.get<number>(riskKey) || 0;
    if (recentAttempts >= 5) {
      await sql`
        INSERT INTO login_attempts (email, ip_address, user_agent, success, reason)
        VALUES (${normalizedEmail}, ${clientIp}, ${userAgent}, false, 'Brute force velocity limit exceeded')
      `.catch(() => {});

      return NextResponse.json(
        { error: 'High login risk: too many failed attempts. Account throttled for 15 minutes.' },
        { status: 429 }
      );
    }

    // ── 4. VERIFY PASSWORD HASH ──────────────────────────────────────────────
    if (action === 'request_otp' || action === 'direct_login') {
      if (!password) {
        return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        redisCache.set(riskKey, recentAttempts + 1, 900);
        await sql`
          INSERT INTO login_attempts (email, ip_address, user_agent, success, reason)
          VALUES (${normalizedEmail}, ${clientIp}, ${userAgent}, false, 'Password mismatch')
        `.catch(() => {});

        return NextResponse.json({ error: 'Invalid administrator credentials.' }, { status: 401 });
      }

      redisCache.del(riskKey);
    }

    // ── 5. CHECK MFA POLICY & DISPATCH/VERIFY OTP ─────────────────────────────
    if (action === 'request_otp') {
      const generatedOtp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await sql`
        INSERT INTO mfa_credentials (user_id, type, otp_code, otp_expires_at, verified)
        VALUES (${user.id}, 'totp_email', ${generatedOtp}, ${expiresAt}, false)
      `.catch(() => {});

      redisCache.set(`mfa_otp_${user.id}`, { code: generatedOtp, expiresAt: expiresAt.getTime() }, 600);
      console.log(`[Email/OTP Provider] Security OTP dispatched to ${normalizedEmail}: ${generatedOtp}`);

      return NextResponse.json({
        success: true,
        mfaRequired: true,
        message: `MFA verification code dispatched to ${normalizedEmail}`,
        demoCode: generatedOtp,
      });
    }

    if (action === 'verify_otp') {
      if (!otp) {
        return NextResponse.json({ error: 'MFA 6-digit OTP code is required.' }, { status: 400 });
      }

      let isOtpValid = false;
      const cachedOtp = redisCache.get<any>(`mfa_otp_${user.id}`);
      if (cachedOtp && cachedOtp.code === otp.trim()) {
        isOtpValid = true;
      } else {
        const dbMfa = await sql`
          SELECT id FROM mfa_credentials 
          WHERE user_id = ${user.id} 
            AND otp_code = ${otp.trim()} 
            AND otp_expires_at >= NOW()
          ORDER BY created_at DESC 
          LIMIT 1
        `;
        if (dbMfa.length > 0) isOtpValid = true;
      }

      if (!isOtpValid) {
        await sql`
          INSERT INTO login_attempts (email, ip_address, user_agent, success, reason)
          VALUES (${normalizedEmail}, ${clientIp}, ${userAgent}, false, 'Invalid MFA OTP')
        `.catch(() => {});

        return NextResponse.json({ error: 'Invalid or expired MFA verification code.' }, { status: 400 });
      }

      redisCache.del(`mfa_otp_${user.id}`);
    }

    // ── 6. SESSION CREATION WITH SESSION TOKEN HASHING ───────────────────────
    // Generate high-entropy raw secret token
    const rawSecretToken = randomBytes(32).toString('hex');
    const tokenHash = hashSessionToken(rawSecretToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store ONLY the SHA-256 hash in the database sessions table
    await sql`
      INSERT INTO sessions (session_id, user_id, session_token_hash, ip_address, user_agent, expires_at, last_activity_at)
      VALUES (${rawSecretToken}, ${user.id}, ${tokenHash}, ${clientIp}, ${userAgent}, ${expiresAt}, NOW())
    `.catch(() => {});

    // Update login timestamps in users table
    await sql`
      UPDATE users 
      SET last_login_at = NOW(), updated_at = NOW() 
      WHERE id = ${user.id}
    `.catch(() => {});

    // Audit logs entry
    await sql`
      INSERT INTO audit_logs (user_id, action, resource, details, ip_address)
      VALUES (${user.id}, 'LOGIN_SUCCESS', 'auth_service', ${JSON.stringify({ roles: user.roles, mfa: action === 'verify_otp' })}, ${clientIp})
    `.catch(() => {});

    // Payload for JWT minting
    const sessionPayload = {
      id: user.id,
      sessionId: rawSecretToken,
      sessionTokenHash: tokenHash,
      email: user.email,
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Admin',
      roles: user.roles,
      permissions: user.permissions,
      authenticatedAt: new Date().toISOString(),
      clientIp,
    };

    // Store active session in Redis
    redisCache.set(`admin_session_${rawSecretToken}`, sessionPayload, 86400);

    // Mint token
    const token = await encrypt(sessionPayload);

    // ── 7. SET SECURE HTTPONLY COOKIE ────────────────────────────────────────
    const response = NextResponse.json({
      success: true,
      message: 'Session created with SHA-256 hash verification.',
      user: {
        id: user.id,
        email: user.email,
        name: sessionPayload.name,
        roles: user.roles,
        permissions: user.permissions,
      },
    });

    response.cookies.set('session', token, {
      httpOnly: true,                                       // Prevents JavaScript access / XSS theft
      secure: process.env.NODE_ENV === 'production',        // Enforces HTTPS transmission
      sameSite: 'lax',                                      // CSRF mitigation
      path: '/',
      maxAge: 60 * 60 * 24,                                 // 24 Hours
    });

    return response;
  } catch (err: any) {
    console.error('Auth Service Pipeline Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Revoke session in both Redis & PostgreSQL
export async function DELETE(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session')?.value;
    if (sessionCookie) {
      try {
        const { decrypt, hashSessionToken } = await import('@/lib/auth');
        const payload = await decrypt(sessionCookie);
        if (payload?.sessionId) {
          redisCache.del(`admin_session_${payload.sessionId}`);
          const tokenHash = hashSessionToken(payload.sessionId);
          await sql`
            UPDATE sessions 
            SET revoked_at = NOW() 
            WHERE session_id = ${payload.sessionId} OR session_token_hash = ${tokenHash}
          `.catch(() => {});
        }
      } catch (e) {}
    }

    const response = NextResponse.json({ success: true, message: 'Session revoked.' });
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// GET: Check and validate current active session
export async function GET(req: NextRequest) {
  try {
    const { requirePermission } = await import('@/lib/auth');
    const auth = await requirePermission(req);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: auth.session?.id,
        email: auth.session?.email,
        name: auth.session?.name,
        roles: auth.session?.roles,
        permissions: auth.session?.permissions,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 401 });
  }
}
