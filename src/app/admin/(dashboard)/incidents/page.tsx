import { AlertTriangle, Clock, Activity, ArrowUpRight, CheckCircle2, MessageSquare, PlayCircle, ShieldAlert } from 'lucide-react'
import { SystemCharts } from '@/components/admin/SystemCharts'

export default function IncidentsPage() {
  // Mock data for charts matching the screenshot
  const latencyData = [
    { time: '13:30', value: 120 }, { time: '13:40', value: 115 }, { time: '13:50', value: 125 },
    { time: '14:00', value: 140 }, { time: '14:10', value: 580 }, { time: '14:20', value: 810 },
    { time: '14:30', value: 820 },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">INC-1042 - Elevated API latency</h1>
          <p className="text-white/40 mt-1 text-sm">Incidents / INC-1042 • production • api-gateway • opened Oct 06, 14:10 UTC</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#11131A] border border-white/5 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
            Last 60 minutes
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            Update incident
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-8 text-xs font-medium">
        <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" /> SEV-2: High
        </div>
        <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Investigating
        </div>
        <div className="bg-[#11131A] border border-white/5 text-white/70 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] text-white">NP</div> Noah Patel - owner
        </div>
        <div className="bg-[#11131A] border border-white/5 text-white/70 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" /> Subscribe - 4
        </div>
        <div className="bg-[#11131A] border border-white/5 text-white/70 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5" /> Incident channel
        </div>
        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 ml-auto">
          <CheckCircle2 className="w-3.5 h-3.5" /> Resolve incident
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5 border-l-2 border-l-white/20">
          <p className="text-xs font-medium text-white/40 mb-2">Duration</p>
          <p className="text-3xl font-semibold text-white mb-2">14 min</p>
          <p className="text-[10px] font-medium text-white/40">Opened 14:10 • SLA fail in 16 min</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5 border-l-2 border-l-amber-500">
          <p className="text-xs font-medium text-white/40 mb-2">Impact</p>
          <p className="text-3xl font-semibold text-white mb-2">18%</p>
          <p className="text-[10px] font-medium text-amber-400">Requests &gt; 500ms (100k+ total)</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5 border-l-2 border-l-amber-500">
          <p className="text-xs font-medium text-white/40 mb-2">API p99 latency</p>
          <p className="text-3xl font-semibold text-white mb-2">820 ms</p>
          <p className="text-[10px] font-medium text-white/40">Alert threshold &gt; 500 ms</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5 border-l-2 border-l-red-500">
          <p className="text-xs font-medium text-white/40 mb-2">5xx error rate</p>
          <p className="text-3xl font-semibold text-white mb-2">2.4%</p>
          <p className="text-[10px] font-medium text-red-400">Affected: Query API endpoints</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-white/5 mb-6 px-2">
        <button className="pb-3 text-sm font-medium text-indigo-400 border-b-2 border-indigo-500">Investigation</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Timeline</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Related alerts • 3</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Customer impact</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Post-mortem</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Latency & change correlation</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">LAST 60 MIN • P99 MS</span>
            </div>
            
            <div className="h-[200px] mb-6">
               <SystemCharts latencyData={latencyData} errorData={[]} />
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-500 font-medium text-sm">Deployment preceded incident by 8 minutes</h4>
                <p className="text-amber-500/70 text-xs mt-1">v2.33.0 deployed 14:12 • Latency alert fired 14:20. Correlation is not yet a confirmed root cause.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium text-sm">Investigation notes</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">UPDATED 14:23</span>
            </div>
            <p className="text-sm text-white/80 font-medium mb-2">Hypothesis: application connection limit is constraining throughput</p>
            <p className="text-sm text-white/60 mb-6">Database CPU is stable at 24%. The latest change lowered pool max from 50 to 20 per replica. Queue wait time now is 610 ms; connection timeouts account for most 5xx responses.</p>
            
            <div className="flex gap-3">
              <button className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Check database health
              </button>
              <button className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Compare config diff
              </button>
            </div>
            <div className="flex gap-3 mt-3">
              <button className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5" /> Validate rollback
              </button>
              <button className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" /> Update customers
              </button>
            </div>
          </div>

          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium text-sm">Correlated error samples</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">3 OF 542 EVENTS</span>
            </div>
            
            <div className="bg-[#09090b] border border-white/5 rounded-lg p-4 font-mono text-[10px] text-red-400 mb-6 space-y-2">
              <div>[14:22:15] ERROR pool_exhaust_timeout wait=610ms</div>
              <div>[14:22:31] ERROR PGXC /v1/events status=503 seq_scan err_5</div>
              <div>[14:22:44] WARN  v2.33.0 pool=20/20 active=20 max=20</div>
            </div>

            <table className="w-full text-left text-sm text-white/60">
              <thead className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5 pb-2 block mb-3">
                <tr className="flex">
                  <th className="w-32 font-medium">Trace</th>
                  <th className="flex-1 font-medium">Route</th>
                  <th className="w-24 font-medium text-right">Duration</th>
                  <th className="w-24 font-medium text-right">Result</th>
                </tr>
              </thead>
              <tbody className="space-y-2 block mb-4">
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                  <td className="w-32 font-mono text-xs text-indigo-400">tr_729428</td>
                  <td className="flex-1 font-mono text-xs">POST /v1/events</td>
                  <td className="w-24 text-right font-mono text-xs">2,145 ms</td>
                  <td className="w-24 flex justify-end">
                    <span className="flex items-center gap-1.5 text-red-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Failed</span>
                  </td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                  <td className="w-32 font-mono text-xs text-indigo-400">tr_729482</td>
                  <td className="flex-1 font-mono text-xs">GET /v1/clients</td>
                  <td className="w-24 text-right font-mono text-xs">742 ms</td>
                  <td className="w-24 flex justify-end">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Success</span>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <button className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <ArrowUpRight className="w-3.5 h-3.5" /> Open trace explorer
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <h3 className="text-white font-medium text-sm mb-6">Response coordination</h3>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/40">Commander</span>
                <span className="text-white font-medium">Noah Patel</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Technical lead</span>
                <span className="text-white font-medium">Maya Chun</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Communications</span>
                <span className="text-white font-medium">Emma Wilson</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Affected regions</span>
                <span className="text-white font-medium">US East + EU West</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Status page</span>
                <span className="text-amber-400 font-medium">Investigating</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Next update</span>
                <span className="text-white font-mono text-xs">14:45 UTC</span>
              </div>
            </div>
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Post status update
            </button>
          </div>

          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Incident timeline</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">UTC</span>
            </div>
            
            <div className="space-y-5">
              <div className="relative pl-4 border-l border-white/10">
                <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white">Rollback prepared</p>
                  <span className="text-[10px] text-white/40 font-mono">14:25</span>
                </div>
                <p className="text-xs text-white/50 mt-1">Awaiting Maya's approval. Target: v2.32.1.</p>
              </div>
              <div className="relative pl-4 border-l border-white/10">
                <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white">Pool saturation found</p>
                  <span className="text-[10px] text-white/40 font-mono">14:23</span>
                </div>
                <p className="text-xs text-white/50 mt-1">Database metrics are ok, requests queued.</p>
              </div>
              <div className="relative pl-4 border-l border-white/10">
                <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white">Acknowledged</p>
                  <span className="text-[10px] text-white/40 font-mono">14:15</span>
                </div>
                <p className="text-xs text-white/50 mt-1">Noah Patel took ownership.</p>
              </div>
              <div className="relative pl-4 border-l border-white/10">
                <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white">Customer reports</p>
                  <span className="text-[10px] text-white/40 font-mono">14:12</span>
                </div>
                <p className="text-xs text-white/50 mt-1">Atlas Systems reported 800-900 ms responses.</p>
              </div>
              <div className="relative pl-4 border-l border-white/10">
                <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white">Incident created</p>
                  <span className="text-[10px] text-white/40 font-mono">14:10</span>
                </div>
                <p className="text-xs text-white/50 mt-1">API p99 crossed 500 ms for 5 minutes.</p>
              </div>
              <div className="relative pl-4 border-l border-white/10">
                <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white/60">Deployment completed</p>
                  <span className="text-[10px] text-white/40 font-mono">14:12</span>
                </div>
                <p className="text-xs text-white/40 mt-1">api-gateway v2.33.0 / 723vba1.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium text-sm">Runbook</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">RB-04B</span>
            </div>
            <p className="text-xs text-white/60 mb-4 leading-relaxed">
              API latency degradation. Inspect pool utilization, validate config, then canary rollback.
            </p>
            <button className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <ArrowUpRight className="w-3.5 h-3.5" /> Open runbook
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
