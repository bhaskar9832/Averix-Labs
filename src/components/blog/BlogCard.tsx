import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog/types';
import { Calendar, Clock, Heart, MessageSquare, ArrowUpRight } from 'lucide-react';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col bg-[#0e1017] hover:bg-[#121520] border border-zinc-800/80 hover:border-indigo-500/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-950/20">
      {/* Cover image */}
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="relative h-48 sm:h-52 w-full overflow-hidden block">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-indigo-300 border border-white/10">
              {post.category}
            </span>
          </div>
        </Link>
      )}

      {/* Body content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Post Title */}
          <Link href={`/blog/${post.slug}`} className="block group-hover:text-indigo-300 transition-colors">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 mb-2 flex items-start justify-between gap-2">
              <span>{post.title}</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
            </h3>
          </Link>

          {/* Summary */}
          <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
            {post.summary}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.slice(0, 3).map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-400 border border-zinc-700/50"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Author & Metrics Footer */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2.5">
            <img
              src={post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'}
              alt={post.authorName}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-700"
            />
            <div>
              <p className="font-semibold text-zinc-200 text-[11px] leading-tight">{post.authorName}</p>
              <p className="text-[10px] text-zinc-500">{new Date(post.publishedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-600" />
              <span>{post.readTimeMinutes} min</span>
            </span>
            <span className="flex items-center gap-1 text-rose-400/80">
              <Heart className="w-3 h-3 fill-rose-500/30" />
              <span>{post.likesCount}</span>
            </span>
            <span className="flex items-center gap-1 text-zinc-400">
              <MessageSquare className="w-3 h-3" />
              <span>{post.commentsCount || 0}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
