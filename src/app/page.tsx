import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-20 overflow-x-hidden selection:bg-[#4f46e5] selection:text-white">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b]/40 via-[#050505] to-[#050505] -z-10"></div>
        <div className="inline-flex items-center rounded-full border border-[#4f46e5]/30 bg-[#4f46e5]/10 px-3 py-1 text-sm font-medium text-[#4f46e5] mb-8">
          BUILDING THE FUTURE OF SOFTWARE
        </div>
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl">
          We Build Software <br className="hidden md:block"/>Products That Scale.
        </h1>
        <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
          Averix Labs builds modern SaaS platforms and technology products designed to solve real-world problems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/products"
            className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-3 rounded-lg transition-colors w-full sm:w-auto"
          >
            Explore Products
          </Link>
          <Link
            href="/about"
            className="bg-[#121212] border border-[#262626] hover:bg-[#1a1a1a] text-white font-semibold px-8 py-3 rounded-lg transition-colors w-full sm:w-auto"
          >
            About Averix Labs →
          </Link>
        </div>
      </section>

      {/* ─── STATEMENT ─── */}
      <section className="py-24 border-t border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#121212] px-3 py-1 text-xs font-medium text-[#94a3b8] mb-6 uppercase tracking-widest">
            OUR FOCUS
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                We don&apos;t just build software. <br/>We build products.
              </h2>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-10 max-w-lg">
                We focus on scalable SaaS platforms and software products that simplify complex problems. We partner with product visionaries to engineer robust systems that stand the test of load and time.
              </p>
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-bold text-[#4f46e5] mb-2">100%</div>
                  <div className="text-sm text-[#64748b] uppercase tracking-wider">Quality Focused</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">SaaS</div>
                  <div className="text-sm text-[#64748b] uppercase tracking-wider">Native Architecture</div>
                </div>
              </div>
            </div>
            {/* Abstract visual replacement */}
            <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
               <div className="text-[#4f46e5] opacity-50 font-mono text-sm absolute top-4 left-4">SYSTEM // ARCHITECTURE_01</div>
               <div className="w-full max-w-sm flex flex-col gap-4">
                 <div className="h-2 w-full bg-[#262626] rounded-full overflow-hidden"><div className="h-full bg-[#4f46e5] w-1/3"></div></div>
                 <div className="h-2 w-3/4 bg-[#262626] rounded-full overflow-hidden"><div className="h-full bg-[#4f46e5] w-2/3"></div></div>
                 <div className="h-2 w-1/2 bg-[#262626] rounded-full overflow-hidden"><div className="h-full bg-[#4f46e5] w-full"></div></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS SHOWCASE ─── */}
      <section className="py-24 bg-[#050505] px-4 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#121212] px-3 py-1 text-xs font-medium text-[#4f46e5] mb-6 uppercase tracking-widest">
            OUR PRODUCTS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Software designed to solve real problems.
          </h2>
          <p className="text-[#94a3b8] mb-16">
            An ecosystem of premium platforms engineered, maintained, and grown by Averix Labs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { name: "FlowStack", status: "ACTIVE", statusColor: "text-green-400 bg-green-400/10 border-green-400/20", desc: "A heavenly modular event bus and streaming infra for webhook pipelines.", icon: "⎈" },
              { name: "DataPulse", status: "BETA", statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20", desc: "Real-time data streams and analytics storage optimized for time-series workflows.", icon: "∿" },
              { name: "ShieldAuth", status: "COMING SOON", statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20", desc: "Highly secure, distributed auth middleware for API identity providers.", icon: "⚿" },
              { name: "ScaleOps", status: "IN DEV", statusColor: "text-purple-400 bg-purple-400/10 border-purple-400/20", desc: "Automated cluster orchestrator and serverless scaling for container fleets.", icon: "⌗" }
            ].map((prod, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 hover:border-[#4f46e5]/50 transition-colors group flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-[#121212] border border-[#262626] flex items-center justify-center text-xl text-[#94a3b8] mb-6 group-hover:text-[#4f46e5] transition-colors">
                  {prod.icon}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{prod.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${prod.statusColor}`}>
                    {prod.status}
                  </span>
                </div>
                <p className="text-sm text-[#94a3b8] mb-6 flex-grow">{prod.desc}</p>
                <Link href={`/products/${prod.name.toLowerCase()}`} className="text-sm text-[#4f46e5] font-semibold hover:text-white transition-colors flex items-center gap-1">
                  Explore Product <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="py-24 bg-[#0a0a0a] border-t border-[#262626] px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#121212] px-3 py-1 text-xs font-medium text-[#4f46e5] mb-6 uppercase tracking-widest">
            CAPABILITIES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From idea to scalable product.
          </h2>
          <p className="text-[#94a3b8] mb-16">
            Our core execution framework covers the entire SaaS architectural spectrum.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "SaaS Platforms", desc: "Architecture with multi-tenancy, billing integrations, and tenant isolation baked in.", icon: "☁️" },
              { title: "AI-Powered Software", desc: "Cognitive workflows embedding large language models reliably into software solutions.", icon: "🧠" },
              { title: "Business Platforms", desc: "Bespoke ERP systems, internal tools, and core corporate touchpoints built fast.", icon: "🏢" },
              { title: "APIs & Infrastructure", desc: "Ultra-fast REST & gRPC endpoints backing developers and web/mobile platforms.", icon: "⚡" },
              { title: "Data & Analytics", desc: "Visual, real-time dashboards driving insights out of business metrics and logs.", icon: "📊" },
              { title: "Automation", desc: "Systems workflows that eliminate manual operational bottlenecks from dependencies.", icon: "⚙️" },
            ].map((cap, i) => (
              <div key={i} className="bg-[#050505] border border-[#262626] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#121212] border border-[#262626] flex items-center justify-center text-lg mb-4">
                  {cap.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{cap.title}</h3>
                <p className="text-sm text-[#94a3b8]">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="py-24 bg-[#050505] px-4 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto text-center">
           <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#121212] px-3 py-1 text-xs font-medium text-[#4f46e5] mb-6 uppercase tracking-widest">
            TECH STACK
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Engineered for scale.
          </h2>
          <p className="text-[#94a3b8] mb-16">
            We build with reliable languages and cloud-native technologies to deliver instant expansion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8">
              <h3 className="text-white font-bold mb-6">Frontend</h3>
              <ul className="space-y-4 text-[#94a3b8] text-sm">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> Next.js 15+</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> React 19</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> TypeScript</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> Tailwind CSS v4</li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8">
              <h3 className="text-white font-bold mb-6">Backend</h3>
              <ul className="space-y-4 text-[#94a3b8] text-sm">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> Node.js</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> TypeScript</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> REST APIs</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> Go</li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8">
              <h3 className="text-white font-bold mb-6">Database & Infra</h3>
              <ul className="space-y-4 text-[#94a3b8] text-sm">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> Supabase</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> PostgreSQL</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> Cloudflare Workers</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full"></span> Docker</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW WE BUILD ─── */}
      <section className="py-24 bg-[#0a0a0a] border-t border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#121212] px-3 py-1 text-xs font-medium text-[#4f46e5] mb-6 uppercase tracking-widest">
              OUR PROCESS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How we build.
            </h2>
            <p className="text-[#94a3b8]">
              A systematic engineering blueprint designed to craft fast software products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: "01", title: "Discover", desc: "Understand the problem and user constraints." },
              { num: "02", title: "Design", desc: "Design architecture, data flow & component tree." },
              { num: "03", title: "Engineer", desc: "Build highly reliable, scalable software." },
              { num: "04", title: "Launch", desc: "Deploy pipelines and watch the system serve." },
              { num: "05", title: "Improve", desc: "Continuously optimize, measure & evolve." }
            ].map((step, i) => (
              <div key={i} className="bg-[#050505] border border-[#262626] rounded-2xl p-6 relative overflow-hidden group">
                <div className="text-4xl font-bold text-[#1a1a1a] absolute top-4 right-4 group-hover:text-[#4f46e5]/10 transition-colors">
                  {step.num}
                </div>
                <h3 className="text-white font-bold mb-3 mt-8 relative z-10">{step.title}</h3>
                <p className="text-sm text-[#94a3b8] relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ─── */}
      <section className="py-24 bg-[#050505] border-t border-[#262626] px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#121212] px-3 py-1 text-xs font-medium text-[#4f46e5] mb-6 uppercase tracking-widest">
            OUR PHILOSOPHY
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technology should disappear behind the experience.
          </h2>
          <p className="text-[#94a3b8] mb-16">
            Powerful code should manifest as zero friction for the end user.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Simple", desc: "Complex operations should happen seamlessly below the surface." },
              { title: "Scalable", desc: "Our architecture lays down a foundation ready for massive growth." },
              { title: "Reliable", desc: "Resilient configuration and robust testing keep systems online." }
            ].map((principle, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8">
                <h3 className="text-white font-bold text-xl mb-3">{principle.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section id="about" className="py-24 bg-[#0a0a0a] border-t border-[#262626] px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#121212] px-3 py-1 text-xs font-medium text-[#4f46e5] mb-6 uppercase tracking-widest">
            THE TEAM
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A small team. Big ideas.
          </h2>
          <p className="text-[#94a3b8] mb-16 max-w-2xl mx-auto">
            Averix Labs is a technology organization driven by strong curiosity, robust engineering, and deep product thinking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            {siteConfig.team.map((member, i) => (
              <div key={i} className="bg-[#050505] border border-[#262626] rounded-2xl p-6 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#262626] overflow-hidden relative flex-shrink-0">
                  {/* Fallback avatar if no image */}
                  <div className="absolute inset-0 flex items-center justify-center text-[#4f46e5] text-xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  {member.image && (
                    <Image src={member.image} alt={member.name} fill className="object-cover relative z-10 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{member.name}</h3>
                  <p className="text-[#94a3b8] text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VISION CTA ─── */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center text-center px-4 border-t border-[#262626]">
        <div className="absolute inset-0 bg-[#050505] -z-10"></div>
        {/* Abstract grid lines for tech feel */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10"></div>
        
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Building the next generation of software.
          </h2>
          <p className="text-[#94a3b8] text-lg mb-10 leading-relaxed">
            Our mission is simple: To build extremely useful, secure, and globally accessible platforms that solve digital infrastructure problems.
          </p>
          <Link
            href="/about"
            className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Read Our Journey →
          </Link>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 bg-[#0a0a0a] border-t border-[#262626] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center rounded-full border border-[#262626] bg-[#121212] px-3 py-1 text-xs font-medium text-[#4f46e5] mb-6 uppercase tracking-widest">
                GET IN TOUCH
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Have an idea worth building?
              </h2>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-12">
                Let&apos;s turn it into a premium product. We answer structural SaaS and development requests promptly.
              </p>
              
              <div className="flex gap-4 mb-16">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  Get in Touch
                </a>
                <Link
                  href="/about"
                  className="bg-[#121212] border border-[#262626] hover:bg-[#1a1a1a] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  Explore Averix Labs
                </Link>
              </div>

              <div className="bg-[#050505] border border-[#262626] rounded-xl p-8">
                <h3 className="text-white font-bold mb-6">Contact Information</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="text-[#4f46e5] text-xl mt-1">✉</span>
                    <div>
                      <p className="text-[#64748b] text-xs font-semibold uppercase tracking-wider mb-1">Email</p>
                      <a href={`mailto:${siteConfig.email}`} className="text-[#f8fafc] hover:text-[#4f46e5] transition-colors">{siteConfig.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#4f46e5] text-xl mt-1">✆</span>
                    <div>
                      <p className="text-[#64748b] text-xs font-semibold uppercase tracking-wider mb-1">Phone</p>
                      <a href={`tel:+91${siteConfig.phone}`} className="text-[#f8fafc] hover:text-[#4f46e5] transition-colors">+91 {siteConfig.phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#4f46e5] text-xl mt-1">📍</span>
                    <div>
                      <p className="text-[#64748b] text-xs font-semibold uppercase tracking-wider mb-1">Location</p>
                      <p className="text-[#f8fafc]">{siteConfig.address}</p>
                    </div>
                  </li>
                </ul>
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
