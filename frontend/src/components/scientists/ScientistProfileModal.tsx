'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  BookOpen, 
  Database, 
  Compass, 
  MapPin, 
  Award, 
  Mail, 
  ExternalLink, 
  Bot, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Ship, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import { Scientist, ScientistPublication, ScientistDataset } from '@/data/scientistsData';

interface ScientistProfileModalProps {
  scientist: Scientist | null;
  onClose: () => void;
}

export default function ScientistProfileModal({ scientist, onClose }: ScientistProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'publications' | 'datasets' | 'expeditions' | 'overview'>('publications');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!scientist) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDoi(id);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-500 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Profile Header (Oceanic Blue Gradient) */}
        <div className="bg-gradient-to-r from-[#0F5167] via-[#0D4658] to-[#093443] p-6 sm:p-7 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Profile (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-slate-100 border-4 border-white/30 shadow-lg shrink-0">
              <Image
                src={scientist.avatar}
                alt={scientist.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Main Info */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/20 text-cyan-200 border border-white/25">
                  {scientist.primaryRegion}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  {scientist.domain}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white truncate">
                {scientist.name}
              </h1>

              <p className="text-xs sm:text-sm text-blue-100 font-medium">
                {scientist.designation} • {scientist.department}
              </p>
              <p className="text-xs text-blue-200">
                {scientist.institution}
              </p>

              {/* Links & Email */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-200 pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-cyan-300" />
                  {scientist.email}
                </span>
                <span>•</span>
                <span>ORCID: {scientist.orcid}</span>
              </div>
            </div>

            {/* Quick Ask AI CTA */}
            <div className="shrink-0 self-stretch sm:self-center">
              <Link
                href={`/assistant?q=Summarize Dr. ${encodeURIComponent(scientist.name)} research findings and key publications`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-[#0F5167] text-xs font-bold rounded-xl shadow-md transition-all w-full sm:w-auto"
              >
                <Bot className="w-4 h-4 text-[#0F5167]" />
                <span>Ask AI About Scientist</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-white/15 text-center font-mono">
            <div className="bg-white/10 rounded-xl p-2.5 border border-white/15">
              <div className="text-[10px] text-blue-200 uppercase">H-Index</div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">{scientist.hIndex}</div>
            </div>

            <div className="bg-white/10 rounded-xl p-2.5 border border-white/15">
              <div className="text-[10px] text-blue-200 uppercase">Citations</div>
              <div className="text-base sm:text-lg font-bold text-cyan-200 mt-0.5">{scientist.totalCitations.toLocaleString()}</div>
            </div>

            <div className="bg-white/10 rounded-xl p-2.5 border border-white/15">
              <div className="text-[10px] text-blue-200 uppercase">Publications</div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">{scientist.publicationsCount}</div>
            </div>

            <div className="bg-white/10 rounded-xl p-2.5 border border-white/15">
              <div className="text-[10px] text-blue-200 uppercase">Datasets</div>
              <div className="text-base sm:text-lg font-bold text-emerald-200 mt-0.5">{scientist.datasetsCount}</div>
            </div>

            <div className="bg-white/10 rounded-xl p-2.5 border border-white/15 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-blue-200 uppercase">Expeditions</div>
              <div className="text-base sm:text-lg font-bold text-amber-200 mt-0.5">{scientist.expeditionsCount}</div>
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('publications')}
            className={`flex items-center gap-1.5 py-3 px-3.5 border-b-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'publications'
                ? 'border-[#0F5167] text-[#0F5167]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Publications ({scientist.publications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('datasets')}
            className={`flex items-center gap-1.5 py-3 px-3.5 border-b-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'datasets'
                ? 'border-[#0F5167] text-[#0F5167]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Published Datasets ({scientist.datasets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('expeditions')}
            className={`flex items-center gap-1.5 py-3 px-3.5 border-b-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'expeditions'
                ? 'border-[#0F5167] text-[#0F5167]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ship className="w-4 h-4" />
            <span>Expeditions ({scientist.expeditions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 py-3 px-3.5 border-b-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#0F5167] text-[#0F5167]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Biography & Affiliations</span>
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* TAB 1: PUBLICATIONS */}
          {activeTab === 'publications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>PEER-REVIEWED SCIENTIFIC ARTICLES ({scientist.publications.length})</span>
                <span>Verified with DOI links</span>
              </div>

              <div className="space-y-3.5">
                {scientist.publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#0F5167] shadow-2xs space-y-3 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-[#0F5167] border border-blue-200">
                            {pub.journal} ({pub.year})
                          </span>
                          {pub.isLeadAuthor && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              Lead Author
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold font-serif text-[#093443] leading-snug">
                          {pub.title}
                        </h3>
                      </div>

                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0F5167] text-[11px] font-mono font-bold shrink-0 transition-colors"
                      >
                        <span>DOI</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {pub.abstract}
                    </p>

                    {/* Co-Authors & Citation Box */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-slate-600 font-mono text-[11px] truncate">
                        <strong>Co-Authors:</strong> {pub.coAuthors.join(', ')}
                      </div>

                      <button
                        onClick={() => copyToClipboard(pub.citation, pub.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0F5167] hover:underline cursor-pointer shrink-0"
                      >
                        {copiedDoi === pub.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Citation Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Citation (APA)</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PUBLISHED DATASETS */}
          {activeTab === 'datasets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>OPEN OBSERVATIONAL DATASETS ({scientist.datasets.length})</span>
                <span>FAIR Science Mandate (NCPOR)</span>
              </div>

              <div className="space-y-3.5">
                {scientist.datasets.map((ds) => (
                  <div
                    key={ds.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#0F5167] shadow-2xs space-y-3 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                            {ds.region}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {ds.domain}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {ds.sizeStr}
                          </span>
                        </div>

                        <h3 className="text-base font-bold font-serif text-[#093443] mt-1 leading-snug">
                          {ds.title}
                        </h3>
                      </div>

                      <div className="text-right text-[11px] font-mono text-slate-500 shrink-0">
                        {ds.downloadCount.toLocaleString()} downloads
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-500 font-mono text-[11px]">
                        DOI: <strong className="text-slate-700">{ds.doi}</strong>
                      </span>

                      <Link
                        href={ds.exploreUrl}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0F5167] hover:bg-[#093443] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Explore & Visualize</span>
                      </Link>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXPEDITIONS & DEPLOYMENTS */}
          {activeTab === 'expeditions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>SCIENTIFIC EXPEDITIONS & FIELD DEPLOYMENTS ({scientist.expeditions.length})</span>
              </div>

              <div className="space-y-3.5">
                {scientist.expeditions.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {exp.year}
                        </span>
                        <h3 className="text-base font-bold font-serif text-[#093443] mt-1">
                          {exp.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#0F5167]">
                          Role: {exp.role}
                        </p>
                      </div>

                      <div className="text-right text-xs text-slate-500 font-mono">
                        <div>{exp.location}</div>
                        <div className="text-[11px] text-slate-400">{exp.stationOrVessel}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {exp.highlights}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BIOGRAPHY & OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              
              {/* Bio Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2.5">
                <h3 className="text-xs font-bold font-mono text-[#0F5167] uppercase tracking-wider">
                  Scientific Career & Contributions
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {scientist.bio}
                </p>
              </div>

              {/* Research Expertise Tags */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2.5">
                <h3 className="text-xs font-bold font-mono text-[#0F5167] uppercase tracking-wider">
                  Core Research Competencies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {scientist.expertiseTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Field Station Affiliations */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2.5">
                <h3 className="text-xs font-bold font-mono text-[#0F5167] uppercase tracking-wider">
                  Polar & High-Altitude Station Network
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {scientist.stationAffiliations.map((station) => (
                    <div 
                      key={station} 
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-800"
                    >
                      <MapPin className="w-4 h-4 text-[#0F5167]" />
                      <span>{station}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>National Polar Portal • Ministry of Earth Sciences (MoES)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>

      </div>

    </div>
  );
}
