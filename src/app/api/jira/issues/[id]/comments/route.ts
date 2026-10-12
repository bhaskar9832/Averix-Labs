import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { content, authorId } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 });
    }

    const issueRes = await sql`
      SELECT * FROM jira_issues WHERE id = ${id} OR UPPER(key) = UPPER(${id}) LIMIT 1
    `;

    if (issueRes.length === 0) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    const issue = issueRes[0];
    const memberRes = await sql`SELECT * FROM jira_members WHERE id = ${authorId || 'user-1'}`;
    const author = memberRes[0] || { id: 'user-1', name: 'Bhaskar Sarkar', avatar: '' };

    const commentId = `comm-${Date.now()}`;
    await sql`
      INSERT INTO jira_comments (id, issue_id, author_id, author_name, author_avatar, content)
      VALUES (${commentId}, ${issue.id}, ${author.id}, ${author.name}, ${author.avatar}, ${content.trim()})
    `;

    const actId = `act-${Date.now()}`;
    await sql`
      INSERT INTO jira_activities (id, user_id, user_name, user_avatar, action, target, issue_key, project_id)
      VALUES (${actId}, ${author.id}, ${author.name}, ${author.avatar}, 'commented on', ${issue.key}, ${issue.key}, ${issue.project_id})
    `;

    const newComment = {
      id: commentId,
      authorId: author.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ comment: newComment });
  } catch (err: any) {
    console.error('PostgreSQL comment insertion error:', err.message);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
