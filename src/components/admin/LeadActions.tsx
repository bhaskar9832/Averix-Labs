'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Check } from 'lucide-react'

const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST']

const STATUS_COLORS: Record<string, string> = {
  NEW:        'text-link',
  CONTACTED:  'text-link',
  QUALIFIED:  'text-warning',
  PROPOSAL:   'text-link',
  WON:        'text-success',
  LOST:       'text-danger',
}

export function LeadActions({ leadId, currentStatus }: { leadId: string, currentStatus: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updateStatus = async (status: string) => {
    setLoading(true)
    setOpen(false)
    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      router.refresh()
    } catch (err) {
      console.error('Failed to update lead:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteLead = async () => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    setLoading(true)
    try {
      await fetch(`/api/admin/leads/${leadId}`, { method: 'DELETE' })
      router.refresh()
    } catch (err) {
      console.error('Failed to delete lead:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 relative">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          disabled={loading}
          className="bg-foreground/5 hover:bg-foreground/10 text-foreground/70 px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 disabled:opacity-50"
        >
          {loading ? '...' : 'Status'} <ChevronDown className="w-3 h-3" />
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-1 bg-card border border-foreground/10 rounded-lg overflow-hidden shadow-xl z-50 min-w-[120px]">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-white/5 transition-colors flex items-center justify-between gap-2 ${STATUS_COLORS[s]}`}
              >
                {s}
                {currentStatus === s && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={deleteLead}
        disabled={loading}
        className="bg-red-500/10 hover:bg-red-500/20 text-danger px-2 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )
}
