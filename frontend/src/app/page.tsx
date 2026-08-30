'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/Hero/HeroSection';
import { PillarNavigation } from '@/components/Pillars/PillarNavigation';
import { NewsTicker } from '@/components/NewsTicker/NewsTicker';
import { StationRadar } from '@/components/DashboardTeaser/StationRadar';
import { OutreachPreview } from '@/components/DashboardTeaser/OutreachPreview';
import { MiniDataExplorer } from '@/components/DashboardTeaser/MiniDataExplorer';
import { ScientistShowcase } from '@/components/Scientists/ScientistShowcase';
import {
  Compass,
  Bot,
  Database,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  Globe2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  const stats = [
    { label: 'Permanent Polar Stations', value: '4', sub: 'Antarctica, Arctic & Himalayas' },
    { label: 'Indian Antarctic Expeditions', value: '44+', sub: 'Continuous Since 1981' },
    { label: 'Scientific Datasets Indexed', value: '1,450+', sub: 'Ice, Atmosphere, Ocean' },
    { label: 'Peer-Reviewed Publications', value: '820+', sub: 'Indexed with RAG Vectors' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Banner with Real Polar Background, Search & Leadership */}
      <HeroSection />

      {/* 2. 6-Pillar Government Category Navigation Strip */}
      <PillarNavigation />

      {/* 3. What's New Live Announcements Ticker */}
      <NewsTicker />

      {/* 4. Core Interactive Discovery 3-Column Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b border-gray-200 pb-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#FF9933]">
                LIVE KNOWLEDGE REPOSITORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#002147]">
                Smart Polar Science Intelligence
              </h2>
            </div>
            <p className="text-xs text-gray-500 max-w-md">
              Explore interconnected research telemetry, automated outreach summaries, and in-browser scientific chart visualizations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Station Radar */}
            <div className="h-full">
              <StationRadar />
            </div>

            {/* Column 2: AI Outreach Engine */}
            <div className="h-full">
              <OutreachPreview />
            </div>

            {/* Column 3: In-Browser Data Explorer */}
            <div className="h-full">
              <MiniDataExplorer />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Highlight Banner: AI Research Assistant (RAG Engine) */}
      <section className="bg-linear-to-r from-[#002147] via-[#0B3D91] to-[#002147] text-white py-10 border-y border-[#0B3D91] relative overflow-hidden">
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xs p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#FF9933] text-black text-[11px] font-black uppercase tracking-wider rounded-2xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mistral Large 3 RAG Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mb-2 leading-tight">
                Ask HimSagar AI Assistant
              </h2>
              <p className="text-sm text-gray-200 leading-relaxed mb-4">
                Ask complex polar science questions in natural language. Powered by vector retrieval over hundreds of NCPOR expedition reports, ice core logs, and ocean salinity studies — with direct verifiable source citations.
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-gray-300 font-semibold">Try Asking:</span>
                {[
                  'What is the average winter temperature at Bharati Station?',
                  'How do ice cores reveal Southern Annular Mode shifts?',
                  'What species were surveyed in the 42nd Antarctic Expedition?',
                ].map((q, i) => (
                  <Link
                    key={i}
                    href={`/assistant?q=${encodeURIComponent(q)}`}
                    className="bg-white/15 hover:bg-white/25 text-gray-100 border border-white/20 px-2.5 py-1 rounded-xs transition-colors truncate max-w-xs block"
                  >
                    "{q}"
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/assistant"
                className="px-6 py-3 bg-[#FF9933] hover:bg-[#e68524] text-black font-extrabold text-sm uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Bot className="w-4 h-4" />
                <span>Launch AI Assistant</span>
              </Link>
              <Link
                href="/articles"
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-sm uppercase tracking-wider rounded-xs border border-white/30 flex items-center justify-center gap-2 transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>Knowledge Graph</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Institutional Impact Stats Grid */}
      <section className="py-8 bg-white border-b border-[#CCCCCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#F2F2F2] border border-[#CCCCCC] rounded-xs p-4 text-center hover:border-[#0B3D91] transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-serif font-black text-[#0B3D91] mb-1">
                  {stat.value}
                </div>
                <div className="font-bold text-xs sm:text-sm text-gray-800 leading-snug">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Meet Our Scientists Showcase */}
      <ScientistShowcase />

      {/* 8. Mission & Institutional Commitment Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F2F2F2] border border-[#CCCCCC] rounded-xs p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[#138808] font-bold text-xs uppercase tracking-widest mb-1">
                <Globe2 className="w-4 h-4" />
                <span>National Polar Research Mandate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#002147] mb-3">
                Advancing India's Polar & Ocean Frontiers
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Under the aegis of the Ministry of Earth Sciences, NCPOR spearheads India's scientific presence across the cryosphere — from the frozen expanses of Antarctica and the Arctic to the glaciers of the high Himalayas and the Southern Ocean. HimSagar bridges raw field research and public understanding through AI-assisted curation, open data access, and verified knowledge graphs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-gray-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                  <span>100% Verifiable Source Traceability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                  <span>Human-in-the-Loop Editorial Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                  <span>Interactive In-Browser Data Charts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                  <span>Multilingual Outreach (IndicTrans2)</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-72 bg-white border border-[#CCCCCC] p-4 rounded-xs shadow-xs text-center shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-[#0B3D91] text-[#0B3D91] flex items-center justify-center mx-auto mb-2 font-bold text-xl">
                🇮🇳
              </div>
              <h3 className="font-serif font-bold text-sm text-[#0B3D91] mb-1">
                Researcher & Admin Access
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Authorized NCPOR scientists and Communications Officers can log in to submit datasets, trigger auto-tagging, or review drafts.
              </p>
              <Link
                href="/login"
                className="w-full inline-block py-2 bg-[#0B3D91] hover:bg-[#002147] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
              >
                Access Portal Login →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
