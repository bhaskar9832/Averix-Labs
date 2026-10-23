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
      return <Bug className={`${className} text-danger`} />;
    case 'story':
      return <Bookmark className={`${className} text-success`} />;
    case 'epic':
      return <Zap className={`${className} text-link`} />;
    case 'improvement':
      return <TrendingUp className={`${className} text-warning`} />;
    case 'task':
    default:
      return <CheckSquare className={`${className} text-link`} />;
  }
}

export function IssuePriorityIcon({ priority, className = "w-4 h-4" }: { priority: IssuePriority; className?: string }) {
  switch (priority) {
    case 'highest':
      return <ChevronsUp className={`${className} text-danger`} />;
    case 'high':
      return <ChevronUp className={`${className} text-danger`} />;
    case 'medium':
      return <Equal className={`${className} text-warning`} />;
    case 'low':
      return <ChevronDown className={`${className} text-link`} />;
    case 'lowest':
      return <ChevronsDown className={`${className} text-muted-foreground`} />;
    default:
      return <Equal className={`${className} text-muted-foreground`} />;
  }
}

export function StatusBadge({ status }: { status: IssueStatus }) {
  const configs: Record<IssueStatus, { label: string; bg: string; text: string; border: string }> = {
    backlog: {
      label: 'BACKLOG',
      bg: 'bg-secondary/80',
      text: 'text-muted-foreground',
      border: 'border-border/60',
    },
    todo: {
      label: 'TO DO',
      bg: 'bg-blue-950/40',
      text: 'text-link',
      border: 'border-blue-800/50',
    },
    in_progress: {
      label: 'IN PROGRESS',
      bg: 'bg-indigo-950/40',
      text: 'text-link',
      border: 'border-indigo-700/50',
    },
    in_review: {
      label: 'IN REVIEW',
      bg: 'bg-amber-950/40',
      text: 'text-warning',
      border: 'border-amber-700/50',
    },
    done: {
      label: 'DONE',
      bg: 'bg-emerald-950/40',
      text: 'text-success',
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
