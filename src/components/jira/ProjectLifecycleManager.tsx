'use client';

import React, { useState } from 'react';
import { 
  Project, 
  Issue, 
  SDLCPhase, 
  ProjectLifecycleStatus 
} from '@/lib/jira/types';
import { useJira } from '@/lib/jira/context';
import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText, 
  Receipt, 
  ChevronRight, 
  ShieldAlert, 
  AlertTriangle,
  Lock,
  ArrowRight,
  TrendingUp,
  Download,
  Building,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ProjectDocumentationModal } from './ProjectDocumentationModal';
import { ProjectInvoiceModal } from './ProjectInvoiceModal';

const SDLC_STEPS: { phase: SDLCPhase; title: string; desc: string; icon: string }[] = [
  { phase: 'REQUIREMENTS', title: '1. Requirements & Spec', desc: 'Scope analysis, system architecture & user stories', icon: '📝' },
  { phase: 'DESIGN', title: '2. UI/UX & System Design', desc: 'Wireframes, schema design & API contract blueprints', icon: '🎨' },
  { phase: 'DEVELOPMENT', title: '3. Sprint Engineering', desc: 'Frontend, backend APIs, distributed services & database', icon: '💻' },
  { phase: 'TESTING', title: '4. QA & Load Testing', desc: 'Regression, security auditing, benchmark validations', icon: '🧪' },
  { phase: 'DEPLOYMENT', title: '5. Production Deployment', desc: 'CI/CD pipeline rollout, DNS propagation & monitoring', icon: '🚀' },
  { phase: 'MAINTENANCE', title: '6. Maintenance & SLA', desc: 'Telemetry checks, minor optimizations & client signoff', icon: '🛡️' },
  { phase: 'COMPLETED', title: '7. Delivered & Closed', desc: 'Formal handover, client signoff, documentation & bill', icon: '🏆' },
];

