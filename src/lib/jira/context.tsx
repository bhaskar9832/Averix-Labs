'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ProjectMember, Issue, IssueStatus, IssuePriority, IssueType, ActivityItem } from './types';
import { INITIAL_MEMBERS, INITIAL_PROJECTS, INITIAL_ISSUES, INITIAL_ACTIVITIES } from './mockData';

interface JiraContextType {
  projects: Project[];
  activeProjectId: string;
  activeProject: Project;
  members: ProjectMember[];
  issues: Issue[];
  activities: ActivityItem[];
  selectedIssueId: string | null;
  searchQuery: string;
  filterAssigneeId: string;
  filterType: string;
  filterPriority: string;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  setActiveProjectId: (id: string) => void;
  setSelectedIssueId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterAssigneeId: (id: string) => void;
  setFilterType: (type: string) => void;
  setFilterPriority: (priority: string) => void;
  createIssue: (issueData: Omit<Issue, 'id' | 'key' | 'createdAt' | 'updatedAt' | 'comments'>) => Promise<Issue>;
  updateIssue: (issueId: string, updates: Partial<Issue>) => Promise<void>;
  updateIssueStatus: (issueId: string, newStatus: IssueStatus) => Promise<void>;
  deleteIssue: (issueId: string) => Promise<void>;
  addComment: (issueId: string, content: string) => Promise<void>;
  addMember: (memberData: Omit<ProjectMember, 'id'>) => Promise<ProjectMember>;
  createProject: (projectData: Omit<Project, 'id' | 'createdAt'>) => Promise<Project>;
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
}

const JiraContext = createContext<JiraContextType | undefined>(undefined);

export function JiraProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>(INITIAL_PROJECTS[0].id);
  const [members, setMembers] = useState<ProjectMember[]>(INITIAL_MEMBERS);
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssigneeId, setFilterAssigneeId] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Load from API on mount
  const refreshData = async () => {
    try {
      const res = await fetch('/api/jira');
      if (res.ok) {
        const data = await res.json();
        if (data.projects?.length) setProjects(data.projects);
        if (data.members?.length) setMembers(data.members);
        if (data.issues) setIssues(data.issues);
        if (data.activities) setActivities(data.activities);
      }
    } catch (e) {
      console.error('Failed to fetch Jira store from /api/jira', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0] || INITIAL_PROJECTS[0];

  const createIssue = async (
    issueData: Omit<Issue, 'id' | 'key' | 'createdAt' | 'updatedAt' | 'comments'>
  ): Promise<Issue> => {
    try {
      const res = await fetch('/api/jira/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData),
      });

      if (res.ok) {
        const data = await res.json();
        const newIssue = data.issue;
        setIssues((prev) => [newIssue, ...prev]);
        if (data.activity) {
          setActivities((prev) => [data.activity, ...prev]);
        }
        return newIssue;
      }
    } catch (e) {
      console.error('API createIssue error, falling back locally', e);
    }

    // Optimistic fallback
    const proj = projects.find((p) => p.id === issueData.projectId) || activeProject;
    const projectIssues = issues.filter((i) => i.projectId === proj.id);
    const key = `${proj.key}-${100 + projectIssues.length + 1}`;
    const fallbackIssue: Issue = {
      ...issueData,
      id: `iss-${Date.now()}`,
      key,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setIssues((prev) => [fallbackIssue, ...prev]);
    return fallbackIssue;
  };

  const updateIssue = async (issueId: string, updates: Partial<Issue>) => {
    // Optimistic UI update
    setIssues((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, ...updates, updatedAt: new Date().toISOString() } : iss))
    );

    try {
      await fetch(`/api/jira/issues/${issueId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (e) {
      console.error('API updateIssue error', e);
    }
  };

  const updateIssueStatus = async (issueId: string, newStatus: IssueStatus) => {
    const target = issues.find((i) => i.id === issueId);
    if (!target || target.status === newStatus) return;

    setIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, status: newStatus, updatedAt: new Date().toISOString() } : i))
    );

    try {
      await fetch(`/api/jira/issues/${issueId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.error('API updateIssueStatus error', e);
    }
  };

  const deleteIssue = async (issueId: string) => {
    setIssues((prev) => prev.filter((i) => i.id !== issueId));
    if (selectedIssueId === issueId) setSelectedIssueId(null);

    try {
      await fetch(`/api/jira/issues/${issueId}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.error('API deleteIssue error', e);
    }
  };

  const addComment = async (issueId: string, content: string) => {
    const author = members[0] || INITIAL_MEMBERS[0];
    const optimisticComment = {
      id: `comm-${Date.now()}`,
      authorId: author.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      content,
      createdAt: new Date().toISOString(),
    };

    setIssues((prev) =>
      prev.map((iss) =>
        iss.id === issueId
          ? { ...iss, comments: [...iss.comments, optimisticComment], updatedAt: new Date().toISOString() }
          : iss
      )
    );

    try {
      await fetch(`/api/jira/issues/${issueId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, authorId: author.id }),
      });
    } catch (e) {
      console.error('API addComment error', e);
    }
  };

  const addMember = async (memberData: Omit<ProjectMember, 'id'>): Promise<ProjectMember> => {
    try {
      const res = await fetch('/api/jira/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });

      if (res.ok) {
        const data = await res.json();
        setMembers((prev) => [...prev, data.member]);
        return data.member;
      }
    } catch (e) {
      console.error('API addMember error', e);
    }

    const fallbackMember: ProjectMember = {
      ...memberData,
      id: `user-${Date.now()}`,
    };
    setMembers((prev) => [...prev, fallbackMember]);
    return fallbackMember;
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
    try {
      const res = await fetch('/api/jira/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => [...prev, data.project]);
        setActiveProjectId(data.project.id);
        return data.project;
      }
    } catch (e) {
      console.error('API createProject error', e);
    }

    const fallbackProj: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: projectData.status || 'ACTIVE',
      sdlcPhase: projectData.sdlcPhase || 'REQUIREMENTS',
      clientName: projectData.clientName || 'Valued Client',
      clientEmail: projectData.clientEmail || 'client@example.com',
      clientCompany: projectData.clientCompany || 'Client Org',
      clientAddress: projectData.clientAddress || 'Global',
      budget: projectData.budget || 10000,
      ourCharges: projectData.ourCharges || 8500,
      estimatedCost: projectData.estimatedCost || 4000,
      actualCost: projectData.actualCost || 3500,
      currency: projectData.currency || 'USD',
      deliverables: projectData.deliverables || 'Full deliverables and production handover.',
    };
    setProjects((prev) => [...prev, fallbackProj]);
    setActiveProjectId(fallbackProj.id);
    return fallbackProj;
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p))
    );

    try {
      await fetch(`/api/jira/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (e) {
      console.error('API updateProject error', e);
    }
  };

  return (
    <JiraContext.Provider
      value={{
        projects,
        activeProjectId,
        activeProject,
        members,
        issues,
        activities,
        selectedIssueId,
        searchQuery,
        filterAssigneeId,
        filterType,
        filterPriority,
        isLoading,
        refreshData,
        setActiveProjectId,
        setSelectedIssueId,
        setSearchQuery,
        setFilterAssigneeId,
        setFilterType,
        setFilterPriority,
        createIssue,
        updateIssue,
        updateIssueStatus,
        deleteIssue,
        addComment,
        addMember,
        createProject,
        updateProject,
      }}
    >
      {children}
    </JiraContext.Provider>
  );
}

export function useJira() {
  const context = useContext(JiraContext);
  if (!context) {
    throw new Error('useJira must be used within a JiraProvider');
  }
  return context;
}
