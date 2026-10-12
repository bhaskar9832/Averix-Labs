import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { redisCache } from '@/lib/cache/redis';
import bcrypt from 'bcryptjs';
import { requirePermission } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import { randomBytes } from 'crypto';

export const dynamic = 'force-dynamic';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * STEP-UP AUTHENTICATION SERVICE FOR SENSITIVE OPERATIONS:
 * Triggered on:
 * - Delete production data
 * - Change admin roles
 * - Change security settings
 * - Rotate credentials
 * ─────────────────────────────────────────────────────────────────────────────
 * Flow:
 * Admin already logged in ➔ Sensitive Operation Requested ➔
 *   Step-Up Challenge ➔ Re-authenticate Password + MFA ➔
 *     Issue Short-Lived Step-Up Ticket (5 min TTL) ➔ Operation Allowed
 * ─────────────────────────────────────────────────────────────────────────────
 */

// POST /api/admin/auth/step-up: Request or Verify Step-Up Re-authentication
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  const sessionUser = auth.session!;
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Unknown';

  try {
    const body = await req.json();
    const { action, password, otp, targetOperation } = body;

    // Sub-Action A: Request Step-Up Challenge (Dispatches Step-Up OTP)
    if (action === 'request_challenge') {
      const stepUpOtp = generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes strictly

      // Cache Step-Up MFA challenge in Redis
      redisCache.set(`step_up_challenge_${sessionUser.id}`, {
        otp: stepUpOtp,
        targetOperation: targetOperation || 'SENSITIVE_OPERATION',
        expiresAt: expiresAt.getTime(),
      }, 300);

      console.log(`[Step-Up Auth] Security challenge dispatched to ${sessionUser.email} for '${targetOperation}': ${stepUpOtp}`);

      return NextResponse.json({
        success: true,
        message: `Step-up authentication required for sensitive operation: '${targetOperation}'. Verification code sent.`,
        targetOperation,
        demoCode: stepUpOtp,
      });
    }

    // Sub-Action B: Verify Step-Up Challenge (Checks password + OTP)
    if (action === 'verify_challenge') {
      if (!password) {
        return NextResponse.json({ error: 'Re-authentication requires your current master password.' }, { status: 400 });
      }

      // 1. Verify master password in PostgreSQL
      const userRows = await sql`SELECT password_hash FROM users WHERE id = ${sessionUser.id} LIMIT 1`;
      if (userRows.length === 0) {
        return NextResponse.json({ error: 'User record not found.' }, { status: 404 });
      }

      const isPasswordValid = await bcrypt.compare(password, userRows[0].password_hash);
      if (!isPasswordValid) {
        await logAuditEvent({
          userId: sessionUser.id,
          action: 'LOGIN_FAILED',
          resourceType: 'step_up_auth',
          resourceId: targetOperation || 'unknown',
          ipAddress: clientIp,
          userAgent,
          metadata: { failure: 'invalid_password_in_step_up', targetOperation },
        });
        return NextResponse.json({ error: 'Master password verification failed.' }, { status: 401 });
      }

      // 2. Verify Step-Up MFA OTP if provided
      if (otp) {
        const cachedChallenge = redisCache.get<any>(`step_up_challenge_${sessionUser.id}`);
        if (!cachedChallenge || cachedChallenge.otp !== otp.trim()) {
          return NextResponse.json({ error: 'Invalid or expired step-up MFA verification code.' }, { status: 400 });
        }
      }

      // 3. Issue Short-Lived Step-Up Ticket (Valid for 5 minutes)
      const stepUpTicket = randomBytes(24).toString('hex');
      redisCache.set(`step_up_ticket_${stepUpTicket}`, {
        userId: sessionUser.id,
        targetOperation: targetOperation || 'SENSITIVE_OPERATION',
        authorizedAt: Date.now(),
      }, 300);

      // Clean up challenge
      redisCache.del(`step_up_challenge_${sessionUser.id}`);

      // 4. Log Audit Event
      await logAuditEvent({
        userId: sessionUser.id,
        action: 'SETTINGS_CHANGED',
        resourceType: 'step_up_authorization',
        resourceId: targetOperation || 'sensitive_operation',
        ipAddress: clientIp,
        userAgent,
        metadata: { status: 'approved', targetOperation },
      });

      return NextResponse.json({
        success: true,
        message: 'Step-up authentication verified. You may proceed with the sensitive operation.',
        stepUpTicket,
        expiresInSeconds: 300,
      });
    }

    return NextResponse.json({ error: 'Invalid step-up action.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
