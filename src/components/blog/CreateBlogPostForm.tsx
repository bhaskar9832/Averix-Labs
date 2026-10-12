'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  PenSquare, 
  Sparkles, 
  Image as ImageIcon, 
  Tag, 
  User, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const CATEGORIES = [
  'Artificial Intelligence',
  'Web Engineering',
  'Cloud & DevOps',
  'System Architecture',
  'Cybersecurity',
  'Mobile & Edge',
];

const PRESET_COVERS = [
  { name: 'Neural AI Flow', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop' },
  { name: 'Code Architecture', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop' },
  { name: 'Cloud Infrastructure', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop' },
  { name: 'Cyber Matrix', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop' },
  { name: 'Hardware Silicon', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop' },
];

export function CreateBlogPostForm() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagInput, setTagInput] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [authorName, setAuthorName] = useState('Bhaskar Sarkar');
  const [authorRole, setAuthorRole] = useState('Technology Contributor');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim() || !authorName.trim()) {
      setError('Please provide a title, content, and author name.');
      return;
    }

    setIsSubmitting(true);

    try {
      const tags = tagInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          summary: summary.trim() || title.trim(),
          content: content.trim(),
          category,
          tags: tags.length > 0 ? tags : ['Technology'],
          coverImage,
          authorName: authorName.trim(),
          authorRole: authorRole.trim() || 'Contributor',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to publish post');
      }

      router.push(`/blog/${data.post.slug}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Articles</span>
      </Link>

      <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="flex items-center gap-3 pb-6 border-b border-border/80 mb-8">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-link">
            <PenSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Publish Technology Article
            </h1>
            <p className="text-xs text-muted-foreground">
              Share your insights, code architecture, or tech breakdown with the Averix community.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-danger text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Article Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Article Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Building Resilient Microservices with Next.js & Rust"
              className="w-full bg-secondary border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-indigo-500 placeholder-muted-foreground font-semibold"
            />
          </div>

          {/* Category & Tags Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-secondary border border-border/80 rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="AI, Cloud, React, Rust"
                className="w-full bg-secondary border border-border/80 rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500 placeholder-muted-foreground"
              />
            </div>
          </div>

          {/* Short Summary */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Executive Summary / Hook
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A brief 1-2 sentence overview of what the reader will learn..."
              className="w-full bg-secondary border border-border/80 rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-indigo-500 placeholder-muted-foreground resize-none leading-relaxed"
            />
          </div>

          {/* Main Article Body */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Article Content <span className="text-danger">*</span>
            </label>
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in markdown or plain text. Use ## for headings, bullet points, and code snippets..."
              className="w-full bg-secondary border border-border/80 rounded-xl p-4 text-xs text-foreground focus:outline-none focus:border-indigo-500 placeholder-muted-foreground resize-y font-mono leading-relaxed"
            />
          </div>

          {/* Cover Image Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Cover Image
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
              {PRESET_COVERS.map((preset) => (
                <div
                  key={preset.name}
                  onClick={() => setCoverImage(preset.url)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all relative h-16 ${
                    coverImage === preset.url
                      ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-102'
                      : 'border-border opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 text-[9px] bg-black/80 px-1 rounded text-white font-medium truncate max-w-[90%]">
                    {preset.name}
                  </span>
                </div>
              ))}
            </div>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Or paste custom image URL (https://...)"
              className="w-full bg-secondary border border-border/80 rounded-xl px-4 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500 placeholder-muted-foreground"
            />
          </div>

          {/* Author Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Your Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-secondary border border-border/80 rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Your Role / Title
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Software Engineer, AI Researcher, etc."
                className="w-full bg-secondary border border-border/80 rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t border-border/80 flex items-center justify-end gap-3">
            <Link
              href="/blog"
              className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary text-muted-foreground text-xs font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              {isSubmitting ? 'Publishing to Averix Blogs...' : 'Publish Article Live'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
