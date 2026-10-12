'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export function DashboardCharts({ performanceData }: { performanceData: any[] }) {
  // If no data provided, we mock the line chart to match the screenshot
  const data = performanceData && performanceData.length > 0 ? performanceData : [
    { date: 'Sep 07', value: 42000, prev: 38000 },
    { date: 'Sep 11', value: 41000, prev: 39000 },
    { date: 'Sep 14', value: 48000, prev: 40000 },
    { date: 'Sep 17', value: 51000, prev: 42000 },
    { date: 'Sep 20', value: 49000, prev: 43000 },
    { date: 'Sep 23', value: 55000, prev: 44000 },
    { date: 'Sep 26', value: 58000, prev: 45000 },
    { date: 'Sep 29', value: 54000, prev: 45500 },
    { date: 'Oct 02', value: 62000, prev: 46000 },
    { date: 'Oct 05', value: 68000, prev: 48000 },
    { date: 'Oct 08', value: 65000, prev: 49000 },
  ];

  return (
    <div className="bg-card border border-foreground/5 rounded-xl p-6 h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-foreground font-medium">Business performance</h3>
        <span className="text-xs text-muted-foreground">30 DAYS • USD</span>
      </div>
      
      <div className="flex items-center gap-12 mb-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Total revenue</p>
          <p className="text-lg font-medium text-foreground">$68,430</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Commission</p>
          <p className="text-lg font-medium text-foreground">$1,120</p>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} dy={10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#818cf8' }} />
            <Line type="monotone" dataKey="prev" stroke="var(--border)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-indigo-400"></div>
          <span className="text-xs text-muted-foreground">Current period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-foreground/20 border border-foreground/20 border-dashed"></div>
          <span className="text-xs text-muted-foreground">Previous period</span>
        </div>
      </div>
    </div>
  )
}
