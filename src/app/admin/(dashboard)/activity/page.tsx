import { sql } from '@/lib/db'
import { Activity, Calendar, User } from 'lucide-react'

const ACTION_COLORS: Record<string, string> = {
  LOGIN:   'bg-blue-500',
  CREATE:  'bg-emerald-500',
  UPDATE:  'bg-amber-500',
  DELETE:  'bg-red-500',
  VIEW:    'bg-indigo-500',
}

export default async function ActivityPage() {
  let logs: any[] = []

  try {
    logs = await sql`
      SELECT 
        al.*,
        au.full_name as admin_name,
        au.email as admin_email
      FROM activity_logs al
      LEFT JOIN admin_users au ON al.admin_user_id = au.id
      ORDER BY al.created_at DESC
      LIMIT 100
    `
  } catch(err) {
    console.error('Failed to load activity:', err)
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Activity & Audit</h1>
          <p className="text-muted-foreground mt-1 text-sm">A tamper-evident record of every action taken in this workspace.</p>
        </div>
        <div className="bg-card border border-foreground/5 text-foreground/70 px-4 py-2 rounded-lg text-sm font-medium">
          Last 100 events
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Total logged events</p>
          <p className="text-3xl font-semibold text-foreground mb-2">{logs.length}</p>
          <p className="text-[10px] font-medium text-link">In this audit window</p>
        </div>
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Unique admins</p>
          <p className="text-3xl font-semibold text-foreground mb-2">
            {new Set(logs.map(l => l.admin_user_id).filter(Boolean)).size}
          </p>
          <p className="text-[10px] font-medium text-muted-foreground">Performed actions</p>
        </div>
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Last activity</p>
          <p className="text-xl font-semibold text-foreground mb-2">
            {logs[0] ? new Date(logs[0].created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
          </p>
          <p className="text-[10px] font-medium text-muted-foreground">Most recent event</p>
        </div>
      </div>

      <div className="bg-card border border-foreground/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-foreground/5 flex items-center justify-between">
          <h3 className="text-foreground font-medium text-sm">Event stream</h3>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">AUDIT LOG • IMMUTABLE</span>
        </div>

        {logs.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="w-10 h-10 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">No activity yet</p>
            <p className="text-muted-foreground text-sm">Admin actions will be logged here automatically.</p>
          </div>
        ) : (
          <div className="divide-y divide-foreground/5">
            {logs.map((log) => {
              const actionKey = (log.action || '').split('_')[0].toUpperCase()
              const dotColor = ACTION_COLORS[actionKey] || 'bg-foreground/40'
              return (
                <div key={log.id} className="flex items-start gap-4 p-5 hover:bg-foreground/5 transition-colors">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${dotColor}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <p className="text-foreground font-medium text-sm">{log.action}</p>
                      <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                        {new Date(log.created_at).toLocaleString('en-US', {
                          month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {log.admin_name && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> {log.admin_name}
                        </span>
                      )}
                      {log.entity_type && (
                        <span className="font-mono bg-foreground/5 px-1.5 py-0.5 rounded">
                          {log.entity_type}
                          {log.entity_id && ` · ${String(log.entity_id).slice(0, 8)}...`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
