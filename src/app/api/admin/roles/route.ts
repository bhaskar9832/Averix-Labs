import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requirePermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, 'users.read');
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const roles = await sql`SELECT id, name, description FROM roles ORDER BY name ASC`;
    const permissions = await sql`SELECT id, code, description, module FROM permissions ORDER BY module, code ASC`;
    const rolePermissions = await sql`
      SELECT rp.role_id, r.name as role_name, p.code as permission_code
      FROM role_permissions rp
      JOIN roles r ON rp.role_id = r.id
      JOIN permissions p ON rp.permission_id = p.id
    `;

    return NextResponse.json({
      roles,
      permissions,
      rolePermissions,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
