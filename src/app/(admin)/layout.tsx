import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, Package } from "lucide-react";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            AVERIX <span className="text-[#4f46e5]">ADMIN</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-border text-muted-foreground hover:text-foreground transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/leads/all" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-border text-muted-foreground hover:text-foreground transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Leads & CRM</span>
          </Link>
          <Link href="/admin/messages/inbox" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-border text-muted-foreground hover:text-foreground transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium text-sm">Messages</span>
          </Link>
          <Link href="/admin/products/all" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-border text-muted-foreground hover:text-foreground transition-colors">
            <Package className="w-5 h-5" />
            <span className="font-medium text-sm">Products</span>
          </Link>
          <Link href="/admin/settings/website" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-border text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="mb-3"><ThemeToggle /></div>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
