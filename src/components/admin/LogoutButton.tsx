'use client'

import { LogOut } from 'lucide-react'
import { logout } from '@/app/admin/actions'

export function LogoutButton() {
  return (
    <button onClick={() => logout()} title="Log out" className="p-2 rounded-lg hover:bg-foreground/5 text-muted-foreground hover:text-danger transition-colors">
      <LogOut className="w-4 h-4" />
    </button>
  )
}
