'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPost, BlogComment } from '@/lib/blog/types';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  Send, 
  Check, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export function BlogPostDetailClient({
  initialPost,
  initialComments,
}: {
  initialPost: BlogPost;
  initialComments: BlogComment[];
}) {
  const [likes, setLikes] = useState(initialPost.likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<BlogComment[]>(initialComments);

  // New comment input
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLike = async () => {
    if (hasLiked) return;
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    try {
      await fetch(`/api/blog/${initialPost.slug}/like`, { method: 'POST' });
    } catch (e) {
      console.error('Like error:', e);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    setIsSubmittingComment(true);

    try {
      const res = await fetch(`/api/blog/${initialPost.slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: commentName.trim(),
          content: commentContent.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [...prev, data.comment]);
        setCommentContent('');
      }
    } catch (e) {
      console.error('Comment error:', e);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Back to Blog */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Publications</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied URL!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Category Pill */}
      <div className="mb-4">
        <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {initialPost.category}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
        {initialPost.title}
      </h1>

      {/* Executive Summary */}
      <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal mb-8 border-l-2 border-indigo-500 pl-4 py-1 italic bg-[#0e1017]/40 rounded-r-xl">
        {initialPost.summary}
      </p>

      {/* Author and Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-800/80 mb-8 text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <img
            src={initialPost.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'}
            alt={initialPost.authorName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
          />
          <div>
            <h3 className="font-bold text-white text-sm leading-tight">{initialPost.authorName}</h3>
            <p className="text-zinc-500 text-[11px]">{initialPost.authorRole}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{new Date(initialPost.publishedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{initialPost.readTimeMinutes} min read</span>
          </span>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer ${
              hasLiked
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:border-rose-500/40 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{likes}</span>
          </button>
        </div>
      </div>

      {/* Featured Cover Image */}
      {initialPost.coverImage && (
        <div className="rounded-3xl overflow-hidden mb-10 border border-zinc-800 max-h-[480px]">
          <img
            src={initialPost.coverImage}
            alt={initialPost.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content Render */}
      <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-6 text-sm sm:text-base font-normal">
        {initialPost.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl sm:text-2xl font-bold text-white pt-4 pb-2 border-b border-zinc-800/80">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
            const items = paragraph.split('\n');
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 text-zinc-300">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^[-*]|\d+\.\s*/, '')}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Tags */}
      {initialPost.tags && initialPost.tags.length > 0 && (
        <div className="pt-8 pb-6 border-b border-zinc-800/80 mt-10">
          <span className="text-xs uppercase font-bold text-zinc-500 block mb-2">Topic Tags</span>
          <div className="flex flex-wrap gap-2">
            {initialPost.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 text-xs font-semibold"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Comments & Discussions */}
      <section className="pt-10 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            <span>Community Discussions ({comments.length})</span>
          </h2>
        </div>

        {/* Post a Comment Form */}
        <form onSubmit={handleCommentSubmit} className="bg-[#0e1017] border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Join the discussion</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Your Name (e.g. Elena Rostova)"
              className="bg-[#141622] border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <textarea
            rows={3}
            required
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Share your perspective, feedback, or technical questions..."
            className="w-full bg-[#141622] border border-zinc-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingComment}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmittingComment ? 'Posting...' : 'Post Comment'}</span>
            </button>
          </div>
        </form>

        {/* Existing Comments List */}
        <div className="space-y-4">
          {comments.map((comm) => (
            <div key={comm.id} className="bg-[#0e1017] border border-zinc-800/80 rounded-2xl p-5 flex gap-4">
              <img
                src={comm.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces'}
                alt={comm.authorName}
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-zinc-700 mt-0.5"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{comm.authorName}</span>
                  <span className="text-[10px] text-zinc-500">{new Date(comm.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">{comm.content}</p>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-xs text-zinc-500 italic text-center py-6">
              No comments yet. Start the conversation above!
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
