'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Network, 
  Bot, 
  BarChart3, 
  Languages, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet,
  Cpu
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
    <section className="py-14 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-[#0B3D91] text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            Smart Education & Open Data Framework
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#002147]">
            {t.featuresTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-sans">
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
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-[#0B3D91] hover:shadow-md transition-all flex flex-col justify-between group"
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

                  <h3 className="text-base font-bold font-serif text-[#002147] group-hover:text-[#0B3D91] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B3D91] hover:text-blue-700 group-hover:underline"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Banner */}
        <div className="mt-10 bg-linear-to-r from-blue-900 to-[#002147] text-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-full shrink-0 border border-white/20">
              <ShieldCheck className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">
                Institutional Quality & Human-in-the-Loop Review
              </h4>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl">
                Every AI-generated article and regional translation passes through NCPOR Communications Officers before public publication.
              </p>
            </div>
          </div>

          <Link
            href="/articles"
            className="shrink-0 px-4 py-2 text-xs font-bold text-[#002147] bg-white hover:bg-amber-300 rounded transition-colors shadow-xs"
          >
            Browse Approved Stories →
          </Link>
        </div>

      </div>
    </section>
  );
}
