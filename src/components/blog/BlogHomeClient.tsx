'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog/types';
import { BlogCard } from '@/components/blog/BlogCard';
import { 
  Sparkles, 
  Search, 
  PenSquare, 
  TrendingUp, 
  Layers, 
  Code2, 
  Cpu, 
  Cloud, 
  ArrowRight,
  Flame
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Artificial Intelligence',
  'Web Engineering',
  'Cloud & DevOps',
  'System Architecture',
  'Cybersecurity',
];

export function BlogHomeClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = initialPosts.filter((post) => {
    if (selectedCategory !== 'All' && post.category !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchSummary = post.summary.toLowerCase().includes(q);
      const matchTags = post.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchTags) return false;
    }
    return true;
  });

  const featuredPost = initialPosts.find((p) => p.featured) || initialPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== (featuredPost && !search && selectedCategory === 'All' ? featuredPost.id : ''));

  return (
    <div className="flex-1 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-6 border-b border-zinc-900 bg-radial-[at_top] from-indigo-950/20 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Averix Labs Engineering & Technology Publication</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Insights on AI, Distributed Cloud, <br className="hidden sm:inline" />
            and Next-Gen Software.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Written by Averix engineers, builders, and community contributors. Practical architectures, deep dives, benchmarks, and production-tested patterns.
          </p>

          {/* Search bar & Write action */}
          <div className="pt-4 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics, agents, next.js, cloud..."
                className="w-full bg-[#11131c] border border-zinc-800 focus:border-indigo-500 focus:bg-[#161824] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-all shadow-inner"
              />
            </div>
            <Link
              href="/blog/new"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold whitespace-nowrap shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Post Article</span>
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
        {/* Featured Post Card (Show only on All without active search) */}
        {featuredPost && selectedCategory === 'All' && !search && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Featured Cover Story</span>
            </div>

            <div className="bg-[#0e1017] border border-indigo-500/30 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl shadow-indigo-950/20 group">
              <div className="lg:col-span-7 h-64 sm:h-96 relative overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-indigo-300 border border-white/10">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                    <span>{featuredPost.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>{new Date(featuredPost.publishedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-xl sm:text-3xl font-black text-white hover:text-indigo-300 transition-colors leading-tight mb-4">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-4 mb-6">
                    {featuredPost.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.authorName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{featuredPost.authorName}</h4>
                      <p className="text-[11px] text-zinc-500">{featuredPost.authorRole}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-zinc-900 mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{selectedCategory === 'All' ? 'Recent Publications' : selectedCategory}</span>
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                {regularPosts.length} posts
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {regularPosts.length === 0 && (
            <div className="py-20 text-center bg-[#0e1017] border border-dashed border-zinc-800 rounded-3xl p-8 space-y-3">
              <p className="text-sm text-zinc-400 font-medium">No articles found matching &quot;{search || selectedCategory}&quot;.</p>
              <Link
                href="/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Be the first to post an article</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
