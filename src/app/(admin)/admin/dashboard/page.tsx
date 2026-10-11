export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your website traffic and leads.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-1">Total Visitors</p>
          <p className="text-3xl font-bold text-foreground">0</p>
          <p className="text-xs text-muted-foreground mt-2">Awaiting analytics integration</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-1">Total Leads</p>
          <p className="text-3xl font-bold text-foreground">0</p>
          <p className="text-xs text-muted-foreground mt-2">Lead reporting not configured</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm font-medium mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-foreground">0.0%</p>
          <p className="text-xs text-muted-foreground mt-2">Awaiting data</p>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-xl p-6 h-96 flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Inquiries are stored in Aiven. Dashboard reporting is not configured.</p>
      </div>
    </div>
  );
}
