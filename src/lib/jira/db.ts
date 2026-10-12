import { sql } from '@/lib/db';
import { Project, ProjectMember, Issue, ActivityItem, IssueComment } from '@/lib/jira/types';

export async function getJiraDbStore() {
  const [projectsRes, membersRes, issuesRes, commentsRes, activitiesRes] = await Promise.all([
    sql`SELECT * FROM jira_projects ORDER BY created_at ASC`,
    sql`SELECT * FROM jira_members ORDER BY created_at ASC`,
    sql`SELECT * FROM jira_issues ORDER BY created_at DESC`,
    sql`SELECT * FROM jira_comments ORDER BY created_at ASC`,
    sql`SELECT * FROM jira_activities ORDER BY created_at DESC LIMIT 50`,
  ]);

  const commentsByIssue: Record<string, IssueComment[]> = {};
  for (const c of commentsRes) {
    if (!commentsByIssue[c.issue_id]) commentsByIssue[c.issue_id] = [];
    commentsByIssue[c.issue_id].push({
      id: c.id,
      authorId: c.author_id,
      authorName: c.author_name,
      authorAvatar: c.author_avatar,
      content: c.content,
      createdAt: c.created_at?.toISOString() || new Date().toISOString(),
    });
  }

  const projects: Project[] = projectsRes.map((p: any) => ({
    id: p.id,
    name: p.name,
    key: p.key,
    leadId: p.lead_id,
    category: p.category,
    description: p.description,
    avatarColor: p.avatar_color,
    defaultAssigneeId: p.default_assignee_id,
    createdAt: p.created_at?.toISOString() || new Date().toISOString(),

    status: p.status || 'ACTIVE',
    sdlcPhase: p.sdlc_phase || 'DEVELOPMENT',
    clientName: p.client_name || 'Valued Client',
    clientEmail: p.client_email || 'client@example.com',
    clientCompany: p.client_company || 'Client Organization',
    clientAddress: p.client_address || 'Global Headquarters',
    budget: Number(p.budget) || 12000,
    ourCharges: Number(p.our_charges) || 9500,
    estimatedCost: Number(p.estimated_cost) || 4500,
    actualCost: Number(p.actual_cost) || 3800,
    currency: p.currency || 'USD',
    deadline: p.deadline ? p.deadline.toISOString().split('T')[0] : undefined,
    closedAt: p.closed_at ? p.closed_at.toISOString() : undefined,
    deliverables: p.deliverables || 'Fullstack software build, Cloud Infrastructure, and Testing reports.',
  }));

  const members: ProjectMember[] = membersRes.map((m: any) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role,
    department: m.department,
    avatar: m.avatar,
  }));

  const issues: Issue[] = issuesRes.map((i: any) => ({
    id: i.id,
    key: i.key,
    projectId: i.project_id,
    summary: i.summary,
    description: i.description || '',
    type: i.type,
    priority: i.priority,
    status: i.status,
    assigneeId: i.assignee_id || undefined,
    reporterId: i.reporter_id,
    storyPoints: Number(i.story_points) || 0,
    tags: i.tags || [],
    dueDate: i.due_date ? i.due_date.toISOString().split('T')[0] : undefined,
    createdAt: i.created_at?.toISOString() || new Date().toISOString(),
    updatedAt: i.updated_at?.toISOString() || new Date().toISOString(),
    comments: commentsByIssue[i.id] || [],
  }));

  const activities: ActivityItem[] = activitiesRes.map((a: any) => ({
    id: a.id,
    userId: a.user_id,
    userName: a.user_name,
    userAvatar: a.user_avatar,
    action: a.action,
    target: a.target,
    issueKey: a.issue_key,
    projectId: a.project_id,
    timestamp: a.created_at ? new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
  }));

  return { projects, members, issues, activities };
}
