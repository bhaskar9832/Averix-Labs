import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { requireAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Enforce backend authorization on every protected Admin API request
  const auth = await requireAdminAuth(req)
  if (!auth.authorized) {
    return auth.errorResponse!
  }

  try {
    const [leadsRes, messagesRes, unreadRes, customersRes, analyticsRes, activityRes] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM leads`,
      sql`SELECT COUNT(*) as count FROM messages`,
      sql`SELECT COUNT(*) as count FROM messages WHERE status = 'UNREAD'`,
      sql`SELECT COUNT(*) as count FROM leads WHERE status = 'WON'`,
      sql`SELECT COUNT(*) as count FROM analytics_sessions`,
      sql`
        SELECT al.*, au.full_name as admin_name
        FROM activity_logs al
        LEFT JOIN admin_users au ON al.admin_user_id = au.id
        ORDER BY al.created_at DESC
        LIMIT 10
      `,
    ])

    return NextResponse.json({
      leadsCount: Number(leadsRes[0]?.count || 0),
      messagesCount: Number(messagesRes[0]?.count || 0),
      unreadCount: Number(unreadRes[0]?.count || 0),
      customersCount: Number(customersRes[0]?.count || 0),
      analyticsCount: Number(analyticsRes[0]?.count || 0),
      recentActivity: activityRes,
    })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
