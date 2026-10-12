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
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0b10]">
      {/* Subheader */}
      <div className="px-6 py-4 border-b border-zinc-800/80 bg-[#0e1017] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
            <span>{activeProject.name}</span>
            <span>/</span>
            <span className="text-zinc-200 font-semibold">Backlog & Issue Table</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>{activeProject.key} Backlog & Work Items</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {projectIssues.length} issues
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick tab switcher */}
          <div className="flex items-center bg-[#141622] p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'all' ? 'bg-indigo-600 text-white font-medium' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('backlog')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'backlog' ? 'bg-indigo-600 text-white font-medium' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Backlog
            </button>
            <button
              onClick={() => setActiveTab('in_flight')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'in_flight' ? 'bg-indigo-600 text-white font-medium' : 'text-zinc-400 hover:text-white'
              }`}
            >
              In Flight
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'completed' ? 'bg-indigo-600 text-white font-medium' : 'text-zinc-400 hover:text-white'
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
        <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-[#0e1017]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-[#12141e] text-[11px] font-bold uppercase tracking-wider text-zinc-400">
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
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {projectIssues.map((issue) => {
                const assignee = members.find((m) => m.id === issue.assigneeId);

                return (
                  <tr
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className="hover:bg-zinc-800/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 text-center">
                      <IssueTypeIcon type={issue.type} className="w-4 h-4 mx-auto" />
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-indigo-400">
                      {issue.key}
                    </td>

                    <td className="py-3 px-4 font-medium text-white group-hover:text-indigo-300 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-xl">{issue.summary}</span>
                        {issue.comments.length > 0 && (
                          <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
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
                        className="bg-[#1b1e2a] border border-zinc-700 rounded px-2 py-1 text-[11px] font-semibold text-zinc-200 focus:outline-none"
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
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-zinc-700 shrink-0"
                          />
                          <span className="text-zinc-300 truncate">{assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-500 italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-zinc-400">
                      {issue.storyPoints ?? '-'}
                    </td>

                    <td className="py-3 px-4 text-right text-zinc-500 text-[11px] font-mono">
                      {new Date(issue.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                );
              })}

              {projectIssues.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-500 text-xs">
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
