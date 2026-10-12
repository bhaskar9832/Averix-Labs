import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/blog/db';
import { BlogPostDetailClient } from '@/components/blog/BlogPostDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post } = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Averix Blogs',
    };
  }

  return {
    title: `${post.title} | Averix Blogs`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, comments } = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetailClient initialPost={post} initialComments={comments} />;
}
