-- Aiven tables used by the blog and Jira routes. IDs are application-generated
-- strings (for example proj-..., iss-..., post-...), rather than UUIDs.
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Technology',
  tags TEXT[] NOT NULL DEFAULT '{}',
  cover_image TEXT,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar TEXT,
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  likes_count INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS public.blog_comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT,
  author_avatar TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS blog_comments_post_id_idx ON public.blog_comments(post_id);

CREATE TABLE IF NOT EXISTS public.jira_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT,
  department TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS public.jira_projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  lead_id TEXT,
  category TEXT,
  description TEXT,
  avatar_color TEXT,
  default_assignee_id TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  sdlc_phase TEXT NOT NULL DEFAULT 'REQUIREMENTS',
  client_name TEXT,
  client_email TEXT,
  client_company TEXT,
  client_address TEXT,
  budget NUMERIC NOT NULL DEFAULT 0,
  our_charges NUMERIC NOT NULL DEFAULT 0,
  estimated_cost NUMERIC NOT NULL DEFAULT 0,
  actual_cost NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  deadline DATE,
  closed_at TIMESTAMPTZ,
  deliverables TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS public.jira_issues (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  project_id TEXT NOT NULL REFERENCES public.jira_projects(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'task',
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'todo',
  assignee_id TEXT,
  reporter_id TEXT,
  story_points NUMERIC NOT NULL DEFAULT 0,
  tags TEXT[] NOT NULL DEFAULT '{}',
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS jira_issues_project_id_idx ON public.jira_issues(project_id);
CREATE TABLE IF NOT EXISTS public.jira_comments (
  id TEXT PRIMARY KEY,
  issue_id TEXT NOT NULL REFERENCES public.jira_issues(id) ON DELETE CASCADE,
  author_id TEXT,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS jira_comments_issue_id_idx ON public.jira_comments(issue_id);
CREATE TABLE IF NOT EXISTS public.jira_activities (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  user_avatar TEXT,
  action TEXT NOT NULL,
  target TEXT,
  issue_key TEXT,
  project_id TEXT REFERENCES public.jira_projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS jira_activities_project_id_idx ON public.jira_activities(project_id);
