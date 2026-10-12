import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-20 overflow-x-hidden selection:bg-[#4f46e5] selection:text-white bg-[#050505]">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col px-6 md:px-12 lg:px-20 border-b border-[#262626]">
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
      <section className="py-24 border-b border-[#262626] px-6 md:px-12 lg:px-20 bg-[#0a0a0a]">
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
      <section className="py-24 bg-[#050505] border-b border-[#262626] px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">02 / SERVICES</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
                Everything you need.<br />Under one roof.
              </h2>
              <p className="text-xl text-[#94a3b8] max-w-2xl">
                From building your website to AI-optimizing your entire business — 15 services, one team, zero outsourcing.
              </p>
            </div>
            <Link href="/services" className="shrink-0 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
              See All 15 Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv, i) => (
              <Link
                key={i}
                href={`/services/${srv.slug}`}
                className="bg-[#0a0a0a] border border-[#262626] hover:border-[#4f46e5]/40 rounded-xl p-5 flex items-center gap-4 group transition-all duration-200 hover:bg-[#0f0f0f]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#121212] border border-[#262626] flex items-center justify-center text-xl flex-shrink-0 group-hover:border-[#4f46e5]/30 transition-colors">
                  {srv.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold text-sm truncate group-hover:text-[#c7d2fe] transition-colors">{srv.title}</div>
                  <div className="text-[#64748b] text-xs mt-0.5 truncate">{srv.tags}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENGINEERING ─── */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#262626] px-6 md:px-12 lg:px-20">
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
              { category: "FRONTEND & MOBILE", tech: "Modern Frameworks & Native Languages", desc: "Clear, responsive experiences across web and mobile using React, Angular, Vue, Swift, Kotlin, or any framework your project demands." },
              { category: "BACKEND & API", tech: "Polyglot Application Logic", desc: "Business logic and secure workflows built in Node.js, Python, Go, Java, C#, or whatever language fits your enterprise ecosystem." },
              { category: "INTELLIGENCE & AI", tech: "Agnostic AI Integrations", desc: "Connecting your systems to the best LLMs and AI services, from OpenAI and Gemini to open-source models hosted privately." },
              { category: "DATA & INFRASTRUCTURE", tech: "Any Cloud, Any Database", desc: "Structured data and reproducible builds. We deploy on AWS, GCP, Azure, and work with SQL, NoSQL, and vector databases." }
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

      {/* ─── RESULTS PREVIEW ─── */}
      <section className="py-24 bg-[#050505] border-b border-[#262626] px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">04 / RESULTS</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
                Numbers that speak.
              </h2>
              <p className="text-xl text-[#94a3b8] max-w-2xl">
                Real outcomes from real clients. No projections. No fluff.
              </p>
            </div>
            <Link href="/results" className="shrink-0 bg-transparent border border-[#262626] hover:border-[#4f46e5]/50 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
              View Full Case Studies →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "10X", label: "Average Revenue Growth", icon: "📈" },
              { value: "500%", label: "Lead Generation Increase", icon: "🎯" },
              { value: "8.5:1", label: "Average ROAS", icon: "💰" },
              { value: "65%", label: "Cost Reduction via AI", icon: "⚡" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#262626] hover:border-[#4f46e5]/30 rounded-2xl p-6 md:p-8 text-center group transition-all duration-300">
                <div className="text-2xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-5xl font-bold text-[#4f46e5] font-serif mb-2">{stat.value}</div>
                <div className="text-[#64748b] text-xs font-medium leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Teaser case study strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { badge: "E-COMMERCE", title: "D2C Brand scales from ₹2L to ₹18L/month", metric: "9X Revenue", color: "text-orange-400" },
              { badge: "LOCAL BUSINESS", title: "Restaurant chain ranks Top 3 in Local Pack across 5 cities", metric: "280% More Calls", color: "text-green-400" },
              { badge: "SAAS", title: "Startup launches with AI onboarding and hits 500 users in 60 days", metric: "0 → 500 Users", color: "text-blue-400" },
            ].map((cs, i) => (
              <Link
                key={i}
                href="/results"
                className="bg-[#0a0a0a] border border-[#262626] hover:border-[#4f46e5]/40 rounded-xl p-6 group transition-all duration-200"
              >
                <div className={`text-xs font-bold ${cs.color} mb-3 uppercase tracking-wider`}>{cs.badge}</div>
                <p className="text-white font-semibold text-sm mb-4 group-hover:text-[#c7d2fe] transition-colors leading-snug">{cs.title}</p>
                <div className={`text-xl font-bold ${cs.color} font-serif`}>{cs.metric}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT MODEL ─── */}
      <section className="py-24 bg-[#0a0a0a] border-b border-[#262626] px-6 md:px-12 lg:px-20">
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
      <section id="about" className="py-24 bg-[#050505] border-b border-[#262626] px-6 md:px-12 lg:px-20">
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
      <section id="contact" className="py-24 bg-[#0a0a0a] border-b border-[#262626] px-6 md:px-12 lg:px-20">
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
