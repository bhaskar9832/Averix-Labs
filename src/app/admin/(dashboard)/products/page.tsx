import { Plus, ArrowUpRight, CheckCircle2, Activity, Edit3, Trash2, Globe } from 'lucide-react'
import { services } from '@/data/services'
import { sql } from '@/lib/db'
import Link from 'next/link'

export default async function ProductsPage() {
  const productsCount = services.length;
  let wonCustomers = 0;
  let totalLeads = 0;

  try {
    const [cRes, lRes] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM leads WHERE status = 'WON'`,
      sql`SELECT COUNT(*) as count FROM leads`,
    ]);
    wonCustomers = Number(cRes[0]?.count || 0);
    totalLeads = Number(lRes[0]?.count || 0);
  } catch (err) {
    console.error('Failed to query counts for products:', err);
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Products & Services</h1>
          <p className="text-white/40 mt-1 text-sm">Manage your catalog, live website offerings, and service routes.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/services" 
            target="_blank"
            className="bg-[#11131A] border border-white/5 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Globe className="w-4 h-4" /> View public site
          </Link>
          <Link 
            href="/contact" 
            target="_blank"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Request custom service
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Active services</p>
          <p className="text-3xl font-semibold text-white mb-2">{productsCount}</p>
          <p className="text-[10px] font-medium text-indigo-400">All live on website</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Total clients</p>
          <p className="text-3xl font-semibold text-white mb-2">{wonCustomers}</p>
          <p className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3"/> Active contracts
          </p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Service inquiries</p>
          <p className="text-3xl font-semibold text-white mb-2">{totalLeads}</p>
          <p className="text-[10px] font-medium text-indigo-400">From contact form</p>
        </div>
        <div className="bg-[#11131A] border border-white/5 rounded-xl p-5">
          <p className="text-xs font-medium text-white/40 mb-2">Conversion rate</p>
          <p className="text-3xl font-semibold text-white mb-2">
            {totalLeads > 0 ? ((wonCustomers / totalLeads) * 100).toFixed(1) + '%' : '0%'}
          </p>
          <p className="text-[10px] font-medium text-emerald-400">Leads to won deals</p>
        </div>
      </div>

      {/* Product Cards Grid from actual services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {services.map((service, idx) => (
          <div key={idx} className="bg-[#11131A] border border-white/5 rounded-xl p-6 flex flex-col hover:border-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                  <span className="text-xl">{service.icon}</span>
                </div>
                <h3 className="text-white font-medium text-lg leading-tight">{service.title}</h3>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-medium mb-3 w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live on Web
            </div>
            
            <p className="text-sm text-white/50 mb-6 flex-1 line-clamp-2">{service.desc}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Tags</span>
                <span className="text-white/70 font-mono text-[10px] truncate max-w-[150px]">{service.tags}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Public link</span>
                <Link 
                  href={`/services/${service.slug}`} 
                  target="_blank"
                  className="text-indigo-400 font-mono text-[10px] hover:underline flex items-center gap-1"
                >
                  /{service.slug} <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link 
                href={`/services/${service.slug}`} 
                target="_blank"
                className="flex-1 bg-white/5 hover:bg-white/10 text-white/70 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ArrowUpRight className="w-3.5 h-3.5" /> View public page
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
