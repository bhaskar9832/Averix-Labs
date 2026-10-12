'use client';

import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Plus, 
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react';
import { useJira } from '@/lib/jira/context';
import { ProjectMember } from '@/lib/jira/types';

export function MembersManager() {
  const { members, addMember, activeProject, issues } = useJira();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<ProjectMember['role']>('Frontend Dev');
  const [department, setDepartment] = useState('Engineering');
  const [avatar, setAvatar] = useState('');

  const randomAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
  ];

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const chosenAvatar = avatar.trim() || randomAvatars[Math.floor(Math.random() * randomAvatars.length)];

    addMember({
      name: name.trim(),
      email: email.trim(),
      role,
      department: department.trim() || 'Product Engineering',
      avatar: chosenAvatar,
    });

    setIsModalOpen(false);
    setName('');
    setEmail('');
    setDepartment('Engineering');
    setAvatar('');
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span>{activeProject.name}</span>
              <span>/</span>
              <span className="text-foreground font-semibold">Team & People</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <span>Project Members & Collaborators</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-link border border-indigo-500/20">
                {members.length} members
              </span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Manage engineering team members, assign ticket owners, and calibrate project roles.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Member cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => {
            const assignedCount = issues.filter(
              (i) => i.projectId === activeProject.id && i.assigneeId === member.id
            ).length;
            const completedCount = issues.filter(
              (i) => i.projectId === activeProject.id && i.assigneeId === member.id && i.status === 'done'
            ).length;

            return (
              <div
                key={member.id}
                className="bg-secondary border border-border/80 hover:border-border rounded-xl p-5 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-border/60 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-sm text-foreground truncate">{member.name}</h3>
                      <p className="text-xs text-link font-medium truncate">{member.role}</p>
                      <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-secondary rounded-lg p-2.5 text-xs space-y-1.5 border border-border/60 mb-4">
                    <div className="flex justify-between text-muted-foreground text-[11px]">
                      <span>Department:</span>
                      <span className="font-semibold text-muted-foreground">{member.department}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[11px]">
                      <span>Active Tickets:</span>
                      <span className="font-semibold text-link font-mono">{assignedCount} assigned</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[11px]">
                      <span>Completed:</span>
                      <span className="font-semibold text-success font-mono">{completedCount} resolved</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/60 text-[11px]">
                  <span className="text-muted-foreground font-medium">Verified Averix ID</span>
                  <span className="flex items-center gap-1 text-success font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-md bg-secondary border border-border rounded-xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-link" />
                <span>Invite / Add Team Member</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@averixlabs.com"
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as ProjectMember['role'])}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Senior Engineer">Senior Engineer</option>
                    <option value="Frontend Dev">Frontend Dev</option>
                    <option value="Backend Dev">Backend Dev</option>
                    <option value="Product Designer">Product Designer</option>
                    <option value="QA Lead">QA Lead</option>
                    <option value="Project Lead">Project Lead</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Engineering"
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://... (Leave blank for auto avatar)"
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
