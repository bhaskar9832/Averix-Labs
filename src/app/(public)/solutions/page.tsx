export const metadata = {
  title: "Solutions — Averix Labs",
  description: "Product-building capabilities covering the entire SaaS architectural spectrum.",
};

export default function SolutionsPage() {
  const capabilities = [
    { num: "01", title: "Product discovery", desc: "User journeys, priorities, feature scope, and a pragmatic roadmap.", tags: "Briefs • workflows • MVP definition" },
    { num: "02", title: "Web applications", desc: "Responsive customer portals, marketplaces, dashboards, and admin tools.", tags: "React • TypeScript • modern UI" },
    { num: "03", title: "Backend & APIs", desc: "Role-based services, business rules, integrations, and reliable data models.", tags: "Node/Express • Python/Flask • REST" },
    { num: "04", title: "AI & document tools", desc: "Document extraction, OCR, structured generation, and human-facing AI workflows.", tags: "Gemini • Tesseract • PyMuPDF" },
    { num: "05", title: "Operations software", desc: "Billing, stock, customer records, ledgers, reports, and process automation.", tags: "PostgreSQL • transactions • reporting" },
    { num: "06", title: "Experience-led sites", desc: "Distinctive interactive web experiences with content, media, and motion.", tags: "Storytelling • media • interaction" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#4f46e5] selection:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">02 / SERVICES</div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
          What we can build together.
        </h1>
        <p className="text-xl text-[#94a3b8] max-w-3xl mb-24">
          We bring our capabilities to specific, focused engagements or across the full product lifecycle to deliver scalable solutions for your business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {capabilities.map((srv, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 flex flex-col h-full hover:border-[#4f46e5]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-bold mb-8 text-lg">
                {srv.num}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{srv.title}</h3>
              <p className="text-[#94a3b8] mb-12 flex-grow text-lg leading-relaxed">{srv.desc}</p>
              <div className="pt-6 border-t border-[#262626] text-xs font-bold text-[#4f46e5] uppercase tracking-wider">
                {srv.tags}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0a0a0a] border border-[#262626] rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-6 font-serif">Ready to shape your workflow?</h3>
          <p className="text-[#94a3b8] mb-8 text-lg">Whether you need an MVP mapped out or a full application deployed, our team operates with product judgment first.</p>
          <a href="/contact" className="inline-block bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
            Start a Conversation
          </a>
        </div>
      </div>
    </div>
  );
}
