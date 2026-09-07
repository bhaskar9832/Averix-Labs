import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={130}
                height={36}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              We build reliable digital products that help businesses turn ideas into reality.
            </p>
            <div className="flex gap-4 mt-6">
              <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {["Web Development","Mobile Apps","SaaS Platforms","Custom Software","UI/UX Design","Cloud & DevOps"].map(s => (
                <li key={s}><Link href="/#services" className="hover:text-blue-400 transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/#process" className="hover:text-blue-400 transition-colors">Our Process</Link></li>
              <li><Link href="/#projects" className="hover:text-blue-400 transition-colors">Projects</Link></li>
              <li><Link href="/#contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-blue-400 transition-colors">{siteConfig.email}</a>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
