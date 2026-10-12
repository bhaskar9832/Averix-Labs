import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import logoImg from "../../../public/images/logo.png";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={logoImg}
                alt={siteConfig.name}
                width={180}
                height={48}
                className="h-12 w-auto theme-logo"
              />
            </Link>
            <p className="max-w-sm leading-relaxed text-sm mb-6">
              Custom software development, web applications, SaaS platforms and AI tools for startups and businesses in India.
            </p>
            <div className="flex gap-4">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>

            </div>
          </div>

          {/* Averix Labs */}
          <div>
            <h3 className="text-foreground text-sm font-semibold mb-4">Averix Labs</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-foreground transition-colors">Products</Link></li>
              <li><Link href="/solutions" className="hover:text-foreground transition-colors">Solutions</Link></li>
              <li><Link href="/technology" className="hover:text-foreground transition-colors">Technology</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-foreground text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-foreground transition-colors">{siteConfig.email}</a></li>
              <li><a href={`tel:+91${siteConfig.phone}`} className="hover:text-foreground transition-colors">+91 {siteConfig.phone}</a></li>
              <li><a href={`https://wa.me/${siteConfig.whatsapp}`} className="hover:text-foreground transition-colors">WhatsApp</a></li>
              <li className="pt-2">
                <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
