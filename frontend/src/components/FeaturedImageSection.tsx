'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  BookOpen, 
  ExternalLink, 
  Bot, 
  CheckCircle2, 
  Tag, 
  GraduationCap, 
  Microscope,
  Calendar,
  Layers,
  Share2
} from 'lucide-react';

export default function FeaturedImageSection() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'simple' | 'detailed'>('simple');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="featured-observation" className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#138808]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
                NCPOR Field Intelligence & AI Outreach Engine
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#002147]">
              {t.featuredImageTitle}
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl font-sans">
              {t.featuredImageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share Observation'}</span>
            </button>

            <Link
              href="/assistant"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0B3D91] bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI About This</span>
            </Link>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The Attached Image + Metadata Bar */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="relative rounded-lg overflow-hidden border border-gray-300 bg-slate-950 shadow-md">
              
              {/* Primary Image Container */}
              <div className="relative aspect-16/10 w-full">
                <Image
                  src="/images/2379df2aa50b403dfa7e1d319eb3c478.jpg"
                  alt="Polar Bear observation at Ny-Ålesund, Arctic near Indian Research Base Himadri"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />

                {/* Floating Coordinate Pill */}
                <div className="absolute top-3 left-3 bg-[#002147]/90 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded border border-blue-400/30 flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono">{t.imageCoordsTag}</span>
                </div>

                {/* Live Verification Stamp */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#0B3D91] text-[11px] font-bold px-2 py-1 rounded border border-gray-300 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>MoES Verified Asset</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-1 text-[11px] font-semibold text-amber-300">
                    <span>{t.imageStationTag}</span>
                    <span>•</span>
                    <span>{t.imageExpeditionTag}</span>
                    <span>•</span>
                    <span>{t.imageLocationTag}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-100 font-medium">
                    {t.featuredImageCaption}
                  </p>
                </div>

              </div>

              {/* Technical EXIF & Ingestion Strip */}
              <div className="bg-[#002147] text-blue-100 text-[11px] px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-t border-blue-900">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    Ingested: 2024-08-14
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Compass className="w-3 h-3 text-cyan-400" />
                    Bearing: 342° NW
                  </span>
                </div>
                <span className="font-mono text-amber-300">Sensor: MoES Field Telemetry CAM-04</span>
              </div>

            </div>

            {/* AI Auto-Extracted Tags (Demonstrates Platform PRD Feature) */}
            <div className="bg-gray-50 rounded-md p-3.5 border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                <Tag className="w-3.5 h-3.5 text-[#0B3D91]" />
                <span>AI Auto-Extracted Entities (Mistral Large 3 Pipeline):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 text-xs font-medium bg-white text-[#0B3D91] border border-blue-200 rounded">
                  Species: Ursus maritimus
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-white text-gray-700 border border-gray-300 rounded">
                  Domain: Arctic Cryosphere
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-white text-gray-700 border border-gray-300 rounded">
                  Station: Himadri (Ny-Ålesund)
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-white text-gray-700 border border-gray-300 rounded">
                  Fjord: Kongsfjorden
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-900 border border-amber-300 rounded">
                  Climate Metric: Sea-Ice Extent
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: AI Outreach Explanation & Knowledge Graph Connection */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Explainer Card with Toggle (Core SIH Feature) */}
            <div className="bg-white rounded-lg border-2 border-blue-200/90 shadow-sm p-5 space-y-4">
              
              {/* Header with Student vs Researcher Toggle */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#0B3D91] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  AI Outreach Engine
                </span>

                {/* View Switcher Toggle */}
                <div className="inline-flex p-0.5 bg-gray-100 rounded-md border border-gray-300">
                  <button
                    onClick={() => setActiveTab('simple')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                      activeTab === 'simple'
                        ? 'bg-[#0B3D91] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Simple</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('detailed')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                      activeTab === 'detailed'
                        ? 'bg-[#0B3D91] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Microscope className="w-3.5 h-3.5" />
                    <span>Scientific</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Content Display */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  <span>{activeTab === 'simple' ? t.explainSimplyBtn : t.explainDetailedBtn}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Verified by NCPOR Scientist
                  </span>
                </div>

                <div className="text-sm leading-relaxed text-gray-700 bg-blue-50/50 p-4 rounded-md border border-blue-100 font-sans min-h-[120px]">
                  {activeTab === 'simple' ? t.simpleExplanation : t.detailedExplanation}
                </div>
              </div>

              {/* Source Document Citation Link */}
              <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <BookOpen className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900">Source Report: </span>
                    <span>17th Indian Arctic Expedition Annual Science Summary, Vol. IV (pp. 42-49).</span>
                  </div>
                </div>

                <Link
                  href="/articles/1"
                  className="text-xs font-bold text-[#003366] hover:text-[#0B3D91] hover:underline flex items-center gap-1 mt-1"
                >
                  <span>{t.viewSourceDocument}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

            </div>

            {/* Knowledge Graph Card (Connecting entities) */}
            <div className="bg-[#002147] text-white rounded-lg p-4 border border-blue-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Knowledge Graph Relational Link
                </span>
                <span className="text-[10px] bg-blue-900 text-blue-200 px-2 py-0.5 rounded">
                  4 Connected Nodes
                </span>
              </div>

              <div className="text-xs space-y-2 text-blue-100">
                <div className="flex items-center justify-between bg-blue-950/70 p-2 rounded border border-blue-800/60">
                  <span className="text-gray-300">Principal Investigator:</span>
                  <span className="font-semibold text-white">Dr. K. Ramanathan (NCPOR)</span>
                </div>
                <div className="flex items-center justify-between bg-blue-950/70 p-2 rounded border border-blue-800/60">
                  <span className="text-gray-300">Associated Expedition:</span>
                  <span className="font-semibold text-white">17th Indian Arctic Expedition</span>
                </div>
                <div className="flex items-center justify-between bg-blue-950/70 p-2 rounded border border-blue-800/60">
                  <span className="text-gray-300">Open Dataset:</span>
                  <span className="font-semibold text-amber-300">Kongsfjorden Ice-Pack #ARC-08</span>
                </div>
              </div>

              <Link
                href="/explore"
                className="w-full text-center block py-2 text-xs font-bold text-white bg-[#0B3D91] hover:bg-blue-700 rounded transition-colors"
              >
                Open Full Knowledge Graph →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
