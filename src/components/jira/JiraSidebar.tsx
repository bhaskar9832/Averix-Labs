'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Kanban, 
  ListTodo, 
  Users, 
  Settings, 
  BarChart2, 
  FolderGit2, 
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Receipt
} from 'lucide-react';
import { useJira } from '@/lib/jira/context';

export function JiraSidebar() {
  const { activeProject, issues, members } = useJira();
  const pathname = usePathname();

  const projectIssues = issues.filter((i) => i.projectId === activeProject.id);

  const links = [
    {
      name: 'Kanban Board',
      href: '/jira',
      icon: Kanban,
      badge: projectIssues.filter((i) => i.status !== 'done').length,
    },
    {
      name: 'Backlog & List',
      href: '/jira/backlog',
      icon: ListTodo,
      badge: projectIssues.length,
    },
    {
      name: 'SDLC & Billing',
      href: '/jira/delivery',
      icon: Receipt,
      highlight: true,
    },
    {
      name: 'Team & Members',
      href: '/jira/members',
      icon: Users,
      badge: members.length,
    },
    {
      name: 'Project Analytics',
      href: '/jira/reports',
      icon: BarChart2,
    },
    {
      name: 'Project Settings',
      href: '/jira/settings',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-60 border-r border-zinc-800/80 bg-[#0c0d12] flex flex-col shrink-0 select-none h-[calc(100vh-3.5rem)]">
      {/* Active Project Header Card */}
      <div className="p-4 border-b border-zinc-800/70">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg ${activeProject.avatarColor} flex items-center justify-center font-black text-white text-sm shadow-md`}>
            {activeProject.key.slice(0, 2)}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xs font-bold text-white truncate leading-tight">
              {activeProject.name}
            </h2>
            <p className="text-[10px] text-zinc-500 font-medium truncate">
              {activeProject.category}
            </p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider px-3 mb-2">
          Planning
        </div>

        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/20 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                <span className="truncate">{link.name}</span>
              </div>
              {link.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Project Status footer */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/40">
        <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-2.5">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-zinc-400 font-medium">Sprint Progress</span>
            <span className="text-indigo-400 font-bold">
              {projectIssues.length > 0
                ? Math.round(
                    (projectIssues.filter((i) => i.status === 'done').length / projectIssues.length) * 100
                  )
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${
                  projectIssues.length > 0
                    ? Math.round(
                        (projectIssues.filter((i) => i.status === 'done').length / projectIssues.length) * 100
                      )
                    : 0
                }%`,
              }}
            />
          </div>
          <p className="text-[10px] text-zinc-500 mt-2 flex items-center justify-between">
            <span>SDLC: <strong className="text-indigo-400">{activeProject.sdlcPhase}</strong></span>
            <span className="text-emerald-400 font-mono font-bold">${activeProject.ourCharges?.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
