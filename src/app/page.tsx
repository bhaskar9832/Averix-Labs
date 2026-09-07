import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ─── HERO ─── */}
      <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse inline-block"></span>
                Available for new projects
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Turn Your Idea Into{" "}
                <span className="text-blue-600">Powerful Software</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
                We design and develop scalable websites, mobile applications, SaaS platforms,
                and custom software solutions for businesses and startups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  Start Your Project
                </Link>
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  View Our Work
                </Link>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm pt-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                From idea to deployment — we handle the complete development process.
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-10"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-3 flex-1 bg-slate-100 h-5 rounded"></div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {["bg-blue-50","bg-indigo-50","bg-purple-50"].map((c,i) => (
                    <div key={i} className={`${c} rounded-xl p-4`}>
                      <div className="w-8 h-8 bg-white rounded-lg shadow-sm mb-2"></div>
                      <div className="h-2 bg-slate-200 rounded mb-1"></div>
                      <div className="h-4 bg-slate-300 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
                <div className="h-32 bg-slate-50 border border-slate-100 rounded-xl mb-3 flex items-end p-3 gap-2">
                  {[40,70,55,80,65,90,75].map((h,i) => (
                    <div key={i} className="flex-1 bg-blue-500 rounded-t opacity-80" style={{height:`${h}%`}}></div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl h-14 border border-slate-100"></div>
                  <div className="bg-blue-600 rounded-xl h-14"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HERO CONVERSION ELEMENT ─── */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a project in mind?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Tell us what you want to build and we&apos;ll get back to you with the next steps.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center bg-white hover:bg-blue-50 text-blue-600 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Get a Free Consultation
          </Link>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Businesses Choose Us</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon:"💻", title:"Custom-Built Solutions", desc:"Software designed around your unique business logic and goals, not templates." },
              { icon:"⚡", title:"Modern Technology", desc:"We use the latest, battle-tested stacks for performance and longevity." },
              { icon:"📞", title:"Transparent Communication", desc:"Regular updates, honest timelines, and direct access to developers." },
              { icon:"🏗️", title:"Scalable Architecture", desc:"Built to handle growth from 100 to 1,000,000 users without a rewrite." },
              { icon:"⏰", title:"On-Time Delivery", desc:"We respect deadlines and deliver milestones as promised, every time." },
              { icon:"🛡️", title:"Long-Term Support", desc:"Ongoing maintenance, monitoring, and future improvements included." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What We Build</h2>
            <p className="text-xl text-slate-500">End-to-end software development solutions tailored to your business.</p>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon:"🖥️", title:"Web Development", desc:"Business websites, SaaS platforms, dashboards, portals and custom web applications." },
              { icon:"📱", title:"Mobile App Development", desc:"Modern Android & iOS apps with scalable backend infrastructure." },
              { icon:"⚙️", title:"Custom Software", desc:"Business-specific software designed around your workflow and requirements." },
              { icon:"☁️", title:"SaaS Development", desc:"Complete SaaS products with auth, subscriptions, dashboards and cloud infra." },
              { icon:"🛒", title:"E-Commerce", desc:"Modern stores with product management, payments, orders and analytics." },
              { icon:"🎨", title:"UI/UX Design", desc:"Clean, intuitive and conversion-focused interfaces that users love." },
              { icon:"🔗", title:"Backend & APIs", desc:"Secure, scalable APIs and backend systems to power your application." },
              { icon:"🚀", title:"Cloud & Deployment", desc:"Production deployment, Docker, monitoring, CI/CD and maintenance." },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{s.desc}</p>
                <Link href="#contact" className="mt-4 text-blue-600 text-sm font-semibold hover:underline inline-flex items-center gap-1">
                  Discuss Your Requirement <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNOLOGY STACK ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Built With Modern Technology</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label:"Frontend", stack:"React.js · Next.js · TypeScript · JavaScript · Tailwind CSS" },
              { label:"Backend", stack:"Java · Spring Boot · Node.js · Express.js" },
              { label:"Database", stack:"PostgreSQL · MySQL · MongoDB · Redis · Supabase" },
              { label:"DevOps", stack:"Docker · GitHub Actions · AWS · CI/CD Pipelines" },
              { label:"Integrations", stack:"REST APIs · JWT Auth · Payments · Real-Time · Microservices" },
            ].map((t, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-colors">
                <h3 className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">{t.label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t.stack}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e40af_0%,_transparent_60%)] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From Idea to Launch</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num:"01", title:"Discovery", desc:"We understand your business, requirements, goals and target users." },
              { num:"02", title:"Planning", desc:"We define features, technology stack, architecture and development roadmap." },
              { num:"03", title:"UI/UX Design", desc:"We create the user experience and visual interface before a single line of code." },
              { num:"04", title:"Development", desc:"Our team builds the frontend, backend, database and all integrations." },
              { num:"05", title:"Testing", desc:"We test functionality, performance, security and responsiveness thoroughly." },
              { num:"06", title:"Deployment & Support", desc:"We deploy the product and provide ongoing maintenance and improvements." },
            ].map((step, i) => (
              <div key={i} className="relative border border-slate-700 bg-slate-800/60 rounded-2xl p-7 backdrop-blur-sm">
                <span className="text-6xl font-black text-slate-700 absolute top-4 right-5 select-none">{step.num}</span>
                <h3 className="text-xl font-bold mb-3 relative">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed relative">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
            >
              Let&apos;s Build Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Some Things We&apos;ve Built</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { type:"Web Application", title:"Enterprise Management Dashboard", desc:"A full-featured admin dashboard with role-based access, analytics charts, user management, and real-time data updates. Built with Next.js, Supabase, and Tailwind CSS.", tags:["Next.js","TypeScript","Supabase","Tailwind CSS"] },
              { type:"Mobile App", title:"E-Commerce Mobile Platform", desc:"A cross-platform mobile application with product catalog, cart, Razorpay payment integration, order tracking, and push notifications. Built with React Native.", tags:["React Native","Node.js","PostgreSQL","REST API"] },
            ].map((p, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="h-56 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🚀</div>
                    <span className="text-slate-500 font-medium">Case Study Coming Soon</span>
                  </div>
                </div>
                <div className="p-7">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{p.type}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">{p.title}</h3>
                  <p className="text-slate-500 mb-5 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map(t => (
                      <span key={t} className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                  <Link href="#contact" className="text-blue-600 font-semibold text-sm hover:underline inline-flex items-center gap-1">
                    Build Something Like This <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Software Solutions For Different Industries</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              We customize every solution to each client&apos;s specific business logic and requirements.
            </p>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon:"⚡", name:"Startups" },
              { icon:"🛒", name:"E-Commerce" },
              { icon:"🏥", name:"Healthcare" },
              { icon:"🎓", name:"Education" },
              { icon:"📈", name:"Finance" },
              { icon:"🚛", name:"Logistics" },
              { icon:"🏠", name:"Real Estate" },
              { icon:"💼", name:"Business Mgmt" },
              { icon:"☁️", name:"SaaS" },
              { icon:"🤖", name:"Automation" },
            ].map((ind, i) => (
              <div key={i} className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-blue-400 hover:shadow-sm transition-all">
                <span className="text-3xl mb-3">{ind.icon}</span>
                <span className="text-slate-700 font-semibold text-sm">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Technology That Helps Businesses Grow
              </h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-8"></div>
              <div className="space-y-5 text-slate-500 text-lg leading-relaxed">
                <p>
                  At {siteConfig.name}, we are a software development company focused on turning ideas and business requirements into reliable digital products.
                </p>
                <p>
                  We believe great software requires a balance of engineering quality and deep business understanding. We don&apos;t just write code — we build solutions that solve real problems.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Engineering quality as a non-negotiable standard",
                  "Clear, transparent communication at every step",
                  "Modern, scalable architecture",
                  "Long-term relationships, not one-time projects",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Team */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Meet the Team</h3>
              <p className="text-slate-500 mb-8">The engineers behind your software.</p>
              <div className="grid grid-cols-2 gap-6">
                {siteConfig.team.map((member, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h4 className="font-bold text-slate-900">{member.name}</h4>
                      <p className="text-sm text-blue-600 font-medium mt-0.5">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT / LEAD GENERATION ─── */}
      <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Have a Project in Mind?</h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-6"></div>
              <p className="text-lg text-slate-500 leading-relaxed mb-10">
                Tell us about your idea, business problem, or software requirement. Our team will review it and get in touch with you.
              </p>

              <div className="space-y-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-blue-600 font-semibold hover:underline text-base">
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">WhatsApp</p>
                  <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline text-base">
                    +91 {siteConfig.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Location</p>
                  <p className="text-slate-700 font-medium">{siteConfig.address}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  ✉️ Email Us
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20software%20development%20project.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20c25e] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="bg-blue-600 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Have an Idea? Let&apos;s Talk</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center bg-white hover:bg-blue-50 text-blue-600 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20software%20development%20project.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20c25e] text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
