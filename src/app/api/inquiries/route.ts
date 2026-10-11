import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export const runtime = 'nodejs';

const projectTypes = new Set(['SaaS Platform', 'Web Application', 'Mobile Application', 'AI Product', 'API / Backend', 'Automation', 'Other']);

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin');
  const allowed = (process.env.INQUIRY_ALLOWED_ORIGINS || process.env.NEXT_PUBLIC_SITE_URL || 'https://averixlabs.in')
    .split(',').map(value => value.trim()).filter(Boolean);
  if (origin && origin !== new URL(request.url).origin && !allowed.includes(origin)) return null;
  return {
    ...(origin ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Cache-Control': 'no-store',
  };
}

export function OPTIONS(request: Request) {
  const headers = corsHeaders(request);
  return new Response(null, { status: headers ? 204 : 403, headers: headers || {} });
}

export async function POST(request: Request) {
  const headers = corsHeaders(request);
  if (!headers) return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
  const respond = (body: Record<string, unknown>, status: number) => NextResponse.json(body, { status, headers });
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return respond({ error: 'Content-Type must be application/json' }, 415);
  }

  let data;
  try {
    const body = await request.text();
    if (body.length > 20000) return respond({ error: 'Message is too large' }, 413);
    data = JSON.parse(body);
  } catch {
    return respond({ error: 'Invalid request' }, 400);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return respond({ error: 'Invalid request' }, 400);
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const company = typeof data.company === 'string' ? data.company.trim() : '';
  const projectType = typeof data.project_type === 'string' ? data.project_type.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!name || name.length > 200 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || company.length > 200 || !projectTypes.has(projectType) || !message || message.length > 10000) {
    return respond({ error: 'Please check your contact details and message' }, 400);
  }

  try {
    await getDatabase().query(
      'INSERT INTO public.project_inquiries (full_name, email, company_name, project_type, description) VALUES ($1, $2, $3, $4, $5)',
      [name, email, company || null, projectType, message],
    );
    return respond({ success: true }, 201);
  } catch {
    console.error('[Averix Labs] Failed to save inquiry');
    return respond({ error: 'Unable to save your message. Please try again later.' }, 503);
  }
}
