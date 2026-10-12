'use client';

import React, { useEffect, useState } from 'react';
import { 
  GitBranch, GitCommit, GitPullRequest, AlertCircle, 
  ExternalLink, Star, Eye, RefreshCw, ShieldCheck, 
  Code2, Users, Database, Layers, ArrowUpRight, GitFork,
  Activity, Clock, FolderGit2
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, Legend, CartesianGrid, AreaChart, Area 
} from 'recharts';

interface OrgMonitoringData {
  configured: boolean;
  message?: string;
  error?: string;
  account?: {
    login: string;
    name: string;
    avatarUrl: string;
    bio?: string;
    htmlUrl: string;
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
    updatedAt: string;
  };
  summary?: {
    totalRepositories: number;
    totalStars: number;
    totalForks: number;
    totalOpenIssues: number;
    totalWatchers: number;
    totalSizeMb: string;
  };
  charts?: {
    languages: Array<{ name: string; bytes: number; percentage: number }>;
    repoBarData: Array<{ name: string; stars: number; forks: number; sizeKb: number; issues: number }>;
    eventDistribution: Array<{ name: string; count: number }>;
    commitTimeline: Array<{ date: string; commits: number }>;
  };
  repositories?: Array<{
    id: number;
    name: string;
    fullName: string;
    description: string;
    htmlUrl: string;
    isPrivate: boolean;
    stars: number;
    forks: number;
    openIssues: number;
    language: string;
    updatedAt: string;
    commits: Array<{
      sha: string;
      message: string;
      author: string;
      date: string;
      url: string;
    }>;
  }>;
  recentCommits?: Array<{
    sha: string;
    message: string;
    author: string;
    date: string;
    url: string;
    repoName: string;
  }>;
  activityFeed?: Array<{
    id: string;
    type: string;
    repoName: string;
    actor: string;
    avatar: string;
    createdAt: string;
  }>;
}

const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#3b82f6'];

