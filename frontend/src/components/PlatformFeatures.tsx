'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Network,
  Bot,
  BarChart3,
  Languages,
  ArrowRight
} from 'lucide-react';

export default function PlatformFeatures() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Network,
      title: t.feature1Title,
      desc: t.feature1Desc,
      badge: 'Relational Graph',
      link: '/explore',
      linkText: 'Explore Knowledge Web',
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    },
    {
      icon: Bot,
      title: t.feature2Title,
      desc: t.feature2Desc,
      badge: 'RAG Architecture',
      link: '/assistant',
      linkText: 'Launch AI Assistant',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      icon: BarChart3,
      title: t.feature3Title,
      desc: t.feature3Desc,
      badge: 'Instant Visualizer',
      link: '/explore',
      linkText: 'Open Data Charts',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Languages,
      title: t.feature4Title,
      desc: t.feature4Desc,
      badge: 'IndicTrans2 + LLM',
      link: '/articles',
      linkText: 'Read Simplified Stories',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
  ];

  return (
    <section className="py-9 sm:py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">

          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#093443]">
            {t.featuresTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1.5 font-sans">
            {t.featuresSubtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-[#0F5167] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-lg border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-[#093443] group-hover:text-[#0F5167] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0F5167] hover:text-teal-700 group-hover:underline"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
