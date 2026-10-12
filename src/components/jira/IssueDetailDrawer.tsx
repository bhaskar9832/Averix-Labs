'use client';

import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Send, 
  Clock, 
  Calendar, 
  Tag, 
  User as UserIcon, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useJira } from '@/lib/jira/context';
import { IssueStatus, IssuePriority, IssueType } from '@/lib/jira/types';
import { IssueTypeIcon, IssuePriorityIcon, StatusBadge } from './IssueBadges';

export function IssueDetailDrawer({
  issueId,
  onClose,
}: {
  issueId: string;
  onClose: () => void;
}) {
  const { 
    issues, 
    members, 
    updateIssue, 
    updateIssueStatus, 
    deleteIssue, 
    addComment 
  } = useJira();

  const [commentText, setCommentText] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [summaryEdit, setSummaryEdit] = useState('');
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descEdit, setDescEdit] = useState('');

  const issue = issues.find((i) => i.id === issueId);
  if (!issue) return null;

  const assignee = members.find((m) => m.id === issue.assigneeId);
  const reporter = members.find((m) => m.id === issue.reporterId) || members[0];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(issue.id, commentText.trim());
    setCommentText('');
  };

  const handleSaveTitle = () => {
    if (summaryEdit.trim()) {
      updateIssue(issue.id, { summary: summaryEdit.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleSaveDesc = () => {
    updateIssue(issue.id, { description: descEdit });
    setIsEditingDesc(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-3xl bg-[#10121a] border-l border-zinc-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="h-14 border-b border-zinc-800 px-6 flex items-center justify-between bg-[#0c0d12]">
          <div className="flex items-center gap-3">
            <IssueTypeIcon type={issue.type} className="w-5 h-5" />
            <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-2 py-0.5 rounded">
              {issue.key}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm(`Delete issue ${issue.key}?`)) {
                  deleteIssue(issue.id);
                  onClose();
                }
              }}
              className="p-1.5 rounded text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Delete issue"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body: 2-column layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          {/* Main Left area: Summary, Description, Comments */}
          <div className="md:col-span-2 p-6 space-y-6">
            {/* Title */}
            <div>
              {isEditingTitle ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={summaryEdit}
                    onChange={(e) => setSummaryEdit(e.target.value)}
                    className="w-full bg-[#1b1e2a] border border-indigo-500 rounded px-3 py-1.5 text-base font-semibold text-white focus:outline-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveTitle}
                      className="px-2.5 py-1 text-xs bg-indigo-600 text-white rounded font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingTitle(false)}
                      className="px-2.5 py-1 text-xs bg-zinc-800 text-zinc-300 rounded font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <h1
                  onClick={() => {
                    setSummaryEdit(issue.summary);
                    setIsEditingTitle(true);
                  }}
                  className="text-lg font-bold text-white cursor-pointer hover:bg-zinc-800/40 p-1.5 -ml-1.5 rounded transition-colors leading-snug"
                  title="Click to edit summary"
                >
                  {issue.summary}
                </h1>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Description
              </h3>
              {isEditingDesc ? (
                <div className="space-y-2">
                  <textarea
                    rows={6}
                    value={descEdit}
                    onChange={(e) => setDescEdit(e.target.value)}
                    className="w-full bg-[#1b1e2a] border border-indigo-500 rounded-lg p-3 text-xs text-white focus:outline-none resize-none leading-relaxed"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDesc}
                      className="px-3 py-1 text-xs bg-indigo-600 text-white rounded font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingDesc(false)}
                      className="px-3 py-1 text-xs bg-zinc-800 text-zinc-300 rounded font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setDescEdit(issue.description);
                    setIsEditingDesc(true);
                  }}
                  className="bg-[#141622] border border-zinc-800/80 rounded-lg p-3.5 text-xs text-zinc-300 whitespace-pre-wrap cursor-pointer hover:border-zinc-700 min-h-[90px] leading-relaxed transition-all"
                  title="Click to edit description"
                >
                  {issue.description || (
                    <span className="text-zinc-500 italic">Add a detailed description...</span>
                  )}
                </div>
              )}
            </div>

            {/* Tags / Labels */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Tags</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {issue.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Thread */}
            <div className="pt-4 border-t border-zinc-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Activity & Comments ({issue.comments.length})
              </h3>

              {/* Comment Input */}
              <form onSubmit={handleCommentSubmit} className="space-y-2">
                <div className="flex gap-3">
                  <img
                    src={members[0]?.avatar}
                    alt={members[0]?.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                  />
                  <div className="flex-1">
                    <textarea
                      rows={2}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment... (Type an update or resolution note)"
                      className="w-full bg-[#161824] border border-zinc-700 rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                    />
                    {commentText.trim() && (
                      <div className="mt-2 flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>Save Comment</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>

              {/* Comments list */}
              <div className="space-y-3 pt-2">
                {issue.comments.map((comm) => (
                  <div key={comm.id} className="flex gap-3 bg-[#131520] p-3 rounded-lg border border-zinc-800/60">
                    <img
                      src={comm.authorAvatar}
                      alt={comm.authorName}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-zinc-200">{comm.authorName}</span>
                        <span className="text-[10px] text-zinc-500">
                          {new Date(comm.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{comm.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Ticket Metadata, Status, Assignee, Priority */}
          <div className="p-6 space-y-6 bg-[#0d0e14]">
            {/* Status Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Status
              </label>
              <select
                value={issue.status}
                onChange={(e) => updateIssueStatus(issue.id, e.target.value as IssueStatus)}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Priority
              </label>
              <select
                value={issue.priority}
                onChange={(e) => updateIssue(issue.id, { priority: e.target.value as IssuePriority })}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="highest">Highest 🔺</option>
                <option value="high">High 🔼</option>
                <option value="medium">Medium ➖</option>
                <option value="low">Low 🔽</option>
                <option value="lowest">Lowest ⏬</option>
              </select>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Assignee
              </label>
              <select
                value={issue.assigneeId || ''}
                onChange={(e) => updateIssue(issue.id, { assigneeId: e.target.value || undefined })}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Unassigned</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
              {assignee && (
                <div className="flex items-center gap-2 mt-2 px-2 py-1.5 rounded bg-zinc-800/40 border border-zinc-800">
                  <img
                    src={assignee.avatar}
                    alt={assignee.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <div className="text-[11px] truncate">
                    <span className="font-semibold text-zinc-200">{assignee.name}</span>
                    <span className="text-zinc-500 block">{assignee.department}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Story Points */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Story Points
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={issue.storyPoints ?? 0}
                onChange={(e) => updateIssue(issue.id, { storyPoints: Number(e.target.value) })}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={issue.dueDate || ''}
                onChange={(e) => updateIssue(issue.id, { dueDate: e.target.value || undefined })}
                className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Reporter & Metadata */}
            <div className="pt-4 border-t border-zinc-800 text-[11px] space-y-2 text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Reporter:</span>
                <span className="font-semibold text-zinc-300">{reporter.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Created:</span>
                <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated:</span>
                <span>{new Date(issue.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