export default function GitHubOrgMonitoringPage() {
  const [data, setData] = useState<OrgMonitoringData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/integrations/github');
      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.error || json.message || 'Failed to fetch GitHub monitoring telemetry');
      }
      
      setData(json);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-foreground">
        <RefreshCw className="w-8 h-8 animate-spin text-link mb-4" />
        <p className="text-sm text-muted-foreground">Scanning Averix Labs organization & all repositories...</p>
      </div>
    );
  }

  if (error || !data?.configured) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-foreground">
          <div className="flex items-center gap-3 mb-2 text-danger font-semibold">
            <AlertCircle className="w-5 h-5" />
            <span>GitHub Full Monitoring Notice</span>
          </div>
          <p className="text-foreground/70 text-sm mb-4">
            {error || data?.message || 'Unable to authenticate with GitHub API.'}
          </p>
          <button 
            onClick={fetchStats}
            className="px-4 py-2 bg-foreground/10 hover:bg-foreground/15 text-foreground rounded-lg text-xs font-semibold transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const account = data.account!;
  const summary = data.summary!;
  const charts = data.charts || {
    languages: [],
    repoBarData: [],
    eventDistribution: [],
    commitTimeline: [],
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8 text-foreground">
      {/* Header with Account Avatar & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/5">
        <div className="flex items-center gap-4">
          <img 
            src={account.avatarUrl} 
            alt={account.name} 
            className="w-14 h-14 rounded-2xl border-2 border-foreground/10 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{account.name}</h1>
              <span className="text-xs font-mono text-link bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                @{account.login}
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-success border border-emerald-500/20">
                ORGANIZATION MONITORING
              </span>
            </div>
            <p className="text-muted-foreground text-xs mt-1">
              Active tracking of all repositories, commit streams, languages, and CI/CD events.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Synced: {lastRefreshed}</span>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-xs font-medium text-foreground transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <a
            href={account.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Account Aggregate Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Repositories</span>
            <FolderGit2 className="w-4 h-4 text-link" />
          </div>
          <div className="text-2xl font-bold">{summary.totalRepositories}</div>
          <p className="text-[11px] text-muted-foreground mt-1">Under Averix Labs</p>
        </div>

        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Stars</span>
            <Star className="w-4 h-4 text-warning" />
          </div>
          <div className="text-2xl font-bold">{summary.totalStars}</div>
          <p className="text-[11px] text-muted-foreground mt-1">Across all repos</p>
        </div>

        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Forks & Network</span>
            <GitFork className="w-4 h-4 text-success" />
          </div>
          <div className="text-2xl font-bold">{summary.totalForks}</div>
          <p className="text-[11px] text-muted-foreground mt-1">Community forks</p>
        </div>

        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Open Issues</span>
            <AlertCircle className="w-4 h-4 text-danger" />
          </div>
          <div className="text-2xl font-bold">{summary.totalOpenIssues}</div>
          <p className="text-[11px] text-muted-foreground mt-1">Pending triage</p>
        </div>

        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Code Storage</span>
            <Code2 className="w-4 h-4 text-link" />
          </div>
          <div className="text-2xl font-bold">{summary.totalSizeMb} MB</div>
          <p className="text-[11px] text-muted-foreground mt-1">Total codebase volume</p>
        </div>
      </div>

      {/* Advanced Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie / Donut Chart: Tech Stack & Language Distribution */}
        <div className="bg-card border border-foreground/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Full Organization Tech Stack</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Language composition across all company codebases</p>
            </div>
            <span className="text-[10px] uppercase font-bold text-link px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">
              PIE CHART
            </span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.languages}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="percentage"
                  nameKey="name"
                  label={(entry: any) => `${entry.name} ${entry.percentage}%`}
                >
                  {charts.languages.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                  itemStyle={{ color: '#ffffff' }}
                  formatter={(val: any) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-foreground/5">
            {charts.languages.map((l, idx) => (
              <div key={l.name} className="flex items-center gap-2 text-xs">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} 
                />
                <span className="text-foreground/70">{l.name}:</span>
                <span className="font-semibold text-foreground">{l.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Repository Weight & Capacity */}
        <div className="bg-card border border-foreground/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Repository Weight Comparison</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Disk allocation and codebase size (KB) by repository</p>
            </div>
            <span className="text-[10px] uppercase font-bold text-success px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">
              BAR CHART
            </span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.repoBarData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                  itemStyle={{ color: '#ffffff' }}
                  formatter={(val: any) => [`${val} KB`, 'Size']}
                />
                <Bar dataKey="sizeKb" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-foreground/5">
            <span>Tracked: {charts.repoBarData.length} active repos</span>
            <span className="text-success font-medium">Optimal Cloud Footprint</span>
          </div>
        </div>

        {/* Audit Event Distribution Chart */}
        <div className="bg-card border border-foreground/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Audit Event Operations</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Recent GitHub API lifecycle events (Push, Create, Pull Request)</p>
            </div>
            <span className="text-[10px] uppercase font-bold text-warning px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
              EVENT BREAKDOWN
            </span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.eventDistribution} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis type="category" dataKey="name" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                  itemStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Commit Velocity Timeline */}
        <div className="bg-card border border-foreground/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Commit Velocity Stream</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Global commit cadence across all Averix Labs projects</p>
            </div>
            <span className="text-[10px] uppercase font-bold text-link px-2 py-0.5 bg-purple-500/10 rounded border border-purple-500/20">
              AREA STREAM
            </span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.commitTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis stroke="#71717a" tick={{ fontSize: 11 }} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} 
                  itemStyle={{ color: '#ffffff' }}
                />
                <Area type="monotone" dataKey="commits" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#streamGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Repositories Full List */}
      <div className="bg-card border border-foreground/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-link" />
            <h2 className="text-base font-semibold text-foreground">Monitored Organization Repositories</h2>
          </div>
          <span className="text-xs text-muted-foreground">{data.repositories?.length || 0} repositories in registry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.repositories?.map((repo) => (
            <div key={repo.id} className="p-4 bg-foreground/[0.02] border border-foreground/5 rounded-xl hover:border-foreground/10 transition">
              <div className="flex items-center justify-between mb-2">
                <a 
                  href={repo.htmlUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-semibold text-sm text-link hover:text-link flex items-center gap-1.5"
                >
                  <span>{repo.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/5 text-muted-foreground">
                  {repo.language}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {repo.description || 'No description provided.'}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-foreground/5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-warning" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-success" /> {repo.forks}
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-danger" /> {repo.openIssues}
                  </span>
                </div>
                <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Activity Stream & Recent Commits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Live Commits Feed */}
        <div className="bg-card border border-foreground/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-link" />
              <h2 className="text-base font-semibold text-foreground">Live Commit Telemetry</h2>
            </div>
            <span className="text-xs text-muted-foreground">Across all repos</span>
          </div>

          <div className="divide-y divide-foreground/5">
            {data.recentCommits?.map((commit) => (
              <div key={commit.sha} className="py-3 flex items-center justify-between hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs bg-indigo-500/10 text-link px-2 py-1 rounded border border-indigo-500/20">
                    {commit.sha}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground/90">{commit.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Repo: <span className="text-link font-mono">{commit.repoName}</span> • By {commit.author}
                    </p>
                  </div>
                </div>
                <a
                  href={commit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition p-1"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Event Stream */}
        <div className="bg-card border border-foreground/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-success" />
              <h2 className="text-base font-semibold text-foreground">Security & Audit Event Stream</h2>
            </div>
            <span className="text-xs text-muted-foreground">Real-time log</span>
          </div>

          <div className="divide-y divide-foreground/5">
            {data.activityFeed?.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.actor} className="w-6 h-6 rounded-full border border-foreground/10" />
                  <div>
                    <p className="text-xs font-medium text-foreground/90">
                      <span className="text-success font-semibold">{item.type}</span> on <span className="font-mono text-foreground/70">{item.repoName}</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Triggered by {item.actor} • {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">ID: {item.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
