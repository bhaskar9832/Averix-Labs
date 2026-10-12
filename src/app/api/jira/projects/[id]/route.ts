import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { redisCache } from '@/lib/cache/redis';
import { eventBroker } from '@/lib/events/broker';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existing = await sql`SELECT * FROM jira_projects WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const current = existing[0];
    const status = body.status !== undefined ? body.status : current.status;
    const sdlcPhase = body.sdlcPhase !== undefined ? body.sdlcPhase : current.sdlc_phase;
    const clientName = body.clientName !== undefined ? body.clientName : current.client_name;
    const clientEmail = body.clientEmail !== undefined ? body.clientEmail : current.client_email;
    const clientCompany = body.clientCompany !== undefined ? body.clientCompany : current.client_company;
    const clientAddress = body.clientAddress !== undefined ? body.clientAddress : current.client_address;
    const budget = body.budget !== undefined ? Number(body.budget) : current.budget;
    const ourCharges = body.ourCharges !== undefined ? Number(body.ourCharges) : current.our_charges;
    const estimatedCost = body.estimatedCost !== undefined ? Number(body.estimatedCost) : current.estimated_cost;
    const actualCost = body.actualCost !== undefined ? Number(body.actualCost) : current.actual_cost;
    const deliverables = body.deliverables !== undefined ? body.deliverables : current.deliverables;
    const closedAt = body.closedAt !== undefined ? (body.closedAt ? new Date(body.closedAt) : null) : current.closed_at;

    await sql`
      UPDATE jira_projects SET
        status = ${status},
        sdlc_phase = ${sdlcPhase},
        client_name = ${clientName},
        client_email = ${clientEmail},
        client_company = ${clientCompany},
        client_address = ${clientAddress},
        budget = ${budget},
        our_charges = ${ourCharges},
        estimated_cost = ${estimatedCost},
        actual_cost = ${actualCost},
        deliverables = ${deliverables},
        closed_at = ${closedAt}
      WHERE id = ${id}
    `;

    redisCache.del('all_jira_projects');
    redisCache.del(`jira_project_${id}`);

    if (status === 'COMPLETED') {
      eventBroker.publish('JIRA_PROJECT_CLOSED', 'JIRA', {
        id,
        name: current.name,
        clientName,
        actualCost,
        budget,
        closedAt: closedAt || new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, project: { id, ...body } });
  } catch (err: any) {
    console.error('Update project API error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
