import Link from "next/link";
import { 
  LayoutDashboard, Users, MessageSquare, Settings, Package, 
  BarChart, Activity, Bell, FileText, Building, AlertTriangle, ChevronsUpDown,
  Server, Plus, ShieldAlert, CheckSquare, Network, GitBranch
} from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { Logo } from "@/components/admin/Logo";
import { TopHeader } from "@/components/admin/TopHeader";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch real badge counts from the database
  let unreadMessages = 0;
  let adminName = "Admin";
  let adminInitials = "A";

  try {
    const [unreadRes, adminRes] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM messages WHERE status = 'UNREAD'`,
      sql`SELECT full_name, email FROM admin_users LIMIT 1`,
    ]);
    unreadMessages = Number(unreadRes[0]?.count || 0);
    if (adminRes[0]?.full_name) {
      adminName = adminRes[0].full_name;
      adminInitials = adminName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
  } catch(err) {
    // continue with defaults
  }

  const workspaceItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Command center' },
    { href: '/jira', icon: CheckSquare, label: 'Jira Project Tracker' },
    { href: '/admin/analytics', icon: BarChart, label: 'Web analytics' },
    { href: '/admin/leads', icon: Users, label: 'Leads' },
    { href: '/admin/messages', icon: MessageSquare, label: 'Messages', badge: unreadMessages > 0 ? String(unreadMessages) : undefined },
    { href: '/admin/customers', icon: Building, label: 'Customers' },
    { href: '/admin/products', icon: Package, label: 'Products' },
    { href: '/admin/content', icon: FileText, label: 'Content' },
  ];

  const operationsItems = [
    { href: '/admin/github', icon: GitBranch, label: 'GitHub Telemetry' },
    { href: '/admin/gateway', icon: Network, label: 'API Gateway & HLD' },
    { href: '/admin/ecosystem', icon: Server, label: 'Ecosystem Telemetry' },
    { href: '/admin/system', icon: Activity, label: 'System monitoring' },
    { href: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { href: '/admin/activity', icon: Activity, label: 'Activity & audit' },
    { href: '/admin/incidents', icon: ShieldAlert, label: 'Incidents' },
  ];

  const adminItems = [
    { href: '/admin/users', icon: Users, label: 'Team & Roles' },
    { href: '/admin/sessions', icon: Server, label: 'Active Sessions' },
    { href: '/admin/audit', icon: ShieldAlert, label: 'Security Audit Logs' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-foreground/5 bg-background flex-col hidden md:flex">
        <div className="p-5 pb-3">
          <Logo />
        </div>
        
        <div className="px-4 mb-4">
          <button className="w-full flex items-center justify-between bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 rounded-lg px-3 py-2 text-sm transition-colors">
            <span className="text-foreground font-medium">Averix workspace</span>
            <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-hide">
          <div className="mb-6">
            <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Workspace</p>
            <div className="space-y-0.5">
              {workspaceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-colors group">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-link transition-colors" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold bg-indigo-500 text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mb-6">
            <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Operations</p>
            <div className="space-y-0.5">
              {operationsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-colors group">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-link transition-colors" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Administration</p>
            <div className="space-y-0.5">
              {adminItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-colors group">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-link transition-colors" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
        
        <div className="p-4 border-t border-foreground/5 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {adminInitials}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-foreground">{adminName}</p>
                <p className="text-[10px] text-muted-foreground">Workspace admin</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-card">
        <TopHeader />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
