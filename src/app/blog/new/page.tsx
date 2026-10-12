import React from 'react';
import { CreateBlogPostForm } from '@/components/blog/CreateBlogPostForm';

export const metadata = {
  title: 'Publish New Article | Averix Blogs',
  description: 'Submit technical tutorials, architecture blueprints, and AI insights to Averix Blogs.',
};

export default function NewBlogPostPage() {
  return <CreateBlogPostForm />;
}
