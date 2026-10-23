import React from 'react';
import { BlogNavbar } from '@/components/blog/BlogNavbar';

export const metadata = {
  title: 'Averix Blogs — Engineering, AI & Technology Insights',
  description: 'Cutting-edge software architecture, autonomous AI agents, distributed systems, and modern cloud insights from Averix Labs engineers and contributors.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-indigo-500/30">
      <BlogNavbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="border-t border-border bg-background py-10 text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Averix Labs. Open engineering knowledge platform for developers worldwide.</p>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-foreground transition-colors">Averix Labs</a>
            <a href="/jira" className="hover:text-foreground transition-colors">Jira Tracker</a>
            <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
