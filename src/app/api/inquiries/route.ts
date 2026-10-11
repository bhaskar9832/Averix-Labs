import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export const runtime = 'nodejs';

const projectTypes = new Set(['SaaS Platform', 'Web Application', 'Mobile Application', 'AI Product', 'API / Backend', 'Automation', 'Other']);

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
  }

  let data;
  try {
    const body = await request.text();
    if (body.length > 20000) return NextResponse.json({ error: 'Message is too large' }, { status: 413 });
    data = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const company = typeof data.company === 'string' ? data.company.trim() : '';
  const projectType = typeof data.project_type === 'string' ? data.project_type.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!name || name.length > 200 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || company.length > 200 || !projectTypes.has(projectType) || !message || message.length > 10000) {
    return NextResponse.json({ error: 'Please check your contact details and message' }, { status: 400 });
  }

  try {
    await getDatabase().query(
      'INSERT INTO public.project_inquiries (full_name, email, company_name, project_type, description) VALUES ($1, $2, $3, $4, $5)',
      [name, email, company || null, projectType, message],
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    console.error('[Averix Labs] Failed to save inquiry');
    return NextResponse.json({ error: 'Unable to save your message. Please try again later.' }, { status: 503 });
  }
}
