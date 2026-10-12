import { Plus, CheckCircle2, AlertTriangle, ShieldAlert, Activity, ArrowUpRight } from 'lucide-react'

export default function NotificationsDashboard() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Notifications & alert rules</h1>
          <p className="text-white/40 mt-1 text-sm">Route the right signal to the right person. Reduce noise without missing impact.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#11131A] border border-white/5 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
            Sep 07 - Oct 05
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> New alert rule
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Active alerts</p>
          <p className="text-3xl font-semibold text-white mb-2">3</p>
          <p className="text-[10px] font-medium text-amber-400">Grouped into 1 incident</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Alert rules</p>
          <p className="text-3xl font-semibold text-white mb-2">12</p>
          <p className="text-[10px] font-medium text-indigo-400">10 enabled • 2 paused</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Delivery success</p>
          <p className="text-3xl font-semibold text-white mb-2">99.8%</p>
          <p className="text-[10px] font-medium text-emerald-400">Across email, Slack and PagerDuty</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Suppressed events</p>
          <p className="text-3xl font-semibold text-white mb-2">84</p>
          <p className="text-[10px] font-medium text-white/40">Deduplicated in the last 24 hours</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-white/5 mb-6 px-2">
        <button className="pb-3 text-sm font-medium text-indigo-400 border-b-2 border-indigo-500">Notifications <span className="ml-1 bg-indigo-500/20 text-indigo-400 py-0.5 px-1.5 rounded-full text-[10px]">3 unread</span></button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Alert rules</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Routing & schedules</button>
        <button className="pb-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors">Delivery history</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Notification center</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">THEN, YOU, TEAM</span>
            </div>
            
            <table className="w-full text-left text-sm text-white/60">
              <thead className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5 pb-2 block mb-3">
                <tr className="flex">
                  <th className="flex-1 font-medium">Notification</th>
                  <th className="w-32 font-medium">Severity</th>
                  <th className="w-32 font-medium">Target</th>
                  <th className="w-24 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="space-y-2 block">
                <tr className="flex items-center bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer">
                  <td className="flex-1 font-medium text-white">API p99 above 500 ms</td>
                  <td className="w-32">
                    <span className="flex items-center gap-1.5 text-amber-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Warning</span>
                  </td>
                  <td className="w-32 text-xs font-mono">INC-1042</td>
                  <td className="w-24 text-xs">14:10</td>
                </tr>
                <tr className="flex items-center bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer">
                  <td className="flex-1 font-medium text-white">API errors above 1%</td>
                  <td className="w-32">
                    <span className="flex items-center gap-1.5 text-red-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Critical</span>
                  </td>
                  <td className="w-32 text-xs font-mono">INC-1042</td>
                  <td className="w-24 text-xs">14:09</td>
                </tr>
                <tr className="flex items-center bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer">
                  <td className="flex-1 font-medium text-white">Pool utilization above 80%</td>
                  <td className="w-32">
                    <span className="flex items-center gap-1.5 text-amber-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Warning</span>
                  </td>
                  <td className="w-32 text-xs font-mono">INC-1042</td>
                  <td className="w-24 text-xs">14:08</td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-medium text-white/70">Deployment completed</td>
                  <td className="w-32">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Success</span>
                  </td>
                  <td className="w-32 text-xs font-mono">api-gateway</td>
                  <td className="w-24 text-xs">13:30</td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-medium text-white/70">New lead: Drift Studio</td>
                  <td className="w-32">
                    <span className="flex items-center gap-1.5 text-blue-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Info</span>
                  </td>
                  <td className="w-32 text-xs">Maya Chun</td>
                  <td className="w-24 text-xs">10:45</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Alert rules</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">10 ENABLED / 12 TOTAL</span>
            </div>
            
            <table className="w-full text-left text-sm text-white/60">
              <thead className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5 pb-2 block mb-3">
                <tr className="flex">
                  <th className="flex-1 font-medium">Rule</th>
                  <th className="w-48 font-medium">Condition</th>
                  <th className="w-32 font-medium">Routes</th>
                  <th className="w-24 font-medium">State</th>
                </tr>
              </thead>
              <tbody className="space-y-2 block">
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors bg-indigo-500/5 border border-indigo-500/20 cursor-pointer">
                  <td className="flex-1 font-medium text-indigo-400">API latency</td>
                  <td className="w-48 text-xs font-mono text-white/50">p99 &gt; 500ms / 5m</td>
                  <td className="w-32 text-xs">INC-SEV2 • Slack</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span>
                  </td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-medium text-white">API error rate</td>
                  <td className="w-48 text-xs font-mono text-white/50">Err &gt; 1% / 2m</td>
                  <td className="w-32 text-xs">PagerDuty</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span>
                  </td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-medium text-white">Connection pool</td>
                  <td className="w-48 text-xs font-mono text-white/50">Usage &gt; 80% / 5m</td>
                  <td className="w-32 text-xs">On-call • Slack</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span>
                  </td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-medium text-white">CPU saturation</td>
                  <td className="w-48 text-xs font-mono text-white/50">CPU &gt; 90% / 10m</td>
                  <td className="w-32 text-xs">Slack Ops</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span>
                  </td>
                </tr>
                <tr className="flex items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                  <td className="flex-1 font-medium text-white">Disk pressure</td>
                  <td className="w-48 text-xs font-mono text-white/50">Use &gt; 85% / 10m</td>
                  <td className="w-32 text-xs">Email Admin</td>
                  <td className="w-24">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-sm">Rule configuration</h3>
              <span className="text-[10px] text-white/40 uppercase tracking-wider">API LATENCY</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
            </div>

            <div className="space-y-4 text-sm mb-8 border-b border-white/5 pb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/40">Environment</span>
                <span className="text-white font-medium">Production</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Service</span>
                <span className="text-white font-mono text-xs">api-gateway</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Signal</span>
                <span className="text-white font-mono text-xs">http.p99.latency</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Threshold</span>
                <span className="text-amber-400 font-mono text-xs">&gt; 500 ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Evaluation</span>
                <span className="text-white font-medium">5 consecutive min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Recovery</span>
                <span className="text-white font-medium">&lt; 400 ms for 3m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Severity</span>
                <span className="text-white font-medium">SEV-2</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-3">NOTIFICATION ROUTING</p>
              <p className="text-sm text-white/80 leading-relaxed">
                Primary on-call &rarr; Slack #ops-alerts &rarr; PagerDuty after 5 min
              </p>
            </div>

            <div className="mb-8">
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-3">NOISE CONTROLS</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/40">Group by</span>
                  <span className="text-white font-medium">Service + region</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">Repeat interval</span>
                  <span className="text-white font-medium">30 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">Maintenance</span>
                  <span className="text-white font-medium">Respect windows</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Save rule
              </button>
              <button className="flex-1 bg-white/5 hover:bg-white/10 text-white/70 py-2 rounded-lg text-sm font-medium transition-colors">
                Test rule
              </button>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-emerald-500 font-medium text-sm">All channels reachable</h4>
              <p className="text-emerald-500/70 text-xs mt-1">Last test 14:00 UTC. Email, Slack and PagerDuty delivery confirmed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
