import { Metadata } from "next";
import { TeamSection } from "@/components/team/TeamSection";

export const metadata: Metadata = {
  title: "Meet Our Team — Averix Labs",
  description: "Meet the engineers and builders behind Averix Labs. Learn about our tech stack, areas of expertise, and career highlights.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#4f46e5] selection:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">
          02 / OUR TEAM
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif max-w-4xl tracking-tight">
          Meet Our Team
        </h1>
        <p className="text-lg md:text-xl text-[#94a3b8] max-w-3xl mb-16 leading-relaxed">
          The builders and engineers behind Averix Labs. Click on <span className="text-white font-medium">“More Info”</span> on any profile to explore their tech stack, career highlights, and areas of expertise.
        </p>

        {/* Team Section Component with Cards and Modal */}
        <TeamSection />

        {/* Bottom Banner */}
        <div className="bg-[#4f46e5]/5 border border-[#4f46e5]/20 rounded-3xl p-8 md:p-12 mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-3 font-serif">
            Want to collaborate with our engineers?
          </h3>
          <p className="text-[#94a3b8] max-w-2xl mx-auto mb-6 text-base">
            Whether you need scalable backend systems, data pipelines, or full product architecture, we are ready to build with you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-500/20"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
