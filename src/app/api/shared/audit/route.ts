import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const service = searchParams.get('service');

    const [adminLogs, jiraActivities] = await Promise.all([
      sql`SELECT id, action, entity_type, entity_id, created_at FROM activity_logs ORDER BY created_at DESC LIMIT 25`,
      sql`SELECT id, user_name, action, target, issue_key, project_id, created_at FROM jira_activities ORDER BY created_at DESC LIMIT 25`,
    ]);

    const unifiedAuditTrail = [
      ...adminLogs.map((a: any) => ({
        id: a.id,
        service: 'Admin Private Zone',
        actor: 'Admin System',
        action: a.action,
        target: `${a.entity_type || 'Entity'} ${a.entity_id || ''}`,
        timestamp: a.created_at,
      })),
      ...jiraActivities.map((j: any) => ({
        id: j.id,
        service: 'Jira Service',
        actor: j.user_name || 'Engineer',
        action: j.action,
        target: j.target,
        timestamp: j.created_at,
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      serviceFilter: service || 'ALL',
      total: unifiedAuditTrail.length,
      logs: unifiedAuditTrail,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, actor, action, target, metadata } = body;

    const id = `audit-${Date.now()}`;
    await sql`
      INSERT INTO activity_logs (id, action, entity_type, entity_id, created_at)
      VALUES (${id}, ${action || 'GATEWAY_EVENT'}, ${service || 'API_GATEWAY'}, ${target || 'SYSTEM'}, NOW())
    `;

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
