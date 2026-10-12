'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Flame,
  Award
} from 'lucide-react';
import { useJira } from '@/lib/jira/context';

export function ProjectReports() {
  const { activeProject, issues, members } = useJira();

  const projectIssues = issues.filter((i) => i.projectId === activeProject.id);

  const doneCount = projectIssues.filter((i) => i.status === 'done').length;
  const inProgressCount = projectIssues.filter((i) => i.status === 'in_progress' || i.status === 'in_review').length;
  const todoCount = projectIssues.filter((i) => i.status === 'todo').length;
  const backlogCount = projectIssues.filter((i) => i.status === 'backlog').length;
  const totalCount = projectIssues.length;

  const totalPoints = projectIssues.reduce((acc, i) => acc + (i.storyPoints || 0), 0);
  const donePoints = projectIssues
    .filter((i) => i.status === 'done')
    .reduce((acc, i) => acc + (i.storyPoints || 0), 0);

  // Status Distribution Data
  const statusData = [
    { name: 'Done', value: doneCount, color: '#10b981' },
    { name: 'In Flight', value: inProgressCount, color: '#6366f1' },
    { name: 'To Do', value: todoCount, color: '#3b82f6' },
    { name: 'Backlog', value: backlogCount, color: '#71717a' },
  ];

  // Priority Breakdown Data
  const priorityData = [
    { name: 'Highest', count: projectIssues.filter((i) => i.priority === 'highest').length },
    { name: 'High', count: projectIssues.filter((i) => i.priority === 'high').length },
    { name: 'Medium', count: projectIssues.filter((i) => i.priority === 'medium').length },
    { name: 'Low', count: projectIssues.filter((i) => i.priority === 'low').length },
    { name: 'Lowest', count: projectIssues.filter((i) => i.priority === 'lowest').length },
  ];

  // Team Workload Distribution
  const memberWorkload = members.map((m) => {
    const assigned = projectIssues.filter((i) => i.assigneeId === m.id);
    const resolved = assigned.filter((i) => i.status === 'done').length;
    return {
      name: m.name.split(' ')[0],
      assigned: assigned.length,
      resolved,
    };
  });

  // Sprint Velocity Simulation
  const velocityData = [
    { sprint: 'Sprint 12', planned: 24, completed: 22 },
    { sprint: 'Sprint 13', planned: 30, completed: 28 },
    { sprint: 'Sprint 14', planned: 28, completed: 31 },
    { sprint: 'Sprint 15', planned: 35, completed: 33 },
    { sprint: 'Sprint 16', planned: 32, completed: donePoints },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0a0b10]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
            <span>{activeProject.name}</span>
            <span>/</span>
            <span className="text-zinc-200 font-semibold">Reports & Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Project Telemetry & Velocity</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Metrics
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Sprint burndown charts, velocity trends, team workload, and ticket completion rates.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Completion Rate</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0}%
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              {doneCount} of {totalCount} issues completed
            </p>
          </div>

          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Story Points Burnt</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400">
              {donePoints} <span className="text-sm font-normal text-zinc-400">/ {totalPoints} pts</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              {totalPoints - donePoints} story points remaining
            </p>
          </div>

          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Active In Flight</span>
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">{inProgressCount}</div>
            <p className="text-[11px] text-zinc-500 mt-1">Under development & review</p>
          </div>

          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Sprint Health</span>
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">Optimal</div>
            <p className="text-[11px] text-zinc-500 mt-1">Zero critical blockers</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Velocity Trend */}
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-1">Sprint Velocity (Points per Sprint)</h3>
            <p className="text-xs text-zinc-500 mb-4">Comparison of planned commitment vs completed velocity</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="sprint" stroke="#71717a" fontSize={11} />
                  <YAxis stroke="#71717a" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#181a28', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="planned" fill="#4338ca" name="Planned" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Member Workload */}
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-1">Team Member Workload</h3>
            <p className="text-xs text-zinc-500 mb-4">Assigned tasks vs completed resolutions per engineer</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={memberWorkload} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" stroke="#71717a" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="#71717a" fontSize={11} width={60} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#181a28', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="assigned" fill="#6366f1" name="Assigned" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="resolved" fill="#10b981" name="Resolved" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-1">Issues by Priority</h3>
            <p className="text-xs text-zinc-500 mb-4">Triage distribution across all active tickets</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={11} />
                  <YAxis stroke="#71717a" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#181a28', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-1">Issue Workflow Status Breakdown</h3>
            <p className="text-xs text-zinc-500 mb-4">Current state of tickets on the delivery conveyor</p>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#181a28', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
