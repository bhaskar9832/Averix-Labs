import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAllBlogPosts } from '@/lib/blog/db';
import { redisCache } from '@/lib/cache/redis';
import { eventBroker } from '@/lib/events/broker';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const posts = await getAllBlogPosts(category);
    return NextResponse.json({ posts, total: posts.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, summary, content, category, tags, coverImage, authorName, authorRole, authorAvatar } = body;

    if (!title || !content || !authorName) {
      return NextResponse.json({ error: 'Title, content, and author name are required.' }, { status: 400 });
    }

    // Auto-generate clean slug
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    const id = `post-${Date.now()}`;

    const cleanTags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : ['Technology'];

    const wordCount = content.trim().split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const defaultAvatar = authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces';
    const defaultCover = coverImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop';

    await sql`
      INSERT INTO blog_posts (
        id, slug, title, summary, content, category, tags, cover_image,
        author_name, author_role, author_avatar, read_time_minutes, likes_count,
        featured, published_at, updated_at
      ) VALUES (
        ${id}, ${slug}, ${title.trim()}, ${summary ? summary.trim() : title.trim()},
        ${content.trim()}, ${category || 'Technology'}, ${cleanTags}, ${defaultCover},
        ${authorName.trim()}, ${authorRole || 'Contributor'}, ${defaultAvatar},
        ${readTimeMinutes}, 0, false, NOW(), NOW()
      )
    `;

    // Invalidate Redis cache & publish to Event Broker
    redisCache.del('all_blog_posts');
    eventBroker.publish('BLOG_POST_PUBLISHED', 'BLOG', {
      id,
      slug,
      title: title.trim(),
      author: authorName.trim(),
    });

    return NextResponse.json({
      success: true,
      post: {
        id,
        slug,
        title,
        readTimeMinutes,
      },
    }, { status: 201 });
  } catch (err: any) {
    console.error('Create blog post error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
