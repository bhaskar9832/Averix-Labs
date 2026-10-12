import React from 'react';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 selection:bg-indigo-500/30">
      <AdminLoginForm />
    </div>
  );
}
