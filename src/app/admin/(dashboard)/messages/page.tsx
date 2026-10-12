import { sql } from '@/lib/db'
import { MessageActions } from '@/components/admin/MessageActions'
import { Mail, Building2, Calendar, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default async function MessagesPage() {
  let messages: any[] = []
  let unreadCount = 0

  try {
    messages = await sql`SELECT * FROM messages ORDER BY created_at DESC`
    unreadCount = messages.filter(m => m.status === 'UNREAD').length
  } catch(err) {
    console.error('Failed to load messages:', err)
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Messages</h1>
          <p className="text-white/40 mt-1 text-sm">All project inquiries sent via the contact form.</p>
        </div>
        <Link
          href="/contact"
          target="_blank"
          className="bg-[#11131A] border border-white/5 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
        >
          <ArrowUpRight className="w-4 h-4" /> View contact form
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Total messages</p>
          <p className="text-3xl font-semibold text-white mb-2">{messages.length}</p>
          <p className="text-[10px] font-medium text-indigo-400">All time received</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5 border-l-2 border-l-indigo-500">
          <p className="text-xs font-medium text-white/40 mb-2">Unread</p>
          <p className="text-3xl font-semibold text-indigo-400 mb-2">{unreadCount}</p>
          <p className="text-[10px] font-medium text-white/40">Awaiting your response</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Read</p>
          <p className="text-3xl font-semibold text-white mb-2">{messages.length - unreadCount}</p>
          <p className="text-[10px] font-medium text-emerald-400">Already reviewed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message list */}
        <div className="lg:col-span-2 bg-[#11131A] border border-white/5 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white font-medium text-sm">All messages</h3>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">{messages.length} TOTAL</span>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-white font-medium mb-2">No messages yet</p>
              <p className="text-white/40 text-sm">When visitors submit the contact form, messages will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-5 hover:bg-white/5 transition-colors ${msg.status === 'UNREAD' ? 'border-l-2 border-indigo-500' : ''}`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className={`font-medium text-sm ${msg.status === 'UNREAD' ? 'text-white' : 'text-white/70'}`}>{msg.name}</p>
                      <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {msg.email}
                        {msg.company && <><Building2 className="w-3 h-3 ml-1" /> {msg.company}</>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {msg.status === 'UNREAD' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                          UNREAD
                        </span>
                      )}
                      <span className="text-[10px] text-white/30 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  {msg.project && (
                    <p className="text-xs font-medium text-indigo-400 mb-2">Re: {msg.project}</p>
                  )}
                  <p className="text-sm text-white/60 line-clamp-2 mb-3">{msg.message}</p>
                  <MessageActions messageId={msg.id} currentStatus={msg.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right panel - quick stats */}
        <div className="space-y-6">
          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <h3 className="text-white font-medium text-sm mb-4">Recent sources</h3>
            <div className="space-y-3">
              {['Contact Form', 'Direct', 'Referral', 'Social'].map((s, i) => {
                const count = messages.filter(m => (m.project || '').toLowerCase().includes(s.toLowerCase().split(' ')[0])).length
                return (
                  <div key={s} className="flex justify-between items-center text-sm">
                    <span className="text-white/60">{s}</span>
                    <span className="text-white font-mono">{i === 0 ? messages.length : 0}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <h3 className="text-white font-medium text-sm mb-4">Project types</h3>
            <div className="space-y-3">
              {Array.from(new Set(messages.map(m => m.project).filter(Boolean))).slice(0, 5).map((project) => (
                <div key={String(project)} className="flex justify-between items-center text-sm">
                  <span className="text-white/60 truncate max-w-[150px]">{String(project)}</span>
                  <span className="text-white font-mono">{messages.filter(m => m.project === project).length}</span>
                </div>
              ))}
              {messages.every(m => !m.project) && (
                <p className="text-white/30 text-xs">No project data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
