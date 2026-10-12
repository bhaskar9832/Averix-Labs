'use client';

import React, { useState } from 'react';
import { JiraProvider, useJira } from '@/lib/jira/context';
import { JiraNavbar } from '@/components/jira/JiraNavbar';
import { JiraSidebar } from '@/components/jira/JiraSidebar';
import { CreateIssueModal } from '@/components/jira/CreateIssueModal';
import { IssueDetailDrawer } from '@/components/jira/IssueDetailDrawer';

function JiraLayoutInner({ children }: { children: React.ReactNode }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { selectedIssueId, setSelectedIssueId } = useJira();

  return (
    <div className="flex flex-col h-screen w-screen bg-background text-foreground overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Top Jira Bar */}
      <JiraNavbar onOpenCreateModal={() => setIsCreateOpen(true)} />

      {/* Main Content: Sidebar + Active Page */}
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>

      {/* Global Create Issue Modal */}
      <CreateIssueModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Issue Details Slide-over Drawer */}
      {selectedIssueId && (
        <IssueDetailDrawer
          issueId={selectedIssueId}
          onClose={() => setSelectedIssueId(null)}
        />
      )}
    </div>
  );
}

export default function JiraLayout({ children }: { children: React.ReactNode }) {
  return (
    <JiraProvider>
      <JiraLayoutInner>{children}</JiraLayoutInner>
    </JiraProvider>
  );
}
