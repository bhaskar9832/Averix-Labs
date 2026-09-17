import Link from "next/link";
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, Package } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050505] text-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#262626] bg-[#0a0a0a] flex flex-col">
        <div className="p-6 border-b border-[#262626]">
          <h1 className="text-xl font-bold tracking-tight text-white">
            AVERIX <span className="text-[#4f46e5]">ADMIN</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#262626] text-[#94a3b8] hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/leads/all" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#262626] text-[#94a3b8] hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Leads & CRM</span>
          </Link>
          <Link href="/admin/messages/inbox" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#262626] text-[#94a3b8] hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium text-sm">Messages</span>
          </Link>
          <Link href="/admin/products/all" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#262626] text-[#94a3b8] hover:text-white transition-colors">
            <Package className="w-5 h-5" />
            <span className="font-medium text-sm">Products</span>
          </Link>
          <Link href="/admin/settings/website" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#262626] text-[#94a3b8] hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[#262626]">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-[#94a3b8] hover:text-red-400 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#050505]">
        {children}
      </main>
    </div>
  );
}