export function ProjectLifecycleManager() {
  const { activeProject, issues, updateProject } = useJira();

  const [showDocModal, setShowDocModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [isClosingProject, setIsClosingProject] = useState(false);

  // Edit financial state
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetVal, setBudgetVal] = useState(activeProject.budget);
  const [chargesVal, setChargesVal] = useState(activeProject.ourCharges);
  const [estCostVal, setEstCostVal] = useState(activeProject.estimatedCost);
  const [actCostVal, setActCostVal] = useState(activeProject.actualCost);
  const [clientCompany, setClientCompany] = useState(activeProject.clientCompany);
  const [clientName, setClientName] = useState(activeProject.clientName);

  const projectIssues = issues.filter((i) => i.projectId === activeProject.id);
  const doneIssues = projectIssues.filter((i) => i.status === 'done');
  const taskProgress = projectIssues.length > 0
    ? Math.round((doneIssues.length / projectIssues.length) * 100)
    : 0;

  const currentPhaseIndex = SDLC_STEPS.findIndex((s) => s.phase === activeProject.sdlcPhase);

  const handleAdvancePhase = async (nextPhase: SDLCPhase) => {
    if (nextPhase === 'COMPLETED') {
      await updateProject(activeProject.id, {
        sdlcPhase: 'COMPLETED',
        status: 'COMPLETED',
        closedAt: new Date().toISOString(),
      });
      setShowDocModal(true);
    } else {
      await updateProject(activeProject.id, {
        sdlcPhase: nextPhase,
      });
    }
  };

  const handleCloseProject = async () => {
    if (confirm(`Are you sure you want to mark "${activeProject.name}" as COMPLETED and officially close it? This will generate the Handover Documentation and Final Bill.`)) {
      await updateProject(activeProject.id, {
        status: 'COMPLETED',
        sdlcPhase: 'COMPLETED',
        closedAt: new Date().toISOString(),
      });
      setShowDocModal(true);
    }
  };

  const handleReopenProject = async () => {
    await updateProject(activeProject.id, {
      status: 'ACTIVE',
      sdlcPhase: 'DEVELOPMENT',
      closedAt: undefined,
    });
  };

  const handleSaveFinancials = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProject(activeProject.id, {
      budget: Number(budgetVal),
      ourCharges: Number(chargesVal),
      estimatedCost: Number(estCostVal),
      actualCost: Number(actCostVal),
      clientCompany,
      clientName,
    });
    setIsEditingBudget(false);
  };

  // Financial calculations
  const grossProfit = activeProject.ourCharges - activeProject.actualCost;
  const profitMargin = activeProject.ourCharges > 0 
    ? Math.round((grossProfit / activeProject.ourCharges) * 100) 
    : 0;

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0a0b10]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Project Status Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
              <span>{activeProject.name}</span>
              <span>/</span>
              <span className="text-zinc-200 font-semibold">SDLC Lifecycle & Financials</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Project Tracking & Delivery Console
              </h1>
              {activeProject.status === 'COMPLETED' ? (
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>CLOSED & DELIVERED</span>
                </span>
              ) : (
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>ACTIVE IN PROGRESS</span>
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Track SDLC progress stage-by-stage, manage project financials, budget vs cost, and generate formal handover documentation & invoices.
            </p>
          </div>

          {/* Top Actions: Handover Doc & Invoice triggers */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowDocModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-700 transition-all shadow-sm"
              title="Generate Project Documentation PDF"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Project Documentation</span>
            </button>

            <button
              onClick={() => setShowBillModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-700 transition-all shadow-sm"
              title="Generate Client Bill / Invoice PDF"
            >
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Commercial Bill / Invoice</span>
            </button>

            {activeProject.status === 'COMPLETED' ? (
              <button
                onClick={handleReopenProject}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 rounded-lg text-xs font-semibold border border-amber-500/30 transition-all"
              >
                Reopen Project
              </button>
            ) : (
              <button
                onClick={handleCloseProject}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-rose-600/30 transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Close Project & Finalize</span>
              </button>
            )}
          </div>
        </div>

        {/* 1. SDLC Interactive Lifecycle Stepper */}
        <div className="bg-[#12141e] border border-zinc-800/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Software Development Life Cycle (SDLC) Tracker</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Current Phase: <strong className="text-indigo-400">{activeProject.sdlcPhase}</strong> • Ticket Completion: <strong className="text-emerald-400">{taskProgress}%</strong>
              </p>
            </div>

            {/* Advance Phase Shortcut */}
            {currentPhaseIndex < SDLC_STEPS.length - 1 && (
              <button
                onClick={() => handleAdvancePhase(SDLC_STEPS[currentPhaseIndex + 1].phase)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <span>Advance to {SDLC_STEPS[currentPhaseIndex + 1].title.split('.')[1]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Stepper Visual Track */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
            {SDLC_STEPS.map((step, idx) => {
              const isPast = idx < currentPhaseIndex;
              const isCurrent = idx === currentPhaseIndex;
              const isFuture = idx > currentPhaseIndex;

              return (
                <div
                  key={step.phase}
                  onClick={() => handleAdvancePhase(step.phase)}
                  className={`cursor-pointer rounded-xl p-3 border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/50'
                      : isPast
                      ? 'bg-emerald-950/20 border-emerald-800/60 hover:bg-emerald-950/30'
                      : 'bg-[#181a28]/60 border-zinc-800/60 hover:bg-[#181a28] opacity-70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-base">{step.icon}</span>
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                      ) : (
                        <span className="text-[10px] text-zinc-600 font-mono">STEP {idx + 1}</span>
                      )}
                    </div>
                    <h3 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-indigo-300' : isPast ? 'text-emerald-300' : 'text-zinc-400'}`}>
                      {step.title.split('. ')[1]}
                    </h3>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight mt-2 line-clamp-2">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Financial, Costing & Client Budget Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Client Budget */}
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-5">
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
              Agreed Client Budget
            </span>
            <div className="text-2xl font-black text-white font-mono">
              ${activeProject.budget?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Authorized project ceiling</p>
          </div>

          {/* Our Charges (Revenue) */}
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-5">
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
              Our Charges / Revenue
            </span>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              ${activeProject.ourCharges?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Billed amount to client</p>
          </div>

          {/* Actual Incurred Cost */}
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-5">
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
              Actual Internal Cost
            </span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              ${activeProject.actualCost?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Dev time, cloud & infra</p>
          </div>

          {/* Net Profit & Margin */}
          <div className="bg-[#12141e] border border-zinc-800/80 rounded-xl p-5">
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
              Net Profit Margin
            </span>
            <div className="text-2xl font-black text-indigo-400 font-mono">
              +${grossProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              <span className="text-xs text-zinc-400 font-normal ml-2">({profitMargin}%)</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Gross return on project</p>
          </div>
        </div>

        {/* 3. Detailed Client & Financial Configuration Panel */}
        <div className="bg-[#12141e] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Commercial Terms & Client Specifications</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Update billing numbers, client organization data, and project deliverables.
              </p>
            </div>

            <button
              onClick={() => setIsEditingBudget(!isEditingBudget)}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
            >
              {isEditingBudget ? 'Cancel Edit' : 'Edit Commercials'}
            </button>
          </div>

          {isEditingBudget ? (
            <form onSubmit={handleSaveFinancials} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Client Company</label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Client Contact Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Agreed Client Budget ($)</label>
                  <input
                    type="number"
                    value={budgetVal}
                    onChange={(e) => setBudgetVal(Number(e.target.value))}
                    className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Our Charges ($)</label>
                  <input
                    type="number"
                    value={chargesVal}
                    onChange={(e) => setChargesVal(Number(e.target.value))}
                    className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Estimated Internal Cost ($)</label>
                  <input
                    type="number"
                    value={estCostVal}
                    onChange={(e) => setEstCostVal(Number(e.target.value))}
                    className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Actual Incurred Cost ($)</label>
                  <input
                    type="number"
                    value={actCostVal}
                    onChange={(e) => setActCostVal(Number(e.target.value))}
                    className="w-full bg-[#1b1e2a] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingBudget(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md"
                >
                  Save Commercial Terms
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300 pt-1">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Client Profile</span>
                <p><strong>Company:</strong> {activeProject.clientCompany || 'Client Org'}</p>
                <p><strong>Lead Contact:</strong> {activeProject.clientName || 'Valued Client'}</p>
                <p><strong>Email:</strong> {activeProject.clientEmail || 'client@example.com'}</p>
                <p><strong>Address:</strong> {activeProject.clientAddress || 'Global Headquarters'}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Deliverables Scope</span>
                <p className="text-zinc-400 leading-relaxed bg-[#181a28] p-3 rounded-lg border border-zinc-800">
                  {activeProject.deliverables || 'Full production web application build, cloud architecture deployment, testing and handover documentation.'}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Closing & Handover</span>
                <p><strong>Lifecycle:</strong> {activeProject.status}</p>
                <p><strong>Current Phase:</strong> {activeProject.sdlcPhase}</p>
                <p><strong>Closed Date:</strong> {activeProject.closedAt ? new Date(activeProject.closedAt).toLocaleDateString() : 'Pending Delivery'}</p>
                <div className="pt-2">
                  <button
                    onClick={() => setShowDocModal(true)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold block underline text-xs"
                  >
                    View Handover Documentation PDF →
                  </button>
                  <button
                    onClick={() => setShowBillModal(true)}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold block underline text-xs mt-1"
                  >
                    View Final Settlement Bill PDF →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Handover Documentation Modal */}
      {showDocModal && (
        <ProjectDocumentationModal
          project={activeProject}
          issues={issues}
          onClose={() => setShowDocModal(false)}
        />
      )}

      {/* Commercial Invoice / Bill Modal */}
      {showBillModal && (
        <ProjectInvoiceModal
          project={activeProject}
          onClose={() => setShowBillModal(false)}
        />
      )}
    </div>
  );
}
