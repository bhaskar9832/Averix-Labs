import { AlertTriangle, Server, ArrowUpRight } from 'lucide-react'
import { SystemCharts } from '@/components/admin/SystemCharts'

export default function SystemPage() {
  // Mock data for charts matching the screenshot
  const latencyData = [
    { time: '13:30', value: 120 }, { time: '13:40', value: 115 }, { time: '13:50', value: 125 },
    { time: '14:00', value: 140 }, { time: '14:10', value: 580 }, { time: '14:20', value: 810 },
    { time: '14:30', value: 820 },
  ];
  
  const errorData = [
    { time: '13:30', value: 0.1 }, { time: '13:40', value: 0.1 }, { time: '13:50', value: 0.2 },
    { time: '14:00', value: 0.1 }, { time: '14:10', value: 1.2 }, { time: '14:20', value: 2.1 },
    { time: '14:30', value: 2.4 },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System monitoring</h1>
          <p className="text-white/40 mt-1 text-sm">Production observability - us-east-1 + eu-west-1 • snapshot at 14:32 UTC.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#11131A] border border-white/5 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
            Last 60 minutes
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Open incident
          </button>
        </div>
      </div>

      {/* Ecosystem Switcher Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white font-bold">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">3-Domain Ecosystem Telemetry Available</h3>
            <p className="text-white/50 text-xs">Dedicated uptime, downtime, and server health tracking for Main Website, Averix Blogs, and Averix Jira.</p>
          </div>
        </div>
        <a 
          href="/admin/ecosystem" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>View Ecosystem Telemetry</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Healthy services</p>
          <p className="text-3xl font-semibold text-white mb-2">6 / 7</p>
          <p className="text-[10px] font-medium text-amber-400">api-gateway degraded</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5 border-l-2 border-l-amber-500">
          <p className="text-xs font-medium text-white/40 mb-2">API p99 latency</p>
          <p className="text-3xl font-semibold text-amber-400 mb-2">820 ms</p>
          <p className="text-[10px] font-medium text-white/40">Threshold 500 ms • Baseline 120 ms</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5 border-l-2 border-l-red-500">
          <p className="text-xs font-medium text-white/40 mb-2">API error rate</p>
          <p className="text-3xl font-semibold text-red-400 mb-2">2.4%</p>
          <p className="text-[10px] font-medium text-white/40">Threshold 1% • +2.3 pts</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Request throughput</p>
          <p className="text-3xl font-semibold text-white mb-2">1,284 / s</p>
          <p className="text-[10px] font-medium text-emerald-400">Within expected traffic range</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-white/5 mb-6 px-2">
        <button className="pb-3 text-sm font-medium text-indigo-400 border-b-2 border-indigo-500">Overview</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Services</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Infrastructure</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Deployments</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Logs & traces</button>
      </div>

      {/* Charts component */}
      <SystemCharts latencyData={latencyData} errorData={errorData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Service health</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">7 SERVICES • ALL REGIONS</span>
            </div>
            
            <table className="w-full text-left text-sm text-white/60">
              <thead className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5 pb-2 block mb-3">
                <tr className="flex">
                  <th className="flex-1 font-medium">Service</th>
                  <th className="w-24 font-medium">Status</th>
                  <th className="w-24 font-medium text-right">P99 Latency</th>
                  <th className="w-24 font-medium text-right">Error Rate</th>
                  <th className="w-24 font-medium text-right">Requests / s</th>
                  <th className="w-24 font-medium text-right">Version</th>
                </tr>
              </thead>
              <tbody className="space-y-2 block">
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors bg-amber-500/5 border border-amber-500/20 cursor-pointer">
                  <td className="flex-1 font-mono text-xs text-amber-400">api-gateway</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-amber-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Degraded</span>
                  </td>
                  <td className="w-24 text-right text-amber-400 font-mono text-xs">820 ms</td>
                  <td className="w-24 text-right text-red-400 font-mono text-xs">2.4%</td>
                  <td className="w-24 text-right font-mono text-xs">1,284</td>
                  <td className="w-24 text-right font-mono text-xs text-white/40">v2.33.0</td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-mono text-xs text-white">auth-service</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy</span>
                  </td>
                  <td className="w-24 text-right font-mono text-xs text-white">84 ms</td>
                  <td className="w-24 text-right font-mono text-xs text-white">0.02%</td>
                  <td className="w-24 text-right font-mono text-xs text-white">458</td>
                  <td className="w-24 text-right font-mono text-xs text-white/40">v1.18.2</td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-mono text-xs text-white">event-worker</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy</span>
                  </td>
                  <td className="w-24 text-right font-mono text-xs text-white">125 ms</td>
                  <td className="w-24 text-right font-mono text-xs text-white">0.05%</td>
                  <td className="w-24 text-right font-mono text-xs text-white">102</td>
                  <td className="w-24 text-right font-mono text-xs text-white/40">v2.4.1</td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-mono text-xs text-white">web-app</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy</span>
                  </td>
                  <td className="w-24 text-right font-mono text-xs text-white">42 ms</td>
                  <td className="w-24 text-right font-mono text-xs text-white">0.01%</td>
                  <td className="w-24 text-right font-mono text-xs text-white">312</td>
                  <td className="w-24 text-right font-mono text-xs text-white/40">v3.1.0</td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-mono text-xs text-white">billing</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy</span>
                  </td>
                  <td className="w-24 text-right font-mono text-xs text-white">215 ms</td>
                  <td className="w-24 text-right font-mono text-xs text-white">0.00%</td>
                  <td className="w-24 text-right font-mono text-xs text-white">12</td>
                  <td className="w-24 text-right font-mono text-xs text-white/40">v1.8.4</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Infrastructure</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">8 NODES • 2 REGIONS</span>
            </div>
            
            <table className="w-full text-left text-sm text-white/60">
              <thead className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5 pb-2 block mb-3">
                <tr className="flex">
                  <th className="flex-1 font-medium">Resource</th>
                  <th className="w-20 font-medium">CPU</th>
                  <th className="w-20 font-medium">Memory</th>
                  <th className="w-20 font-medium">Disk</th>
                  <th className="w-24 font-medium">Health</th>
                </tr>
              </thead>
              <tbody className="space-y-2 block mb-4">
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                  <td className="flex-1 font-mono text-xs text-white">api-prod-01</td>
                  <td className="w-20 font-mono text-xs text-amber-400">82%</td>
                  <td className="w-20 font-mono text-xs text-amber-400">78%</td>
                  <td className="w-20 font-mono text-xs text-white">42%</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy</span>
                  </td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                  <td className="flex-1 font-mono text-xs text-white">api-prod-02</td>
                  <td className="w-20 font-mono text-xs text-amber-400">76%</td>
                  <td className="w-20 font-mono text-xs text-amber-400">74%</td>
                  <td className="w-20 font-mono text-xs text-white">41%</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy</span>
                  </td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                  <td className="flex-1 font-mono text-xs text-white">worker-prod-01</td>
                  <td className="w-20 font-mono text-xs text-white">42%</td>
                  <td className="w-20 font-mono text-xs text-white">58%</td>
                  <td className="w-20 font-mono text-xs text-white">28%</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy</span>
                  </td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                  <td className="flex-1 font-mono text-xs text-white">postgres-primary</td>
                  <td className="w-20 font-mono text-xs text-white">18%</td>
                  <td className="w-20 font-mono text-xs text-white">62%</td>
                  <td className="w-20 font-mono text-xs text-white">45%</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-[10px] text-white/40 border-t border-white/5 pt-4">4 of 8 nodes shown. CPU, memory and disk are under resource thresholds.</p>
          </div>

          {/* Recent Deployments */}
          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Recent deployments</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">PRODUCTION</span>
            </div>
            
            <table className="w-full text-left text-sm text-white/60">
              <thead className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5 pb-2 block mb-3">
                <tr className="flex">
                  <th className="w-48 font-medium">Deployment</th>
                  <th className="flex-1 font-medium">Service</th>
                  <th className="w-32 font-medium">Author</th>
                  <th className="w-32 font-medium">Started</th>
                  <th className="w-32 font-medium">Result</th>
                  <th className="w-24 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="space-y-2 block mb-4">
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="w-48 font-mono text-xs text-white">v2.33.0 (792a0e)</td>
                  <td className="flex-1 font-mono text-xs">api-gateway</td>
                  <td className="w-32">Maya Chun</td>
                  <td className="w-32 font-mono text-xs">14:12 UTC</td>
                  <td className="w-32">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Success</span>
                  </td>
                  <td className="w-24 text-right text-white/40 text-xs flex justify-end items-center gap-1">Rollback <ArrowUpRight className="w-3 h-3"/></td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="w-48 font-mono text-xs text-white">v2.4.1 (6bc228)</td>
                  <td className="flex-1 font-mono text-xs">event-worker</td>
                  <td className="w-32">Noah Patel</td>
                  <td className="w-32 font-mono text-xs">11:45 UTC</td>
                  <td className="w-32">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Success</span>
                  </td>
                  <td className="w-24 text-right text-white/40 text-xs flex justify-end items-center gap-1">Details <ArrowUpRight className="w-3 h-3"/></td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="w-48 font-mono text-xs text-white">v3.0.0 (e03c68)</td>
                  <td className="flex-1 font-mono text-xs">web-app</td>
                  <td className="w-32">Maya Chun</td>
                  <td className="w-32 font-mono text-xs">Yesterday</td>
                  <td className="w-32">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Success</span>
                  </td>
                  <td className="w-24 text-right text-white/40 text-xs flex justify-end items-center gap-1">Details <ArrowUpRight className="w-3 h-3"/></td>
                </tr>
              </tbody>
            </table>
            <p className="text-[10px] text-white/40 border-t border-white/5 pt-4">Deployment computed considering post-deploy performance to registered fallback route/endpoint.</p>
          </div>
        </div>

        {/* Right side panel */}
        <div>
          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Resource utilization</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">API CLUSTER</span>
            </div>
            
            <div className="space-y-6 mb-8 border-b border-white/5 pb-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60 font-medium">CPU</span>
                  <span className="font-mono text-amber-400">80.5% - <span className="text-white/40 text-[10px]">Slack: 19%</span></span>
                </div>
                <div className="w-full bg-[#09090b] rounded-full h-1.5 border border-white/5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '80.5%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60 font-medium">Memory</span>
                  <span className="font-mono text-amber-400">76% - <span className="text-white/40 text-[10px]">Slack: 24%</span></span>
                </div>
                <div className="w-full bg-[#09090b] rounded-full h-1.5 border border-white/5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60 font-medium">Database pool</span>
                  <span className="font-mono text-white">45% - <span className="text-white/40 text-[10px]">Slack: 55%</span></span>
                </div>
                <div className="w-full bg-[#09090b] rounded-full h-1.5 border border-white/5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-white/60 leading-relaxed">
              Pool: 120 / 300 connections. Application pool limit reached, delayed deployment.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
