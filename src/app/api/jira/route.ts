import { NextResponse } from 'next/server';
import { getJiraDbStore } from '@/lib/jira/db';
import { getJiraStore } from '@/lib/jira/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getJiraDbStore();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('PostgreSQL /api/jira error, using backup store:', err.message);
    const store = getJiraStore();
    return NextResponse.json({
      projects: store.projects,
      members: store.members,
      issues: store.issues,
      activities: store.activities,
    });
  }
}
