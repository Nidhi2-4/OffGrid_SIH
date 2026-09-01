'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Ship, 
  Database, 
  FileText, 
  Users,
  Award
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
    <section className="bg-[#002147] text-white py-10 border-y border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="flex flex-col items-center p-3 rounded bg-blue-950/40 border border-blue-900/60">
                <div className="p-2 rounded-full bg-blue-900/60 text-amber-400 mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                  {st.value}
                </span>
                <span className="text-xs font-bold text-blue-200 mt-1 uppercase tracking-wider">
                  {st.label}
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
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
