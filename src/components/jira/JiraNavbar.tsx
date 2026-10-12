'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Bell, 
  ChevronDown,
  Globe,
  Loader2,
  BookOpen
} from 'lucide-react';
import { useJira } from '@/lib/jira/context';

export function JiraNavbar({ onOpenCreateModal }: { onOpenCreateModal: () => void }) {
  const { 
    projects, 
    activeProjectId, 
    activeProject, 
    setActiveProjectId, 
    members,
    searchQuery,
    setSearchQuery,
    isLoading
  } = useJira();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const currentUser = members[0];

  return (
    <header className="h-16 border-b border-border/90 bg-background text-foreground flex items-center justify-between px-5 sticky top-0 z-40 select-none">
      {/* Left: Brand & Navigation */}
      <div className="flex items-center gap-5">
        {/* Averix Labs Official Brand Logo */}
        <Link href="/jira" className="flex items-center gap-3 pr-2 group">
          <div className="relative flex items-center">
            <Image
              src="/images/logo.png"
              alt="Averix Labs"
              width={160}
              height={44}
              className="h-9 w-auto theme-logo object-contain transition-opacity group-hover:opacity-90"
              priority
            />
          </div>
          <div className="h-5 w-[1px] bg-secondary hidden sm:block" />
          <div className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-700/50 px-2 py-0.5 rounded text-[11px] font-bold text-link font-mono tracking-wide">
            <span>JIRA</span>
          </div>
        </Link>

        {/* Project Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border hover:border-border transition-all text-xs font-semibold"
          >
            <span className={`w-2.5 h-2.5 rounded-sm ${activeProject?.avatarColor || 'bg-indigo-600'} shrink-0`} />
            <span className="max-w-[130px] truncate">{activeProject?.name || 'Select Project'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-secondary border border-border/80 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border flex items-center justify-between">
                <span>Recent Projects</span>
                <span className="text-[9px] text-muted-foreground font-mono">Workspace</span>
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setActiveProjectId(proj.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-3 text-xs hover:bg-secondary/80 transition-colors ${
                      proj.id === activeProjectId ? 'bg-indigo-950/40 text-link font-semibold' : 'text-muted-foreground'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-sm ${proj.avatarColor} shrink-0`} />
                    <div className="flex-1 truncate">
                      <div className="truncate">{proj.name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{proj.key} • {proj.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Raise / Create Ticket Action Button */}
        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create</span>
        </button>
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeProject?.key || 'project'} tickets, keys, or summaries...`}
            className="w-full bg-secondary border border-border/90 focus:border-indigo-500/80 focus:bg-card/90 rounded-lg pl-9 pr-4 py-1.5 text-xs text-foreground placeholder-muted-foreground transition-all outline-none"
          />
        </div>
      </div>

      {/* Right: Quick actions & User Avatar */}
      <div className="flex items-center gap-3">
        {isLoading && (
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-link" />
            <span className="hidden xl:inline">Syncing...</span>
          </div>
        )}

        <Link
          href="/blog"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-secondary/60 border border-transparent hover:border-border transition-colors"
          title="Explore Averix Blogs"
        >
          <BookOpen className="w-3.5 h-3.5 text-link" />
          <span className="hidden sm:inline font-medium">Blogs</span>
        </Link>

        <ThemeToggle compact />
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-secondary/60 border border-transparent hover:border-border transition-colors"
          title="Return to Averix Public Site"
        >
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="hidden sm:inline font-medium">Main Site</span>
        </Link>

        <button 
          className="p-2 rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5" />
        </button>

        {/* Current User */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'}
            alt={currentUser?.name || 'User'}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-border"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground leading-tight">
              {currentUser?.name || 'Bhaskar Sarkar'}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              {currentUser?.role || 'Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
