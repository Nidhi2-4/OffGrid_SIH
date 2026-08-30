'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Database, Bot, BarChart3, Network, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const PillarNavigation: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      title: t('catStations'),
      desc: t('catStationsDesc'),
      icon: Compass,
      href: '/map',
      tag: '4 STATIONS',
    },
    {
      title: t('catExpeditions'),
      desc: t('catExpeditionsDesc'),
      icon: Database,
      href: '/map',
      tag: 'ARCHIVE',
    },
    {
      title: t('catAiAssistant'),
      desc: t('catAiAssistantDesc'),
      icon: Bot,
      href: '/assistant',
      tag: 'SMART AI',
      highlight: true,
    },
    {
      title: t('catDataExplorer'),
      desc: t('catDataExplorerDesc'),
      icon: BarChart3,
      href: '/explore',
      tag: 'IN-BROWSER',
    },
    {
      title: t('catKnowledgeGraph'),
      desc: t('catKnowledgeGraphDesc'),
      icon: Network,
      href: '/articles',
      tag: 'CONNECT',
    },
    {
      title: t('catOutreach'),
      desc: t('catOutreachDesc'),
      icon: BookOpen,
      href: '/articles',
      tag: 'EXPLAINER',
    },
  ];

  return (
    <section className="bg-[#002147] text-white border-y-2 border-[#0B3D91] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-[#0B3D91]/70 border-x border-[#0B3D91]/70">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={idx}
                href={pillar.href}
                className="group relative flex flex-col items-center justify-center p-4 text-center hover:bg-[#0B3D91]/60 transition-all cursor-pointer"
              >
                {/* Tiny Status Badge */}
                <span
                  className={`absolute top-2 right-2 text-[9px] font-black uppercase px-1.5 py-0.2 rounded-2xs ${
                    pillar.highlight
                      ? 'bg-[#FF9933] text-black'
                      : 'bg-black/40 text-gray-300 border border-white/10'
                  }`}
                >
                  {pillar.tag}
                </span>

                {/* Icon Container */}
                <div className="w-11 h-11 rounded-xs bg-white/10 border border-white/20 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-[#FF9933] group-hover:text-black transition-all">
                  <Icon className="w-5 h-5 text-gray-100 group-hover:text-black transition-colors" />
                </div>

                {/* Title */}
                <div className="font-serif font-bold text-sm tracking-wide text-white group-hover:text-[#FF9933] transition-colors leading-tight mb-1">
                  {pillar.title}
                </div>

                {/* Description */}
                <div className="text-[11px] text-gray-300 group-hover:text-white line-clamp-2 leading-tight">
                  {pillar.desc}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
