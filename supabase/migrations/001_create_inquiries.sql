-- ============================================================
-- Averix Labs — Supabase Database Migration
-- Project: https://rngjnsvozetujhbumeot.supabase.co
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Create the project_inquiries table
-- ============================================================
create table if not exists public.project_inquiries (
  id               uuid                     default gen_random_uuid() primary key,
  full_name        text                     not null,
  company_name     text,
  email            text                     not null,
  phone            text,
  project_type     text                     not null,
  estimated_budget text,
  project_timeline text,
  description      text                     not null,
  how_did_you_hear text,
  status           text                     not null default 'new',
  created_at       timestamp with time zone default timezone('utc', now()) not null
);

-- 2. Add a comment so the table purpose is clear
comment on table public.project_inquiries is 'Stores all project inquiry form submissions from the Averix Labs website.';

-- 3. Enable Row Level Security (RLS)
-- ============================================================
alter table public.project_inquiries enable row level security;

-- 4. Policy: Allow anonymous INSERT (website visitors submitting the form)
-- ============================================================
create policy "Allow anonymous inserts"
  on public.project_inquiries
  for insert
  to anon
  with check (true);

-- 5. Policy: Allow authenticated SELECT (you, logged into Supabase dashboard)
-- ============================================================
create policy "Allow authenticated reads"
  on public.project_inquiries
  for select
  to authenticated
  using (true);

-- 6. Policy: Allow authenticated UPDATE (so you can update status: new → contacted)
-- ============================================================
create policy "Allow authenticated updates"
  on public.project_inquiries
  for update
  to authenticated
  using (true);

-- 7. Create an index for faster queries by email and status
-- ============================================================
create index if not exists idx_inquiries_email  on public.project_inquiries (email);
create index if not exists idx_inquiries_status on public.project_inquiries (status);
create index if not exists idx_inquiries_created on public.project_inquiries (created_at desc);

-- ============================================================
-- Done! You can now view submissions at:
-- Supabase Dashboard → Table Editor → project_inquiries
-- ============================================================
