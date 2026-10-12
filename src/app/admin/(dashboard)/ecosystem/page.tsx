import React from 'react';
import { EcosystemMonitoringDashboard } from '@/components/admin/EcosystemMonitoringDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminEcosystemPage() {
  const initialTelemetry = {
    timestamp: new Date().toISOString(),
    overallHealth: '99.98% OPERATIONAL',
    services: [
      {
        id: 'website',
        name: 'Main Website (averixlabs.com)',
        url: 'http://localhost:3000',
        domain: 'averixlabs.com',
        status: 'ONLINE',
        uptimePercentage: 99.99,
        downtimeMinutesLast30Days: 4.2,
        latencyMs: 38,
        errorRatePercent: 0.02,
        throughputRps: 412,
        cpuUsagePercent: 24,
        memoryMb: 312,
        techStack: ['Next.js 16 (App Router)', 'Tailwind CSS v4', 'Node.js 20', 'Cloudflare CDN'],
        statusCodes: { '2xx': 98.6, '3xx': 1.1, '4xx': 0.28, '5xx': 0.02 },
      },
      {
        id: 'blogs',
        name: 'Averix Blogs (blogs.averixlabs.com)',
        url: 'http://localhost:3000/blog',
        domain: 'blogs.averixlabs.com',
        status: 'ONLINE',
        uptimePercentage: 99.95,
        downtimeMinutesLast30Days: 18.5,
        latencyMs: 45,
        errorRatePercent: 0.05,
        throughputRps: 265,
        cpuUsagePercent: 19,
        memoryMb: 256,
        techStack: ['Markdown Parser', 'Redis Dynamic Cache', 'PostgreSQL Blog DB', 'ISR'],
        statusCodes: { '2xx': 97.8, '3xx': 1.9, '4xx': 0.25, '5xx': 0.05 },
      },
      {
        id: 'jira',
        name: 'Averix Jira (jira.averixlabs.com)',
        url: 'http://localhost:3000/jira',
        domain: 'jira.averixlabs.com',
        status: 'ONLINE',
        uptimePercentage: 99.97,
        downtimeMinutesLast30Days: 12.1,
        latencyMs: 52,
        errorRatePercent: 0.03,
        throughputRps: 340,
        cpuUsagePercent: 32,
        memoryMb: 420,
        techStack: ['Kanban Engine', 'SDLC State Machine', 'PDF Bill Generator', 'PostgreSQL Jira DB'],
        statusCodes: { '2xx': 99.1, '3xx': 0.7, '4xx': 0.17, '5xx': 0.03 },
      },
    ],
    timeSeries: [
      { time: '00:00', websiteLatency: 35, blogLatency: 42, jiraLatency: 48, requestsSec: 820 },
      { time: '04:00', websiteLatency: 32, blogLatency: 39, jiraLatency: 45, requestsSec: 540 },
      { time: '08:00', websiteLatency: 42, blogLatency: 46, jiraLatency: 58, requestsSec: 1120 },
      { time: '12:00', websiteLatency: 48, blogLatency: 54, jiraLatency: 62, requestsSec: 1480 },
      { time: '16:00', websiteLatency: 40, blogLatency: 45, jiraLatency: 53, requestsSec: 1250 },
      { time: '20:00', websiteLatency: 36, blogLatency: 41, jiraLatency: 49, requestsSec: 990 },
      { time: 'Now', websiteLatency: 38, blogLatency: 45, jiraLatency: 52, requestsSec: 1017 },
    ],
    trafficDistribution: [
      { name: 'Main Website', value: 40, color: '#6366f1' },
      { name: 'Averix Jira', value: 35, color: '#10b981' },
      { name: 'Averix Blogs', value: 25, color: '#f59e0b' },
    ],
    statusBreakdown: [
      { name: '2xx Success', value: 98.5, color: '#10b981' },
      { name: '3xx Redirect', value: 1.2, color: '#3b82f6' },
      { name: '4xx Client Err', value: 0.25, color: '#f59e0b' },
      { name: '5xx Server Err', value: 0.05, color: '#ef4444' },
    ],
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <EcosystemMonitoringDashboard initialData={initialTelemetry} />
    </div>
  );
}
