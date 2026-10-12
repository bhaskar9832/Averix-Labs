import React from 'react';
import { BlogNavbar } from '@/components/blog/BlogNavbar';

export const metadata = {
  title: 'Averix Blogs — Engineering, AI & Technology Insights',
  description: 'Cutting-edge software architecture, autonomous AI agents, distributed systems, and modern cloud insights from Averix Labs engineers and contributors.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30">
      <BlogNavbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="border-t border-zinc-900 bg-[#050609] py-10 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Averix Labs. Open engineering knowledge platform for developers worldwide.</p>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-white transition-colors">Averix Labs</a>
            <a href="/jira" className="hover:text-white transition-colors">Jira Tracker</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
