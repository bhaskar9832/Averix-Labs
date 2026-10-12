import fs from 'fs';
import path from 'path';
import { Project, ProjectMember, Issue, ActivityItem } from '@/lib/jira/types';
import { INITIAL_MEMBERS, INITIAL_PROJECTS, INITIAL_ISSUES, INITIAL_ACTIVITIES } from '@/lib/jira/mockData';

export interface JiraDataStore {
  projects: Project[];
  members: ProjectMember[];
  issues: Issue[];
  activities: ActivityItem[];
}

const DATA_FILE = path.join(process.cwd(), 'src/data/jira/store.json');

export function getJiraStore(): JiraDataStore {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial: JiraDataStore = {
        projects: INITIAL_PROJECTS,
        members: INITIAL_MEMBERS,
        issues: INITIAL_ISSUES,
        activities: INITIAL_ACTIVITIES,
      };
      saveJiraStore(initial);
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading Jira data store, falling back to initial data:', error);
    return {
      projects: INITIAL_PROJECTS,
      members: INITIAL_MEMBERS,
      issues: INITIAL_ISSUES,
      activities: INITIAL_ACTIVITIES,
    };
  }
}

export function saveJiraStore(data: JiraDataStore): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving Jira store to disk:', error);
  }
}
