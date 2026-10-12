'use client'

import { LogOut } from 'lucide-react'
import { logout } from '@/app/admin/actions'

export function LogoutButton() {
  return (
    <button onClick={() => logout()} title="Log out" className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-red-400 transition-colors">
      <LogOut className="w-4 h-4" />
    </button>
  )
}
