import Link from "next/link";

export const metadata = {
  title: "Results — Averix Labs",
  description: "Real results. Real businesses. See how Averix Labs has helped clients grow revenue, cut costs, and dominate their markets.",
};

const stats = [
  { value: "10X", label: "Average Revenue Growth", icon: "📈", desc: "Clients see 10x business growth within 12 months of partnering with us." },
  { value: "500%", label: "Lead Generation Increase", icon: "🎯", desc: "Our digital strategies drive 5x more qualified leads to your business." },
  { value: "8.5:1", label: "Average ROAS", icon: "💰", desc: "Every rupee spent on ads returns 8.5x in revenue on average across clients." },
  { value: "65%", label: "Cost Reduction", icon: "⚡", desc: "AI automation cuts operational costs by up to 65% for our clients." },
  { value: "#1", label: "Google Rankings Achieved", icon: "🔍", desc: "We've ranked 50+ businesses on the first page of Google search results." },
  { value: "24/7", label: "AI Automation Uptime", icon: "🤖", desc: "Our AI agents never sleep — your business runs around the clock." },
];

const caseStudies = [
  {
    badge: "E-COMMERCE",
    tag: "Performance Marketing + SEO",
    title: "D2C Brand Scales from ₹2L to ₹18L Monthly Revenue",
    problem: "A direct-to-consumer brand was struggling with high ad spend and low ROAS, averaging 1.8:1 on Meta Ads with no SEO presence.",
    solution: "We restructured their Meta Ads funnel, implemented Google Shopping campaigns, and launched a full SEO content strategy targeting high-intent keywords.",
    results: [
      { metric: "9X", label: "Revenue Growth" },
      { metric: "7.2:1", label: "ROAS Achieved" },
      { metric: "340%", label: "Organic Traffic" },
    ],
    duration: "6 months",
    color: "border-orange-500/30 hover:border-orange-500/60",
    accent: "text-warning",
  },
  {
    badge: "LOCAL BUSINESS",
    tag: "Local SEO + Google My Business",
    title: "Restaurant Chain Dominates Local Search Across 5 Cities",
    problem: "A restaurant chain with 12 outlets had inconsistent Google Business profiles, missing reviews, and ranked page 3-4 for local food searches.",
    solution: "We audited and optimized all 12 GMB profiles, implemented a review generation system, and built local citation networks in each city.",
    results: [
      { metric: "Top 3", label: "Local Pack Rankings" },
      { metric: "280%", label: "More Calls" },
      { metric: "4.8★", label: "Average Rating" },
    ],
    duration: "3 months",
    color: "border-green-500/30 hover:border-green-500/60",
    accent: "text-success",
  },
  {
    badge: "SAAS STARTUP",
    tag: "Web Development + AI Integration",
    title: "SaaS Platform Launches with AI-Powered Customer Onboarding",
    problem: "A SaaS startup needed a full product — from landing page to dashboard — with an AI onboarding flow that reduced support ticket volume.",
    solution: "We built the entire product in Next.js with a Supabase backend, integrated an AI onboarding agent, and deployed a help center powered by LLMs.",
    results: [
      { metric: "0→500", label: "Users in 60 Days" },
      { metric: "70%", label: "Fewer Support Tickets" },
      { metric: "8 wks", label: "Full MVP Delivery" },
    ],
    duration: "8 weeks",
    color: "border-blue-500/30 hover:border-blue-500/60",
    accent: "text-link",
  },
  {
    badge: "REAL ESTATE",
    tag: "AI Calling Agent + CRM",
    title: "Real Estate Agency Books 3X More Site Visits with AI Caller",
    problem: "Agents were losing leads because follow-up calls happened too late. Manual calling was inconsistent and expensive to scale.",
    solution: "We deployed an AI calling agent that auto-calls every new lead within 2 minutes, qualifies them, and books site visits directly into the CRM calendar.",
    results: [
      { metric: "3X", label: "More Site Visits" },
      { metric: "2 min", label: "Lead Response Time" },
      { metric: "55%", label: "Conversion Increase" },
    ],
    duration: "4 months",
    color: "border-violet-500/30 hover:border-violet-500/60",
    accent: "text-link",
  },
  {
    badge: "HEALTHCARE",
    tag: "SEO + AEO + Web Development",
    title: "Clinic Ranks #1 on Google and Gets Featured in AI Answers",
    problem: "A multi-specialty clinic had no digital presence. Patients were finding competitors instead, and the clinic was invisible on AI search tools.",
    solution: "We built a fast, schema-rich website, executed a medical SEO strategy, and implemented AEO techniques to ensure the clinic appears in AI-generated answers.",
    results: [
      { metric: "#1", label: "Google Ranking" },
      { metric: "AI Featured", label: "In ChatGPT & Perplexity" },
      { metric: "420%", label: "New Patient Inquiries" },
    ],
    duration: "5 months",
    color: "border-teal-500/30 hover:border-teal-500/60",
    accent: "text-success",
  },
  {
    badge: "MANUFACTURING",
    tag: "PaaS + Big Applications",
    title: "Manufacturing Unit Saves ₹40L/Year with Custom ERP System",
    problem: "A mid-sized manufacturer was running operations on spreadsheets and WhatsApp. Inventory errors, billing delays, and manual reports were costing them millions.",
    solution: "We built a custom ERP platform covering inventory, billing, vendor management, and automated reporting. Integrated with their existing machines via APIs.",
    results: [
      { metric: "₹40L", label: "Annual Cost Savings" },
      { metric: "90%", label: "Fewer Manual Errors" },
      { metric: "Real-time", label: "Inventory Visibility" },
    ],
    duration: "5 months",
    color: "border-amber-500/30 hover:border-amber-500/60",
    accent: "text-warning",
  },
];

