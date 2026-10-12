import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params
    const result = await sql`SELECT * FROM messages WHERE id = ${id}`
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ message: result[0] })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch message' }, { status: 500 })
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params
    const { status } = await req.json()
    const result = await sql`UPDATE messages SET status = ${status} WHERE id = ${id} RETURNING *`
    return NextResponse.json({ message: result[0] })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params
    await sql`DELETE FROM messages WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
