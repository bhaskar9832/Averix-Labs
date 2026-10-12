import { sql } from '@/lib/db';
import { BlogPost, BlogComment } from './types';
import { SEED_FALLBACK_POSTS } from './fallbackData';

export async function getAllBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    let rows;
    if (category && category !== 'All') {
      rows = await sql`
        SELECT b.*, 
          (SELECT COUNT(*) FROM blog_comments c WHERE c.post_id = b.id) as comments_count
        FROM blog_posts b
        WHERE b.category = ${category}
        ORDER BY b.published_at DESC
      `;
    } else {
      rows = await sql`
        SELECT b.*, 
          (SELECT COUNT(*) FROM blog_comments c WHERE c.post_id = b.id) as comments_count
        FROM blog_posts b
        ORDER BY b.published_at DESC
      `;
    }

    if (!rows || rows.length === 0) {
      return category && category !== 'All' 
        ? SEED_FALLBACK_POSTS.filter(p => p.category === category)
        : SEED_FALLBACK_POSTS;
    }

    return rows.map((r: any) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      summary: r.summary,
      content: r.content,
      category: r.category,
      tags: r.tags || [],
      coverImage: r.cover_image,
      authorName: r.author_name,
      authorRole: r.author_role,
      authorAvatar: r.author_avatar,
      readTimeMinutes: Number(r.read_time_minutes) || 5,
      likesCount: Number(r.likes_count) || 0,
      featured: Boolean(r.featured),
      publishedAt: r.published_at?.toISOString() || new Date().toISOString(),
      updatedAt: r.updated_at?.toISOString() || new Date().toISOString(),
      commentsCount: Number(r.comments_count) || 0,
    }));
  } catch (err: any) {
    console.warn('getAllBlogPosts notice (using resilient cache/seed):', err.message);
    return category && category !== 'All' 
      ? SEED_FALLBACK_POSTS.filter(p => p.category === category)
      : SEED_FALLBACK_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<{ post: BlogPost | null; comments: BlogComment[] }> {
  try {
    const postRes = await sql`
      SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1
    `;

    if (postRes.length === 0) {
      return { post: null, comments: [] };
    }

    const r = postRes[0];
    const commentsRes = await sql`
      SELECT * FROM blog_comments WHERE post_id = ${r.id} ORDER BY created_at ASC
    `;

    const post: BlogPost = {
      id: r.id,
      slug: r.slug,
      title: r.title,
      summary: r.summary,
      content: r.content,
      category: r.category,
      tags: r.tags || [],
      coverImage: r.cover_image,
      authorName: r.author_name,
      authorRole: r.author_role,
      authorAvatar: r.author_avatar,
      readTimeMinutes: Number(r.read_time_minutes) || 5,
      likesCount: Number(r.likes_count) || 0,
      featured: Boolean(r.featured),
      publishedAt: r.published_at?.toISOString() || new Date().toISOString(),
      updatedAt: r.updated_at?.toISOString() || new Date().toISOString(),
      commentsCount: commentsRes.length,
    };

    const comments: BlogComment[] = commentsRes.map((c: any) => ({
      id: c.id,
      postId: c.post_id,
      authorName: c.author_name,
      authorEmail: c.author_email,
      authorAvatar: c.author_avatar,
      content: c.content,
      createdAt: c.created_at?.toISOString() || new Date().toISOString(),
    }));

    return { post, comments };
  } catch (err: any) {
    console.warn('getBlogPostBySlug notice (using fallback):', err.message);
    const fallbackPost = SEED_FALLBACK_POSTS.find(p => p.slug === slug) || null;
    return { post: fallbackPost, comments: [] };
  }
}
