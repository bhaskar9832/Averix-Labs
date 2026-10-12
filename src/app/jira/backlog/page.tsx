'use client';

import React, { useState } from 'react';
import { BacklogView } from '@/components/jira/BacklogView';
import { CreateIssueModal } from '@/components/jira/CreateIssueModal';

export default function JiraBacklogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BacklogView onOpenCreateModal={() => setIsModalOpen(true)} />
      <CreateIssueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
