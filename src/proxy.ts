import { NextResponse, type NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

// In-memory sliding window rate limiter
const ipRequests = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests = 120, windowMs = 60000) {
  const now = Date.now();
  const client = ipRequests.get(ip);
  if (!client || now > client.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  client.count += 1;
  return { allowed: client.count <= maxRequests, remaining: Math.max(0, maxRequests - client.count) };
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const pathname = url.pathname;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

  // 1. API GATEWAY: Rate Limiting & CORS for all API traffic
  if (pathname.startsWith('/api')) {
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Too Many Requests — Rate Limit Exceeded by Averix API Gateway', code: 429 }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': '120',
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          },
        }
      );
    }

    // 1B. CSRF PROTECTION: Origin / Referer validation for state-changing requests
    const stateChangingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    if (stateChangingMethods.includes(request.method) && pathname.startsWith('/api/admin')) {
      const origin = request.headers.get('origin');
      const referer = request.headers.get('referer');
      const allowedHost = host.split(':')[0]; // ignores port if local

      if (origin) {
        const originHost = new URL(origin).host.split(':')[0];
        if (originHost !== allowedHost && originHost !== 'localhost' && originHost !== '127.0.0.1') {
          return new NextResponse(
            JSON.stringify({ error: 'CSRF Protection — Cross-Origin request rejected by Security Filter', code: 403 }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }
  }

  // 2. DOMAIN / SUBDOMAIN ROUTING (HLD Cloudflare & DNS ingress)
  // Supports blogs.averixlabs.com and jira.averixlabs.com (and local testing e.g. blogs.localhost:3000)
  const isBlogsSubdomain = host.startsWith('blogs.') || host.startsWith('blog.');
  const isJiraSubdomain = host.startsWith('jira.');

  if (isBlogsSubdomain) {
    if (!pathname.startsWith('/blog') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
      url.pathname = `/blog${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  if (isJiraSubdomain) {
    if (!pathname.startsWith('/jira') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
      url.pathname = `/jira${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 3. CENTRAL AUTH INTERCEPTOR & PRIVATE ADMIN ZONE
  const session = request.cookies.get('session')?.value;
  let user = null;
  if (session) {
    try {
      user = await decrypt(session);
    } catch (e) {}
  }

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/admin/login';

  if (isAdminRoute && !isLoginRoute && !user) {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && user) {
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  // 4. Pass request with Gateway Security & CORS Headers
  const response = NextResponse.next();
  response.headers.set('X-Averix-Gateway', 'active');
  response.headers.set('X-Gateway-Engine', 'NextJS-Node-Proxy');
  if (pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
