import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Project } from '@/lib/jira/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM jira_projects ORDER BY created_at ASC`;
    const projects: Project[] = rows.map((p: any) => ({
      id: p.id,
      name: p.name,
      key: p.key,
      leadId: p.lead_id,
      category: p.category,
      description: p.description,
      avatarColor: p.avatar_color,
      defaultAssigneeId: p.default_assignee_id,
      createdAt: p.created_at?.toISOString() || new Date().toISOString(),
      status: p.status || 'ACTIVE',
      sdlcPhase: p.sdlc_phase || 'REQUIREMENTS',
      clientName: p.client_name || 'Valued Client',
      clientEmail: p.client_email || 'client@example.com',
      clientCompany: p.client_company || 'Client Org',
      clientAddress: p.client_address || 'Global Headquarters',
      budget: Number(p.budget) || 12000,
      ourCharges: Number(p.our_charges) || 9500,
      estimatedCost: Number(p.estimated_cost) || 4500,
      actualCost: Number(p.actual_cost) || 3800,
      currency: p.currency || 'USD',
      deliverables: p.deliverables || 'Full production software system.',
    }));
    return NextResponse.json({ projects, total: projects.length });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, key, category, description, avatarColor, leadId, clientName, clientCompany, budget, ourCharges, deliverables } = body;

    if (!name || !key) {
      return NextResponse.json({ error: 'name and key are required' }, { status: 400 });
    }

    const cleanKey = key.trim().toUpperCase();
    const id = `proj-${Date.now()}`;

    await sql`
      INSERT INTO jira_projects (
        id, name, key, lead_id, category, description, avatar_color, default_assignee_id,
        status, sdlc_phase, client_name, client_company, budget, our_charges, deliverables
      ) VALUES (
        ${id}, ${name.trim()}, ${cleanKey}, ${leadId || 'user-1'}, ${category || 'Engineering'},
        ${description || ''}, ${avatarColor || 'bg-indigo-600'}, null,
        'ACTIVE', 'REQUIREMENTS', ${clientName || 'Valued Client'}, ${clientCompany || 'Client Org'},
        ${budget ? Number(budget) : 10000}, ${ourCharges ? Number(ourCharges) : 8500},
        ${deliverables || 'Custom web application build and deployment.'}
      )
    `;

    const newProject: Project = {
      id,
      name: name.trim(),
      key: cleanKey,
      leadId: leadId || 'user-1',
      category: category || 'Engineering',
      description: description || '',
      avatarColor: avatarColor || 'bg-indigo-600',
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      sdlcPhase: 'REQUIREMENTS',
      clientName: clientName || 'Valued Client',
      clientEmail: 'client@example.com',
      clientCompany: clientCompany || 'Client Org',
      clientAddress: 'Global Headquarters',
      budget: budget ? Number(budget) : 10000,
      ourCharges: ourCharges ? Number(ourCharges) : 8500,
      estimatedCost: 4000,
      actualCost: 3500,
      currency: 'USD',
      deliverables: deliverables || 'Custom web application build and deployment.',
    };

    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (err: any) {
    console.error('PostgreSQL create project error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
