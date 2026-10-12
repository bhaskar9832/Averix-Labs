'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  CheckCircle2, 
  SlidersHorizontal, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { useJira } from '@/lib/jira/context';
import { IssueStatus } from '@/lib/jira/types';
import { IssueCard } from './IssueCard';

const COLUMNS: { id: IssueStatus; title: string; countColor: string; bgBadge: string }[] = [
  { id: 'backlog', title: 'BACKLOG', countColor: 'text-zinc-400', bgBadge: 'bg-zinc-800' },
  { id: 'todo', title: 'TO DO', countColor: 'text-blue-400', bgBadge: 'bg-blue-950/60' },
  { id: 'in_progress', title: 'IN PROGRESS', countColor: 'text-indigo-400', bgBadge: 'bg-indigo-950/60' },
  { id: 'in_review', title: 'IN REVIEW', countColor: 'text-amber-400', bgBadge: 'bg-amber-950/60' },
  { id: 'done', title: 'DONE', countColor: 'text-emerald-400', bgBadge: 'bg-emerald-950/60' },
];

export function KanbanBoard({ onOpenCreateModal }: { onOpenCreateModal: () => void }) {
  const { 
    activeProject, 
    issues, 
    members, 
    updateIssueStatus, 
    searchQuery, 
    filterAssigneeId, 
    setFilterAssigneeId,
    filterType,
    setFilterType,
    filterPriority,
    setFilterPriority
  } = useJira();

  const [dragOverCol, setDragOverCol] = useState<IssueStatus | null>(null);

  // Filter project-specific issues
  const projectIssues = issues.filter((issue) => {
    if (issue.projectId !== activeProject.id) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchKey = issue.key.toLowerCase().includes(q);
      const matchSummary = issue.summary.toLowerCase().includes(q);
      const matchDesc = issue.description?.toLowerCase().includes(q);
      if (!matchKey && !matchSummary && !matchDesc) return false;
    }

    // Assignee filter
    if (filterAssigneeId !== 'all') {
      if (filterAssigneeId === 'unassigned' && issue.assigneeId) return false;
      if (filterAssigneeId !== 'unassigned' && issue.assigneeId !== filterAssigneeId) return false;
    }

    // Type filter
    if (filterType !== 'all' && issue.type !== filterType) return false;

    // Priority filter
    if (filterPriority !== 'all' && issue.priority !== filterPriority) return false;

    return true;
  });

  const handleDragOver = (e: React.DragEvent, colId: IssueStatus) => {
    e.preventDefault();
    setDragOverCol(colId);
  };

  const handleDragLeave = (colId: IssueStatus) => {
    if (dragOverCol === colId) {
      setDragOverCol(null);
    }
  };

  const handleDrop = (e: React.DragEvent, colId: IssueStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    const issueId = e.dataTransfer.getData('text/plain');
    if (issueId) {
      updateIssueStatus(issueId, colId);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0b10]">
      {/* Board Subheader: Title, Filters & Member quick avatars */}
      <div className="px-6 py-4 border-b border-zinc-800/80 bg-[#0e1017] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
            <span>Projects</span>
            <span>/</span>
            <span>{activeProject.name}</span>
            <span>/</span>
            <span className="text-zinc-200 font-semibold">Active Kanban</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>{activeProject.key} Sprint Board</span>
            <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Live Flow
            </span>
          </h1>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Assignee Avatars */}
          <div className="flex items-center -space-x-1.5 mr-2">
            <button
              onClick={() => setFilterAssigneeId('all')}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                filterAssigneeId === 'all'
                  ? 'bg-indigo-600 text-white border-white z-10 scale-105'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
              }`}
              title="All Team Members"
            >
              ALL
            </button>
            {members.slice(0, 5).map((m) => (
              <img
                key={m.id}
                src={m.avatar}
                alt={m.name}
                onClick={() => setFilterAssigneeId(filterAssigneeId === m.id ? 'all' : m.id)}
                title={`${m.name} (${m.role})`}
                className={`w-7 h-7 rounded-full object-cover cursor-pointer border transition-all ${
                  filterAssigneeId === m.id
                    ? 'ring-2 ring-indigo-500 scale-110 z-10 border-white'
                    : 'border-zinc-800 hover:scale-105 hover:z-10 opacity-80 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#141622] border border-zinc-700 rounded-md px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="task">Tasks</option>
            <option value="bug">Bugs</option>
            <option value="story">Stories</option>
            <option value="epic">Epics</option>
            <option value="improvement">Improvements</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#141622] border border-zinc-700 rounded-md px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Priorities</option>
            <option value="highest">Highest</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Add Ticket Button */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Raise Ticket</span>
          </button>
        </div>
      </div>

      {/* Columns Container */}
      <div className="flex-1 overflow-x-auto p-6 scrollbar-thin">
        <div className="flex gap-4 h-full min-w-[1100px]">
          {COLUMNS.map((col) => {
            const colIssues = projectIssues.filter((i) => i.status === col.id);
            const isTargeted = dragOverCol === col.id;

            return (
              <div
                key={col.id}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={() => handleDragLeave(col.id)}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`flex-1 flex flex-col rounded-xl bg-[#0e1017] border transition-all duration-150 ${
                  isTargeted
                    ? 'border-indigo-500 bg-indigo-950/20 ring-2 ring-indigo-500/40 shadow-xl'
                    : 'border-zinc-800/80 hover:border-zinc-700/60'
                }`}
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-zinc-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-300 tracking-wider">
                      {col.title}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${col.bgBadge} ${col.countColor}`}
                    >
                      {colIssues.length}
                    </span>
                  </div>

                  <button
                    onClick={onOpenCreateModal}
                    className="p-1 rounded text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                    title={`Add ticket to ${col.title}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Column Card Stream */}
                <div className="flex-1 p-2.5 space-y-2.5 overflow-y-auto min-h-[300px]">
                  {colIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}

                  {colIssues.length === 0 && (
                    <div className="h-32 border border-dashed border-zinc-800/80 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-[11px] text-zinc-500 italic">No tickets in this column</p>
                      <button
                        onClick={onOpenCreateModal}
                        className="mt-2 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                      >
                        + Create ticket
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
