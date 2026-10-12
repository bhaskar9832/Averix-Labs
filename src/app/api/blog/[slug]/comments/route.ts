import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { authorName, authorEmail, authorAvatar, content } = body;

    if (!content || !authorName) {
      return NextResponse.json({ error: 'Name and comment content are required.' }, { status: 400 });
    }

    const postRes = await sql`SELECT id FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
    if (postRes.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postId = postRes[0].id;
    const commentId = `comm-b-${Date.now()}`;
    const avatar = authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces';

    await sql`
      INSERT INTO blog_comments (
        id, post_id, author_name, author_email, author_avatar, content, created_at
      ) VALUES (
        ${commentId}, ${postId}, ${authorName.trim()}, ${authorEmail ? authorEmail.trim() : null},
        ${avatar}, ${content.trim()}, NOW()
      )
    `;

    return NextResponse.json({
      comment: {
        id: commentId,
        postId,
        authorName: authorName.trim(),
        authorEmail,
        authorAvatar: avatar,
        content: content.trim(),
        createdAt: new Date().toISOString(),
      },
    }, { status: 201 });
  } catch (err: any) {
    console.error('Comment creation error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
