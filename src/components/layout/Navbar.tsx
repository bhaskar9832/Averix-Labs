"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoImg from "../../../public/images/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Meet Our Team", href: "/team" },
  { name: "Results", href: "/results" },
  { name: "Blogs", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-3 xl:gap-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={logoImg}
              alt={siteConfig.name}
              width={200}
              height={56}
              className="h-auto w-36 sm:w-40 theme-logo"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-5 whitespace-nowrap">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex shrink-0 items-center gap-3 whitespace-nowrap">
            <ThemeToggle compact />
             <Link
              href="/jira"
              className="bg-secondary/80 hover:bg-secondary text-link hover:text-link border border-border/80 text-sm font-semibold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
              <span>Jira Workspace</span>
            </Link>
             <Link
              href="/contact"
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 xl:hidden">
            <ThemeToggle compact />
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-foreground p-2"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-navigation" className="xl:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto bg-card border-b border-border shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <Link
                href="/jira"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-secondary hover:bg-secondary text-link font-semibold px-4 py-3 rounded-lg transition-colors border border-border"
              >
                Launch Jira Workspace
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-4 py-3 rounded-lg transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
