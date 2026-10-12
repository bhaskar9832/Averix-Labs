import { sql } from '@/lib/db'
import Link from 'next/link'
import { Plus, Search, Filter, ArrowUpRight, Mail, Calendar, Building2 } from 'lucide-react'
import { LeadActions } from '@/components/admin/LeadActions'

const STATUS_COLORS: Record<string, string> = {
  NEW:        'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  CONTACTED:  'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  QUALIFIED:  'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  PROPOSAL:   'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  WON:        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  LOST:       'bg-red-500/10 text-red-400 border border-red-500/20',
}

export default async function LeadsPage() {
  let leads: any[] = []
  let stats = { total: 0, new: 0, qualified: 0, won: 0 }

  try {
    leads = await sql`SELECT * FROM leads ORDER BY created_at DESC`
    stats.total = leads.length
    stats.new = leads.filter(l => l.status === 'NEW').length
    stats.qualified = leads.filter(l => l.status === 'QUALIFIED').length
    stats.won = leads.filter(l => l.status === 'WON').length
  } catch(err) {
    console.error('Failed to load leads:', err)
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Leads CRM</h1>
          <p className="text-white/40 mt-1 text-sm">All project inquiries from your contact form, tracked in real-time.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/contact"
            target="_blank"
            className="bg-[#11131A] border border-white/5 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" /> View contact form
          </Link>
        </div>
      </div>

      {/* Real Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Total leads</p>
          <p className="text-3xl font-semibold text-white mb-2">{stats.total}</p>
          <p className="text-[10px] font-medium text-indigo-400">All time submissions</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">New</p>
          <p className="text-3xl font-semibold text-white mb-2">{stats.new}</p>
          <p className="text-[10px] font-medium text-amber-400">Awaiting first contact</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Qualified</p>
          <p className="text-3xl font-semibold text-white mb-2">{stats.qualified}</p>
          <p className="text-[10px] font-medium text-amber-400">In active conversation</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Won / Customers</p>
          <p className="text-3xl font-semibold text-white mb-2">{stats.won}</p>
          <p className="text-[10px] font-medium text-emerald-400">Converted to clients</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#11131A] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-white font-medium text-sm">All leads</h3>
          <span className="text-[10px] text-white/40 uppercase tracking-wider">{leads.length} TOTAL</span>
        </div>

        {leads.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-white font-medium mb-2">No leads yet</p>
            <p className="text-white/40 text-sm mb-4">When visitors submit the contact form, new leads will appear here.</p>
            <Link href="/contact" target="_blank" className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors flex items-center gap-1 justify-center">
              View contact form <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/60">
              <thead className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5 bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Project type</th>
                  <th className="px-6 py-3 font-medium">Source</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{lead.full_name || `${lead.first_name || ''} ${lead.last_name || ''}`.trim() || '—'}</p>
                      <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5">
                        {lead.company ? <><Building2 className="w-3 h-3" /> {lead.company}</> : <span className="text-white/30">—</span>}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/70">{lead.project_type || '—'}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">
                        {lead.source || 'organic'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${STATUS_COLORS[lead.status] || STATUS_COLORS.NEW}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <LeadActions leadId={lead.id} currentStatus={lead.status} />
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
