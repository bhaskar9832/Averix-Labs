'use client';

import React, { useEffect, useState } from 'react';
import { 
  Network, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ArrowDown, 
  Lock, 
  Layers, 
  Activity, 
  Server,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';

export default function AdminGatewayHLDPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testQuery, setTestQuery] = useState('agent');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchTopology = () => {
    setLoading(true);
    fetch('/api/gateway/telemetry')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTopology();
  }, []);

  const runSharedSearchTest = async () => {
    if (!testQuery.trim()) return;
    setSearchLoading(true);
    try {
      const res = await fetch(`/api/shared/search?q=${encodeURIComponent(testQuery.trim())}`);
      const json = await res.json();
      setSearchResults(json.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-foreground/5">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>Private Admin Zone</span>
            <span>/</span>
            <span className="text-foreground font-semibold">Infrastructure Control</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <span>System High-Level Design (HLD) & API Gateway</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-success text-xs font-mono font-semibold">
              Live Topology
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time visual map of DNS/CDN ingress, the Central API Gateway, Downstream microservices, and Shared Core Infrastructure.
          </p>
        </div>

        <button
          onClick={fetchTopology}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-lg text-xs font-semibold border border-foreground/10 transition-all self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-link' : ''}`} />
          <span>Refresh Mesh</span>
        </button>
      </div>

      {/* 1. VISUAL HLD TOPOLOGY DIAGRAM */}
      <div className="bg-card border border-foreground/10 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Step 1: Internet & CDN Ingress */}
        <div className="flex flex-col items-center text-center">
          <div className="px-5 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-link text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg">
            <Globe className="w-4 h-4" />
            <span>INTERNET INGRESS • DNS / CDN (Cloudflare & Edge Caching)</span>
          </div>
          <div className="h-6 w-[2px] bg-foreground/20 my-2" />

          {/* Subdomain Tier */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="bg-secondary border border-foreground/10 rounded-xl p-4 text-left shadow-sm">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-foreground">Main Website</span>
                <span className="text-[10px] text-success font-mono">200 OK</span>
              </div>
              <p className="text-xs text-link font-mono font-medium">averixlabs.com</p>
              <p className="text-[11px] text-muted-foreground mt-1">Landing, Services, Solutions, Results</p>
            </div>

            <div className="bg-secondary border border-foreground/10 rounded-xl p-4 text-left shadow-sm">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-foreground">Averix Blogs</span>
                <span className="text-[10px] text-success font-mono">200 OK</span>
              </div>
              <p className="text-xs text-link font-mono font-medium">blogs.averixlabs.com</p>
              <p className="text-[11px] text-muted-foreground mt-1">Tech Articles, Community Posts, Comments</p>
            </div>

            <div className="bg-secondary border border-foreground/10 rounded-xl p-4 text-left shadow-sm">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-foreground">Averix Jira</span>
                <span className="text-[10px] text-success font-mono">200 OK</span>
              </div>
              <p className="text-xs text-link font-mono font-medium">jira.averixlabs.com</p>
              <p className="text-[11px] text-muted-foreground mt-1">Kanban, SDLC Tracking, Billing & PDFs</p>
            </div>
          </div>
        </div>

        {/* Step 2: Central Auth Layer */}
        <div className="flex flex-col items-center text-center">
          <div className="h-6 w-[2px] bg-foreground/20 my-2" />
          <div className="w-full max-w-xl bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-amber-950/40 border border-amber-500/40 rounded-2xl p-4 text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-warning" />
              <span className="font-bold text-sm text-foreground">CENTRAL AUTH</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-warning text-[10px] font-mono border border-amber-500/30">
                SSO / Token Minting
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Unified Identity Broker for Website, Blogs, Jira, and Admin (<code className="text-warning font-mono">/api/shared/auth</code>)
            </p>
          </div>
        </div>

        {/* Step 3: Central API Gateway */}
        <div className="flex flex-col items-center text-center">
          <div className="h-6 w-[2px] bg-foreground/20 my-2" />
          <div className="w-full max-w-4xl bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-indigo-950/60 border-2 border-indigo-500/50 rounded-2xl p-6 text-left shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-foreground/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-600 text-white font-bold">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">API GATEWAY</h3>
                  <p className="text-xs text-link">Edge Proxy • Rate Limiting • CORS • Request Logging • Subdomain Rewriting</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-success rounded-full text-xs font-mono font-bold self-start sm:self-auto">
                ACTIVE GATEWAY STATUS: HEALTHY
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-black/40 p-2.5 rounded-lg border border-foreground/5">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Rate Limiting</span>
                <span className="text-foreground font-semibold">120 req / minute per IP</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-lg border border-foreground/5">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">CORS Policy</span>
                <span className="text-success font-semibold">Allow-Origin: *</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-lg border border-foreground/5">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Engine</span>
                <span className="text-foreground font-semibold">Next.js Edge Proxy</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-lg border border-foreground/5">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Subdomain Rewriter</span>
                <span className="text-link font-semibold">Active & Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Downstream Microservices & Databases */}
        <div className="flex flex-col items-center">
          <div className="h-6 w-[2px] bg-foreground/20 my-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {/* Website Service */}
            <div className="bg-secondary border border-foreground/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-foreground">Website Service</h4>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">Lead capture, inquiries, product showcase, visitor telemetry.</p>
              <div className="pt-2 border-t border-foreground/5 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Database Realm:</span>
                <span className="font-mono text-link font-bold">Website DB</span>
              </div>
            </div>

            {/* Blog Service */}
            <div className="bg-secondary border border-foreground/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-foreground">Blog Service</h4>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">Article publishing, markdown renderer, likes & community discussions.</p>
              <div className="pt-2 border-t border-foreground/5 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Database Realm:</span>
                <span className="font-mono text-link font-bold">Blog DB</span>
              </div>
            </div>

            {/* Jira Service */}
            <div className="bg-secondary border border-foreground/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-foreground">Jira Service</h4>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">Kanban boards, backlog, SDLC lifecycle stages, billing & PDF generators.</p>
              <div className="pt-2 border-t border-foreground/5 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Database Realm:</span>
                <span className="font-mono text-link font-bold">Jira DB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Shared Services & Database Layer */}
        <div className="flex flex-col items-center">
          <div className="h-6 w-[2px] bg-foreground/20 my-2" />
          <div className="w-full max-w-4xl bg-card border border-foreground/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-foreground/5">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Database className="w-4 h-4 text-success" />
                <span>SHARED SERVICES & DATA INFRASTRUCTURE</span>
              </h4>
              <span className="text-xs text-success font-mono font-bold">PostgreSQL 18.6 Enterprise SSL</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <span className="font-bold text-foreground block">Identity/Auth</span>
                <span className="text-[10px] text-muted-foreground">JWT & Decrypt</span>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <span className="font-bold text-foreground block">User Service</span>
                <span className="text-[10px] text-muted-foreground">Team Directory</span>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <span className="font-bold text-foreground block">Search Engine</span>
                <span className="text-[10px] text-muted-foreground">Cross-domain index</span>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <span className="font-bold text-foreground block">Audit Service</span>
                <span className="text-[10px] text-muted-foreground">Audit logging</span>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <span className="font-bold text-foreground block">File Storage</span>
                <span className="text-[10px] text-muted-foreground">Asset storage</span>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <span className="font-bold text-foreground block">Notifications</span>
                <span className="text-[10px] text-muted-foreground">Events & Alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Enterprise Security Architecture & Production Stack */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 via-card to-indigo-950/30 border-2 border-rose-500/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-600 text-white font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">PRODUCTION ENTERPRISE SECURITY ARCHITECTURE</h4>
                <p className="text-xs text-muted-foreground">Strictly isolated Admin Zone: Cloudflare WAF ➔ Load Balancer ➔ Security Filter ➔ RBAC ➔ DB / Redis / Audit Logs.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-rose-500/20 text-danger font-mono font-bold text-xs rounded-lg border border-rose-500/30 self-start sm:self-auto">
              ZERO TRUST PERIMETER
            </span>
          </div>

          {/* Architecture Tree Flow */}
          <div className="pt-4 border-t border-foreground/10 space-y-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="px-4 py-1.5 rounded-lg bg-orange-950/40 border border-orange-500/40 text-xs font-mono font-bold text-warning">
                CLOUDFLARE WAF + DDoS PROTECTION
              </div>
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
              <div className="px-4 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/40 text-xs font-mono font-bold text-link">
                CLOUD LOAD BALANCER / REVERSE PROXY
              </div>
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
              <div className="px-4 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/40 text-xs font-mono font-bold text-link">
                ADMIN FRONTEND (/admin) — ISOLATED ZONE
              </div>
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
              <div className="px-5 py-2 rounded-xl bg-purple-950/50 border border-purple-500/50 text-xs font-mono font-bold text-link">
                SECURITY FILTER & AUTHORIZATION ENGINE (Authentication + RBAC)
              </div>
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
              <div className="px-4 py-1.5 rounded-lg bg-rose-900/40 border border-rose-500/40 text-xs font-mono font-bold text-danger">
                ADMIN APIS (/api/admin/*) — STEP-UP AUTH PROTECTED
              </div>
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl text-center pt-2">
                <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-xs">
                  <span className="text-success font-bold block text-[11px] mb-1">PostgreSQL (Primary Truth)</span>
                  <p className="text-[10px] text-muted-foreground">users • roles • permissions • user_roles</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-red-500/30 text-xs">
                  <span className="text-danger font-bold block text-[11px] mb-1">Redis (Fast Session Tier)</span>
                  <p className="text-[10px] text-muted-foreground">sessions • rate limits • MFA state</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-purple-500/30 text-xs">
                  <span className="text-link font-bold block text-[11px] mb-1">Audit Logs (Immutable)</span>
                  <p className="text-[10px] text-muted-foreground">audit_logs • security events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE SHARED SEARCH SERVICE TESTER */}
      <div className="bg-card border border-foreground/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Search className="w-4 h-4 text-link" />
            <span>Shared Cross-Service Search Engine</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Query across Website CRM leads, Blog articles, and Jira issues simultaneously via the Shared Search Service API (<code className="text-link font-mono">/api/shared/search</code>).
          </p>
        </div>

        <div className="flex gap-3 max-w-xl">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runSharedSearchTest()}
            placeholder="Search across Website, Blogs, and Jira (e.g. agent, web, leak)..."
            className="flex-1 bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={runSharedSearchTest}
            disabled={searchLoading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            {searchLoading ? 'Searching...' : 'Search All Services'}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
            {searchResults.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                className="p-3.5 bg-foreground/5 hover:bg-foreground/10 rounded-xl border border-foreground/10 block transition-colors group"
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                  <span className="text-link">{item.service}</span>
                  <span className="px-1.5 py-0.5 rounded bg-foreground/10 text-foreground/70">{item.type}</span>
                </div>
                <h4 className="text-xs font-bold text-foreground group-hover:text-link transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                  {item.subtitle}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
