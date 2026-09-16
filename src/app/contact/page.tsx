import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Start Your Project",
  description: "Get in touch with Averix Labs to discuss your software development project.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Your Project</h1>
          <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto">
            Tell us about your idea or business requirement. Our team will review and get back to you.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8 bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 h-fit">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#64748b] mb-1">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="text-[#f8fafc] hover:text-[#4f46e5] font-semibold transition-colors">{siteConfig.email}</a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#64748b] mb-1">WhatsApp</p>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="text-[#f8fafc] hover:text-[#4f46e5] font-semibold transition-colors">+91 {siteConfig.phone}</a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#64748b] mb-1">Location</p>
              <p className="text-[#f8fafc] font-medium">{siteConfig.address}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#262626]">
              <Link href="/" className="inline-flex text-sm text-[#94a3b8] hover:text-[#f8fafc] transition-colors">← Back to Home</Link>
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
