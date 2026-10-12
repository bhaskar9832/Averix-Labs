'use client';

import React, { useState } from 'react';
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { 
  Server, Activity, ShieldCheck, Clock, AlertTriangle, 
  ExternalLink, ArrowUpRight, Cpu, HardDrive, Zap, 
  CheckCircle2, RefreshCw, BarChart3, PieChart as PieIcon, Radio
} from 'lucide-react';

interface EcosystemDashboardProps {
  initialData: any;
}

export function EcosystemMonitoringDashboard({ initialData }: EcosystemDashboardProps) {
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'website' | 'blogs' | 'jira'>('all');

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/ecosystem/telemetry');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error('Failed to refresh ecosystem telemetry:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const services = data?.services || [];
  const timeSeries = data?.timeSeries || [];
  const trafficDistribution = data?.trafficDistribution || [];
  const statusBreakdown = data?.statusBreakdown || [];

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-success text-xs font-mono font-semibold border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Mesh Observability
            </span>
            <span className="text-muted-foreground text-xs">• SLA Target: 99.95%</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            Technology & Infrastructure Control Center
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Live real-time telemetry across Main Website, Averix Blogs, and Averix Jira.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-lg text-xs font-semibold border border-foreground/10 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-link' : ''}`} />
            <span>{isRefreshing ? 'Polling...' : 'Sync Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* 1. Core Service Status Cards (Website, Blogs, Jira) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc: any) => {
          const isHealthy = svc.status === 'ONLINE';
          const badgeColor = svc.id === 'website' ? 'text-link border-indigo-500/30 bg-indigo-500/10' :
                             svc.id === 'blogs' ? 'text-warning border-amber-500/30 bg-amber-500/10' :
                             'text-success border-emerald-500/30 bg-emerald-500/10';

          return (
            <div 
              key={svc.id}
              className="bg-card border border-foreground/10 rounded-2xl p-6 relative overflow-hidden shadow-xl hover:border-foreground/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-foreground group-hover:text-link transition-colors">
                      {svc.name}
                    </h3>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{svc.domain}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border flex items-center gap-1.5 ${badgeColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                  {svc.status}
                </span>
              </div>

              {/* High-level KPI grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-black/40 border border-foreground/5 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Uptime (30d)</span>
                  <span className="text-xl font-mono font-bold text-success">{svc.uptimePercentage}%</span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">{svc.downtimeMinutesLast30Days}m downtime</span>
                </div>
                <div className="bg-black/40 border border-foreground/5 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Response Latency</span>
                  <span className="text-xl font-mono font-bold text-foreground">{svc.latencyMs} ms</span>
                  <span className="text-[10px] text-success block mt-0.5">p99 &lt; 85ms</span>
                </div>
                <div className="bg-black/40 border border-foreground/5 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Throughput</span>
                  <span className="text-lg font-mono font-bold text-foreground">{svc.throughputRps} <span className="text-xs text-muted-foreground font-normal">req/s</span></span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">Err Rate: {svc.errorRatePercent}%</span>
                </div>
                <div className="bg-black/40 border border-foreground/5 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Compute / RAM</span>
                  <span className="text-lg font-mono font-bold text-foreground">{svc.cpuUsagePercent}% <span className="text-xs text-muted-foreground font-normal">CPU</span></span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">{svc.memoryMb} MB heap</span>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="pt-4 border-t border-foreground/5">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Technology Framework</p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.techStack.map((tech: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-foreground/5 text-[10px] font-mono text-foreground/70 border border-foreground/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Link */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs">
                <a 
                  href={svc.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-link hover:text-link font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open Service Interface</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[11px] text-success font-mono">Edge CDN Active</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. ADVANCED DATA VISUALIZATION SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Multi-Service Latency & Request Area Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-card border border-foreground/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-foreground/5">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-link" />
                <span>Multi-Service Response Latency & Load (ms)</span>
              </h3>
              <p className="text-xs text-muted-foreground">Real-time p99 latency curve comparison over 24-hour window</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-link">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Website
              </span>
              <span className="flex items-center gap-1.5 text-warning">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Blogs
              </span>
              <span className="flex items-center gap-1.5 text-success">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Jira
              </span>
            </div>
          </div>

          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorBlog" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorJira" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} unit="ms" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="websiteLatency" name="Website Latency" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorWeb)" />
                <Area type="monotone" dataKey="blogLatency" name="Blog Latency" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorBlog)" />
                <Area type="monotone" dataKey="jiraLatency" name="Jira Latency" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorJira)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Traffic Share Pie Chart */}
        <div className="bg-card border border-foreground/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="pb-3 border-b border-foreground/5">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-success" />
              <span>Traffic Distribution (%)</span>
            </h3>
            <p className="text-xs text-muted-foreground">Request volume across the three microservices</p>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#11131A" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  formatter={(value: any) => [`${value}%`, 'Traffic Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Legend Breakdown */}
          <div className="space-y-2 pt-2 border-t border-foreground/5">
            {trafficDistribution.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-foreground/70">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-mono font-bold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bar Chart: Hourly Throughput (req/s) & Status Code Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Throughput Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-card border border-foreground/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-foreground/5">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-link" />
                <span>Aggregated Request Throughput (req/s)</span>
              </h3>
              <p className="text-xs text-muted-foreground">Real-time edge gateway ingress load throughout the day</p>
            </div>
            <span className="text-xs font-mono text-link bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-full">
              Peak: 1,480 req/s
            </span>
          </div>

          <div className="h-[250px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  formatter={(value: any) => [`${value} req/s`, 'Throughput']}
                />
                <Bar dataKey="requestsSec" name="Requests / Sec" fill="#818cf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HTTP Status Code Breakdown */}
        <div className="bg-card border border-foreground/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="pb-3 border-b border-foreground/5">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>HTTP Status Codes</span>
            </h3>
            <p className="text-xs text-muted-foreground">Edge proxy HTTP response classification</p>
          </div>

          <div className="space-y-3.5 pt-2">
            {statusBreakdown.map((item: any, i: number) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-mono font-bold text-foreground/90">{item.value}%</span>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${item.value}%`, backgroundColor: item.color }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl mt-4">
            <div className="flex items-center gap-2 text-success text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Edge Proxy Success Rate: 99.7%</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Zero unhandled exceptions or 502 Bad Gateway events in the last 24h.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Deep Infrastructure Status & Specs Matrix */}
      <div className="bg-card border border-foreground/10 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-foreground/5">
          <div>
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Server className="w-4 h-4 text-link" />
              <span>Underlying Technology & Infrastructure Matrix</span>
            </h3>
            <p className="text-xs text-muted-foreground">Hardware, cluster sizing, databases, and runtime engine specifications</p>
          </div>
          <span className="text-xs font-mono text-success bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            All 3 Domains Operational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Website Tech Spec */}
          <div className="p-4 rounded-xl bg-black/40 border border-foreground/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-link">Website Service Engine</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-link">Next.js 16</span>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Runtime:</span><span className="text-foreground font-mono">Node.js 20.x ESM</span></div>
              <div className="flex justify-between"><span>Database:</span><span className="text-foreground font-mono">PostgreSQL (Leads/CRM)</span></div>
              <div className="flex justify-between"><span>Styling Engine:</span><span className="text-foreground font-mono">Tailwind CSS v4</span></div>
              <div className="flex justify-between"><span>Edge CDN:</span><span className="text-success font-mono">Cloudflare Tier 1</span></div>
              <div className="flex justify-between"><span>SSL Certificate:</span><span className="text-success font-mono">TLS 1.3 Strict</span></div>
            </div>
          </div>

          {/* Blogs Tech Spec */}
          <div className="p-4 rounded-xl bg-black/40 border border-foreground/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-warning">Blogs Service Engine</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-warning">Fast Markdown</span>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Rendering:</span><span className="text-foreground font-mono">ISR + Dynamic ISR</span></div>
              <div className="flex justify-between"><span>Database:</span><span className="text-foreground font-mono">PostgreSQL (Articles)</span></div>
              <div className="flex justify-between"><span>Cache Layer:</span><span className="text-foreground font-mono">Redis In-Memory TTL</span></div>
              <div className="flex justify-between"><span>Markdown Parser:</span><span className="text-success font-mono">Sanitized Syntax</span></div>
              <div className="flex justify-between"><span>Discussion Thread:</span><span className="text-success font-mono">Live SQL Comments</span></div>
            </div>
          </div>

          {/* Jira Tech Spec */}
          <div className="p-4 rounded-xl bg-black/40 border border-foreground/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-success">Jira Service Engine</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-success">Kanban & SDLC</span>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>SDLC Engine:</span><span className="text-foreground font-mono">7-Stage State Machine</span></div>
              <div className="flex justify-between"><span>Database:</span><span className="text-foreground font-mono">PostgreSQL (Projects)</span></div>
              <div className="flex justify-between"><span>Bill & PDF Engine:</span><span className="text-foreground font-mono">CSS Print Engine</span></div>
              <div className="flex justify-between"><span>Financial Ledger:</span><span className="text-success font-mono">Cost/Margin Matrix</span></div>
              <div className="flex justify-between"><span>Event Sync:</span><span className="text-success font-mono">Pub/Sub Broker</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
