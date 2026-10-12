import { sql } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Enforce backend authorization on every protected Admin API request
  const auth = await requireAdminAuth(req)
  if (!auth.authorized) {
    return auth.errorResponse!
  }

  try {
    const [totalResult, sessionsPerDay, browserBreakdown, utmSourceBreakdown] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM analytics_sessions`,

      // Sessions per day for the last 30 days
      sql`
        SELECT
          DATE(created_at) AS date,
          COUNT(*)::int AS sessions
        FROM analytics_sessions
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `,

      // Browser breakdown
      sql`
        SELECT
          COALESCE(browser, 'Unknown') AS browser,
          COUNT(*)::int AS count
        FROM analytics_sessions
        GROUP BY browser
        ORDER BY count DESC
      `,

      // UTM source breakdown
      sql`
        SELECT
          COALESCE(utm_source, 'direct') AS utm_source,
          COUNT(*)::int AS count
        FROM analytics_sessions
        GROUP BY utm_source
        ORDER BY count DESC
      `,
    ])

    return NextResponse.json({
      totalSessions: totalResult[0].count,
      sessionsPerDay,
      browserBreakdown,
      utmSourceBreakdown,
    })
  } catch (error: any) {
    console.error('[GET /api/admin/analytics]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
