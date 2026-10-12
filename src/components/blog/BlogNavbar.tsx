'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PenSquare, Sparkles, BookOpen, Search, ArrowRight, LayoutDashboard } from 'lucide-react';

export function BlogNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#07080c]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/blog" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Averix Labs"
              width={160}
              height={44}
              className="h-8 w-auto brightness-0 invert object-contain transition-opacity group-hover:opacity-90"
              priority
            />
            <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block" />
            <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded text-[11px] font-bold text-indigo-400 font-mono tracking-wider">
              <span>BLOGS</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-zinc-400">
            <Link 
              href="/blog" 
              className={`hover:text-white transition-colors ${pathname === '/blog' ? 'text-white' : ''}`}
            >
              Latest Articles
            </Link>
            <Link 
              href="/blog?category=Artificial Intelligence" 
              className="hover:text-white transition-colors"
            >
              AI & Agents
            </Link>
            <Link 
              href="/blog?category=Web Engineering" 
              className="hover:text-white transition-colors"
            >
              Web Engineering
            </Link>
            <Link 
              href="/blog?category=Cloud & DevOps" 
              className="hover:text-white transition-colors"
            >
              Cloud & Infra
            </Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/jira"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-800"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Jira Tracker</span>
          </Link>

          <Link
            href="/"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <span>Averix Home</span>
          </Link>

          <Link
            href="/blog/new"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Write Article</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
