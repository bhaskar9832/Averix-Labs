import { sql } from '@/lib/db'
import { ArrowUpRight, Mail, Calendar, Building2, Trophy } from 'lucide-react'
import Link from 'next/link'

export default async function CustomersPage() {
  let customers: any[] = []

  try {
    customers = await sql`SELECT * FROM leads WHERE status = 'WON' ORDER BY created_at DESC`
  } catch(err) {
    console.error('Failed to load customers:', err)
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Customers</h1>
          <p className="text-white/40 mt-1 text-sm">All leads that have been converted to paying clients.</p>
        </div>
        <Link
          href="/admin/leads"
          className="bg-[#11131A] border border-white/5 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
        >
          <ArrowUpRight className="w-4 h-4" /> Manage all leads
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Total customers</p>
          <p className="text-3xl font-semibold text-white mb-2">{customers.length}</p>
          <p className="text-[10px] font-medium text-emerald-400">Successfully converted</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Unique companies</p>
          <p className="text-3xl font-semibold text-white mb-2">
            {new Set(customers.map(c => c.company).filter(Boolean)).size}
          </p>
          <p className="text-[10px] font-medium text-indigo-400">Active business relationships</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Top project type</p>
          <p className="text-xl font-semibold text-white mb-2 truncate">
            {(() => {
              const types = customers.map(c => c.project_type).filter(Boolean)
              const counts: Record<string, number> = {}
              types.forEach(t => { counts[t] = (counts[t] || 0) + 1 })
              const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
              return top ? top[0] : '—'
            })()}
          </p>
          <p className="text-[10px] font-medium text-white/40">Most requested service</p>
        </div>
      </div>

      <div className="bg-[#11131A] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-white font-medium text-sm">Customer list</h3>
          <span className="text-[10px] text-white/40 uppercase tracking-wider">{customers.length} CUSTOMERS</span>
        </div>

        {customers.length === 0 ? (
          <div className="p-12 text-center">
            <Trophy className="w-10 h-10 text-white/20 mx-auto mb-4" />
            <p className="text-white font-medium mb-2">No customers yet</p>
            <p className="text-white/40 text-sm mb-4">Mark a lead as &apos;WON&apos; in the Leads CRM to see them here.</p>
            <Link href="/admin/leads" className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors flex items-center gap-1 justify-center">
              Go to Leads <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/60">
              <thead className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5 bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Project</th>
                  <th className="px-6 py-3 font-medium">Source</th>
                  <th className="px-6 py-3 font-medium">Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                          {(c.full_name || c.first_name || '?')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">{c.full_name || `${c.first_name || ''} ${c.last_name || ''}`.trim()}</p>
                          <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" /> {c.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {c.company ? (
                        <span className="flex items-center gap-1.5 text-white/70">
                          <Building2 className="w-3 h-3" /> {c.company}
                        </span>
                      ) : <span className="text-white/30">—</span>}
                    </td>
                    <td className="px-6 py-4 text-white/70">{c.project_type || '—'}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-white/50">
                        {c.source || 'organic'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
