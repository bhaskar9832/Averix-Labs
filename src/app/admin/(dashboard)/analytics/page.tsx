import { sql } from '@/lib/db'
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts'
import { ArrowUpRight, Eye, Users, Globe, Zap } from 'lucide-react'

export default async function AnalyticsPage() {
  let totalSessions = 0
  let sessionsToday = 0
  let browserBreakdown: any[] = []
  let utmBreakdown: any[] = []
  let sessionsPerDay: any[] = []

  try {
    const [totalRes, todayRes, browserRes, utmRes, dailyRes] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM analytics_sessions`,
      sql`SELECT COUNT(*) as count FROM analytics_sessions WHERE created_at >= CURRENT_DATE`,
      sql`SELECT browser, COUNT(*) as count FROM analytics_sessions WHERE browser IS NOT NULL GROUP BY browser ORDER BY count DESC LIMIT 6`,
      sql`SELECT utm_source, COUNT(*) as count FROM analytics_sessions WHERE utm_source IS NOT NULL GROUP BY utm_source ORDER BY count DESC LIMIT 6`,
      sql`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as sessions
        FROM analytics_sessions
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `,
    ])

    totalSessions = Number(totalRes[0]?.count || 0)
    sessionsToday = Number(todayRes[0]?.count || 0)
    browserBreakdown = browserRes.map(r => ({ name: String(r.browser), value: Number(r.count) }))
    utmBreakdown = utmRes.map(r => ({ name: String(r.utm_source), value: Number(r.count) }))
    sessionsPerDay = dailyRes.map(r => ({
      date: new Date(r.date as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sessions: Number(r.sessions),
    }))
  } catch(err) {
    console.error('Failed to load analytics:', err)
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Web analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Real visitor sessions tracked from your public website.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-success px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live tracking active
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Total sessions</p>
          <p className="text-3xl font-semibold text-foreground mb-2">{totalSessions.toLocaleString()}</p>
          <p className="text-[10px] font-medium text-link">All time tracked visits</p>
        </div>
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Today</p>
          <p className="text-3xl font-semibold text-foreground mb-2">{sessionsToday}</p>
          <p className="text-[10px] font-medium text-success">Sessions since midnight</p>
        </div>
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Top source</p>
          <p className="text-xl font-semibold text-foreground mb-2">{utmBreakdown[0]?.name || 'Direct'}</p>
          <p className="text-[10px] font-medium text-muted-foreground">Most common UTM source</p>
        </div>
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Top browser</p>
          <p className="text-xl font-semibold text-foreground mb-2">{browserBreakdown[0]?.name || '—'}</p>
          <p className="text-[10px] font-medium text-muted-foreground">Most common visitor browser</p>
        </div>
      </div>

      {totalSessions === 0 ? (
        <div className="bg-card border border-foreground/5 rounded-xl p-12 text-center">
          <Eye className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
          <p className="text-foreground font-medium text-lg mb-2">No analytics data yet</p>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            Analytics sessions are tracked when visitors visit your public website. 
            Make sure the analytics tracking code is installed on your site.
          </p>
          <div className="bg-background border border-foreground/5 rounded-lg p-4 text-left max-w-md mx-auto">
            <p className="text-xs text-muted-foreground font-mono mb-2">// Tracking fires automatically on your site when:</p>
            <p className="text-xs text-link font-mono">POST /api/analytics</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">{'{ visitor_id, browser, utm_source, utm_medium }'}</p>
          </div>
        </div>
      ) : (
        <AnalyticsCharts
          sessionsPerDay={sessionsPerDay}
          browserBreakdown={browserBreakdown}
          utmBreakdown={utmBreakdown}
        />
      )}
    </div>
  )
}
