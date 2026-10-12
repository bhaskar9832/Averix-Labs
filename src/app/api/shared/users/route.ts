import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [adminUsers, jiraMembers] = await Promise.all([
      sql`SELECT id, email, full_name, created_at FROM admin_users`,
      sql`SELECT id, name, email, role, department, avatar, created_at FROM jira_members`,
    ]);

    const unifiedUsers = [
      ...adminUsers.map((a: any) => ({
        id: a.id,
        name: a.full_name || 'Admin Officer',
        email: a.email,
        role: 'Super Administrator',
        serviceRealm: 'Admin Private Zone',
        avatar: null,
      })),
      ...jiraMembers.map((j: any) => ({
        id: j.id,
        name: j.name,
        email: j.email,
        role: j.role,
        serviceRealm: 'Engineering & Jira Services',
        avatar: j.avatar,
      })),
    ];

    return NextResponse.json({
      total: unifiedUsers.length,
      users: unifiedUsers,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
