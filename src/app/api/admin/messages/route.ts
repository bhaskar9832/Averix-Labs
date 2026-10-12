import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { requireAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Enforce backend authorization on every protected Admin API request
  const auth = await requireAdminAuth(req)
  if (!auth.authorized) {
    return auth.errorResponse!
  }

  try {
    const messages = await sql`SELECT * FROM messages ORDER BY created_at DESC`
    return NextResponse.json({ messages, total: messages.length })
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
