"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoImg from "../../../public/images/logo.png";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Solutions", href: "/solutions" },
  { name: "Technology", href: "/technology" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoImg}
              alt={siteConfig.name}
              width={200}
              height={56}
              className="h-10 sm:h-14 w-auto theme-logo"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-4 lg:gap-8 items-center">
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

          <div className="flex items-center gap-3">
             <ThemeToggle />
             <Link
              href="/contact"
              className="hidden md:inline-flex bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border shadow-lg">
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
            <div className="pt-2">
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
