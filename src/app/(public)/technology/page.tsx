export const metadata = {
  title: "Technology — Averix Labs",
  description: "The tools follow the problem. Our practical stack selected for users, product stage, and scale.",
};

export default function TechnologyPage() {
  const stack = [
    { category: "INTERFACE", tech: "React, Vite, TypeScript, Tailwind CSS, React Native / Expo", desc: "Clear, responsive experiences across web and mobile." },
    { category: "APPLICATION", tech: "Node.js, Express, Flask, REST APIs, JWT, Zod", desc: "Business logic and secure role-aware workflows." },
    { category: "INTELLIGENCE", tech: "Gemini API, OCR, PDF extraction, AI-assisted content generation", desc: "Useful automation around documents and knowledge." },
    { category: "DATA & DELIVERY", tech: "PostgreSQL, Supabase, Docker, Git, CI workflows", desc: "Structured data, reproducible builds, and handoff-ready code." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#4f46e5] selection:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">03 / ENGINEERING</div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
          The tools follow the problem.
        </h1>
        <p className="text-xl text-[#94a3b8] max-w-3xl mb-16">
          A practical stack, selected for the users, the product stage, and the team that will maintain it. We build with reliable languages and cloud-native technologies.
        </p>

        {/* Abstract Architecture Diagram */}
        <div className="bg-[#0a0a0a] border border-[#262626] rounded-3xl p-8 mb-20 overflow-x-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 min-w-max md:min-w-0 p-4">
            {['USER', 'WEB / MOBILE', 'APPLICATION', 'API', 'BUSINESS LOGIC', 'DATABASE'].map((node, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-[#121212] border border-[#262626] text-[#f8fafc] text-xs font-bold px-4 py-2 rounded uppercase tracking-widest">
                  {node}
                </div>
                {i < 5 && (
                  <div className="text-[#4f46e5] font-bold">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {stack.map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-10 flex flex-col h-full hover:border-[#4f46e5]/40 transition-colors">
              <div className="text-xs font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">{item.category}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.tech}</h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed flex-grow">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#4f46e5]/5 border border-[#4f46e5]/20 rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <div className="text-xs font-bold text-[#4f46e5] mb-6 uppercase tracking-widest">ENGINEERING PRINCIPLES</div>
          <p className="text-2xl md:text-3xl text-white leading-relaxed font-serif">
            Scope deliberately. Protect user data. Validate key flows. Make important states visible. Keep the architecture understandable enough to extend.
          </p>
        </div>
      </div>
    </div>
  );
}
