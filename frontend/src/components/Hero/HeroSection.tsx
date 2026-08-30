'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Compass, Shield, Award, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Live real-time clock updating every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(now.toLocaleString('en-US', options).replace(',', ' |'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/assistant?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickTag = (tag: string) => {
    setSearchQuery(tag);
    router.push(`/assistant?q=${encodeURIComponent(tag)}`);
  };

  // Institutional & Scientific Leadership Cards (styled like the Maharashtra portal leadership badges)
  const leaders = [
    {
      title: 'Dr. Jitendra Singh',
      role: 'Hon. Union Minister',
      org: 'Ministry of Earth Sciences',
      avatarBg: 'from-amber-600 to-amber-800',
      initials: 'JS',
    },
    {
      title: 'Dr. M. Ravichandran',
      role: 'Secretary',
      org: 'Ministry of Earth Sciences (MoES)',
      avatarBg: 'from-blue-700 to-indigo-900',
      initials: 'MR',
    },
    {
      title: 'Dr. Thamban Meloth',
      role: 'Director',
      org: 'NCPOR, Goa',
      avatarBg: 'from-cyan-700 to-blue-900',
      initials: 'TM',
    },
    {
      title: 'Station Leader',
      role: '44th ISEA Mission',
      org: 'Bharati Station, Antarctica',
      avatarBg: 'from-emerald-700 to-teal-900',
      initials: 'BS',
    },
  ];

  return (
    <section className="relative w-full min-h-[560px] md:min-h-[620px] flex flex-col justify-between overflow-hidden text-white">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/himsagar_polar_hero.jpg"
          alt="Indian Polar Scientific Research Vessel in Antarctica Southern Ocean"
          fill
          priority
          className="object-cover object-center brightness-[0.78] contrast-[1.08]"
        />
        {/* Subtle Government Blue-Black Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#002147]/80 via-transparent to-[#002147]/95" />
      </div>

      {/* Top / Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-8 flex flex-col items-center text-center">
        {/* MoES / NCPOR Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-xs border border-white/20 rounded-xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#138808] animate-ping" />
          <span className="text-xs uppercase tracking-widest font-semibold text-gray-200">
            Ministry of Earth Sciences • NCPOR Government Portal
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight drop-shadow-md text-white mb-2">
          {t('welcomeTitle')}
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-sm sm:text-base md:text-lg text-gray-200 font-sans font-normal leading-relaxed drop-shadow-xs mb-6">
          {t('heroTagline')}
        </p>

        {/* Central Search Box */}
        <form onSubmit={handleSearch} className="w-full max-w-3xl mb-4">
          <div className="flex shadow-2xl rounded-xs overflow-hidden border border-white/40">
            <div className="relative flex-1 bg-white text-gray-900 flex items-center">
              <Search className="w-5 h-5 text-gray-500 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full px-3 py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0B3D91] hover:bg-[#002147] active:bg-[#082a63] text-white font-bold text-sm md:text-base px-6 sm:px-8 py-3.5 uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 border-l border-[#0B3D91]"
            >
              <span>{t('searchBtn')}</span>
            </button>
          </div>
        </form>

        {/* Quick Search Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-200">
          <span className="font-semibold text-[#FF9933]">{t('trendingSearches')}</span>
          {['44th Antarctic Expedition', 'Bharati Station', 'Himadri Arctic', 'Ice Core Temp', 'Southern Ocean Salinity'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => handleQuickTag(tag)}
                className="bg-black/40 hover:bg-black/60 border border-white/25 px-2.5 py-0.5 rounded-xs transition-colors hover:border-[#FF9933] text-gray-100 hover:text-white"
              >
                #{tag}
              </button>
            )
          )}
        </div>

        {/* Key Leadership & Scientific Directory Cards (Maharashtra gov portal style) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-4xl">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-white/95 text-gray-900 backdrop-blur-xs border border-gray-300 rounded-xs p-2 flex items-center gap-2 text-left shadow-md hover:bg-white transition-colors"
            >
              {/* Leader Avatar Badge */}
              <div
                className={`w-9 h-9 rounded-full bg-linear-to-br ${leader.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs border border-white`}
              >
                {leader.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-bold text-[#0B3D91] truncate leading-tight">
                  {leader.title}
                </div>
                <div className="text-[10px] text-[#138808] font-bold uppercase tracking-tight truncate">
                  {leader.role}
                </div>
                <div className="text-[9px] text-gray-600 truncate leading-tight">
                  {leader.org}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Live Bar (Clock + Location Indicator) */}
      <div className="relative z-10 bg-black/60 backdrop-blur-xs border-t border-white/15 px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-gray-200">
          <Clock className="w-3.5 h-3.5 text-[#FF9933]" />
          <span>{currentTime || 'Aug 30, 2026 | 23:14:01'}</span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-200 font-sans text-xs">
          <MapPin className="w-3.5 h-3.5 text-[#FF9933]" />
          <span className="font-semibold text-white">ORV Sagar Kanya & Bharati Station</span>
          <span className="text-gray-400">| Larsemann Hills, East Antarctica (69°24′S 76°11′E)</span>
        </div>
      </div>
    </section>
  );
};
