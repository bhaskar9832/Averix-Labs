'use client';

import React from 'react';
import { MessageSquare, Calendar, MoreHorizontal } from 'lucide-react';
import { Issue } from '@/lib/jira/types';
import { useJira } from '@/lib/jira/context';
import { IssueTypeIcon, IssuePriorityIcon } from './IssueBadges';

export function IssueCard({ issue }: { issue: Issue }) {
  const { members, setSelectedIssueId } = useJira();
  const assignee = members.find((m) => m.id === issue.assigneeId);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', issue.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => setSelectedIssueId(issue.id)}
      className="group bg-secondary hover:bg-secondary border border-border/90 hover:border-indigo-500/50 rounded-lg p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-lg hover:shadow-indigo-950/20 transition-all select-none"
    >
      {/* Top row: Type icon + Issue Key */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <IssueTypeIcon type={issue.type} className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] font-bold text-muted-foreground group-hover:text-link transition-colors">
            {issue.key}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {issue.storyPoints !== undefined && issue.storyPoints > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 bg-secondary text-muted-foreground rounded font-mono font-medium">
              {issue.storyPoints}
            </span>
          )}
          <IssuePriorityIcon priority={issue.priority} className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Summary */}
      <h4 className="text-xs font-medium text-foreground group-hover:text-foreground line-clamp-2 leading-relaxed mb-3">
        {issue.summary}
      </h4>

      {/* Tags */}
      {issue.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {issue.tags.slice(0, 2).map((t, i) => (
            <span
              key={i}
              className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-secondary/60 text-muted-foreground border border-border/40"
            >
              {t}
            </span>
          ))}
          {issue.tags.length > 2 && (
            <span className="text-[9px] text-muted-foreground font-mono">+{issue.tags.length - 2}</span>
          )}
        </div>
      )}

      {/* Bottom row: comments count, due date & assignee avatar */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-3">
          {issue.comments.length > 0 && (
            <span className="flex items-center gap-1 hover:text-foreground">
              <MessageSquare className="w-3 h-3" />
              <span>{issue.comments.length}</span>
            </span>
          )}
          {issue.dueDate && (
            <span className="flex items-center gap-1 hover:text-foreground">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span>{new Date(issue.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
            </span>
          )}
        </div>

        <div>
          {assignee ? (
            <img
              src={assignee.avatar}
              alt={assignee.name}
              title={`Assigned to ${assignee.name}`}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-border"
            />
          ) : (
            <div
              title="Unassigned"
              className="w-5 h-5 rounded-full bg-secondary border border-dashed border-border flex items-center justify-center text-[9px] text-muted-foreground"
            >
              ?
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
