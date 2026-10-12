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
        className="w-full max-w-4xl bg-white text-zinc-900 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls Bar (hidden during browser print) */}
        <div className="bg-[#0c0d12] text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-xs font-bold">
              $$
            </div>
            <div>
              <h2 className="text-sm font-bold">Commercial Invoice & Completion Bill</h2>
              <p className="text-[11px] text-zinc-400">PDF printable invoice formatted with Averix Labs corporate insignia</p>
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
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div id="project-invoice-printable" className="p-10 space-y-8 bg-white font-sans text-zinc-800 print:p-8">
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
              <p className="text-xs text-zinc-500 font-medium">
                Averix Labs LLC • Fullstack Software Engineering & Cloud Solutions
              </p>
              <p className="text-xs text-zinc-500">
                billing@averixlabs.com • Tax ID / EIN: AVX-983204-US
              </p>
            </div>

            <div className="text-right">
              <h1 className="text-2xl font-black tracking-tight text-zinc-900">
                INVOICE
              </h1>
              <p className="text-xs font-mono font-bold text-zinc-700 mt-1">
                {invoiceNumber}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
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
              <p className="text-zinc-400 uppercase font-bold text-[10px] tracking-wider mb-1">
                Billed To (Client):
              </p>
              <h3 className="font-bold text-sm text-zinc-900">{project.clientCompany}</h3>
              <p className="text-zinc-700 font-medium">{project.clientName}</p>
              <p className="text-zinc-500">{project.clientEmail}</p>
              <p className="text-zinc-500 leading-relaxed mt-1">{project.clientAddress}</p>
            </div>

            <div className="text-right">
              <p className="text-zinc-400 uppercase font-bold text-[10px] tracking-wider mb-1">
                Project Details:
              </p>
              <h3 className="font-bold text-sm text-zinc-900">{project.name}</h3>
              <p className="text-zinc-600 font-mono text-xs">Project Key: {project.key}</p>
              <p className="text-zinc-500">Category: {project.category}</p>
              <p className="text-zinc-500">Terms: Net 15 Upon Delivery</p>
            </div>
          </div>

          {/* Line Item Table */}
          <div>
            <table className="w-full text-left text-xs border border-zinc-200 rounded-xl overflow-hidden">
              <thead className="bg-zinc-100 text-zinc-700 font-bold">
                <tr>
                  <th className="p-3">Deliverable Item & Service Description</th>
                  <th className="p-3 w-28 text-center">Category</th>
                  <th className="p-3 w-24 text-center">Qty / Term</th>
                  <th className="p-3 w-32 text-right">Amount ({project.currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-zinc-900">Custom Architecture & Software Build</p>
                    <p className="text-zinc-500 text-[11px] leading-relaxed mt-0.5">
                      {project.deliverables}
                    </p>
                  </td>
                  <td className="p-3 text-center text-zinc-600">Core Engineering</td>
                  <td className="p-3 text-center text-zinc-600">1 Milestone</td>
                  <td className="p-3 text-right font-mono font-bold text-zinc-900">
                    ${(project.ourCharges * 0.7).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td className="p-3">
                    <p className="font-bold text-zinc-900">Cloud Infrastructure, Edge Deployment & Security Audit</p>
                    <p className="text-zinc-500 text-[11px] leading-relaxed mt-0.5">
                      SSL/TLS provisioning, database replication, rate limiting & stress benchmarks.
                    </p>
                  </td>
                  <td className="p-3 text-center text-zinc-600">DevOps & Cloud</td>
                  <td className="p-3 text-center text-zinc-600">1 Cluster</td>
                  <td className="p-3 text-right font-mono font-bold text-zinc-900">
                    ${(project.ourCharges * 0.2).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td className="p-3">
                    <p className="font-bold text-zinc-900">Comprehensive QA, Documentation & Production Signoff</p>
                    <p className="text-zinc-500 text-[11px] leading-relaxed mt-0.5">
                      Unit suites, E2E journey tests, technical runbook handover.
                    </p>
                  </td>
                  <td className="p-3 text-center text-zinc-600">Verification</td>
                  <td className="p-3 text-center text-zinc-600">1 Package</td>
                  <td className="p-3 text-right font-mono font-bold text-zinc-900">
                    ${(project.ourCharges * 0.1).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end pt-2">
            <div className="w-72 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Agreed Client Budget:</span>
                <span className="font-mono">${project.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal (Our Charges):</span>
                <span className="font-mono font-bold text-zinc-900">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Applicable Sales Tax (8%):</span>
                <span className="font-mono">${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-2 border-t-2 border-zinc-900 flex justify-between text-sm font-black text-zinc-900">
                <span>Total Amount Due:</span>
                <span className="text-emerald-700 font-mono">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} {project.currency}</span>
              </div>
            </div>
          </div>

          {/* Payment Terms & Instructions */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] space-y-1.5 text-zinc-600">
            <div className="flex items-center gap-1.5 font-bold text-zinc-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Payment Details & Wire Instructions</span>
            </div>
            <p><strong>Bank:</strong> Silicon Valley Tech Bank • <strong>Beneficiary:</strong> Averix Labs Inc</p>
            <p><strong>Account:</strong> 4920-8831-2910 • <strong>Routing:</strong> 121000358 • <strong>SWIFT:</strong> AVXUS33</p>
            <p className="text-zinc-500 pt-1">Thank you for partnering with Averix Labs. For billing inquiries, contact payments@averixlabs.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
