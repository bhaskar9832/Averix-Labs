-- Core Schema for Averix Labs
-- Phase 1 Foundation Database Structure

-- Ensure extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ADMIN USERS
CREATE TABLE admin_users (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text NOT NULL UNIQUE,
  full_name text,
  role_id uuid,
  created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- LEADS
CREATE TABLE leads (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name text,
  last_name text,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  project_type text,
  source text,
  status text NOT NULL DEFAULT 'NEW', -- NEW, CONTACTED, QUALIFIED, PROPOSAL, NEGOTIATION, CONVERTED, LOST
  assigned_admin_id uuid REFERENCES admin_users(id),
  created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- MESSAGES
CREATE TABLE messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'UNREAD', -- UNREAD, READ, REPLIED, ARCHIVED
  created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- CUSTOMERS
CREATE TABLE customers (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id),
  company text NOT NULL,
  project text,
  source text,
  status text NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, ON HOLD, INACTIVE
  assigned_admin_id uuid REFERENCES admin_users(id),
  converted_date timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- PRODUCTS
CREATE TABLE products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text,
  full_description text,
  category text,
  status text NOT NULL DEFAULT 'DRAFT', -- DRAFT, PUBLISHED, ARCHIVED
  logo_url text,
  cover_image_url text,
  product_url text,
  cta_text text,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- ANALYTICS SESSIONS
CREATE TABLE analytics_sessions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  visitor_id text NOT NULL, -- UUID stored in localstorage
  device text,
  browser text,
  country text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  started_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
  last_active_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;

-- ACTIVITY LOGS
CREATE TABLE activity_logs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id uuid REFERENCES admin_users(id),
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  details jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- INITIAL RLS POLICIES FOR ANONYMOUS ACCESS (Form submissions, etc)
CREATE POLICY "Allow anonymous inserts to leads" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts to messages" ON messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts to analytics_sessions" ON analytics_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous read to published products" ON products FOR SELECT TO anon USING (status = 'PUBLISHED');

-- RLS FOR AUTHENTICATED USERS (Admins)
-- For simplicity in Phase 1, allow authenticated users to access everything
CREATE POLICY "Allow auth all on admin_users" ON admin_users FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all on leads" ON leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all on messages" ON messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all on customers" ON customers FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all on products" ON products FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all on analytics_sessions" ON analytics_sessions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth all on activity_logs" ON activity_logs FOR ALL TO authenticated USING (true);

