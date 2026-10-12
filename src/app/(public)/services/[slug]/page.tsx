import { services } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#4f46e5] selection:text-white">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/services"
          className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all services
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#121212] border border-[#262626] flex items-center justify-center text-3xl shadow-inner">
            {service.icon}
          </div>
          <div className="text-sm font-bold text-[#4f46e5] uppercase tracking-widest">
            SERVICE {service.num}
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
          {service.title}
        </h1>
        <p className="text-xl md:text-2xl text-[#94a3b8] mb-12 leading-relaxed">
          {service.desc}
        </p>

        {/* Content Blocks */}
        <div className="space-y-12 mb-20">
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50`}></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <CheckCircle2 className="w-6 h-6 text-[#4f46e5]" />
              <h2 className="text-2xl font-bold text-white font-serif">What is {service.title}?</h2>
            </div>
            <p className="text-[#94a3b8] text-lg leading-relaxed relative z-10">
              {service.whatIsIt}
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#262626] rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              <h2 className="text-2xl font-bold text-white font-serif">How it improves your business</h2>
            </div>
            <p className="text-[#94a3b8] text-lg leading-relaxed">
              {service.howItImproves}
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#262626] rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-white font-serif">Scalability & Future-proofing</h2>
            </div>
            <p className="text-[#94a3b8] text-lg leading-relaxed">
              {service.scalability}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#4f46e5]/10 via-[#0a0a0a] to-[#0a0a0a] border border-[#4f46e5]/30 rounded-3xl p-10 md:p-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-6 font-serif">
            Ready to upgrade your {service.title.toLowerCase()}?
          </h3>
          <p className="text-[#94a3b8] mb-10 text-lg">
            Let's discuss how we can implement this specifically for your business model.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Get a Free Strategy Call
          </Link>
        </div>

      </div>
    </div>
  );
}
