import { Plus, Search, Filter, ArrowUpRight, Edit3, CheckCircle2, AlertTriangle } from 'lucide-react'
import { services } from '@/data/services'

export default function ContentDashboard() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Content management</h1>
          <p className="text-muted-foreground mt-1 text-sm">A structured publishing workflow for your website, docs and resources.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-card border border-foreground/5 text-foreground/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors">
            Sep 07 - Oct 05
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> New content
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Published content</p>
          <p className="text-3xl font-semibold text-foreground mb-2">{services.length + 5}</p>
          <p className="text-[10px] font-medium text-link">Across website, guides and docs</p>
        </div>
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Drafts</p>
          <p className="text-3xl font-semibold text-foreground mb-2">7</p>
          <p className="text-[10px] font-medium text-warning flex items-center gap-1">3 waiting for editorial review</p>
        </div>
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Scheduled</p>
          <p className="text-3xl font-semibold text-foreground mb-2">3</p>
          <p className="text-[10px] font-medium text-link">Next publish: Oct 08, 10:00</p>
        </div>
        <div className="bg-card border border-foreground/5 rounded-xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Content views</p>
          <p className="text-3xl font-semibold text-foreground mb-2">16,420</p>
          <p className="text-[10px] font-medium text-success flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> 18.2% over previous 30 days</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-foreground/5 mb-6 px-2">
        <button className="pb-3 text-sm font-medium text-link border-b-2 border-indigo-500">All content • {services.length + 5}</button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground/70 transition-colors">Pages</button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground/70 transition-colors">Articles</button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground/70 transition-colors">Documentation</button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground/70 transition-colors">Media library</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Table */}
        <div className="lg:col-span-2 bg-card border border-foreground/5 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-foreground/5 flex items-center justify-between">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search content" 
                  className="w-48 bg-foreground/5 border border-foreground/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-muted-foreground"
                />
              </div>
              <button className="bg-foreground/5 border border-foreground/10 text-foreground/70 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-foreground/10 transition-colors">
                Type: all
              </button>
              <button className="bg-foreground/5 border border-foreground/10 text-foreground/70 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-foreground/10 transition-colors flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> Status: all
              </button>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">SORTED BY: LAST UPDATED</span>
          </div>

          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-foreground/5 bg-foreground/[0.02]">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Owner</th>
                <th className="px-6 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {services.slice(0, 7).map((service, idx) => (
                <tr key={idx} className={`hover:bg-white/5 transition-colors cursor-pointer ${idx === 0 ? 'bg-indigo-500/5 border-l-2 border-indigo-500' : ''}`}>
                  <td className="px-6 py-4 font-medium text-foreground">{service.title} Page</td>
                  <td className="px-6 py-4 text-xs">Page</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-success text-[10px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Published</span>
                  </td>
                  <td className="px-6 py-4">Admin</td>
                  <td className="px-6 py-4 text-xs font-mono">Today, 14:12</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 border-t border-foreground/5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing 7 of {services.length + 5} entries</span>
            <div className="flex gap-4">
              <button className="hover:text-foreground transition-colors">&larr; Previous</button>
              <div className="flex gap-2">
                <span className="text-foreground">1</span>
                <button className="hover:text-foreground transition-colors">2</button>
                <button className="hover:text-foreground transition-colors">3</button>
              </div>
              <button className="hover:text-foreground transition-colors">Next &rarr;</button>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          <div className="bg-card border border-foreground/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground font-medium text-sm">Content preview</h3>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">SELECTED PAGE</span>
            </div>
            
            <div className={`rounded-lg p-6 mb-4 border border-indigo-500/20 shadow-inner bg-gradient-to-br ${services[0].color}`}>
              <p className="text-[10px] text-foreground/70 font-bold uppercase tracking-widest mb-4">SERVICE / PAGE</p>
              <h2 className="text-2xl font-bold text-foreground tracking-tight mb-2">{services[0].title}</h2>
              <p className="text-foreground/70 font-mono text-sm">/{services[0].slug} &rarr;</p>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-success border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Published
            </div>

            <h4 className="text-foreground font-medium mb-2">{services[0].title}</h4>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{services[0].desc}</p>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Slug</span>
                <span className="text-foreground font-mono text-xs">/services/{services[0].slug}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Author</span>
                <span className="text-foreground font-medium">System Admin</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Edit3 className="w-4 h-4" /> Edit content
              </button>
              <button className="flex-1 bg-foreground/5 hover:bg-foreground/10 text-foreground/70 py-2 rounded-lg text-sm font-medium transition-colors">
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
