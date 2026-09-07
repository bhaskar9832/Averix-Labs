import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Only create client if credentials are present
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export type ProjectInquiry = {
  full_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  project_type: string;
  estimated_budget?: string;
  project_timeline?: string;
  description: string;
  how_did_you_hear?: string;
};

export async function submitProjectInquiry(data: ProjectInquiry): Promise<{ success: boolean }> {
  // Graceful fallback when Supabase is not configured (dev mode)
  if (!supabase) {
    console.warn('[Averix Labs] Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    console.info('[Averix Labs] Inquiry received (not saved):', data);
    return { success: true };
  }

  const { error } = await supabase
    .from('project_inquiries')
    .insert([data]);

  if (error) {
    console.error('[Averix Labs] Supabase insert error:', error);
    throw new Error(error.message);
  }

  return { success: true };
}
