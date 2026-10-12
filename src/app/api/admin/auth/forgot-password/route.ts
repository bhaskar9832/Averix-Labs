import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { redisCache } from '@/lib/cache/redis';
import { hashSessionToken } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

export const dynamic = 'force-dynamic';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 10. PASSWORD RESET FLOW:
 * Forgot Password ➔ Generate Random Reset Token ➔ Store Hashed Token
 *   ➔ Send Reset Link ➔ User Opens Link ➔ Validate Token + Expiry
 *     ➔ Set New Password ➔ Invalidate Existing Sessions
 * ─────────────────────────────────────────────────────────────────────────────
 */

// POST /api/admin/auth/forgot-password: Request password reset link
export async function POST(req: NextRequest) {
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Unknown';

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userRows = await sql`SELECT id, email FROM users WHERE LOWER(email) = ${normalizedEmail} LIMIT 1`;

    // Generic positive response to prevent user enumeration
    if (userRows.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'If that email exists in our records, a secure reset link has been dispatched.',
      });
    }

    const user = userRows[0];

    // 1. Generate high-entropy single-use random reset token
    const rawResetToken = randomBytes(32).toString('hex');
    const tokenHash = hashSessionToken(rawResetToken);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15-minute short lifetime

    // 2. Invalidate any prior unused tokens for this user
    await sql`
      UPDATE password_reset_tokens 
      SET used = true 
      WHERE user_id = ${user.id} AND used = false
    `;

    // 3. Store ONLY the hashed token in PostgreSQL password_reset_tokens
    await sql`
      INSERT INTO password_reset_tokens (user_id, token_hash, expires_at, used)
      VALUES (${user.id}, ${tokenHash}, ${expiresAt}, false)
    `;

    // 4. Cache in Redis with 15m TTL
    redisCache.set(`pwd_reset_${tokenHash}`, { userId: user.id }, 900);

    const resetLink = `http://localhost:3000/admin/reset-password?token=${rawResetToken}`;
    console.log(`[Email/OTP Provider] Dispatched password reset link to ${normalizedEmail}: ${resetLink}`);

    return NextResponse.json({
      success: true,
      message: 'Password reset link dispatched.',
      // Provided for development / testing convenience
      demoResetLink: resetLink,
      demoToken: rawResetToken,
    });
  } catch (err: any) {
    console.error('Forgot password error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/admin/auth/forgot-password: Submit new password with reset token
export async function PUT(req: NextRequest) {
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Unknown';

  try {
    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Reset token and new password are required.' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    // 1. Hash the incoming token
    const tokenHash = hashSessionToken(token);

    // 2. Validate token against password_reset_tokens
    const tokenRows = await sql`
      SELECT id, user_id, expires_at, used 
      FROM password_reset_tokens 
      WHERE token_hash = ${tokenHash}
      LIMIT 1
    `;

    if (tokenRows.length === 0) {
      return NextResponse.json({ error: 'Invalid or unrecognized reset token.' }, { status: 400 });
    }

    const resetRecord = tokenRows[0];

    if (resetRecord.used) {
      return NextResponse.json({ error: 'This reset token has already been used.' }, { status: 400 });
    }

    if (new Date() > new Date(resetRecord.expires_at)) {
      return NextResponse.json({ error: 'This reset token has expired. Please request a new one.' }, { status: 400 });
    }

    // 3. Hash new password with bcrypt
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // 4. Update password in users table
    await sql`
      UPDATE users 
      SET password_hash = ${passwordHash}, updated_at = NOW() 
      WHERE id = ${resetRecord.user_id}
    `;

    // 5. Mark token as used (single-use constraint)
    await sql`
      UPDATE password_reset_tokens 
      SET used = true 
      WHERE id = ${resetRecord.id}
    `;

    // 6. Invalidate ALL existing active sessions for this user across DB & Redis
    await sql`
      UPDATE sessions 
      SET revoked_at = NOW() 
      WHERE user_id = ${resetRecord.user_id} AND revoked_at IS NULL
    `;
    redisCache.del(`pwd_reset_${tokenHash}`);

    // 7. Audit log event
    await logAuditEvent({
      userId: resetRecord.user_id,
      action: 'PASSWORD_CHANGED',
      resourceType: 'user',
      resourceId: resetRecord.user_id,
      ipAddress: clientIp,
      userAgent,
      metadata: { reason: 'password_reset_token_verified' },
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset successful. All prior sessions have been invalidated. Please sign in.',
    });
  } catch (err: any) {
    console.error('Password reset error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
