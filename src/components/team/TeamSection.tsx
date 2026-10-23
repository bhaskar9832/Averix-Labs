"use client";

import { useState } from "react";
import Image from "next/image";
import { TeamMember, TechCategory, teamMembers } from "@/data/team";
import { 
  X, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Terminal, 
  Database, 
  Cpu, 
  Cloud,
  ChevronRight
} from "lucide-react";

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0e] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">Team Profile & Experience</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
          {/* Member Hero */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-zinc-800">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700/60 flex-shrink-0 shadow-lg">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
                {member.role}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {member.name}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-1 max-w-xl">
                {member.tagline}
              </p>
              
              <div className="flex items-center gap-4 mt-3">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* About section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">
              <Sparkles size={14} />
              <span>About Me</span>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-2.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
              {member.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Grid: Areas of Expertise & Career Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Areas of Expertise */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <Layers size={14} />
                <span>Areas of Expertise</span>
              </div>
              <div className="space-y-2.5">
                {member.areasOfExpertise.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 rounded-xl transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 pl-3.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <Briefcase size={14} />
                <span>Career Highlights & Impact</span>
              </div>
              <div className="space-y-2.5">
                {member.careerHighlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 rounded-xl transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 pl-3.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack / Technologies */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Code2 size={14} />
              <span>Technologies I Work With</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {member.technologies.map((group, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl flex flex-col justify-between"
                >
                  <span className="text-xs font-mono uppercase text-zinc-400 mb-2 font-semibold">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 text-xs font-medium bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What I Bring to the Table / What Drives Me */}
          {member.keyStrengths && member.keyStrengths.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <CheckCircle2 size={14} />
                <span>{member.sectionTitle?.strengths || "What I Bring to the Table"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {member.keyStrengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 bg-zinc-900/30 border border-zinc-800/60 rounded-xl text-xs sm:text-sm text-zinc-300"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-6 py-4 bg-indigo-950/20 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <p>Let&apos;s build impactful products and meaningful solutions together!</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium text-xs ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group relative bg-[#0a0a0a] border border-[#262626] hover:border-indigo-500/50 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5"
          >
            <div>
              {/* Member Card Top */}
              <div className="flex items-start gap-6 mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Tagline / Mini bio */}
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                {member.tagline}
              </p>

              {/* Top Tech Skills Preview */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {member.technologies.slice(0, 3).flatMap(t => t.skills.slice(0, 2)).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
                <span className="px-2.5 py-1 text-xs text-zinc-500 font-mono">
                  +more
                </span>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                {member.areasOfExpertise.length} Areas • {member.careerHighlights.length} Highlights
              </span>
              <button
                onClick={() => setSelectedMember(member)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 hover:border-indigo-600 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
              >
                <span>More Info</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
