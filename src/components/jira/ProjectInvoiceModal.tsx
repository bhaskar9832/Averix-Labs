'use client';

import React from 'react';
import { Project } from '@/lib/jira/types';
import { Printer, Download, X, Receipt, CheckCircle, ShieldCheck } from 'lucide-react';

export function ProjectInvoiceModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-AVX-${project.key}-${new Date().getFullYear()}`;
  const subtotal = project.ourCharges || 10000;
  const tax = subtotal * 0.08; // 8% standard tax
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-4xl bg-card text-foreground rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls Bar (hidden during browser print) */}
        <div className="bg-background text-foreground px-6 py-4 flex items-center justify-between border-b border-border print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-xs font-bold">
              $$
            </div>
            <div>
              <h2 className="text-sm font-bold">Commercial Invoice & Completion Bill</h2>
              <p className="text-[11px] text-muted-foreground">PDF printable invoice formatted with Averix Labs corporate insignia</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div id="project-invoice-printable" className="theme-paper p-10 space-y-8 bg-card font-sans text-foreground print:p-8">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-emerald-600 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="/images/logo.png"
                  alt="Averix Labs"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                Averix Labs LLC • Fullstack Software Engineering & Cloud Solutions
              </p>
              <p className="text-xs text-muted-foreground">
                billing@averixlabs.com • Tax ID / EIN: AVX-983204-US
              </p>
            </div>

            <div className="text-right">
              <h1 className="text-2xl font-black tracking-tight text-muted-foreground">
                INVOICE
              </h1>
              <p className="text-xs font-mono font-bold text-muted-foreground mt-1">
                {invoiceNumber}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider rounded border border-emerald-300">
                STATUS: {project.status === 'COMPLETED' ? 'PAID & SETTLED' : 'FINAL BILLING'}
              </span>
            </div>
          </div>

          {/* Client & Project Addresses */}
          <div className="grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="text-muted-foreground uppercase font-bold text-[10px] tracking-wider mb-1">
                Billed To (Client):
              </p>
              <h3 className="font-bold text-sm text-muted-foreground">{project.clientCompany}</h3>
              <p className="text-muted-foreground font-medium">{project.clientName}</p>
              <p className="text-muted-foreground">{project.clientEmail}</p>
              <p className="text-muted-foreground leading-relaxed mt-1">{project.clientAddress}</p>
            </div>

            <div className="text-right">
              <p className="text-muted-foreground uppercase font-bold text-[10px] tracking-wider mb-1">
                Project Details:
              </p>
              <h3 className="font-bold text-sm text-muted-foreground">{project.name}</h3>
              <p className="text-muted-foreground font-mono text-xs">Project Key: {project.key}</p>
              <p className="text-muted-foreground">Category: {project.category}</p>
              <p className="text-muted-foreground">Terms: Net 15 Upon Delivery</p>
            </div>
          </div>

          {/* Line Item Table */}
          <div>
            <table className="w-full text-left text-xs border border-border rounded-xl overflow-hidden">
              <thead className="bg-muted text-muted-foreground font-bold">
                <tr>
                  <th className="p-3">Deliverable Item & Service Description</th>
                  <th className="p-3 w-28 text-center">Category</th>
                  <th className="p-3 w-24 text-center">Qty / Term</th>
                  <th className="p-3 w-32 text-right">Amount ({project.currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-muted-foreground">Custom Architecture & Software Build</p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                      {project.deliverables}
                    </p>
                  </td>
                  <td className="p-3 text-center text-muted-foreground">Core Engineering</td>
                  <td className="p-3 text-center text-muted-foreground">1 Milestone</td>
                  <td className="p-3 text-right font-mono font-bold text-muted-foreground">
                    ${(project.ourCharges * 0.7).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td className="p-3">
                    <p className="font-bold text-muted-foreground">Cloud Infrastructure, Edge Deployment & Security Audit</p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                      SSL/TLS provisioning, database replication, rate limiting & stress benchmarks.
                    </p>
                  </td>
                  <td className="p-3 text-center text-muted-foreground">DevOps & Cloud</td>
                  <td className="p-3 text-center text-muted-foreground">1 Cluster</td>
                  <td className="p-3 text-right font-mono font-bold text-muted-foreground">
                    ${(project.ourCharges * 0.2).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td className="p-3">
                    <p className="font-bold text-muted-foreground">Comprehensive QA, Documentation & Production Signoff</p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                      Unit suites, E2E journey tests, technical runbook handover.
                    </p>
                  </td>
                  <td className="p-3 text-center text-muted-foreground">Verification</td>
                  <td className="p-3 text-center text-muted-foreground">1 Package</td>
                  <td className="p-3 text-right font-mono font-bold text-muted-foreground">
                    ${(project.ourCharges * 0.1).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end pt-2">
            <div className="w-72 space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Agreed Client Budget:</span>
                <span className="font-mono">${project.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal (Our Charges):</span>
                <span className="font-mono font-bold text-muted-foreground">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Applicable Sales Tax (8%):</span>
                <span className="font-mono">${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-2 border-t-2 border-border flex justify-between text-sm font-black text-muted-foreground">
                <span>Total Amount Due:</span>
                <span className="text-emerald-700 font-mono">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} {project.currency}</span>
              </div>
            </div>
          </div>

          {/* Payment Terms & Instructions */}
          <div className="p-4 rounded-xl bg-muted border border-border text-[11px] space-y-1.5 text-muted-foreground">
            <div className="flex items-center gap-1.5 font-bold text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Payment Details & Wire Instructions</span>
            </div>
            <p><strong>Bank:</strong> Silicon Valley Tech Bank • <strong>Beneficiary:</strong> Averix Labs Inc</p>
            <p><strong>Account:</strong> 4920-8831-2910 • <strong>Routing:</strong> 121000358 • <strong>SWIFT:</strong> AVXUS33</p>
            <p className="text-muted-foreground pt-1">Thank you for partnering with Averix Labs. For billing inquiries, contact payments@averixlabs.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
