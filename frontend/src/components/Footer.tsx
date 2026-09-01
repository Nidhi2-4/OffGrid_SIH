'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import {
  Building2,
  Phone,
  ExternalLink,
  Compass,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#001833] text-gray-200 text-xs border-t-4 border-[#0B3D91]">

      {/* Tricolor Mini Accent */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

          {/* Col 1: Institutional Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <div className="bg-white/95 rounded-md px-3 py-1.5 shadow-sm inline-block">
                <Image
                  src="/Himsagar.png"
                  alt="HimSagar Logo"
                  width={240}
                  height={68}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-gray-300 text-xs leading-relaxed font-sans">
              {t.footerAboutDesc}
            </p>


          </div>

          {/* Col 2: Research Portals (Quick Links) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold font-serif uppercase tracking-wider text-xs border-b border-blue-800 pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>{t.quickLinks}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/map" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t.interactiveMap}</span>
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t.aiAssistant}</span>
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t.dataExplorer}</span>
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t.articles}</span>
                </Link>
              </li>
              <li>
                <Link href="/researchers" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t.researchers}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Polar Stations & Expeditions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold font-serif uppercase tracking-wider text-xs border-b border-blue-800 pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Indian Research Bases</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/map?station=himadri" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Himadri (Ny-Ålesund, Arctic)</span>
                </Link>
              </li>
              <li>
                <Link href="/map?station=bharati" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Bharati (Larsemann Hills, Antarctica)</span>
                </Link>
              </li>
              <li>
                <Link href="/map?station=maitri" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Maitri (Schirmacher Oasis, Antarctica)</span>
                </Link>
              </li>
              <li>
                <Link href="/map?station=himansh" className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium group">
                  <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Himansh (Spiti, High Himalayas)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Important Official Portals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold font-serif uppercase tracking-wider text-xs border-b border-blue-800 pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>External Portals</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://moes.gov.in" target="_blank" rel="noreferrer" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between font-medium group">
                  <span>MoES India</span>
                  <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a href="https://ncpor.res.in" target="_blank" rel="noreferrer" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between font-medium group">
                  <span>NCPOR Portal</span>
                  <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a href="https://india.gov.in" target="_blank" rel="noreferrer" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between font-medium group">
                  <span>India.gov.in</span>
                  <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a href="https://data.gov.in" target="_blank" rel="noreferrer" className="text-white hover:text-amber-300 transition-colors flex items-center justify-between font-medium group">
                  <span>Data.gov.in</span>
                  <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-amber-300" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-blue-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-300">
          <div>
            <p className="text-gray-200">{t.copyrightNotice}</p>
            <p className="text-gray-400 mt-0.5">{t.lastUpdated}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/terms" className="text-white hover:text-amber-300 transition-colors underline-offset-2 hover:underline">{t.termsOfUse}</Link>
            <span className="text-gray-500">•</span>
            <Link href="/privacy" className="text-white hover:text-amber-300 transition-colors underline-offset-2 hover:underline">{t.privacyPolicy}</Link>
            <span className="text-gray-500">•</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
