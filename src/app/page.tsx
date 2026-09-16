import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-20 overflow-x-hidden selection:bg-[#4f46e5] selection:text-white bg-[#050505]">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col px-4 border-b border-[#262626]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,_var(--tw-gradient-stops))] from-[#1e1b4b]/20 via-[#050505] to-[#050505] -z-10"></div>
        {/* Abstract circular design on right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none hidden lg:block">
           <div className="w-[600px] h-[600px] rounded-full border-[60px] border-[#4f46e5]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="inline-flex items-center rounded-full border border-[#4f46e5]/30 bg-[#4f46e5]/10 px-3 py-1 text-xs font-bold text-[#4f46e5] mb-8 uppercase tracking-widest">
            AGENCY PROFILE / 2026
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 max-w-4xl font-serif">
            Ideas made <br/>useful.
          </h1>
          <p className="text-xl md:text-2xl text-[#f8fafc] max-w-2xl mb-8 leading-relaxed">
            Digital products that connect strong engineering with a clear reason to exist.
          </p>
          <p className="text-[#94a3b8] max-w-xl text-lg leading-relaxed mb-12">
            Web platforms. AI-powered experiences. Operational systems. Carefully considered interfaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#contact"
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-3 rounded-lg transition-colors text-center w-full sm:w-auto"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <section className="py-24 border-b border-[#262626] px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">01 / WHO WE ARE</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif">
            Small team. Full product thinking.
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-3xl mb-16 leading-relaxed">
            At Averix Labs, we turn complicated ideas and everyday business processes into useful software people can actually adopt.
          </p>

          <div className="bg-[#121212] border border-[#262626] rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">OUR POSITION</div>
            <p className="text-xl md:text-3xl text-white font-serif leading-relaxed max-w-4xl">
              We combine product judgment, interface design, application engineering, and AI integration so clients can move from a sharp brief to a working system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left border-b border-[#262626] pb-16 mb-16">
            <div>
              <div className="text-5xl font-bold text-white font-serif mb-2">02</div>
              <div className="text-[#64748b] font-medium">founders</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white font-serif mb-2">05</div>
              <div className="text-[#64748b] font-medium">core examples</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white font-serif mb-2">04</div>
              <div className="text-[#64748b] font-medium">product domains</div>
            </div>
          </div>

          <div className="text-sm font-bold text-[#4f46e5] mb-8 uppercase tracking-widest">THE WAY WE WORK</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Understand first", desc: "We map users, decisions, data, and the workflow before choosing a stack." },
              { num: "02", title: "Build as one", desc: "The interface, API, data model, and operational details are designed together." },
              { num: "03", title: "Make it usable", desc: "We focus on understandable flows, maintainable code, and room to iterate." }
            ].map((step, i) => (
              <div key={i} className="bg-[#050505] border border-[#262626] rounded-2xl p-8">
                <div className="w-10 h-10 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-bold mb-6">
                  {step.num}
                </div>
                <h3 className="text-white font-bold text-xl mb-4">{step.title}</h3>
                <p className="text-[#94a3b8] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <p className="text-[#94a3b8] mt-12 max-w-3xl leading-relaxed">
            Our public and local work spans student housing, learning tools, distribution operations, cultural experiences, and cross-platform product architecture.
          </p>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 bg-[#050505] border-b border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">02 / SERVICES</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            What we can build together.
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-3xl mb-16">
            Choose a focused engagement or bring us in across the full lifecycle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "Product discovery", desc: "User journeys, priorities, feature scope, and a pragmatic roadmap.", tags: "Briefs • workflows • MVP definition" },
              { num: "02", title: "Web applications", desc: "Responsive customer portals, marketplaces, dashboards, and admin tools.", tags: "React • TypeScript • modern UI" },
              { num: "03", title: "Backend & APIs", desc: "Role-based services, business rules, integrations, and reliable data models.", tags: "Node/Express • Python/Flask • REST" },
              { num: "04", title: "AI & document tools", desc: "Document extraction, OCR, structured generation, and human-facing AI workflows.", tags: "Gemini • Tesseract • PyMuPDF" },
              { num: "05", title: "Operations software", desc: "Billing, stock, customer records, ledgers, reports, and process automation.", tags: "PostgreSQL • transactions • reporting" },
              { num: "06", title: "Experience-led sites", desc: "Distinctive interactive web experiences with content, media, and motion.", tags: "Storytelling • media • interaction" }
            ].map((srv, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 flex flex-col h-full">
                <div className="w-10 h-10 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-bold mb-6">
                  {srv.num}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{srv.title}</h3>
                <p className="text-[#94a3b8] mb-8 flex-grow">{srv.desc}</p>
                <div className="pt-4 border-t border-[#262626] text-xs font-bold text-[#4f46e5] uppercase tracking-wider">
                  {srv.tags}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENGINEERING ─── */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
           <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">03 / ENGINEERING</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            The tools follow the problem.
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-3xl mb-16">
            A practical stack, selected for the users, the product stage, and the team that will maintain it.
          </p>

          <div className="space-y-6 mb-16">
            {[
              { category: "INTERFACE", tech: "React, Vite, TypeScript, Tailwind CSS, React Native / Expo", desc: "Clear, responsive experiences across web and mobile." },
              { category: "APPLICATION", tech: "Node.js, Express, Flask, REST APIs, JWT, Zod", desc: "Business logic and secure role-aware workflows." },
              { category: "INTELLIGENCE", tech: "Gemini API, OCR, PDF extraction, AI-assisted content generation", desc: "Useful automation around documents and knowledge." },
              { category: "DATA & DELIVERY", tech: "PostgreSQL, Supabase, Docker, Git, CI workflows", desc: "Structured data, reproducible builds, and handoff-ready code." }
            ].map((stack, i) => (
              <div key={i} className="bg-[#050505] border border-[#262626] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6">
                <div className="w-1.5 h-16 bg-[#4f46e5] rounded-full hidden md:block"></div>
                <div>
                  <div className="text-xs font-bold text-[#4f46e5] mb-2 uppercase tracking-widest">{stack.category}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{stack.tech}</h3>
                  <p className="text-[#94a3b8]">{stack.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#4f46e5]/5 border border-[#4f46e5]/20 rounded-2xl p-8 md:p-10">
            <div className="text-xs font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">ENGINEERING PRINCIPLES</div>
            <p className="text-lg md:text-xl text-white leading-relaxed font-serif max-w-4xl">
              Scope deliberately. Protect user data. Validate key flows. Make important states visible. Keep the architecture understandable enough to extend.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section className="py-24 bg-[#050505] border-b border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">04 / PORTFOLIO</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            Selected product work.
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-3xl mb-16">
            These projects show range across marketplaces, AI learning, business operations, storytelling, and product systems design.
          </p>

          <div className="space-y-6">
            {[
              { name: "RENT EASY", title: "Student accommodation platform", desc: "Discovery, listings, booking requests, role-aware dashboards", tags: "Public code + project document" },
              { name: "STUDYAI / AI-TUTION", title: "Document-to-learning application", desc: "OCR, summaries, flashcards, quizzes, video recommendations", tags: "Public repositories" },
              { name: "GASFLOW", title: "LPG distribution workspace", desc: "Customers, cylinder stock, billing, payments, ledgers, reports", tags: "Local build in progress" },
              { name: "PUJAKOTHA", title: "Interactive cultural microsite", desc: "Day-led storytelling, themed visuals, music, chat interface", tags: "Public code" },
              { name: "IMME", title: "Mobile self-coaching experience", desc: "Onboarding, check-ins, life zones, activity logging, insights", tags: "App screens + design work" }
            ].map((proj, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6">
                <div className="w-1.5 h-16 bg-[#4f46e5] rounded-full hidden md:block"></div>
                <div>
                  <div className="text-xs font-bold text-[#4f46e5] mb-2 uppercase tracking-widest">{proj.name}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-[#94a3b8] mb-6">{proj.desc}</p>
                  <span className="inline-block bg-[#121212] border border-[#262626] text-[#94a3b8] text-xs font-semibold px-3 py-1 rounded-full">
                    {proj.tags}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT MODEL ─── */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">10 / ENGAGEMENT MODEL</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            Clear steps. Visible progress.
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-3xl mb-16">
            A delivery rhythm that makes the work reviewable and keeps scope connected to outcomes.
          </p>

          <div className="space-y-6">
            {[
              { num: "01", title: "Frame", desc: "Clarify the goal, users, constraints, and success criteria.", badge: "Problem brief + first scope" },
              { num: "02", title: "Shape", desc: "Map workflows, information, and the first useful release.", badge: "Flows + interface direction" },
              { num: "03", title: "Build", desc: "Implement the UI, application logic, integrations, and data model.", badge: "Working increments" },
              { num: "04", title: "Validate", desc: "Review key user paths and business rules with real examples.", badge: "Fixes + acceptance review" },
              { num: "05", title: "Handoff", desc: "Document setup, decisions, and next improvements.", badge: "Usable product + roadmap" }
            ].map((step, i) => (
              <div key={i} className="bg-[#050505] border border-[#262626] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#121212] border border-[#262626] text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-[#94a3b8]">{step.desc}</p>
                </div>
                <div className="mt-4 md:mt-0">
                   <span className="inline-block bg-[#4f46e5]/10 text-[#4f46e5] text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap">
                    {step.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section id="about" className="py-24 bg-[#050505] border-b border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">11 / TEAM</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            The people behind the work.
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-3xl mb-16">
            Two complementary engineering backgrounds, with a shared interest in products that solve real problems.
          </p>

          <div className="grid grid-cols-1 gap-8">
            {siteConfig.team.map((member, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-10">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-[#121212] border border-[#262626] overflow-hidden relative flex-shrink-0">
                  {/* Colored images - removed mix-blend-luminosity */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold font-serif">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {member.image && (
                    <Image src={member.image} alt={member.name} fill className="object-cover relative z-10" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-xs font-bold text-[#4f46e5] mb-2 uppercase tracking-widest">{member.name.toUpperCase()}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{member.role}</h3>
                  <p className="text-[#94a3b8] text-lg leading-relaxed mb-8 max-w-3xl">
                    {member.description}
                  </p>
                  <div>
                    <a href="#" className="text-sm font-bold text-[#4f46e5] hover:text-white underline underline-offset-4 transition-colors">
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
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 bg-[#0a0a0a] border-b border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">12 / NEXT STEP</div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif leading-tight">
                Let&apos;s turn your idea into a working product.
              </h2>
              <p className="text-[#94a3b8] text-xl leading-relaxed mb-12">
                Bring us a workflow that needs fixing, a product you want to launch, or a system you want to make smarter. We can help define the first useful release and build from there.
              </p>

              <div className="bg-[#121212] border border-[#262626] rounded-2xl p-8 mb-12">
                 <div className="text-xs font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">START WITH A SHORT BRIEF</div>
                 <p className="text-white text-lg">
                   What problem are you solving? Who uses it? What exists today? What would a successful first release make possible?
                 </p>
              </div>
              
              <div className="mb-12">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-2xl md:text-3xl font-bold text-[#4f46e5] hover:text-white underline underline-offset-8 transition-colors break-all"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex gap-8">
                 <a href={siteConfig.links.github} className="text-sm font-bold text-white hover:text-[#4f46e5] underline underline-offset-4 transition-colors">
                   Sourav on GitHub
                 </a>
                 <a href={siteConfig.links.github} className="text-sm font-bold text-white hover:text-[#4f46e5] underline underline-offset-4 transition-colors">
                   Bhaskar on GitHub
                 </a>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
