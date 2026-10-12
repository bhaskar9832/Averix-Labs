import { BlogPost } from './types';

export const SEED_FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'building-autonomous-ai-agents-with-nextjs-16',
    title: 'Architecting Enterprise AI Agents with Next.js 16 & Event-Driven Microservices',
    summary: 'A deep architectural dive into crafting deterministic, multi-turn AI coding and operational agents using reactive streaming, event brokers, and Redis.',
    content: `# Architecting Enterprise AI Agents with Next.js 16 & Event-Driven Microservices

Autonomous agents require decoupled event brokers, persistent state machines, and high-throughput vector and relation querying. In this article, we break down how Averix Labs deploys edge-distributed agent backends.

## 1. Event Mesh Topology
Rather than synchronous REST pipelines, modern agentic systems leverage streaming pub/sub message brokers to pipe token streams, tool executions, and state transformations.

\`\`\`ts
eventBroker.publish('AGENT_STEP_EXECUTED', 'AI_ENGINE', {
  step: 'ANALYSIS_COMPLETE',
  confidenceScore: 0.98,
});
\`\`\`

## 2. In-Memory State & Vector Caching
Using Redis caching layers allows agents to maintain multi-turn memory windows without hitting persistent cold-storage on every inference cycle.`,
    category: 'Artificial Intelligence',
    tags: ['AI Agents', 'Next.js 16', 'System Architecture', 'Event Driven'],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Bhaskar Sarkar',
    authorRole: 'Founder & Head of Engineering',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bhaskar',
    readTimeMinutes: 7,
    likesCount: 24,
    featured: true,
    publishedAt: '2026-10-06T10:00:00.000Z',
    updatedAt: '2026-10-06T10:00:00.000Z',
    commentsCount: 3,
  },
  {
    id: 'post-2',
    slug: 'distributed-microservices-postgresql-connection-pooling',
    title: 'High-Availability PostgreSQL Connection Pooling & Edge Gateway Design',
    summary: 'Preventing connection exhaustion and socket timeouts across distributed serverless runtimes using connection pooling and resilient failover strategies.',
    content: `# High-Availability PostgreSQL Connection Pooling & Edge Gateway Design

Distributed and edge microservices face unique challenges when connecting to relational databases like PostgreSQL. Socket starvation and TLS handshakes can quickly saturate connection pools.

## 1. Sliding Window Connection Sizing
Setting aggressive timeouts and sensible pool limits ensures that unresponsive cloud nodes do not starve the gateway pool.

\`\`\`ts
export const sql = postgres(connectionString, {
  max: 10,
  idle_timeout: 30,
  connect_timeout: 30,
  ssl: { rejectUnauthorized: false },
});
\`\`\`

## 2. Gateway Circuit Breakers
Gracefully handling connection degradation protects end-user experiences and guarantees 99.99% system availability.`,
    category: 'System Architecture',
    tags: ['PostgreSQL', 'Cloud & DevOps', 'API Gateway'],
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Sarah Chen',
    authorRole: 'Principal Cloud Architect',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    readTimeMinutes: 5,
    likesCount: 19,
    featured: false,
    publishedAt: '2026-10-05T14:30:00.000Z',
    updatedAt: '2026-10-05T14:30:00.000Z',
    commentsCount: 1,
  },
  {
    id: 'post-3',
    slug: 'modern-sdlc-automation-jira-delivery-pipelines',
    title: 'Next-Generation SDLC Tracking: From Sprint 0 to Automated Client Handover',
    summary: 'How Averix Labs streamlined software delivery across 7 lifecycle phases with automated commercial billing, margin calculation, and one-click PDF generation.',
    content: `# Next-Generation SDLC Tracking: From Sprint 0 to Automated Client Handover

Managing custom software engineering requires granular oversight of project financials and technical milestones. 

## The 7 SDLC Delivery Phases
1. **Requirements Analysis**: Scope definition & sprint zero
2. **UI/UX Design**: High-fidelity prototyping and design signoff
3. **Architecture Planning**: Data modeling and API contract definitions
4. **Development**: Sprint execution and feature commits
5. **Testing & QA**: E2E regression and load verification
6. **Deployment**: Production launch and edge CDN propagation
7. **Client Handover**: Automated PDF Handover documentation and commercial billing invoice generation.`,
    category: 'Web Engineering',
    tags: ['SDLC', 'Jira', 'Product Engineering'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Alex Rivera',
    authorRole: 'Lead Product Engineer',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    readTimeMinutes: 6,
    likesCount: 15,
    featured: false,
    publishedAt: '2026-10-04T09:15:00.000Z',
    updatedAt: '2026-10-04T09:15:00.000Z',
    commentsCount: 2,
  },
];
