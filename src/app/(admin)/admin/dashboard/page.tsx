export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[#94a3b8] text-sm mt-1">Overview of your website traffic and leads.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6">
          <p className="text-[#64748b] text-sm font-medium mb-1">Total Visitors</p>
          <p className="text-3xl font-bold text-white">0</p>
          <p className="text-xs text-[#64748b] mt-2">Awaiting analytics integration</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6">
          <p className="text-[#64748b] text-sm font-medium mb-1">Total Leads</p>
          <p className="text-3xl font-bold text-white">0</p>
          <p className="text-xs text-[#64748b] mt-2">Awaiting Supabase integration</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6">
          <p className="text-[#64748b] text-sm font-medium mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-white">0.0%</p>
          <p className="text-xs text-[#64748b] mt-2">Awaiting data</p>
        </div>
      </div>
      
      <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6 h-96 flex flex-col items-center justify-center">
        <p className="text-[#94a3b8] mb-4">Please provide Supabase credentials to activate live data.</p>
      </div>
    </div>
  );
}
