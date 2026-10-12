import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requirePermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET: Query administrator accounts with joined roles and permissions from RBAC schema
export async function GET(req: NextRequest) {
  // Backend enforces granular 'users.read' permission check
  const auth = await requirePermission(req, 'users.read');
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const users = await sql`
      SELECT 
        u.id, 
        u.email, 
        u.first_name, 
        u.last_name, 
        u.status, 
        u.mfa_enabled,
        u.last_login_at, 
        u.created_at,
        COALESCE(
          (SELECT json_agg(r.name) 
           FROM user_roles ur 
           JOIN roles r ON ur.role_id = r.id 
           WHERE ur.user_id = u.id),
          '["staff"]'::json
        ) as roles
      FROM users u
      ORDER BY u.created_at ASC
    `;

    return NextResponse.json({
      success: true,
      users: users.map((u: any) => ({
        id: u.id,
        email: u.email,
        fullName: `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Admin User',
        roles: u.roles,
        status: u.status,
        mfaEnabled: Boolean(u.mfa_enabled),
        lastLoginAt: u.last_login_at?.toISOString() || null,
        createdAt: u.created_at?.toISOString() || null,
      })),
      total: users.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
