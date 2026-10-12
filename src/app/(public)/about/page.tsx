import Image from "next/image";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About — Averix Labs",
  description: "Small team. Full product thinking.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#4f46e5] selection:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">01 / WHO WE ARE</div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif max-w-4xl">
          Small team. Full product thinking.
        </h1>
        <p className="text-xl text-[#94a3b8] max-w-3xl mb-16 leading-relaxed">
          At Averix Labs, we turn complicated ideas and everyday business processes into useful software people can actually adopt.
        </p>

        <div className="bg-[#0a0a0a] border border-[#262626] rounded-3xl p-10 md:p-16 mb-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#4f46e5]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
           <div className="text-sm font-bold text-[#4f46e5] mb-6 uppercase tracking-widest">OUR POSITION</div>
           <p className="text-2xl md:text-4xl text-white font-serif leading-relaxed max-w-5xl">
             We combine product judgment, interface design, application engineering, and AI integration so clients can move from a sharp brief to a working system.
           </p>
        </div>

        {/* The Way We Work */}
        <div className="mb-24">
          <div className="text-sm font-bold text-[#4f46e5] mb-8 uppercase tracking-widest">THE WAY WE WORK</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Understand first", desc: "We map users, decisions, data, and the workflow before choosing a stack." },
              { num: "02", title: "Build as one", desc: "The interface, API, data model, and operational details are designed together." },
              { num: "03", title: "Make it usable", desc: "We focus on understandable flows, maintainable code, and room to iterate." }
            ].map((step, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8">
                <div className="w-12 h-12 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-bold mb-6 text-xl">
                  {step.num}
                </div>
                <h3 className="text-white font-bold text-2xl mb-4">{step.title}</h3>
                <p className="text-[#94a3b8] leading-relaxed text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-sm font-bold text-[#4f46e5] mb-8 uppercase tracking-widest">11 / TEAM</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
            The people behind the work.
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-3xl mb-16">
            Two complementary engineering backgrounds, with a shared interest in products that solve real problems.
          </p>

          <div className="grid grid-cols-1 gap-12">
            {siteConfig.team.map((member, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-10">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-[#121212] border border-[#262626] overflow-hidden relative flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold font-serif">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {member.image && (
                    <Image src={member.image} alt={member.name} fill className="object-cover relative z-10" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-sm font-bold text-[#4f46e5] mb-2 uppercase tracking-widest">{member.name.toUpperCase()}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{member.role}</h3>
                  <p className="text-[#94a3b8] text-lg leading-relaxed mb-8 max-w-3xl">
                    {member.description}
                  </p>
                  <div>
                    <a href={member.github} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#4f46e5] hover:text-white underline underline-offset-4 transition-colors">
                      GitHub profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#4f46e5]/5 border border-[#4f46e5]/20 rounded-2xl p-8 mt-12 text-center">
             <p className="text-lg text-[#94a3b8] max-w-4xl mx-auto">
              A compact team means fewer handoffs and clearer communication from the first conversation through delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
