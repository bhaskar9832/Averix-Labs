import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { requirePermission } from '@/lib/auth'

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Backend enforces granular 'leads.read' permission check
  const auth = await requirePermission(req, 'leads.read')
  if (!auth.authorized) {
    return auth.errorResponse!
  }

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let leads
    if (status && search) {
      leads = await sql`
        SELECT * FROM leads
        WHERE status = ${status}
        AND (full_name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'} OR company ILIKE ${'%' + search + '%'})
        ORDER BY created_at DESC
      `
    } else if (status) {
      leads = await sql`SELECT * FROM leads WHERE status = ${status} ORDER BY created_at DESC`
    } else if (search) {
      leads = await sql`
        SELECT * FROM leads
        WHERE full_name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'} OR company ILIKE ${'%' + search + '%'}
        ORDER BY created_at DESC
      `
    } else {
      leads = await sql`SELECT * FROM leads ORDER BY created_at DESC`
    }

    return NextResponse.json({ leads, total: leads.length })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  // Backend enforces granular 'leads.write' permission check
  const auth = await requirePermission(req, 'leads.write')
  if (!auth.authorized) {
    return auth.errorResponse!
  }

  try {
    const body = await req.json()
    const { first_name, last_name, full_name, email, company, project_type, source, status } = body

    const result = await sql`
      INSERT INTO leads (first_name, last_name, full_name, email, company, project_type, source, status)
      VALUES (${first_name}, ${last_name}, ${full_name || `${first_name} ${last_name}`}, ${email}, ${company}, ${project_type}, ${source || 'manual'}, ${status || 'NEW'})
      RETURNING *
    `
    return NextResponse.json({ lead: result[0] })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
