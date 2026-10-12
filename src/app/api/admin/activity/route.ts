import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Enforce backend authorization on every protected Admin API request
  const auth = await requireAdminAuth(request)
  if (!auth.authorized) {
    return auth.errorResponse!
  }

  try {
    const { searchParams } = request.nextUrl
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
    const offset = (page - 1) * limit

    const [logs, countResult] = await Promise.all([
      sql`
        SELECT
          al.id,
          al.action,
          al.entity_type,
          al.entity_id,
          al.created_at,
          au.full_name AS admin_full_name,
          au.email AS admin_email
        FROM activity_logs al
        LEFT JOIN admin_users au ON au.id = al.admin_user_id
        ORDER BY al.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`SELECT COUNT(*)::int AS count FROM activity_logs`,
    ])

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total: countResult[0].count,
        totalPages: Math.ceil(countResult[0].count / limit),
      },
    })
  } catch (error: any) {
    console.error('[GET /api/admin/activity]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
