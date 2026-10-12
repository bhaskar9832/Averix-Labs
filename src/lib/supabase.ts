import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export type ProjectInquiry = {
  name: string;
  email: string;
  company?: string;
  project_type: string;
  message: string;
};

export async function submitProjectInquiry(data: ProjectInquiry): Promise<{ success: boolean }> {
  if (!supabase) {
    console.warn('[Averix Labs] Supabase is not configured.');
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
