'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Check } from 'lucide-react'

export function MessageActions({ messageId, currentStatus }: { messageId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const markRead = async () => {
    if (currentStatus === 'READ') return
    setLoading(true)
    try {
      await fetch(`/api/admin/messages/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'READ' }),
      })
      router.refresh()
    } catch(err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteMsg = async () => {
    if (!confirm('Delete this message?')) return
    setLoading(true)
    try {
      await fetch(`/api/admin/messages/${messageId}`, { method: 'DELETE' })
      router.refresh()
    } catch(err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const replyViaEmail = async () => {
    // Opens the message detail in a new tab or triggers a mail compose
    window.open(`mailto:?subject=Re: Your inquiry to Averix Labs`, '_blank')
  }

  return (
    <div className="flex items-center gap-2">
      {currentStatus === 'UNREAD' && (
        <button
          onClick={markRead}
          disabled={loading}
          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-link border border-indigo-500/20 px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <Check className="w-3 h-3" /> Mark read
        </button>
      )}
      <button
        onClick={replyViaEmail}
        className="bg-foreground/5 hover:bg-foreground/10 text-muted-foreground px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5"
      >
        <Mail className="w-3 h-3" /> Reply
      </button>
      <button
        onClick={deleteMsg}
        disabled={loading}
        className="bg-red-500/10 hover:bg-red-500/20 text-danger px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )
}
