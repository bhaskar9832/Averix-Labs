import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      visitor_id = null,
      browser = null,
      utm_source = null,
      utm_medium = null,
      utm_campaign = null,
    } = body ?? {}

    if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL && !process.env.NEON_DATABASE_URL) {
      return NextResponse.json({ success: false, skipped: true })
    }

    await sql`
      INSERT INTO analytics_sessions (visitor_id, browser, utm_source, utm_medium, utm_campaign)
      VALUES (${visitor_id}, ${browser}, ${utm_source}, ${utm_medium}, ${utm_campaign})
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.warn('Analytics tracking skipped:', error instanceof Error ? error.message : error)
    return NextResponse.json({ success: false, skipped: true })
  }
}
