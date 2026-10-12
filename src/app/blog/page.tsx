import React from 'react';
import { getAllBlogPosts } from '@/lib/blog/db';
import { BlogHomeClient } from '@/components/blog/BlogHomeClient';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return <BlogHomeClient initialPosts={posts} />;
}
