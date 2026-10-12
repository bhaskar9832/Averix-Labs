import { AlertTriangle, ChevronRight, ArrowUpRight } from 'lucide-react'
import { sql } from '@/lib/db'
import { DashboardCharts } from '@/components/admin/DashboardCharts'
import Link from 'next/link'

export default async function CommandCenter() {
  let leadsCount = 0
  let customersCount = 0
  let messagesCount = 0
  let unreadCount = 0
  let recentLeads: any[] = []
  let recentMessages: any[] = []

  try {
    const [leadsRes, customersRes, messagesRes, unreadRes, recentLeadsRes, recentMsgsRes] = await Promise.all([
      sql`SELECT count(*) FROM leads`,
      sql`SELECT count(*) FROM leads WHERE status = 'WON'`,
      sql`SELECT count(*) FROM messages`,
      sql`SELECT count(*) FROM messages WHERE status = 'UNREAD'`,
      sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 5`,
      sql`SELECT * FROM messages WHERE status = 'UNREAD' ORDER BY created_at DESC LIMIT 3`,
    ])
    leadsCount = Number(leadsRes[0]?.count || 0)
    customersCount = Number(customersRes[0]?.count || 0)
    messagesCount = Number(messagesRes[0]?.count || 0)
    unreadCount = Number(unreadRes[0]?.count || 0)
    recentLeads = recentLeadsRes
    recentMessages = recentMsgsRes
  } catch(err) {
    console.error('Failed to load dashboard stats:', err)
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Command center</h1>
          <p className="text-muted-foreground mt-1 text-sm">Your business and infrastructure, in one operational view.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/analytics" className="bg-indigo-500/10 border border-indigo-500/20 text-link px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition-colors">
            View reports
          </Link>
        </div>
      </div>

      {/* Alert Box - only show if there are unread messages */}
      {unreadCount > 0 && (
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 mb-6 flex items-start justify-between">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-link mt-0.5" />
            <div>
              <h3 className="text-link font-medium text-sm">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</h3>
              <p className="text-link/70 text-xs mt-1">New project inquiries waiting for your response.</p>
            </div>
          </div>
          <Link href="/admin/messages" className="bg-indigo-500/10 border border-indigo-500/20 text-link px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-500/20 transition-colors">
            View messages
          </Link>
        </div>
      )}

      {/* Metrics Row — all real data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link href="/admin/leads" className="bg-card border border-foreground/5 rounded-xl p-5 hover:border-foreground/10 transition-colors block">
          <p className="text-xs font-medium text-muted-foreground mb-2">Total leads</p>
          <p className="text-3xl font-semibold text-foreground mb-2">{leadsCount}</p>
          <p className="text-[10px] font-medium text-link flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> View all leads
          </p>
        </Link>
        <Link href="/admin/customers" className="bg-card border border-foreground/5 rounded-xl p-5 hover:border-foreground/10 transition-colors block">
          <p className="text-xs font-medium text-muted-foreground mb-2">Customers</p>
          <p className="text-3xl font-semibold text-foreground mb-2">{customersCount}</p>
          <p className="text-[10px] font-medium text-success">
            {customersCount > 0 ? 'Converted clients' : 'Close your first deal →'}
          </p>
        </Link>
        <Link href="/admin/messages" className="bg-card border border-foreground/5 rounded-xl p-5 hover:border-foreground/10 transition-colors block">
          <p className="text-xs font-medium text-muted-foreground mb-2">Messages</p>
          <p className="text-3xl font-semibold text-foreground mb-2">{messagesCount}</p>
          <p className="text-[10px] font-medium text-link">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up ✓'}
          </p>
        </Link>
        <Link href="/admin/analytics" className="bg-card border border-foreground/5 rounded-xl p-5 hover:border-foreground/10 transition-colors block">
          <p className="text-xs font-medium text-muted-foreground mb-2">Analytics</p>
          <p className="text-3xl font-semibold text-foreground mb-2">Live</p>
          <p className="text-[10px] font-medium text-success">Tracking active</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <DashboardCharts performanceData={[]} />
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          <div className="bg-card border border-foreground/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground font-medium text-sm">Quick actions</h3>
            </div>
            <div className="space-y-2">
              <Link href="/admin/leads" className="flex items-center justify-between p-3 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors group">
                <span className="text-sm text-foreground/70 group-hover:text-foreground">View all leads</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="/admin/messages" className="flex items-center justify-between p-3 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors group">
                <span className="text-sm text-foreground/70 group-hover:text-foreground">
                  Inbox {unreadCount > 0 && <span className="text-link font-bold">({unreadCount})</span>}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="/admin/analytics" className="flex items-center justify-between p-3 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors group">
                <span className="text-sm text-foreground/70 group-hover:text-foreground">Analytics dashboard</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="/admin/customers" className="flex items-center justify-between p-3 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors group">
                <span className="text-sm text-foreground/70 group-hover:text-foreground">Customer list</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="/admin/settings" className="flex items-center justify-between p-3 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors group">
                <span className="text-sm text-foreground/70 group-hover:text-foreground">Workspace settings</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row — real recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-card border border-foreground/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-foreground font-medium text-sm">Recent leads</h3>
            <Link href="/admin/leads" className="text-xs text-link hover:text-link transition-colors flex items-center gap-1">
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No leads yet.</p>
              <Link href="/contact" target="_blank" className="text-link text-xs mt-2 flex items-center justify-center gap-1 hover:text-link transition-colors">
                View contact form <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map(lead => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-foreground/5 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{lead.full_name || lead.email}</p>
                    <p className="text-xs text-muted-foreground">{lead.company || lead.project_type || lead.email}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    lead.status === 'WON' ? 'bg-emerald-500/10 text-success' :
                    lead.status === 'NEW' ? 'bg-indigo-500/10 text-link' :
                    'bg-amber-500/10 text-warning'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unread Messages */}
        <div className="bg-card border border-foreground/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-foreground font-medium text-sm">Unread messages</h3>
            <Link href="/admin/messages" className="text-xs text-link hover:text-link transition-colors flex items-center gap-1">
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No unread messages. All caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map(msg => (
                <div key={msg.id} className="flex items-start gap-3 py-2 border-b border-foreground/5 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-link text-xs font-bold shrink-0 mt-0.5">
                    {(msg.name || '?')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{msg.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                    {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
