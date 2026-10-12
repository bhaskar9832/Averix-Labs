import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { ProjectMember } from '@/lib/jira/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM jira_members ORDER BY created_at ASC`;
    const members: ProjectMember[] = rows.map((m: any) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      role: m.role,
      department: m.department,
      avatar: m.avatar,
    }));
    return NextResponse.json({ members, total: members.length });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role, department, avatar } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 });
    }

    const id = `user-${Date.now()}`;
    const cleanEmail = email.trim().toLowerCase();
    const cleanAvatar = avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces';

    await sql`
      INSERT INTO jira_members (id, name, email, role, department, avatar)
      VALUES (${id}, ${name.trim()}, ${cleanEmail}, ${role || 'Frontend Dev'}, ${department || 'Engineering'}, ${cleanAvatar})
    `;

    const newMember: ProjectMember = {
      id,
      name: name.trim(),
      email: cleanEmail,
      role: role || 'Frontend Dev',
      department: department || 'Engineering',
      avatar: cleanAvatar,
    };

    return NextResponse.json({ member: newMember }, { status: 201 });
  } catch (err: any) {
    console.error('PostgreSQL create member error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
