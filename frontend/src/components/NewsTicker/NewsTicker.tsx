'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, Pause, ChevronLeft, Volume2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const NewsTicker: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const newsItems = [
    {
      id: 1,
      text: '44th Indian Scientific Expedition to Antarctica (ISEA) successfully commissions atmospheric monitoring lab at Bharati Station.',
      tag: 'EXPEDITION',
      date: 'Aug 28, 2026',
    },
    {
      id: 2,
      text: 'Ice Core isotopic ratio dataset (1985–2025) released for public exploration on HimSagar Data Explorer.',
      tag: 'DATASET',
      date: 'Aug 25, 2026',
    },
    {
      id: 3,
      text: 'HimSagar AI Outreach Engine now automatically translates research briefs into Hindi and regional Indian languages.',
      tag: 'AI OUTREACH',
      date: 'Aug 22, 2026',
    },
    {
      id: 4,
      text: 'Himadri Station in Ny-Ålesund, Arctic completes summer oceanographic sampling campaign with 12 new datasets ingested.',
      tag: 'ARCTIC',
      date: 'Aug 18, 2026',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, newsItems.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <div className="bg-[#F2F2F2] border-b border-[#CCCCCC] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-[#0B3D91] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs">
            <span>{t('whatsNew')}</span>
            <span className="ml-1 text-[#FF9933]">▶▶</span>
          </div>
        </div>

        {/* Ticker Content */}
        <div className="flex-1 min-w-[280px] overflow-hidden flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-2xs bg-[#0B3D91]/10 text-[#0B3D91] border border-[#0B3D91]/30 shrink-0">
            {newsItems[currentIndex].tag}
          </span>
          <p className="text-xs text-gray-800 font-medium truncate animate-in fade-in duration-300">
            {newsItems[currentIndex].text}
          </p>
          <span className="text-[11px] text-gray-500 font-mono shrink-0 hidden sm:inline">
            ({newsItems[currentIndex].date})
          </span>
        </div>

        {/* Controls (Play/Pause, Next/Prev, More News) */}
        <div className="flex items-center gap-1.5 shrink-0 text-xs">
          <Link
            href="/articles"
            className="text-[#003366] hover:underline font-bold text-xs mr-2 shrink-0 hidden md:inline"
          >
            More News →
          </Link>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Ticker' : 'Play Ticker'}
            className="p-1 rounded-xs border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={handlePrev}
            title="Previous News"
            className="p-1 rounded-xs border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            onClick={handleNext}
            title="Next News"
            className="p-1 rounded-xs border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
