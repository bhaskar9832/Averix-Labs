import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Issue, ActivityItem } from '@/lib/jira/types';
import { getJiraStore, saveJiraStore } from '@/lib/jira/storage';
import { redisCache } from '@/lib/cache/redis';
import { eventBroker } from '@/lib/events/broker';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    let rows;
    if (projectId) {
      rows = await sql`SELECT * FROM jira_issues WHERE project_id = ${projectId} ORDER BY created_at DESC`;
    } else {
      rows = await sql`SELECT * FROM jira_issues ORDER BY created_at DESC`;
    }

    const issues = rows.map((i: any) => ({
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
      comments: [],
    }));

    return NextResponse.json({ issues, total: issues.length });
  } catch (err: any) {
    console.error('PostgreSQL GET /api/jira/issues error:', err.message);
    const store = getJiraStore();
    return NextResponse.json({ issues: store.issues, total: store.issues.length });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, summary, description, type, priority, status, assigneeId, reporterId, storyPoints, tags, dueDate } = body;

    if (!summary || !projectId) {
      return NextResponse.json({ error: 'summary and projectId are required' }, { status: 400 });
    }

    // Determine issue key from PostgreSQL
    const projectRes = await sql`SELECT * FROM jira_projects WHERE id = ${projectId}`;
    const proj = projectRes[0] || { key: 'AVX', id: projectId };
    const countRes = await sql`SELECT COUNT(*) as count FROM jira_issues WHERE project_id = ${projectId}`;
    const nextNumber = 100 + Number(countRes[0]?.count || 0) + 1;
    const key = `${proj.key}-${nextNumber}`;
    const id = `iss-${Date.now()}`;

    const cleanTags = Array.isArray(tags) ? tags : ['Averix'];
    const pts = Number(storyPoints) || 0;
    const cleanDesc = description ? description.trim() : '';

    await sql`
      INSERT INTO jira_issues (
        id, key, project_id, summary, description, type, priority, status,
        assignee_id, reporter_id, story_points, tags, due_date
      ) VALUES (
        ${id}, ${key}, ${projectId}, ${summary.trim()}, ${cleanDesc},
        ${type || 'task'}, ${priority || 'medium'}, ${status || 'todo'},
        ${assigneeId || null}, ${reporterId || 'user-1'}, ${pts},
        ${cleanTags}, ${dueDate ? new Date(dueDate) : null}
      )
    `;

    // Activity record
    const memberRes = await sql`SELECT * FROM jira_members WHERE id = ${reporterId || 'user-1'}`;
    const reporter = memberRes[0] || { name: 'Bhaskar Sarkar', avatar: '' };
    const actId = `act-${Date.now()}`;
    await sql`
      INSERT INTO jira_activities (id, user_id, user_name, user_avatar, action, target, issue_key, project_id)
      VALUES (${actId}, ${reporterId || 'user-1'}, ${reporter.name}, ${reporter.avatar}, 'created issue', ${`${key} (${summary.trim()})`}, ${key}, ${projectId})
    `;

    const newIssue: Issue = {
      id,
      key,
      projectId,
      summary: summary.trim(),
      description: cleanDesc,
      type: type || 'task',
      priority: priority || 'medium',
      status: status || 'todo',
      assigneeId: assigneeId || undefined,
      reporterId: reporterId || 'user-1',
      storyPoints: pts,
      tags: cleanTags,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };

    const newActivity: ActivityItem = {
      id: actId,
      userId: reporterId || 'user-1',
      userName: reporter.name,
      userAvatar: reporter.avatar,
      action: 'created issue',
      target: `${key} (${summary.trim()})`,
      issueKey: key,
      projectId,
      timestamp: 'Just now',
    };

    // Invalidate Redis cache & publish to Event Broker
    redisCache.del(`jira_issues_${projectId}`);
    redisCache.del('all_jira_issues');
    eventBroker.publish('JIRA_ISSUE_CREATED', 'JIRA', {
      id,
      key,
      summary: summary.trim(),
      projectId,
      priority,
      assigneeId,
    });

    return NextResponse.json({ issue: newIssue, activity: newActivity }, { status: 201 });
  } catch (err: any) {
    console.error('PostgreSQL POST /api/jira/issues error, falling back:', err.message);
    const body = await req.json().catch(() => ({}));
    const store = getJiraStore();
    const proj = store.projects.find((p) => p.id === body.projectId) || store.projects[0];
    const key = `${proj.key}-${100 + store.issues.length + 1}`;
    const fallbackIssue: Issue = {
      id: `iss-${Date.now()}`,
      key,
      projectId: body.projectId || proj.id,
      summary: body.summary || 'New Issue',
      description: body.description || '',
      type: body.type || 'task',
      priority: body.priority || 'medium',
      status: body.status || 'todo',
      assigneeId: body.assigneeId,
      reporterId: body.reporterId || 'user-1',
      storyPoints: Number(body.storyPoints) || 0,
      tags: body.tags || ['Averix'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };
    store.issues.unshift(fallbackIssue);
    saveJiraStore(store);
    return NextResponse.json({ issue: fallbackIssue }, { status: 201 });
  }
}
