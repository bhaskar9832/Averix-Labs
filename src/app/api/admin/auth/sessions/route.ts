import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { redisCache } from '@/lib/cache/redis';
import { requirePermission, hashSessionToken } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

export const dynamic = 'force-dynamic';

// GET /api/admin/auth/sessions — View all active sessions for current admin or security overview
export async function GET(req: NextRequest) {
  const auth = await requirePermission(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  const user = auth.session!;

  try {
    const sessions = await sql`
      SELECT 
        s.id,
        s.session_id,
        s.ip_address,
        s.user_agent,
        s.created_at,
        s.last_activity_at,
        s.expires_at,
        s.revoked_at,
        (s.revoked_at IS NULL AND s.expires_at > NOW()) as is_active
      FROM sessions s
      WHERE s.user_id = ${user.id}
      ORDER BY s.last_activity_at DESC
    `;

    const mappedSessions = sessions.map((s: any) => {
      const ua = s.user_agent || '';
      let device = 'Desktop Chrome';
      if (ua.includes('Macintosh')) device = 'MacBook Chrome / Safari';
      else if (ua.includes('Windows')) device = 'Windows Chrome';
      else if (ua.includes('iPhone') || ua.includes('Android')) device = 'Mobile Browser';

      return {
        id: s.id,
        sessionId: s.session_id,
        device,
        ipAddress: s.ip_address || '127.0.0.1',
        location: 'India', // Regional geolocation
        isCurrent: s.session_id === user.sessionId,
        isActive: Boolean(s.is_active),
        createdAt: s.created_at?.toISOString() || null,
        lastActivityAt: s.last_activity_at?.toISOString() || null,
      };
    });

    return NextResponse.json({
      success: true,
      sessions: mappedSessions,
      total: mappedSessions.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/admin/auth/sessions — Revoke an individual session or all devices
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  const user = auth.session!;
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Unknown';

  try {
    const body = await req.json();
    const { action, targetSessionId } = body;

    if (action === 'revoke_all') {
      // 1. Invalidate all sessions in PostgreSQL
      await sql`
        UPDATE sessions 
        SET revoked_at = NOW() 
        WHERE user_id = ${user.id} AND revoked_at IS NULL
      `;

      // 2. Audit Event
      await logAuditEvent({
        userId: user.id,
        action: 'SESSION_REVOKED',
        resourceType: 'sessions',
        resourceId: 'all',
        ipAddress: clientIp,
        userAgent,
        metadata: { scope: 'all_devices' },
      });

      return NextResponse.json({
        success: true,
        message: 'All active sessions have been revoked across all devices.',
      });
    }

    if (action === 'revoke_one' && targetSessionId) {
      // 1. Purge from Redis
      redisCache.del(`admin_session_${targetSessionId}`);

      // 2. Mark revoked in PostgreSQL
      await sql`
        UPDATE sessions 
        SET revoked_at = NOW() 
        WHERE session_id = ${targetSessionId} AND user_id = ${user.id}
      `;

      // 3. Audit Event
      await logAuditEvent({
        userId: user.id,
        action: 'SESSION_REVOKED',
        resourceType: 'session',
        resourceId: targetSessionId,
        ipAddress: clientIp,
        userAgent,
        metadata: { targetSessionId },
      });

      return NextResponse.json({
        success: true,
        message: `Session ${targetSessionId.slice(0, 8)}... revoked successfully.`,
      });
    }

    return NextResponse.json({ error: 'Invalid session revocation action.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
