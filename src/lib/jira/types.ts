export type IssueType = 'task' | 'bug' | 'story' | 'epic' | 'improvement';
export type IssuePriority = 'lowest' | 'low' | 'medium' | 'high' | 'highest';
export type IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';

export type SDLCPhase = 
  | 'REQUIREMENTS' 
  | 'DESIGN' 
  | 'DEVELOPMENT' 
  | 'TESTING' 
  | 'DEPLOYMENT' 
  | 'MAINTENANCE' 
  | 'COMPLETED';

export type ProjectLifecycleStatus = 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Project Lead' | 'Senior Engineer' | 'Frontend Dev' | 'Backend Dev' | 'Product Designer' | 'QA Lead';
  avatar: string;
  department: string;
}

export interface IssueComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  issueKey?: string;
  projectId?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface Issue {
  id: string;
  key: string; // e.g. AVX-101
  projectId: string;
  summary: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
  status: IssueStatus;
  assigneeId?: string;
  reporterId: string;
  storyPoints?: number;
  tags: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  comments: IssueComment[];
}

export interface Project {
  id: string;
  name: string;
  key: string;
  leadId: string;
  category: string;
  description: string;
  avatarColor: string;
  defaultAssigneeId?: string;
  createdAt: string;

  // SDLC & Financial Tracking Fields
  status: ProjectLifecycleStatus;
  sdlcPhase: SDLCPhase;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientAddress: string;
  budget: number;
  ourCharges: number;
  estimatedCost: number;
  actualCost: number;
  currency: string;
  deadline?: string;
  closedAt?: string;
  deliverables: string;
}
