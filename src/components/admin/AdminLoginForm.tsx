'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, KeyRound, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@averixlabs.com');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'otp' | 'direct'>('otp');

  // Step 1: Request OTP or Direct Login
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      if (authMode === 'direct') {
        const res = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'direct_login', email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to authenticate.');
        router.push('/admin/dashboard');
        return;
      }

      // OTP Flow via Email/OTP Provider
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request_otp', email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to request OTP.');

      setStep('otp');
      setInfo(`Security code dispatched to ${email}. ${data.demoCode ? `(Testing Code: ${data.demoCode})` : ''}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify_otp', email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed.');

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-2xl border border-foreground/10">
      {/* Brand & Security Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-link mb-2">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Averix Admin Portal
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Cloudflare WAF • HTTPS • Central Auth Protected</span>
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="flex items-center gap-2 p-3.5 text-xs text-danger bg-rose-950/30 border border-rose-500/30 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0 text-danger" />
          <p>{error}</p>
        </div>
      )}

      {info && (
        <div className="flex items-start gap-2 p-3.5 text-xs text-success bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-success mt-0.5" />
          <p>{info}</p>
        </div>
      )}

      {step === 'credentials' ? (
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@averixlabs.com"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Flow Mode Switcher */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-muted-foreground">Authentication Method:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAuthMode('otp')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  authMode === 'otp' 
                    ? 'bg-indigo-500/20 text-link border border-indigo-500/40'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Email/OTP (MFA)
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('direct')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  authMode === 'direct' 
                    ? 'bg-indigo-500/20 text-link border border-indigo-500/40'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Password Only
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : authMode === 'otp' ? 'Send Verification OTP' : 'Sign In Directly'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Enter 6-Digit Verification Code
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                placeholder="123456"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-10 pr-4 py-2.5 text-base font-mono tracking-widest text-center text-foreground placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Verifying Session...' : 'Verify OTP & Enter Admin Console'}</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setStep('credentials')}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors pt-1 cursor-pointer"
          >
            ← Back to email and password
          </button>
        </form>
      )}

      {/* Architecture badge */}
      <div className="pt-4 border-t border-foreground/5 text-[10px] text-muted-foreground text-center font-mono">
        PostgreSQL (Roles) • Redis (Sessions) • OTP Provider Verified
      </div>
    </div>
  );
}
