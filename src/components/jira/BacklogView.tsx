'use client';

import React, { useState } from 'react';
import { 
  ListFilter, 
  Search, 
  Plus, 
  ArrowUpDown, 
  Calendar, 
  CheckCircle2, 
  MessageSquare,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { useJira } from '@/lib/jira/context';
import { IssueStatus, IssuePriority, IssueType } from '@/lib/jira/types';
import { IssueTypeIcon, IssuePriorityIcon, StatusBadge } from './IssueBadges';

export function BacklogView({ onOpenCreateModal }: { onOpenCreateModal: () => void }) {
  const { 
    activeProject, 
    issues, 
    members, 
    setSelectedIssueId, 
    updateIssueStatus,
    searchQuery,
    filterAssigneeId,
    setFilterAssigneeId,
    filterType,
    setFilterType,
    filterPriority,
    setFilterPriority
  } = useJira();

  const [activeTab, setActiveTab] = useState<'all' | 'backlog' | 'in_flight' | 'completed'>('all');

  const projectIssues = issues.filter((issue) => {
    if (issue.projectId !== activeProject.id) return false;

    if (activeTab === 'backlog' && issue.status !== 'backlog') return false;
    if (activeTab === 'in_flight' && (issue.status === 'backlog' || issue.status === 'done')) return false;
    if (activeTab === 'completed' && issue.status !== 'done') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchKey = issue.key.toLowerCase().includes(q);
      const matchSummary = issue.summary.toLowerCase().includes(q);
      if (!matchKey && !matchSummary) return false;
    }

    if (filterAssigneeId !== 'all' && issue.assigneeId !== filterAssigneeId) return false;
    if (filterType !== 'all' && issue.type !== filterType) return false;
    if (filterPriority !== 'all' && issue.priority !== filterPriority) return false;

    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Subheader */}
      <div className="px-6 py-4 border-b border-border/80 bg-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>{activeProject.name}</span>
            <span>/</span>
            <span className="text-foreground font-semibold">Backlog & Issue Table</span>
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <span>{activeProject.key} Backlog & Work Items</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-link border border-indigo-500/20">
              {projectIssues.length} issues
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick tab switcher */}
          <div className="flex items-center bg-secondary p-1 rounded-lg border border-border text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'all' ? 'bg-indigo-600 text-white font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('backlog')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'backlog' ? 'bg-indigo-600 text-white font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Backlog
            </button>
            <button
              onClick={() => setActiveTab('in_flight')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'in_flight' ? 'bg-indigo-600 text-white font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              In Flight
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'completed' ? 'bg-indigo-600 text-white font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Done
            </button>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Issue</span>
          </button>
        </div>
      </div>

      {/* Table view */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="border border-border/80 rounded-xl overflow-hidden bg-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4 w-12 text-center">Type</th>
                <th className="py-3 px-4 w-28">Key</th>
                <th className="py-3 px-4">Summary</th>
                <th className="py-3 px-4 w-32">Status</th>
                <th className="py-3 px-4 w-24 text-center">Priority</th>
                <th className="py-3 px-4 w-44">Assignee</th>
                <th className="py-3 px-4 w-20 text-center">Points</th>
                <th className="py-3 px-4 w-28 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {projectIssues.map((issue) => {
                const assignee = members.find((m) => m.id === issue.assigneeId);

                return (
                  <tr
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className="hover:bg-secondary/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 text-center">
                      <IssueTypeIcon type={issue.type} className="w-4 h-4 mx-auto" />
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-link">
                      {issue.key}
                    </td>

                    <td className="py-3 px-4 font-medium text-foreground group-hover:text-link transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-xl">{issue.summary}</span>
                        {issue.comments.length > 0 && (
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                            <MessageSquare className="w-3 h-3" />
                            {issue.comments.length}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={issue.status}
                        onChange={(e) => updateIssueStatus(issue.id, e.target.value as IssueStatus)}
                        className="bg-muted border border-border rounded px-2 py-1 text-[11px] font-semibold text-foreground focus:outline-none"
                      >
                        <option value="backlog">Backlog</option>
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="in_review">In Review</option>
                        <option value="done">Done</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <IssuePriorityIcon priority={issue.priority} className="w-4 h-4 mx-auto" />
                    </td>

                    <td className="py-3 px-4">
                      {assignee ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={assignee.avatar}
                            alt={assignee.name}
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-border shrink-0"
                          />
                          <span className="text-muted-foreground truncate">{assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-muted-foreground">
                      {issue.storyPoints ?? '-'}
                    </td>

                    <td className="py-3 px-4 text-right text-muted-foreground text-[11px] font-mono">
                      {new Date(issue.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                );
              })}

              {projectIssues.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground text-xs">
                    No tickets found matching your filter or criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
