'use client';

import React, { useEffect, useState } from 'react';
import { 
  Search, Plus, ShieldCheck, GitBranch, MessageSquare, 
  AlertTriangle, Key, Shield, CheckCircle2, Activity,
  RefreshCw, Check, ExternalLink, Users, Save
} from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  status: string;
  mfaEnabled: boolean;
  createdAt?: string;
}

interface RolePerm {
  role_name: string;
  permission_code: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'team' | 'workspace' | 'billing' | 'integrations'>('team');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Integrations state
  const [integrations, setIntegrations] = useState<{
    neon: { configured: boolean; hasDatabaseUrl: boolean };
    github: { configured: boolean; owner: string; repo: string };
    slack: { configured: boolean; channel: string; hasWebhook: boolean; hasToken: boolean };
  } | null>(null);

  // Form state for updating API keys
  const [apiKeyForm, setApiKeyForm] = useState({
    githubApiKey: '',
    githubOwner: '',
    githubRepo: '',
    neonDatabaseUrl: '',
    slackWebhookUrl: '',
    slackBotToken: '',
    slackChannel: '#general',
  });
  const [savingKeys, setSavingKeys] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Invite modal state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('STAFF');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersRes, rolesRes, intRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/roles'),
        fetch('/api/integrations'),
      ]);

      if (usersRes.ok) {
        const uData = await usersRes.json();
        setMembers(uData.users || []);
      }
      if (rolesRes.ok) {
        const rData = await rolesRes.json();
        setRoles(rData.roles || []);
        setPermissions(rData.permissions || []);
        setRolePermissions(rData.rolePermissions || []);
      }
      if (intRes.ok) {
        const iData = await intRes.json();
        setIntegrations(iData);
        setApiKeyForm((prev) => ({
          ...prev,
          githubOwner: iData.github?.owner || '',
          githubRepo: iData.github?.repo || '',
          slackChannel: iData.slack?.channel || '#general',
        }));
      }
    } catch (err) {
      console.error('Failed to load settings data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveApiKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingKeys(true);
      setSaveSuccess(false);

      const payload: any = {};
      if (apiKeyForm.githubApiKey) payload.githubApiKey = apiKeyForm.githubApiKey;
      if (apiKeyForm.githubOwner) payload.githubOwner = apiKeyForm.githubOwner;
      if (apiKeyForm.githubRepo) payload.githubRepo = apiKeyForm.githubRepo;
      if (apiKeyForm.neonDatabaseUrl) payload.neonDatabaseUrl = apiKeyForm.neonDatabaseUrl;
      if (apiKeyForm.slackWebhookUrl) payload.slackWebhookUrl = apiKeyForm.slackWebhookUrl;
      if (apiKeyForm.slackBotToken) payload.slackBotToken = apiKeyForm.slackBotToken;
      if (apiKeyForm.slackChannel) payload.slackChannel = apiKeyForm.slackChannel;

      const res = await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        await loadData();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save configuration');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingKeys(false);
    }
  };

  const filteredMembers = members.filter((m) => 
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if a specific role possesses a permission
  const hasRolePermission = (roleName: string, permCode: string) => {
    if (roleName === 'SUPER_ADMIN') return true;
    return rolePermissions.some(
      (rp) => rp.role_name.toLowerCase() === roleName.toLowerCase() && rp.permission_code === permCode
    );
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workspace settings</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Live database access, team roles, connected API keys, and platform security.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={loadData}
            disabled={loading}
            className="bg-card border border-foreground/5 text-foreground/70 px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Sync DB
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-foreground/5 mb-6 px-2">
        <button 
          onClick={() => setActiveTab('team')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'team' ? 'text-link border-b-2 border-indigo-500' : 'text-muted-foreground hover:text-foreground/70'
          }`}
        >
          Team & access
        </button>
        <button 
          onClick={() => setActiveTab('integrations')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'integrations' ? 'text-link border-b-2 border-indigo-500' : 'text-muted-foreground hover:text-foreground/70'
          }`}
        >
          API keys & Integrations
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'team' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Real Team Members Table */}
            <div className="bg-card border border-foreground/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-foreground font-medium text-sm">Team members</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Live records queried from PostgreSQL <code className="text-link">users</code> & <code className="text-link">user_roles</code></p>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  {members.length} VERIFIED ACCOUNTS
                </span>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or email" 
                    className="w-64 bg-foreground/5 border border-foreground/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                  <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-foreground/5 pb-2">
                    <tr>
                      <th className="py-2.5 font-medium">Member</th>
                      <th className="py-2.5 font-medium">Email</th>
                      <th className="py-2.5 font-medium">Assigned Roles</th>
                      <th className="py-2.5 font-medium">MFA</th>
                      <th className="py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/5">
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 font-medium text-foreground flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-link font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                            {member.fullName.charAt(0) || 'U'}
                          </div>
                          <span>{member.fullName}</span>
                        </td>
                        <td className="py-3 text-xs text-foreground/70 font-mono">{member.email}</td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {member.roles.map((r, i) => (
                              <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-link border border-indigo-500/20">
                                {r}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 text-xs">
                          {member.mfaEnabled ? (
                            <span className="text-success font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Optional</span>
                          )}
                        </td>
                        <td className="py-3">
                          <span className="flex items-center gap-1.5 text-success text-[10px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 
                            {member.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real Roles & Permissions Matrix */}
            <div className="bg-card border border-foreground/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-foreground font-medium text-sm">Roles & permissions matrix</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Database RBAC mapping from <code className="text-link">role_permissions</code></p>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  {permissions.length} SYSTEM PERMISSIONS
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                  <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-foreground/5 pb-2">
                    <tr>
                      <th className="py-2.5 font-medium">Permission Code</th>
                      <th className="py-2.5 font-medium">Module</th>
                      <th className="py-2.5 font-medium text-center">SUPER_ADMIN</th>
                      <th className="py-2.5 font-medium text-center">BLOG_ADMIN</th>
                      <th className="py-2.5 font-medium text-center">JIRA_ADMIN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/5">
                    {permissions.slice(0, 10).map((perm) => (
                      <tr key={perm.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 font-mono text-xs text-foreground/80">{perm.code}</td>
                        <td className="py-2.5 text-xs text-muted-foreground uppercase">{perm.module}</td>
                        <td className="py-2.5 text-center">
                          <span className="text-success text-xs font-semibold">Allowed</span>
                        </td>
                        <td className="py-2.5 text-center">
                          {hasRolePermission('BLOG_ADMIN', perm.code) ? (
                            <span className="text-success text-xs font-semibold">Allowed</span>
                          ) : (
                            <span className="text-muted-foreground text-xs">Denied</span>
                          )}
                        </td>
                        <td className="py-2.5 text-center">
                          {hasRolePermission('JIRA_ADMIN', perm.code) ? (
                            <span className="text-success text-xs font-semibold">Allowed</span>
                          ) : (
                            <span className="text-muted-foreground text-xs">Denied</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-muted-foreground border-t border-foreground/5 pt-4 mt-2">
                All API routes enforce this matrix via backend <code className="text-link font-mono">requirePermission(req, permission)</code>.
              </p>
            </div>
          </div>

          {/* Right Side: Security Posture */}
          <div className="space-y-6">
            <div className="bg-card border border-foreground/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground font-medium text-sm">Security posture</h3>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">LIVE STATUS</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-success border border-emerald-500/20 px-2.5 py-1 rounded text-xs font-medium mb-6">
                <ShieldCheck className="w-3.5 h-3.5" /> High-Security Architecture Active
              </div>

              <div className="space-y-3.5 text-sm mb-6 border-b border-foreground/5 pb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Database Engine</span>
                  <span className="text-success font-medium">PostgreSQL (SSL TLS 1.3)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Password Hashing</span>
                  <span className="text-foreground font-mono text-xs">Bcrypt / Salted</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Session Storage</span>
                  <span className="text-foreground font-mono text-xs">SHA-256 Hashed in DB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cookie Flags</span>
                  <span className="text-foreground font-mono text-xs">HttpOnly; Secure; SameSite=Lax</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active DB Users</span>
                  <span className="text-foreground font-semibold">{members.length}</span>
                </div>
              </div>

              <a 
                href="/admin/sessions" 
                className="w-full bg-foreground/5 hover:bg-foreground/10 text-foreground/80 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <Activity className="w-3.5 h-3.5" /> Inspect Active Sessions
              </a>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3.5 flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-success font-medium text-xs">Immutable Audit Logging</h4>
                  <p className="text-success/70 text-[11px] mt-0.5">Every login, session revocation, and permission check is permanently recorded.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Integrations Tab: Live API Key Management */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Live Service Status */}
            <div className="bg-card border border-foreground/5 rounded-xl p-6">
              <h3 className="text-foreground font-medium text-sm mb-4">Connected Live Services</h3>

              <div className="space-y-4">
                {/* GitHub */}
                <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-foreground/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center text-background">
                      <GitBranch className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium text-sm">GitHub Telemetry</h4>
                      <p className="text-muted-foreground text-xs">
                        {integrations?.github?.configured 
                          ? `${integrations.github.owner} / ${integrations.github.repo} • Live API Sync` 
                          : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {integrations?.github?.configured ? (
                      <span className="text-success text-xs font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected
                      </span>
                    ) : (
                      <span className="text-warning text-xs font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Action Required
                      </span>
                    )}
                    <a 
                      href="/admin/github" 
                      className="bg-foreground/5 hover:bg-foreground/10 text-foreground/80 px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-1"
                    >
                      <span>View Charts</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Neon DB / PostgreSQL */}
                <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-foreground/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-success">
                      <span className="font-bold text-xs">DB</span>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium text-sm">PostgreSQL / Neon DB</h4>
                      <p className="text-muted-foreground text-xs">
                        {integrations?.neon?.hasDatabaseUrl ? 'Primary Database Connected with SSL' : 'Not configured'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-success text-xs font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected
                    </span>
                  </div>
                </div>

                {/* Slack */}
                <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-foreground/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#4A154B] flex items-center justify-center text-white">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium text-sm">Slack Incident & Alert Delivery</h4>
                      <p className="text-muted-foreground text-xs">
                        {integrations?.slack?.configured 
                          ? `${integrations.slack.channel} • Real-time Webhook active` 
                          : 'Configure Webhook URL or Bot Token below'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {integrations?.slack?.configured ? (
                      <span className="text-success text-xs font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs font-medium">Optional</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Configure Credentials Form */}
            <form onSubmit={handleSaveApiKeys} className="bg-card border border-foreground/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-foreground/5">
                <div>
                  <h3 className="text-foreground font-medium text-sm">Configure API Keys & Webhooks</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Securely persists directly to server environment variables.</p>
                </div>
                <button
                  type="submit"
                  disabled={savingKeys}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 disabled:opacity-50"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-success" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Apply</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">GitHub Personal Access Token (PAT)</label>
                  <input
                    type="password"
                    placeholder="github_pat_... (Leave blank to keep existing)"
                    value={apiKeyForm.githubApiKey}
                    onChange={(e) => setApiKeyForm({ ...apiKeyForm, githubApiKey: e.target.value })}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:border-indigo-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1">GitHub Owner / Org</label>
                    <input
                      type="text"
                      placeholder="e.g. bhaskar9832"
                      value={apiKeyForm.githubOwner}
                      onChange={(e) => setApiKeyForm({ ...apiKeyForm, githubOwner: e.target.value })}
                      className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1">GitHub Repository</label>
                    <input
                      type="text"
                      placeholder="e.g. Averix-Labs"
                      value={apiKeyForm.githubRepo}
                      onChange={(e) => setApiKeyForm({ ...apiKeyForm, githubRepo: e.target.value })}
                      className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Neon DB Connection URL (Optional Override)</label>
                  <input
                    type="password"
                    placeholder="postgresql://user:pass@ep-pooler.neon.tech/averix?sslmode=require"
                    value={apiKeyForm.neonDatabaseUrl}
                    onChange={(e) => setApiKeyForm({ ...apiKeyForm, neonDatabaseUrl: e.target.value })}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:border-indigo-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Slack Webhook URL</label>
                  <input
                    type="password"
                    placeholder="https://hooks.slack.com/services/..."
                    value={apiKeyForm.slackWebhookUrl}
                    onChange={(e) => setApiKeyForm({ ...apiKeyForm, slackWebhookUrl: e.target.value })}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-foreground/5 rounded-xl p-6">
              <h3 className="text-foreground font-medium text-sm mb-4">API Security Safeguards</h3>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-warning font-medium text-xs">Never Share Raw Keys</h4>
                  <p className="text-warning/70 text-[11px] mt-1">
                    API keys are stored server-side in encrypted environment variables and never returned in API payloads to client browsers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
