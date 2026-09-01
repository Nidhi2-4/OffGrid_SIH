'use client';

import React from 'react';
import Link from 'next/link';
import { KnowledgeItem } from '@/data/polarKnowledgeBase';
import { 
  X, 
  ExternalLink, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Calendar,
  Layers,
  Copy,
  Check
} from 'lucide-react';

interface CitationDrawerProps {
  item: KnowledgeItem | null;
  onClose: () => void;
}

export default function CitationDrawer({ item, onClose }: CitationDrawerProps) {
  const [copiedBibtex, setCopiedBibtex] = React.useState(false);

  if (!item) return null;

  const bibtex = `@article{${item.id}_${item.year},
  title = {${item.title}},
  author = {${item.authors}},
  journal = {MoES National Polar Research Repository},
  year = {${item.year}},
  doi = {${item.doi || '10.5281/zenodo.ncpor'}}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-500 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      {/* Backdrop click area */}
      <div className="flex-1" onClick={onClose}></div>

      {/* Slide-in Drawer */}
      <div className="w-full max-w-lg bg-white border-l border-gray-200 text-gray-900 h-full overflow-y-auto shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-right duration-300">
        
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F5167] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                [{item.citationId}]
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0F5167] font-bold block">
                  VERIFIED CITATION EVIDENCE
                </span>
                <span className="text-xs text-gray-500 font-medium capitalize">
                  {item.category} • {item.region}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Paper Title */}
          <div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#093443] leading-snug">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              By <span className="text-gray-900 font-semibold">{item.authors}</span> ({item.year})
            </p>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Peer-Verified & Ingested into NCPOR Research Repository</span>
          </div>

          {/* Metadata Matrix */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Institution</span>
              <span className="font-bold text-[#093443] mt-0.5 line-clamp-1">{item.institution}</span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Publication Year</span>
              <span className="font-bold text-[#093443] mt-0.5">{item.year}</span>
            </div>

            {item.doi && (
              <div className="col-span-2 bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-mono block">Digital Object Identifier (DOI)</span>
                  <span className="font-mono text-[#0F5167] font-bold text-xs">{item.doi}</span>
                </div>
                <a
                  href={`https://doi.org/${item.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-[#0F5167] hover:bg-[#093443] text-[11px] font-bold text-white inline-flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <span>DOI Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Raw Passages & Excerpt */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0F5167] uppercase tracking-wider font-mono block">
              Retrieved Passage & Excerpt:
            </span>
            <div className="bg-teal-50/70 p-3.5 rounded-lg border border-teal-200 text-xs text-gray-800 font-sans leading-relaxed italic">
              &ldquo;{item.rawExcerpt}&rdquo;
            </div>
          </div>

          {/* Key Metrics Table if available */}
          {item.keyMetrics && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#093443] uppercase tracking-wider font-mono block">
                Extracted Field Metrics:
              </span>
              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 text-xs overflow-hidden shadow-2xs">
                {Object.entries(item.keyMetrics).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-3 py-2 bg-gray-50/50">
                    <span className="text-gray-600">{k}</span>
                    <span className="font-mono font-bold text-[#093443]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BibTeX Citation Block */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-500 uppercase">BibTeX Citation</span>
              <button
                onClick={copyBibtex}
                className="text-[11px] text-[#0F5167] font-bold hover:underline inline-flex items-center gap-1"
              >
                {copiedBibtex ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedBibtex ? 'Copied!' : 'Copy BibTeX'}</span>
              </button>
            </div>
            <pre className="bg-slate-900 p-2.5 rounded border border-slate-700 text-[10px] font-mono text-cyan-200 overflow-x-auto">
              {bibtex}
            </pre>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-gray-200 flex items-center gap-3">
          <Link
            href={`/map?region=${item.region.toLowerCase()}`}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#0F5167] hover:bg-[#093443] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>Locate on Polar Map</span>
          </Link>

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
