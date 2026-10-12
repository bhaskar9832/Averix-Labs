import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requirePermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/audit-logs — Read immutable compliance logs (Requires 'audit.read')
export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'audit.read');
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '50', 10));

    let logs;
    if (action) {
      logs = await sql`
        SELECT 
          al.id,
          al.user_id,
          al.action,
          al.resource,
          al.resource_type,
          al.resource_id,
          al.ip_address,
          al.user_agent,
          al.metadata,
          al.created_at,
          u.email as user_email,
          CONCAT(u.first_name, ' ', u.last_name) as user_name
        FROM audit_logs al
        LEFT JOIN users u ON al.user_id = u.id
        WHERE al.action = ${action}
        ORDER BY al.created_at DESC
        LIMIT ${limit}
      `;
    } else {
      logs = await sql`
        SELECT 
          al.id,
          al.user_id,
          al.action,
          al.resource,
          al.resource_type,
          al.resource_id,
          al.ip_address,
          al.user_agent,
          al.metadata,
          al.created_at,
          u.email as user_email,
          CONCAT(u.first_name, ' ', u.last_name) as user_name
        FROM audit_logs al
        LEFT JOIN users u ON al.user_id = u.id
        ORDER BY al.created_at DESC
        LIMIT ${limit}
      `;
    }

    return NextResponse.json({
      success: true,
      logs: logs.map((l: any) => ({
        id: l.id,
        userId: l.user_id,
        userEmail: l.user_email || 'System / Unauthenticated',
        userName: l.user_name?.trim() || 'Averix Core',
        action: l.action,
        resourceType: l.resource_type || l.resource || 'system',
        resourceId: l.resource_id || 'none',
        ipAddress: l.ip_address || '127.0.0.1',
        userAgent: l.user_agent || 'Unknown',
        metadata: l.metadata || {},
        createdAt: l.created_at?.toISOString() || null,
      })),
      total: logs.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
