import React from 'react';
import { 
  CheckSquare, 
  Bug, 
  Bookmark, 
  Zap, 
  TrendingUp, 
  ChevronUp, 
  ChevronsUp, 
  ChevronDown, 
  ChevronsDown, 
  Equal 
} from 'lucide-react';
import { IssueType, IssuePriority, IssueStatus } from '@/lib/jira/types';

export function IssueTypeIcon({ type, className = "w-4 h-4" }: { type: IssueType; className?: string }) {
  switch (type) {
    case 'bug':
      return <Bug className={`${className} text-rose-500`} />;
    case 'story':
      return <Bookmark className={`${className} text-emerald-500`} />;
    case 'epic':
      return <Zap className={`${className} text-purple-500`} />;
    case 'improvement':
      return <TrendingUp className={`${className} text-amber-500`} />;
    case 'task':
    default:
      return <CheckSquare className={`${className} text-blue-500`} />;
  }
}

export function IssuePriorityIcon({ priority, className = "w-4 h-4" }: { priority: IssuePriority; className?: string }) {
  switch (priority) {
    case 'highest':
      return <ChevronsUp className={`${className} text-rose-500`} />;
    case 'high':
      return <ChevronUp className={`${className} text-rose-400`} />;
    case 'medium':
      return <Equal className={`${className} text-amber-400`} />;
    case 'low':
      return <ChevronDown className={`${className} text-blue-400`} />;
    case 'lowest':
      return <ChevronsDown className={`${className} text-slate-400`} />;
    default:
      return <Equal className={`${className} text-slate-400`} />;
  }
}

export function StatusBadge({ status }: { status: IssueStatus }) {
  const configs: Record<IssueStatus, { label: string; bg: string; text: string; border: string }> = {
    backlog: {
      label: 'BACKLOG',
      bg: 'bg-zinc-800/80',
      text: 'text-zinc-400',
      border: 'border-zinc-700/60',
    },
    todo: {
      label: 'TO DO',
      bg: 'bg-blue-950/40',
      text: 'text-blue-400',
      border: 'border-blue-800/50',
    },
    in_progress: {
      label: 'IN PROGRESS',
      bg: 'bg-indigo-950/40',
      text: 'text-indigo-300',
      border: 'border-indigo-700/50',
    },
    in_review: {
      label: 'IN REVIEW',
      bg: 'bg-amber-950/40',
      text: 'text-amber-300',
      border: 'border-amber-700/50',
    },
    done: {
      label: 'DONE',
      bg: 'bg-emerald-950/40',
      text: 'text-emerald-300',
      border: 'border-emerald-700/50',
    },
  };

  const c = configs[status] || configs.backlog;

  return (
    <span
      className={`inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${c.bg} ${c.text} ${c.border}`}
    >
      {c.label}
    </span>
  );
}
