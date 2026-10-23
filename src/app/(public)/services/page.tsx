import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata = pageMetadata("Software Development Services", "From web development to AI optimization — explore services for your business from Averix Labs.", "/services");

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#4f46e5] selection:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">
          ALL SERVICES
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-6 font-serif leading-tight">
          Everything your business <br className="hidden md:block" />
          <span className="text-[#4f46e5]">needs to grow.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-6 leading-relaxed">
          From building your digital presence to automating your entire business with AI — we cover the full spectrum so you never need to go elsewhere.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-8 mb-20 border-t border-b border-border py-8">
          {[
            { val: "15+", label: "Services" },
            { val: "50+", label: "Projects Delivered" },
            { val: "100%", label: "Client Retention" },
            { val: "24/7", label: "Support" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl font-bold text-[#4f46e5] font-serif">{s.val}</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((srv, i) => (
            <Link
              href={`/services/${srv.slug}`}
              key={i}
              className={`bg-card border border-border ${srv.border} rounded-2xl p-8 flex flex-col h-full transition-all duration-300 group relative overflow-hidden block`}
            >
              {/* Gradient glow background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${srv.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon + Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-2xl shadow-inner">
                    {srv.icon}
                  </div>
                  <span className="text-xs font-bold text-[#4f46e5] opacity-50 font-mono">{srv.num}</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-foreground">{srv.title}</h3>
                <p className="text-muted-foreground mb-8 flex-grow leading-relaxed text-sm">{srv.desc}</p>

                <div className="pt-4 border-t border-border">
                  <span className="text-xs font-semibold text-[#4f46e5] uppercase tracking-wider">{srv.tags}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#4f46e5]/10 via-card to-card border border-[#4f46e5]/30 rounded-3xl p-12 md:p-16 text-center max-w-5xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">Ready to get started?</div>
          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
            Let&apos;s build something that matters.
          </h3>
          <p className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Pick one service or hand us the full stack. We scale our involvement to match your ambition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-center"
            >
              Get a Free Strategy Call
            </Link>
            <Link
              href="/results"
              className="bg-transparent border border-border hover:border-[#4f46e5]/50 text-foreground font-semibold px-8 py-4 rounded-xl transition-colors text-center"
            >
              See Our Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
