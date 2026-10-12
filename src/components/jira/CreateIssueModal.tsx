'use client';

import React, { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { useJira } from '@/lib/jira/context';
import { IssueType, IssuePriority, IssueStatus } from '@/lib/jira/types';
import { IssueTypeIcon, IssuePriorityIcon } from './IssueBadges';

export function CreateIssueModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { activeProject, projects, members, createIssue, setSelectedIssueId } = useJira();

  const [projectId, setProjectId] = useState(activeProject.id);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<IssueType>('task');
  const [priority, setPriority] = useState<IssuePriority>('medium');
  const [status, setStatus] = useState<IssueStatus>('todo');
  const [assigneeId, setAssigneeId] = useState(members[1]?.id || members[0]?.id || '');
  const [storyPoints, setStoryPoints] = useState<number>(3);
  const [tagInput, setTagInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) {
      setError('Please provide a ticket summary');
      return;
    }

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newIssue = await createIssue({
      projectId,
      summary: summary.trim(),
      description: description.trim(),
      type,
      priority,
      status,
      assigneeId: assigneeId || undefined,
      reporterId: members[0]?.id || 'user-1',
      storyPoints: Number(storyPoints) || 0,
      tags: tags.length > 0 ? tags : ['Averix'],
      dueDate: dueDate || undefined,
    });

    onClose();
    // Reset form
    setSummary('');
    setDescription('');
    setTagInput('');
    setError('');
    setSelectedIssueId(newIssue.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#14161f] border border-zinc-700/80 rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0e1017]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-semibold text-white">Create Issue / Raise Ticket</h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Project & Issue Type Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.key})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Issue Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as IssueType)}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="task">✓ Task</option>
                <option value="bug">🐛 Bug</option>
                <option value="story">🔖 Story</option>
                <option value="epic">⚡ Epic</option>
                <option value="improvement">📈 Improvement</option>
              </select>
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Summary <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Implement distributed rate limiter for agent websocket endpoints"
              className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-zinc-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Description / Specifications
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide background, steps to reproduce, or acceptance criteria..."
              className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-zinc-500 leading-relaxed resize-none"
            />
          </div>

          {/* Status, Priority, Story Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as IssueStatus)}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as IssuePriority)}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="highest">Highest 🔺</option>
                <option value="high">High 🔼</option>
                <option value="medium">Medium ➖</option>
                <option value="low">Low 🔽</option>
                <option value="lowest">Lowest ⏬</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Story Points</label>
              <input
                type="number"
                min="0"
                max="100"
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Assignee, Due Date & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Assignee</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Unassigned</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Backend, API, Urgent"
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-zinc-500"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
