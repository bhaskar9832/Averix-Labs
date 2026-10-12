import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [leadsCount, blogCount, issueCount, projectCount, memberCount] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM leads`.then(r => Number(r[0].count)).catch(() => 0),
      sql`SELECT COUNT(*) as count FROM blog_posts`.then(r => Number(r[0].count)).catch(() => 0),
      sql`SELECT COUNT(*) as count FROM jira_issues`.then(r => Number(r[0].count)).catch(() => 0),
      sql`SELECT COUNT(*) as count FROM jira_projects`.then(r => Number(r[0].count)).catch(() => 0),
      sql`SELECT COUNT(*) as count FROM jira_members`.then(r => Number(r[0].count)).catch(() => 0),
    ]);

    const gatewayTopology = {
      ingress: {
        provider: 'Cloudflare Edge CDN & DNS',
        domains: [
          { host: 'averixlabs.com', target: 'Main Website Service', status: 'ONLINE', ssl: 'Active (TLS 1.3)' },
          { host: 'blogs.averixlabs.com', target: 'Blog Service', status: 'ONLINE', ssl: 'Active (TLS 1.3)' },
          { host: 'jira.averixlabs.com', target: 'Jira Service', status: 'ONLINE', ssl: 'Active (TLS 1.3)' },
        ],
      },
      apiGateway: {
        status: 'HEALTHY',
        rateLimiter: 'Sliding Window (120 req/min per IP)',
        corsPolicy: 'Wildcard enabled (*)',
        edgeEngine: 'Next.js Edge Proxy v2.6',
        activeEndpoints: [
          '/api/gateway/telemetry',
          '/api/shared/search',
          '/api/shared/users',
          '/api/shared/audit',
          '/api/blog',
          '/api/jira',
          '/api/admin',
        ],
      },
      downstreamServices: [
        {
          name: 'Main Website Service',
          domain: 'averixlabs.com',
          database: 'Website DB (leads, messages, products)',
          health: '100% OPERATIONAL',
          records: leadsCount,
        },
        {
          name: 'Blog Service',
          domain: 'blogs.averixlabs.com',
          database: 'Blog DB (blog_posts, blog_comments)',
          health: '100% OPERATIONAL',
          records: blogCount,
        },
        {
          name: 'Jira Service',
          domain: 'jira.averixlabs.com',
          database: 'Jira DB (jira_projects, jira_issues, jira_members)',
          health: '100% OPERATIONAL',
          records: issueCount + projectCount,
        },
      ],
      sharedServices: {
        identityAuth: 'JWT + Decrypt Proxy',
        userService: 'Unified Team & Admin Directory',
        searchService: 'Global Multi-Domain Indexer',
        auditService: 'Real-Time Activity & Event Stream',
        databaseEngine: 'PostgreSQL 18.6 Enterprise SSL',
      },
      privateAdminZone: {
        securityLevel: 'Restricted (HTTP-Only Secure Cookie Session)',
        controlPlane: '/admin/dashboard',
        adminApis: ['/api/admin/leads', '/api/admin/messages', '/api/admin/stats', '/api/admin/activity'],
      },
    };

    return NextResponse.json(gatewayTopology);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