const testimonials = [
  {
    quote: "Averix Labs completely transformed our digital presence. We went from invisible online to dominating local search in just 3 months. The team understands business, not just tech.",
    name: "Rajesh Kumar",
    role: "Owner, Multi-city Restaurant Chain",
    initials: "RK",
  },
  {
    quote: "The AI calling agent they built for us changed everything. We never miss a lead now. Our conversion rate jumped 55% and we cut our sales team's follow-up time by 80%.",
    name: "Priya Mehta",
    role: "Founder, PropTech Startup",
    initials: "PM",
  },
  {
    quote: "We briefed them on a Tuesday, had a working prototype by Friday, and launched our full SaaS in 8 weeks. Genuinely incredible speed without compromising quality.",
    name: "Arjun Nair",
    role: "CTO, B2B SaaS",
    initials: "AN",
  },
];

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 selection:bg-[#4f46e5] selection:text-white">
      {/* Hero */}
      <div className="px-6 md:px-12 lg:px-20 pb-24 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">RESULTS</div>
          <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-6 font-serif leading-tight">
            Numbers don&apos;t lie.
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Real outcomes for real businesses. Every stat below comes from actual client work — no projections, no estimates, no fluff.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 md:px-12 lg:px-20 py-24 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-12 uppercase tracking-widest">KEY METRICS</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-card border border-border hover:border-[#4f46e5]/40 rounded-2xl p-8 group transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{stat.icon}</div>
                  <div className="text-5xl md:text-6xl font-bold text-[#4f46e5] font-serif mb-2">{stat.value}</div>
                  <div className="text-foreground font-bold text-lg mb-3">{stat.label}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="px-6 md:px-12 lg:px-20 py-24 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">CASE STUDIES</div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
            Deep dives into the work.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-16 leading-relaxed">
            How we helped businesses solve real problems and achieve extraordinary outcomes.
          </p>

          <div className="space-y-8">
            {caseStudies.map((cs, i) => (
              <div
                key={i}
                className={`bg-card border ${cs.color} rounded-2xl p-8 md:p-10 transition-all duration-300`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`text-xs font-bold ${cs.accent} bg-secondary border border-border px-3 py-1 rounded-full uppercase tracking-widest`}>
                    {cs.badge}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground bg-secondary border border-border px-3 py-1 rounded-full">
                    {cs.tag}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">{cs.duration}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-serif leading-snug">
                  {cs.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">THE PROBLEM</div>
                    <p className="text-muted-foreground leading-relaxed">{cs.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">THE SOLUTION</div>
                    <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                {/* Results chips */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                  {cs.results.map((r, j) => (
                    <div key={j} className="bg-secondary border border-border rounded-xl px-5 py-3 text-center">
                      <div className={`text-2xl font-bold ${cs.accent} font-serif`}>{r.metric}</div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-6 md:px-12 lg:px-20 py-24 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">TESTIMONIALS</div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-16 font-serif">
            What our clients say.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border hover:border-[#4f46e5]/30 rounded-2xl p-8 transition-all duration-300 flex flex-col">
                <div className="text-[#4f46e5] text-4xl font-serif mb-4">&ldquo;</div>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow italic">{t.quote}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-[#4f46e5]/20 border border-[#4f46e5]/30 flex items-center justify-center text-sm font-bold text-[#4f46e5]">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-foreground font-bold text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-sm font-bold text-[#4f46e5] mb-4 uppercase tracking-widest">YOUR TURN</div>
          <h2 className="text-3xl md:text-6xl font-bold text-foreground mb-6 font-serif">
            Ready to become our next success story?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Every case study above started with a single conversation. Let&apos;s have ours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-center"
            >
              Get a Free Strategy Call
            </Link>
            <Link
              href="/services"
              className="bg-transparent border border-border hover:border-[#4f46e5]/50 text-foreground font-semibold px-8 py-4 rounded-xl transition-colors text-center"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
