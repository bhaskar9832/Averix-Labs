'use client'

import { ThemeToggle } from '@/components/ThemeToggle';
import { Search, Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function TopHeader() {
  const [time, setTime] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toUTCString().slice(5, 16).toUpperCase() + " - " + 
        now.toTimeString().slice(0, 5) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data?.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount);
        }
      })
      .catch(() => {});

    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/admin/leads?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="h-16 border-b border-foreground/5 bg-card flex items-center justify-between px-6 shrink-0">
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-link transition-colors" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads, customers, messages... (Press Enter)" 
            className="w-full bg-foreground/5 border border-foreground/10 rounded-md pl-10 pr-4 py-1.5 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-muted-foreground"
          />
        </div>
      </form>
      
      <div className="flex items-center gap-4 pl-4">
        <ThemeToggle compact />
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-success text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Production
        </div>
        <div className="text-xs text-muted-foreground font-mono font-medium hidden sm:block">
          {time || "UTC Live"}
        </div>
        <Link 
          href="/admin/messages" 
          className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Messages / Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          )}
        </Link>
        <Link href="/admin/settings" title="Workspace Settings">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
            AV
          </div>
        </Link>
      </div>
    </header>
  )
}
