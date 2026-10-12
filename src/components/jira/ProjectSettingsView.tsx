'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  FolderGit2, 
  Plus, 
  Save, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useJira } from '@/lib/jira/context';

export function ProjectSettingsView() {
  const { activeProject, projects, members, createProject } = useJira();

  // Create Project form state
  const [isCreating, setIsCreating] = useState(false);
  const [projName, setProjName] = useState('');
  const [projKey, setProjKey] = useState('');
  const [projCategory, setProjCategory] = useState('Cloud Engineering');
  const [projDesc, setProjDesc] = useState('');
  const [avatarColor, setAvatarColor] = useState('bg-indigo-600');
  const [successMsg, setSuccessMsg] = useState('');

  const colors = [
    { name: 'Indigo', class: 'bg-indigo-600' },
    { name: 'Emerald', class: 'bg-emerald-600' },
    { name: 'Blue', class: 'bg-blue-600' },
    { name: 'Rose', class: 'bg-rose-600' },
    { name: 'Amber', class: 'bg-amber-600' },
    { name: 'Purple', class: 'bg-purple-600' },
  ];

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim() || !projKey.trim()) return;

    createProject({
      name: projName.trim(),
      key: projKey.trim().toUpperCase(),
      category: projCategory,
      description: projDesc.trim(),
      avatarColor,
      leadId: members[0]?.id || 'user-1',
      status: 'ACTIVE',
      sdlcPhase: 'REQUIREMENTS',
      clientName: 'Valued Client',
      clientEmail: 'client@example.com',
      clientCompany: 'Client Organization',
      clientAddress: 'Global Headquarters',
      budget: 12000,
      ourCharges: 9500,
      estimatedCost: 4500,
      actualCost: 3800,
      currency: 'USD',
      deliverables: 'Custom production software build, Cloud Architecture, and QA tests.',
    });

    setSuccessMsg(`Project "${projName}" created successfully!`);
    setIsCreating(false);
    setProjName('');
    setProjKey('');
    setProjDesc('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>{activeProject.name}</span>
            <span>/</span>
            <span className="text-foreground font-semibold">Settings</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <span>Project Settings & Configurations</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Configure key identifiers, project leads, access categories, or spin up new initiatives.
          </p>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-success text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Current Project Details */}
        <div className="bg-secondary border border-border/80 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground">Active Project Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-muted-foreground block mb-1">Project Name</label>
              <input
                disabled
                value={activeProject.name}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-muted-foreground"
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1">Project Key</label>
              <input
                disabled
                value={activeProject.key}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-muted-foreground font-mono"
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1">Category</label>
              <input
                disabled
                value={activeProject.category}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-muted-foreground"
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1">Created At</label>
              <input
                disabled
                value={new Date(activeProject.createdAt).toLocaleDateString()}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-muted-foreground"
              />
            </div>
          </div>
          <div>
            <label className="text-muted-foreground block mb-1 text-xs">Description</label>
            <p className="p-3 bg-secondary border border-border rounded-lg text-xs text-muted-foreground leading-relaxed">
              {activeProject.description}
            </p>
          </div>
        </div>

        {/* Create New Project Section */}
        <div className="bg-secondary border border-border/80 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">Add New Workspace Project</h2>
              <p className="text-xs text-muted-foreground">Create a dedicated project board with custom key prefix</p>
            </div>
            {!isCreating && (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Project</span>
              </button>
            )}
          </div>

          {isCreating && (
            <form onSubmit={handleCreateNewProject} className="space-y-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={projName}
                    onChange={(e) => {
                      setProjName(e.target.value);
                      if (!projKey) {
                        setProjKey(e.target.value.slice(0, 3).toUpperCase());
                      }
                    }}
                    placeholder="e.g. Averix AI Sentinel"
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Key (Prefix)</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={projKey}
                    onChange={(e) => setProjKey(e.target.value.toUpperCase())}
                    placeholder="e.g. AAS"
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500 font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Category</label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Cloud Engineering">Cloud Engineering</option>
                    <option value="AI & Data Products">AI & Data Products</option>
                    <option value="Enterprise SaaS">Enterprise SaaS</option>
                    <option value="Mobile Applications">Mobile Applications</option>
                    <option value="Security & Compliance">Security & Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Badge Color</label>
                  <div className="flex gap-2 pt-1">
                    {colors.map((c) => (
                      <button
                        type="button"
                        key={c.name}
                        onClick={() => setAvatarColor(c.class)}
                        className={`w-6 h-6 rounded-md ${c.class} transition-all ${
                          avatarColor === c.class ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Description</label>
                <textarea
                  rows={3}
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="Goals, deliverables and core requirements..."
                  className="w-full bg-secondary border border-border rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Create Project
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
