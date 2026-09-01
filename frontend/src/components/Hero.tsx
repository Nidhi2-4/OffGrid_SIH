'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Bot, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText
} from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-gray-50/40 border-b border-gray-200">
      {/* Background Subtle Polar Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0B3D91_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-9 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Mission, Headlines, Quick CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold tracking-tight text-[#002147] font-serif leading-[1.18]">
              {t.heroTitle}
            </h1>

            {/* Subtitle / Overview */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0B3D91] hover:bg-[#002147] rounded shadow-xs hover:shadow transition-all group"
              >
                <MapPin className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>{t.exploreMapBtn}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 text-xs sm:text-sm font-bold text-[#0B3D91] bg-white hover:bg-blue-50 border border-blue-300 rounded shadow-2xs hover:border-[#0B3D91] transition-all group"
              >
                <Bot className="w-4 h-4 text-blue-700 group-hover:scale-110 transition-transform" />
                <span>{t.askAssistantBtn}</span>
              </Link>
            </div>

            {/* Trust & Verification Badges */}
            <div className="pt-3 border-t border-gray-200/80 flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Peer-Verified Reports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>AI Grounded with Citations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Public & Student Explainers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card (Featuring the Polar Image) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden bg-white p-1.5 shadow-md border border-gray-200/90 group">
              
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 w-full rounded overflow-hidden bg-slate-900">
                <Image
                  src="/images/2379df2aa50b403dfa7e1d319eb3c478.jpg"
                  alt="Polar Bear observation in Arctic sea ice near Himadri station"
                  fill
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  priority
                />
                
                {/* Visual Overlay Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                  <span className="bg-[#002147]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-400/30 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    Ny-Ålesund, Arctic (78°55′ N)
                  </span>
                </div>

                {/* Bottom Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent"></div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 block mb-0.5">
                    17th Indian Arctic Expedition (Himadri)
                  </span>
                  <p className="text-xs sm:text-sm font-medium line-clamp-2 drop-shadow-xs">
                    {language === 'hi'
                      ? 'आर्कटिक समुद्री बर्फ एवं जैव विविधता निगरानी: हिमाद्री स्टेशन अवलोकन'
                      : 'Arctic Sea-Ice Monitoring & Marine Fauna Observation: Himadri Station'}
                  </p>
                </div>
              </div>

              {/* Card Bottom Meta Bar */}
              <div className="px-3 py-2 bg-gray-50 rounded mt-1 border border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500 font-mono">Telemetry: CAM-04</span>
                <Link 
                  href="#featured-observation" 
                  className="font-bold text-[#0B3D91] hover:underline flex items-center gap-1 text-xs"
                >
                  <span>Explore Observation</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

