import React from 'react';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ShieldAlert, Terminal, Clock, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminAuditLogsPage() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  let logs: any[] = [];
  try {
    logs = await sql`
      SELECT 
        al.id,
        al.action,
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
      LIMIT 50
    `;
  } catch (e) {
    console.error('Failed to load audit logs:', e);
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-danger text-xs font-mono font-semibold border border-rose-500/20">
              Compliance • Immutable Audit Stream
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Security & Operational Audit Logs
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Immutable system logs tracking logins, MFA verification, permission checks, and data operations across PostgreSQL and Redis.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-foreground/10 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-foreground/5">
          <h3 className="font-bold text-base text-foreground flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-danger" />
            <span>Audit Trail Records ({logs.length})</span>
          </h3>
          <span className="text-xs font-mono text-success">Append-Only / Non-Modifiable</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground/70">
            <thead>
              <tr className="border-b border-foreground/5 text-[10px] uppercase font-bold text-muted-foreground">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5 font-mono">
              {logs.map((log: any) => {
                const actionBadge = log.action.includes('FAILED')
                  ? 'bg-rose-500/10 text-danger border-rose-500/20'
                  : log.action.includes('REVOKED') || log.action.includes('DELETED')
                  ? 'bg-amber-500/10 text-warning border-amber-500/20'
                  : 'bg-emerald-500/10 text-success border-emerald-500/20';

                return (
                  <tr key={log.id} className="hover:bg-foreground/5 transition-colors">
                    <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                      {log.created_at ? new Date(log.created_at).toLocaleString() : 'Recent'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${actionBadge}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <p className="font-bold text-foreground text-xs">{log.user_name?.trim() || 'Averix Admin'}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{log.user_email || 'System'}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-link font-mono">
                        {log.resource_type || 'system'}
                      </span>
                      {log.resource_id && log.resource_id !== 'none' && (
                        <span className="text-muted-foreground text-[10px] block">ID: {log.resource_id.slice(0, 10)}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground text-xs">
                      {log.ip_address || '127.0.0.1'}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground text-[10px] max-w-[200px] truncate">
                      {JSON.stringify(log.metadata || {})}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
