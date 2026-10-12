'use client';

import React, { useState } from 'react';
import { KanbanBoard } from '@/components/jira/KanbanBoard';
import { CreateIssueModal } from '@/components/jira/CreateIssueModal';

export default function JiraHomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <KanbanBoard onOpenCreateModal={() => setIsModalOpen(true)} />
      <CreateIssueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
