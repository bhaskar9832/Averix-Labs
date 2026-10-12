import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { visitor_id, browser, utm_source, utm_medium, utm_campaign } = body

    await sql`
      INSERT INTO analytics_sessions (visitor_id, browser, utm_source, utm_medium, utm_campaign)
      VALUES (${visitor_id}, ${browser}, ${utm_source}, ${utm_medium}, ${utm_campaign})
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
