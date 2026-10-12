import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getJiraStore, saveJiraStore } from '@/lib/jira/storage';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rows = await sql`
      SELECT * FROM jira_issues WHERE id = ${id} OR UPPER(key) = UPPER(${id}) LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    const i = rows[0];
    const commentsRes = await sql`
      SELECT * FROM jira_comments WHERE issue_id = ${i.id} ORDER BY created_at ASC
    `;

    const issue = {
      id: i.id,
      key: i.key,
      projectId: i.project_id,
      summary: i.summary,
      description: i.description || '',
      type: i.type,
      priority: i.priority,
      status: i.status,
      assigneeId: i.assignee_id || undefined,
      reporterId: i.reporter_id,
      storyPoints: Number(i.story_points) || 0,
      tags: i.tags || [],
      dueDate: i.due_date ? i.due_date.toISOString().split('T')[0] : undefined,
      createdAt: i.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: i.updated_at?.toISOString() || new Date().toISOString(),
      comments: commentsRes.map((c: any) => ({
        id: c.id,
        authorId: c.author_id,
        authorName: c.author_name,
        authorAvatar: c.author_avatar,
        content: c.content,
        createdAt: c.created_at?.toISOString() || new Date().toISOString(),
      })),
    };

    return NextResponse.json({ issue });
  } catch (err: any) {
    const { id } = await params;
    const store = getJiraStore();
    const issue = store.issues.find((i) => i.id === id || i.key.toUpperCase() === id.toUpperCase());
    return NextResponse.json({ issue });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existingRes = await sql`
      SELECT * FROM jira_issues WHERE id = ${id} OR UPPER(key) = UPPER(${id}) LIMIT 1
    `;

    if (existingRes.length === 0) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    const current = existingRes[0];
    const updatedSummary = body.summary !== undefined ? body.summary : current.summary;
    const updatedDesc = body.description !== undefined ? body.description : current.description;
    const updatedStatus = body.status !== undefined ? body.status : current.status;
    const updatedPriority = body.priority !== undefined ? body.priority : current.priority;
    const updatedAssignee = body.assigneeId !== undefined ? body.assigneeId : current.assignee_id;
    const updatedPoints = body.storyPoints !== undefined ? Number(body.storyPoints) : current.story_points;
    const updatedDueDate = body.dueDate !== undefined ? (body.dueDate ? new Date(body.dueDate) : null) : current.due_date;

    await sql`
      UPDATE jira_issues SET
        summary = ${updatedSummary},
        description = ${updatedDesc},
        status = ${updatedStatus},
        priority = ${updatedPriority},
        assignee_id = ${updatedAssignee || null},
        story_points = ${updatedPoints},
        due_date = ${updatedDueDate},
        updated_at = NOW()
      WHERE id = ${current.id}
    `;

    if (body.status && body.status !== current.status) {
      const actId = `act-${Date.now()}`;
      await sql`
        INSERT INTO jira_activities (id, user_id, user_name, user_avatar, action, target, issue_key, project_id)
        VALUES (${actId}, 'user-1', 'Bhaskar Sarkar', '', ${`moved ${current.key} to`}, ${body.status}, ${current.key}, ${current.project_id})
      `;
    }

    return NextResponse.json({
      issue: {
        ...current,
        summary: updatedSummary,
        description: updatedDesc,
        status: updatedStatus,
        priority: updatedPriority,
        assigneeId: updatedAssignee,
        storyPoints: updatedPoints,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    console.error('PostgreSQL PATCH error:', err.message);
    return NextResponse.json({ success: true });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await sql`
      SELECT * FROM jira_issues WHERE id = ${id} OR UPPER(key) = UPPER(${id}) LIMIT 1
    `;

    if (existing.length > 0) {
      await sql`DELETE FROM jira_issues WHERE id = ${existing[0].id}`;
      const actId = `act-${Date.now()}`;
      await sql`
        INSERT INTO jira_activities (id, user_id, user_name, user_avatar, action, target, issue_key, project_id)
        VALUES (${actId}, 'user-1', 'Bhaskar Sarkar', '', 'deleted ticket', ${existing[0].key}, ${existing[0].key}, ${existing[0].project_id})
      `;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: true });
  }
}
