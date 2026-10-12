import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params
    const result = await sql`SELECT * FROM leads WHERE id = ${id}`
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ lead: result[0] })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 })
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params
    const body = await req.json()
    const { status, company, project_type, source } = body

    const updates: Record<string, any> = {}
    if (status !== undefined) updates.status = status
    if (company !== undefined) updates.company = company
    if (project_type !== undefined) updates.project_type = project_type
    if (source !== undefined) updates.source = source

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const result = await sql`UPDATE leads SET ${sql(updates)} WHERE id = ${id} RETURNING *`
    return NextResponse.json({ lead: result[0] })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params
    await sql`DELETE FROM leads WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
  }
}
