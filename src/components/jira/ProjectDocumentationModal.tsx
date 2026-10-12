'use client';

import React from 'react';
import { Project, Issue } from '@/lib/jira/types';
import { Printer, Download, X, FileText, CheckCircle2 } from 'lucide-react';

export function ProjectDocumentationModal({
  project,
  issues,
  onClose,
}: {
  project: Project;
  issues: Issue[];
  onClose: () => void;
}) {
  const projectIssues = issues.filter((i) => i.projectId === project.id);
  const doneIssues = projectIssues.filter((i) => i.status === 'done');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-4xl bg-white text-zinc-900 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Bar (hidden during browser print) */}
        <div className="bg-[#0c0d12] text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold">
              DOC
            </div>
            <div>
              <h2 className="text-sm font-bold">Official Project Handover & Architecture Document</h2>
              <p className="text-[11px] text-zinc-400">PDF printable format with Averix Labs corporate letterhead</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="project-doc-printable" className="p-10 space-y-8 bg-white font-sans text-zinc-800 print:p-8">
          {/* Letterhead Header */}
          <div className="flex items-start justify-between border-b-2 border-indigo-600 pb-6">
            <div>
              {/* Averix Labs Official Wordmark / Logo */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="/images/logo.png"
                  alt="Averix Labs"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-zinc-500 font-medium">
                Engineering Next-Generation Digital Systems, AI Clusters & Cloud Architecture
              </p>
              <p className="text-xs text-zinc-500">
                hq@averixlabs.com • averixlabs.com • Global Engineering Center
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-wider rounded-md border border-emerald-300">
                {project.status === 'COMPLETED' ? 'DELIVERED & VERIFIED' : 'PROJECT SPECIFICATION'}
              </span>
              <p className="text-xs text-zinc-400 mt-2 font-mono">
                REF: AVX-DOC-{project.key}-2026
              </p>
              <p className="text-xs text-zinc-500">
                Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 mb-2">
              {project.name}
            </h1>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Client Organization</span>
              <span className="font-bold text-zinc-900">{project.clientCompany || project.clientName}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Current SDLC Stage</span>
              <span className="font-bold text-indigo-600">{project.sdlcPhase}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Project Key Identifier</span>
              <span className="font-mono font-bold text-zinc-900">{project.key}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Total Work Items</span>
              <span className="font-bold text-zinc-900">{projectIssues.length} ({doneIssues.length} Completed)</span>
            </div>
          </div>

          {/* Scope of Deliverables */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2 mb-3">
              1. Agreed Scope & Software Deliverables
            </h2>
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 leading-relaxed whitespace-pre-wrap">
              {project.deliverables || 'Full enterprise web application, database schema migration, authenticated portals, and continuous deployment workflows.'}
            </div>
          </div>

          {/* SDLC Milestone Execution Record */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2 mb-3">
              2. SDLC Execution Milestones
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                { phase: 'Requirements & Discovery', status: 'Approved', note: 'Architecture blueprint ratified' },
                { phase: 'System & UI/UX Design', status: 'Approved', note: 'Figma tokens & WCAG AAA spec' },
                { phase: 'Core Engineering & Sprinting', status: 'Completed', note: 'Frontend, APIs, WebSocket mesh' },
                { phase: 'QA, Unit & E2E Testing', status: 'Completed', note: 'Regression & stress load tested' },
                { phase: 'Cloud Deployment', status: 'Active', note: 'Edge CDN & production DB cluster' },
                { phase: 'Handover & SLA Maintenance', status: 'Ready', note: 'Knowledge transfer & runbooks' },
              ].map((m, i) => (
                <div key={i} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-zinc-800">{m.phase}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-zinc-500">{m.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Work Items Table */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2 mb-3">
              3. Resolution & Ticket Log ({projectIssues.length} items)
            </h2>
            <table className="w-full text-left text-xs border border-zinc-200 rounded-lg overflow-hidden">
              <thead className="bg-zinc-100 text-zinc-700 font-bold">
                <tr>
                  <th className="p-2.5 w-24">Key</th>
                  <th className="p-2.5">Summary</th>
                  <th className="p-2.5 w-28">Type</th>
                  <th className="p-2.5 w-28">Status</th>
                  <th className="p-2.5 w-20 text-right">Story Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {projectIssues.slice(0, 8).map((iss) => (
                  <tr key={iss.id} className="hover:bg-zinc-50">
                    <td className="p-2.5 font-mono font-bold text-indigo-700">{iss.key}</td>
                    <td className="p-2.5 font-medium text-zinc-800">{iss.summary}</td>
                    <td className="p-2.5 uppercase font-semibold text-[10px] text-zinc-500">{iss.type}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 text-zinc-700 border border-zinc-300">
                        {iss.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-2.5 text-right font-mono text-zinc-600">{iss.storyPoints || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formal Sign-off and Handover */}
          <div className="pt-6 border-t border-zinc-200 grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="font-bold text-zinc-800 mb-1">Prepared & Delivered by:</p>
              <p className="text-zinc-600">Bhaskar Sarkar, Head of Technology</p>
              <p className="text-zinc-500">Averix Labs Engineering Leadership</p>
              <div className="mt-6 border-b border-zinc-400 w-48" />
              <p className="text-[10px] text-zinc-400 mt-1">Authorized Engineering Signature</p>
            </div>

            <div>
              <p className="font-bold text-zinc-800 mb-1">Acknowledged by Client:</p>
              <p className="text-zinc-600">{project.clientName}</p>
              <p className="text-zinc-500">{project.clientCompany}</p>
              <div className="mt-6 border-b border-zinc-400 w-48" />
              <p className="text-[10px] text-zinc-400 mt-1">Client Acceptance Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
