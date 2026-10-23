'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export function SystemCharts({ latencyData, errorData }: { latencyData: any[], errorData: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Latency Chart */}
      <div className="bg-card border border-foreground/5 rounded-xl p-6 h-[280px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-medium text-sm">Request latency - p99</h3>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">MILLISECONDS</span>
        </div>
        
        <div className="flex gap-4 mb-4 text-xs font-mono">
          <div className="bg-amber-500/10 text-warning border border-amber-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 820 ms
          </div>
          <span className="text-muted-foreground flex items-center">Baseline 125 ms • Alert &gt; 500 ms</span>
        </div>
        
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={latencyData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} dy={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="value" stroke="#fbbf24" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Error Rate Chart */}
      <div className="bg-card border border-foreground/5 rounded-xl p-6 h-[280px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-medium text-sm">Error rate - 5xx</h3>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">PERCENT OF REQUESTS</span>
        </div>
        
        <div className="flex gap-4 mb-4 text-xs font-mono">
          <div className="bg-red-500/10 text-danger border border-red-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> 2.4%
          </div>
          <span className="text-muted-foreground flex items-center">Baseline 0.01% • Alert &gt; 1%</span>
        </div>
        
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={errorData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} dy={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="value" stroke="#f87171" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
