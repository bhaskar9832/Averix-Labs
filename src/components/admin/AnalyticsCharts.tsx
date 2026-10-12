'use client'

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'

const COLORS = ['#6366f1', '#22d3ee', '#a78bfa', '#34d399', '#f59e0b', '#f87171']

export function AnalyticsCharts({
  sessionsPerDay,
  browserBreakdown,
  utmBreakdown,
}: {
  sessionsPerDay: { date: string; sessions: number }[]
  browserBreakdown: { name: string; value: number }[]
  utmBreakdown: { name: string; value: number }[]
}) {
  return (
    <div className="space-y-6">
      {/* Sessions over time */}
      <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-medium text-sm">Sessions over time</h3>
          <span className="text-[10px] text-white/40 uppercase tracking-wider">LAST 30 DAYS</span>
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sessionsPerDay} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#ffffff08" strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#11131A', border: '1px solid #ffffff10', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#ffffff60' }}
              />
              <Line type="monotone" dataKey="sessions" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Browser Breakdown */}
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-medium text-sm">Browser breakdown</h3>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">BY SESSIONS</span>
          </div>
          <div className="h-[200px] flex items-center gap-6">
            <PieChart width={160} height={160}>
              <Pie data={browserBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                {browserBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#11131A', border: '1px solid #ffffff10', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
            <div className="space-y-2 flex-1">
              {browserBreakdown.map((b, i) => (
                <div key={b.name} className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-white/60">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                    {b.name}
                  </span>
                  <span className="font-mono text-white/80 text-xs">{b.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* UTM Sources */}
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-medium text-sm">Traffic sources</h3>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">UTM SOURCE</span>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utmBreakdown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#ffffff08" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#11131A', border: '1px solid #ffffff10', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#ffffff60' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
