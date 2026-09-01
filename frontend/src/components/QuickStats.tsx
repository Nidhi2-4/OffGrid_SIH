'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Ship, 
  Database, 
  FileText, 
  Users
} from 'lucide-react';

export default function QuickStats() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Building2,
      value: '4',
      label: t.statStations,
      sub: 'Antarctic, Arctic & Himalayas',
    },
    {
      icon: Ship,
      value: '60+',
      label: t.statExpeditions,
      sub: 'Since 1981 Inception',
    },
    {
      icon: Database,
      value: '1,240+',
      label: t.statDatasets,
      sub: 'Open Geospatial & Climate Data',
    },
    {
      icon: FileText,
      value: '480+',
      label: t.statPublications,
      sub: 'Indexed & Verifiable Reports',
    },
    {
      icon: Users,
      value: '350+',
      label: t.statScientists,
      sub: 'National Research Network',
    },
  ];

  return (
    <section className="bg-[#001f42] text-white py-6 sm:py-8 border-y border-blue-950 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 text-center">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i} 
                className="flex flex-col items-center p-3 rounded-lg bg-blue-950/50 hover:bg-blue-900/40 border border-blue-800/40 hover:border-blue-700/70 transition-all duration-200 group"
              >
                <div className="p-1.5 rounded-full bg-blue-900/60 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xl sm:text-2xl font-extrabold font-serif text-white tracking-tight">
                  {st.value}
                </span>
                <span className="text-[11px] font-bold text-blue-200 mt-0.5 uppercase tracking-wide">
                  {st.label}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                  {st.sub}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

