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
    <section className="bg-[#093443] text-white py-7 sm:py-9 border-y border-[#06242F] shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4.5 text-center">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i} 
                className="flex flex-col items-center p-3.5 sm:p-4 rounded-xl bg-[#0F5167]/60 hover:bg-[#0F5167]/90 border border-[#7BCCEA]/25 hover:border-[#7BCCEA]/70 transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <div className="p-2 rounded-full bg-[#093443] text-[#7BCCEA] mb-2 group-hover:scale-110 group-hover:text-amber-300 transition-transform">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                  {st.value}
                </span>
                <span className="text-xs font-bold text-[#7BCCEA] mt-1 uppercase tracking-wide">
                  {st.label}
                </span>
                <span className="text-[11px] text-teal-100/80 mt-0.5 line-clamp-1">
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

