'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Bot, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-gray-50/40 border-b border-gray-200">
      {/* Background Subtle Polar Grid Accent */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0F5167_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Mission, Headlines, Quick CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-[#093443] font-serif leading-[1.16]">
              {t.heroTitle}
            </h1>

            {/* Subtitle / Overview */}
            <p className="text-base sm:text-[1.05rem] text-gray-600 leading-relaxed font-sans max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/map"
                className="inline-flex items-center gap-2.5 px-5.5 py-3 text-sm font-bold text-white bg-[#0F5167] hover:bg-[#093443] rounded-lg shadow-sm hover:shadow-md transition-all group"
              >
                <MapPin className="w-4.5 h-4.5 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>{t.exploreMapBtn}</span>
                <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/assistant"
                className="inline-flex items-center gap-2.5 px-5.5 py-3 text-sm font-bold text-[#0F5167] bg-white hover:bg-teal-50/50 border border-teal-300 rounded-lg shadow-2xs hover:border-[#0F5167] transition-all group"
              >
                <Bot className="w-4.5 h-4.5 text-[#0F5167] group-hover:scale-110 transition-transform" />
                <span>{t.askAssistantBtn}</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Hero Visual Card (Featuring the Polar Image) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden bg-white p-2 shadow-lg border border-gray-200/90 group">
              
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 lg:h-[19.5rem] w-full rounded-lg overflow-hidden bg-slate-900">
                <Image
                  src="/images/2379df2aa50b403dfa7e1d319eb3c478.jpg"
                  alt="Polar Bear observation in Arctic sea ice near Himadri station"
                  fill
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  priority
                />
                
                {/* Visual Overlay Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <span className="bg-[#093443]/90 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-[#7BCCEA]/30 flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Ny-Ålesund, Arctic (78°55′ N)
                  </span>
                </div>

                {/* Bottom Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent"></div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1">
                    17th Indian Arctic Expedition (Himadri)
                  </span>
                  <p className="text-sm sm:text-base font-medium line-clamp-2 drop-shadow-xs">
                    {language === 'hi'
                      ? 'आर्कटिक समुद्री बर्फ एवं जैव विविधता निगरानी: हिमाद्री स्टेशन अवलोकन'
                      : 'Arctic Sea-Ice Monitoring & Marine Fauna Observation: Himadri Station'}
                  </p>
                </div>
              </div>

              {/* Card Bottom Meta Bar */}
              <div className="px-3.5 py-2.5 bg-gray-50 rounded-lg mt-1.5 border border-gray-100 flex items-center justify-end text-xs">
                <Link 
                  href="#featured-observation" 
                  className="font-bold text-[#0F5167] hover:underline flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  <span>Explore Observation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

