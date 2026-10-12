import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase().trim() || '';

  if (!q) {
    return NextResponse.json({ query: '', results: [], total: 0 });
  }

  try {
    const [leadsRes, messagesRes, blogsRes, issuesRes, projectsRes] = await Promise.all([
      sql`SELECT id, first_name, last_name, company, email FROM leads WHERE LOWER(first_name || ' ' || coalesce(last_name, '') || ' ' || email || ' ' || coalesce(company, '')) LIKE ${'%' + q + '%'} LIMIT 5`,
      sql`SELECT id, name, email, message FROM messages WHERE LOWER(name || ' ' || email || ' ' || coalesce(message, '')) LIKE ${'%' + q + '%'} LIMIT 5`,
      sql`SELECT id, title, slug, summary, category FROM blog_posts WHERE LOWER(title || ' ' || summary || ' ' || category) LIKE ${'%' + q + '%'} LIMIT 5`,
      sql`SELECT id, key, summary, status, project_id FROM jira_issues WHERE LOWER(key || ' ' || summary) LIKE ${'%' + q + '%'} LIMIT 5`,
      sql`SELECT id, name, key, category FROM jira_projects WHERE LOWER(name || ' ' || key || ' ' || category) LIKE ${'%' + q + '%'} LIMIT 5`,
    ]);

    const results = [
      ...projectsRes.map((p: any) => ({
        type: 'PROJECT',
        service: 'Jira Service',
        title: `${p.name} (${p.key})`,
        subtitle: p.category,
        url: `/jira`,
      })),
      ...issuesRes.map((i: any) => ({
        type: 'ISSUE',
        service: 'Jira Service',
        title: `${i.key}: ${i.summary}`,
        subtitle: `Status: ${i.status.toUpperCase()}`,
        url: `/jira`,
      })),
      ...blogsRes.map((b: any) => ({
        type: 'BLOG',
        service: 'Blog Service',
        title: b.title,
        subtitle: `${b.category} • ${b.summary.slice(0, 80)}...`,
        url: `/blog/${b.slug}`,
      })),
      ...leadsRes.map((l: any) => ({
        type: 'LEAD',
        service: 'Website CRM',
        title: `${l.first_name} ${l.last_name || ''} (${l.company || 'Private'})`,
        subtitle: l.email,
        url: `/admin/leads`,
      })),
      ...messagesRes.map((m: any) => ({
        type: 'MESSAGE',
        service: 'Website CRM',
        title: `Message from ${m.name}`,
        subtitle: m.message ? m.message.slice(0, 80) : m.email,
        url: `/admin/messages`,
      })),
    ];

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      query: q,
      total: results.length,
      latencyMs,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
