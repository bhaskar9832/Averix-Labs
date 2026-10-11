import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";


export const metadata = pageMetadata("Contact Us for Software Development", "Discuss your web application, SaaS platform, AI tool or custom software project with Averix Labs. Contact our India-based team by email, phone or WhatsApp.", "/contact");

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Averix Labs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discuss your custom software, web application, SaaS or AI project with our India-based team. Share your idea and the business problem you want to solve.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8 bg-card border border-border rounded-2xl p-8 h-fit">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="text-foreground hover:text-[#4f46e5] font-semibold transition-colors">{siteConfig.email}</a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
              <a href={`tel:+91${siteConfig.phone}`} className="text-foreground hover:text-primary font-semibold transition-colors">+91 {siteConfig.phone}</a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">WhatsApp</p>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="text-foreground hover:text-[#4f46e5] font-semibold transition-colors">+91 {siteConfig.phone}</a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Location</p>
              <p className="text-foreground font-medium">{siteConfig.address}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-border">
              <Link href="/" className="inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Home</Link>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
