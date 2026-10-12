import React from 'react';
import { sql } from '@/lib/db';
import { Shield, Key, Clock, UserPlus, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  let users: any[] = [];
  try {
    users = await sql`
      SELECT 
        u.id, 
        u.email, 
        u.first_name, 
        u.last_name, 
        u.status, 
        u.mfa_enabled,
        u.last_login_at, 
        u.created_at,
        COALESCE(
          (SELECT json_agg(r.name) 
           FROM user_roles ur 
           JOIN roles r ON ur.role_id = r.id 
           WHERE ur.user_id = u.id),
          '["staff"]'::json
        ) as roles
      FROM users u
      ORDER BY u.created_at ASC
    `;
  } catch (e) {
    console.error('Failed to load users from users table:', e);
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono font-semibold border border-indigo-500/20">
              Admin Service • User & Role Management (RBAC)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Administrator Team & Access Roles
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Backed by PostgreSQL <code className="text-indigo-400 font-mono">users</code>, <code className="text-indigo-400 font-mono">roles</code>, <code className="text-indigo-400 font-mono">permissions</code>, and <code className="text-indigo-400 font-mono">sessions</code>.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#11131a] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Active Admin Accounts ({users.length})</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400">PostgreSQL RBAC Database Realm</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/70">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-white/40">
                <th className="py-3 px-4">Administrator</th>
                <th className="py-3 px-4">Assigned Roles</th>
                <th className="py-3 px-4">MFA Policy</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-sans">
                    <p className="font-bold text-white text-sm">
                      {`${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Averix Admin'}
                    </p>
                    <p className="text-xs text-white/40 font-mono">{u.email}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {(u.roles || ['staff']).map((role: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-emerald-400 text-xs flex items-center gap-1.5 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {u.mfa_enabled ? 'MFA (Email/OTP) Required' : 'Password Only'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/50 text-xs font-sans">
                    {u.last_login_at ? new Date(u.last_login_at).toLocaleString() : 'Recent Session'}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                      u.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {u.status || 'ACTIVE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
