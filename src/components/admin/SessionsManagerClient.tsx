'use client';

import React, { useState } from 'react';
import { Laptop, Smartphone, Monitor, ShieldCheck, Power, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function SessionsManagerClient({
  initialSessions,
  currentUserEmail,
}: {
  initialSessions: any[];
  currentUserEmail: string;
}) {
  const [sessions, setSessions] = useState(initialSessions);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRevoke = async (targetSessionId: string) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/auth/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'revoke_one', targetSessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSessions((prev) =>
        prev.map((s) => (s.sessionId === targetSessionId ? { ...s, isActive: false } : s))
      );
      setMessage(data.message);
    } catch (e: any) {
      setMessage(`Failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAll = async () => {
    if (!confirm('Are you sure you want to log out from all devices?')) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/auth/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'revoke_all' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSessions((prev) =>
        prev.map((s) => (s.isCurrent ? s : { ...s, isActive: false }))
      );
      setMessage(data.message);
    } catch (e: any) {
      setMessage(`Failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-link text-xs font-mono font-semibold border border-indigo-500/20">
              Security • Active Sessions & Device Management
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Active Administrator Sessions
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Logged in as <span className="text-foreground font-mono">{currentUserEmail}</span>. Inspect active device sessions or revoke access immediately.
          </p>
        </div>

        <button
          onClick={handleRevokeAll}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-danger rounded-xl text-xs font-bold border border-rose-500/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Power className="w-3.5 h-3.5" />
          <span>Logout from all devices</span>
        </button>
      </div>

      {message && (
        <div className="flex items-center gap-2 p-3.5 text-xs text-success bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-success" />
          <p>{message}</p>
        </div>
      )}

      {/* Session Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((s) => {
          const isMac = s.device.includes('Mac');
          const isMobile = s.device.includes('Mobile');
          const Icon = isMac ? Laptop : isMobile ? Smartphone : Monitor;

          return (
            <div
              key={s.id}
              className={`p-5 rounded-2xl border transition-all ${
                s.isCurrent
                  ? 'bg-indigo-950/20 border-indigo-500/40'
                  : s.isActive
                  ? 'bg-card border-foreground/10'
                  : 'bg-black/30 border-foreground/5 opacity-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      s.isCurrent ? 'bg-indigo-600 text-white' : 'bg-foreground/5 text-foreground/70'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                      <span>{s.device}</span>
                      {s.isCurrent && (
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/30 text-link text-[10px] font-mono">
                          THIS DEVICE
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      {s.ipAddress} • {s.location}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    s.isActive
                      ? 'bg-emerald-500/10 text-success border-emerald-500/20'
                      : 'bg-rose-500/10 text-danger border-rose-500/20'
                  }`}
                >
                  {s.isActive ? 'ACTIVE' : 'REVOKED'}
                </span>
              </div>

              <div className="pt-3 border-t border-foreground/5 flex items-center justify-between text-[11px] text-muted-foreground">
                <div>
                  <span className="block text-muted-foreground text-[10px] uppercase font-bold">Last Activity</span>
                  <span>{s.lastActivityAt ? new Date(s.lastActivityAt).toLocaleTimeString() : 'Just now'}</span>
                </div>

                {s.isActive && !s.isCurrent && (
                  <button
                    onClick={() => handleRevoke(s.sessionId)}
                    disabled={loading}
                    className="px-2.5 py-1 rounded-lg bg-foreground/5 hover:bg-rose-600/20 hover:text-danger text-foreground/70 text-xs font-semibold border border-foreground/10 transition-colors cursor-pointer"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
