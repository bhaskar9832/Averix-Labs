-- Aiven PostgreSQL: preserve the original inquiry columns without Supabase roles.
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  company_name text,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL,
  estimated_budget text,
  project_timeline text,
  description text NOT NULL,
  how_did_you_hear text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.project_inquiries (email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.project_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON public.project_inquiries (created_at DESC);
