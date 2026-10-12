import React from 'react';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SessionsManagerClient } from '@/components/admin/SessionsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminSessionsPage() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  let dbSessions: any[] = [];
  try {
    dbSessions = await sql`
      SELECT 
        s.id,
        s.session_id,
        s.ip_address,
        s.user_agent,
        s.created_at,
        s.last_activity_at,
        s.expires_at,
        s.revoked_at,
        (s.revoked_at IS NULL AND s.expires_at > NOW()) as is_active
      FROM sessions s
      WHERE s.user_id = ${session.id}
      ORDER BY s.last_activity_at DESC
    `;
  } catch (e) {
    console.error('Failed to load sessions:', e);
  }

  const initialSessions = dbSessions.map((s: any) => {
    const ua = s.user_agent || '';
    let device = 'Desktop Chrome';
    if (ua.includes('Macintosh')) device = 'MacBook Chrome';
    else if (ua.includes('Windows')) device = 'Windows Chrome';
    else if (ua.includes('iPhone') || ua.includes('Android')) device = 'Mobile Browser';

    return {
      id: s.id,
      sessionId: s.session_id,
      device,
      ipAddress: s.ip_address || '127.0.0.1',
      location: 'India',
      isCurrent: s.session_id === session.sessionId,
      isActive: Boolean(s.is_active),
      createdAt: s.created_at?.toISOString() || null,
      lastActivityAt: s.last_activity_at?.toISOString() || null,
    };
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <SessionsManagerClient initialSessions={initialSessions} currentUserEmail={session.email} />
    </div>
  );
}
