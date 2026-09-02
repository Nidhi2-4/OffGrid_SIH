'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  FileText, 
  Calendar, 
  MapPin, 
  Globe, 
  Database, 
  CheckCircle2, 
  Copy, 
  Check, 
  Bot, 
  Map, 
  Layers, 
  HardDrive, 
  ShieldCheck, 
  Share2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DatasetItem } from '@/data/explorerDatasets';

interface DatasetOverviewProps {
  dataset: DatasetItem;
  onDownload: (format: 'csv' | 'json') => void;
}

export default function DatasetOverview({ dataset, onDownload }: DatasetOverviewProps) {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [citationFormat, setCitationFormat] = useState<'apa' | 'bibtex'>('apa');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const bibtexCitation = `@dataset{${dataset.id},
  author = {${dataset.authorOrLead}},
  title = {${dataset.title}},
  year = {${dataset.updateDate.split(' ')[1] || '2024'}},
  publisher = {National Centre for Polar and Ocean Research (NCPOR)},
  doi = {${dataset.doi}},
  url = {https://doi.org/${dataset.doi}}
}`;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Quick Key Stats (Oceanic Blue Gradient) */}
      <div className="bg-gradient-to-r from-[#0F5167] via-[#0D4658] to-[#093443] border border-cyan-900/30 rounded-3xl p-6 sm:p-7 shadow-sm text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/15 text-cyan-200 border border-white/20">
                {dataset.region}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                {dataset.domain}
              </span>
              <span className="text-xs text-blue-100 font-mono">
                Updated {dataset.updateDate}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white leading-snug">
              {dataset.title}
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {dataset.description}
            </p>

            <div className="text-xs text-blue-200 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
              <span><strong>Lead:</strong> {dataset.authorOrLead}</span>
              <span>•</span>
              <span><strong>Institution:</strong> {dataset.institution}</span>
            </div>
          </div>

          {/* Quick Action Matrix */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onDownload('csv')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-[#0F5167] font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#0F5167]" />
              <span>Download Dataset (CSV)</span>
            </button>

            <div className="flex items-center gap-2">
              <Link
                href={`/assistant?q=Explain ${encodeURIComponent(dataset.title)} findings and methodology`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-200" />
                <span>Ask AI</span>
              </Link>

              <Link
                href={`/map`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 text-amber-200 text-xs font-semibold rounded-xl border border-white/20 transition-all"
              >
                <Map className="w-3.5 h-3.5" />
                <span>View Map</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/15">
          <div className="bg-white/10 rounded-xl p-3 border border-white/15">
            <div className="text-[10px] font-mono text-blue-200 uppercase">Records / Rows</div>
            <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
              {dataset.sampleData.length * 125} pts
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/15">
            <div className="text-[10px] font-mono text-blue-200 uppercase">Variables / Columns</div>
            <div className="text-base sm:text-lg font-bold text-cyan-200 font-mono mt-0.5">
              {dataset.columns.length} Features
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/15">
            <div className="text-[10px] font-mono text-blue-200 uppercase">Archive Size</div>
            <div className="text-base sm:text-lg font-bold text-amber-200 font-mono mt-0.5">
              {dataset.sizeStr}
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/15">
            <div className="text-[10px] font-mono text-blue-200 uppercase">Total Downloads</div>
            <div className="text-base sm:text-lg font-bold text-emerald-200 font-mono mt-0.5">
              {dataset.downloadCount.toLocaleString()}
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Grid: Abstract & Geospatial / Temporal Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Scientific Abstract & Methodology */}
        <div className="lg:col-span-2 space-y-6">
          {/* Abstract */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F5167] font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Scientific Abstract & Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {dataset.abstract}
            </p>
          </div>

          {/* Variables Schema Table Summary */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F5167] font-mono flex items-center gap-2">
              <Database className="w-4 h-4 text-[#0F5167]" />
              Dataset Columns & Physical Units ({dataset.columns.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px] bg-slate-50/60">
                    <th className="py-2.5 px-3 font-bold">Column Name</th>
                    <th className="py-2.5 px-3 font-bold">Type</th>
                    <th className="py-2.5 px-3 font-bold">Unit</th>
                    <th className="py-2.5 px-3 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dataset.columns.map((col) => (
                    <tr key={col.name} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F5167]">{col.name}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-amber-700">{col.type}</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-700">{col.unit || '—'}</td>
                      <td className="py-2.5 px-3 text-slate-600">{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Citation Box */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F5167] font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0F5167]" />
                How to Cite this Dataset
              </h2>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setCitationFormat('apa')}
                  className={`px-2.5 py-0.5 text-[11px] font-mono rounded cursor-pointer ${citationFormat === 'apa' ? 'bg-[#0F5167] text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  APA
                </button>
                <button
                  onClick={() => setCitationFormat('bibtex')}
                  className={`px-2.5 py-0.5 text-[11px] font-mono rounded cursor-pointer ${citationFormat === 'bibtex' ? 'bg-[#0F5167] text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  BibTeX
                </button>
              </div>
            </div>

            <div className="relative bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed">
              <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700">
                {citationFormat === 'apa' ? dataset.citation : bibtexCitation}
              </pre>

              <button
                onClick={() => copyToClipboard(citationFormat === 'apa' ? dataset.citation : bibtexCitation)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-[11px] cursor-pointer shadow-2xs"
                title="Copy Citation"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-mono">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-mono">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Metadata & Coverage Panel */}
        <div className="space-y-6">
          
          {/* Metadata Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#0F5167] border-b border-slate-100 pb-2">
              Metadata & Coverage
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-mono">Digital Object Identifier (DOI)</div>
                <a 
                  href={`https://doi.org/${dataset.doi}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-mono text-[#0F5167] font-bold hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>{dataset.doi}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-mono">Temporal Range</div>
                <div className="text-slate-800 font-medium mt-0.5">{dataset.temporalCoverage}</div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-mono">Spatial Coverage</div>
                <div className="text-slate-800 font-medium mt-0.5">{dataset.spatialCoverage}</div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-mono">Geographic Coordinates</div>
                <div className="text-[#0F5167] font-mono font-bold mt-0.5">
                  {dataset.coordinates.lat.toFixed(3)}°, {dataset.coordinates.lng.toFixed(3)}°
                </div>
              </div>

              {dataset.station && (
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Associated Facility</div>
                  <div className="text-slate-800 font-medium mt-0.5">{dataset.station}</div>
                </div>
              )}

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-mono">License</div>
                <div className="text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{dataset.license}</span>
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-mono">Available Formats</div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {dataset.fileFormats.map((fmt) => (
                    <span key={fmt} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Direct Download Options Box */}
          <div className="bg-gradient-to-br from-blue-50/60 to-cyan-50/40 rounded-2xl p-5 border border-blue-100 shadow-xs space-y-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#0F5167]">
              Download Scientific Data
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Directly download observational time-series ready for Python (pandas), R, or GIS workflows.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => onDownload('csv')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-800 transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">Comma-Separated Values (.csv)</span>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onDownload('json')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-800 transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#0F5167]" />
                  <span className="font-semibold">Structured JSON (.json)</span>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
