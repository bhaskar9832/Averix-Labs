import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Custom Software & Web Application Development", "Explore custom software development, web applications, backend APIs, AI document tools and business automation services from Averix Labs.", "/solutions");

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
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#4f46e5] selection:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">02 / SERVICES</div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif">
          Custom software development services.
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-24">
          We bring our capabilities to specific, focused engagements or across the full product lifecycle to deliver scalable solutions for your business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {capabilities.map((srv, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-8 flex flex-col h-full hover:border-[#4f46e5]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-bold mb-8 text-lg">
                {srv.num}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{srv.title}</h3>
              <p className="text-muted-foreground mb-12 flex-grow text-lg leading-relaxed">{srv.desc}</p>
              <div className="pt-6 border-t border-border text-xs font-bold text-[#4f46e5] uppercase tracking-wider">
                {srv.tags}
              </div>
            </div>
          ))}
        </div>

        <section className="mb-16" aria-labelledby="project-questions">
          <h2 id="project-questions" className="text-3xl font-bold text-foreground mb-6">Planning a software project?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { question: "What types of software can you build?", answer: "We build responsive web applications, SaaS platforms, backend APIs, AI document tools and operations software. Our work includes accommodation marketplaces, learning tools, and inventory and billing workflows." },
              { question: "Can you help define an MVP?", answer: "Yes. Product discovery starts with your users, workflows and priorities. We use that brief to define the first useful release, then shape the interface and implementation plan." },
              { question: "How is the project scope decided?", answer: "Share your business goal, current process, required features and any deadline or budget constraints. We review those details together before agreeing on deliverables and an implementation approach." },
              { question: "What should I include in my inquiry?", answer: "Describe who will use the software, the problem it should solve, and any existing systems it needs to connect to. A short brief is enough to start the conversation." },
            ].map(item => <div key={item.question} className="rounded-2xl border border-border bg-card p-6"><h3 className="font-semibold text-foreground mb-3">{item.question}</h3><p className="text-muted-foreground leading-relaxed">{item.answer}</p></div>)}
          </div>
          <p className="mt-6 text-muted-foreground">Explore <Link href="/products" className="text-primary underline underline-offset-4">our software portfolio</Link> or <Link href="/contact" className="text-primary underline underline-offset-4">send us your project brief</Link>.</p>
        </section>

        <div className="bg-card border border-border rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground mb-6 font-serif">Ready to shape your workflow?</h3>
          <p className="text-muted-foreground mb-8 text-lg">Whether you need an MVP mapped out or a full application deployed, our team operates with product judgment first.</p>
          <a href="/contact" className="inline-block bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
            Start a Conversation
          </a>
        </div>
      </div>
    </div>
  );
}
