import { NextRequest, NextResponse } from 'next/server';
import { encrypt, decrypt, getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export interface CentralUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'contributor' | 'client';
  domainsAllowed: string[];
}

const ECOSYSTEM_USERS: CentralUser[] = [
  {
    id: 'usr-admin-1',
    name: 'Bhaskar Sarkar',
    email: 'admin@averixlabs.com',
    role: 'admin',
    domainsAllowed: ['website', 'blogs', 'jira', 'admin'],
  },
  {
    id: 'usr-tech-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@averixlabs.com',
    role: 'staff',
    domainsAllowed: ['blogs', 'jira'],
  },
  {
    id: 'usr-dev-3',
    name: 'Alex Rivera',
    email: 'alex.rivera@averixlabs.com',
    role: 'contributor',
    domainsAllowed: ['blogs', 'jira'],
  },
  {
    id: 'usr-client-4',
    name: 'Enterprise Client',
    email: 'client@partner.com',
    role: 'client',
    domainsAllowed: ['jira'],
  },
];

// GET: Inspect active Central Auth session or list directory
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    return NextResponse.json({
      status: 'AUTHENTICATED_GATEWAY',
      provider: 'Averix Central Auth Service',
      sessionUser: session || null,
      availableIdentities: ECOSYSTEM_USERS.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        domainsAllowed: u.domainsAllowed,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Central Auth Login / Token Minting for Website, Blogs, Jira, or Admin
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, targetDomain } = body;

    const matchedUser = ECOSYSTEM_USERS.find(
      (u) => u.email.toLowerCase() === (email || '').toLowerCase()
    ) || ECOSYSTEM_USERS[0];

    const token = await encrypt({
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      targetDomain: targetDomain || 'all',
      issuedAt: new Date().toISOString(),
    });

    const response = NextResponse.json({
      success: true,
      message: `Authenticated via Averix Central Auth for ${targetDomain || 'Ecosystem'}`,
      user: matchedUser,
      token,
    });

    // Set central auth cookie readable across ecosystem
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
