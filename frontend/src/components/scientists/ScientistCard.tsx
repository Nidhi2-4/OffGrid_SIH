'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  UserCheck, 
  BookOpen, 
  Database, 
  Compass, 
  MapPin, 
  Award, 
  ArrowRight, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { Scientist } from '@/data/scientistsData';

interface ScientistCardProps {
  scientist: Scientist;
  onViewProfile: (scientist: Scientist) => void;
}

export default function ScientistCard({ scientist, onViewProfile }: ScientistCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-[#0F5167] shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group space-y-4">
      
      {/* Top Section: Avatar & Info */}
      <div className="space-y-3">
        
        <div className="flex items-start gap-3.5">
          {/* Avatar with verified badge */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shrink-0">
            <Image
              src={scientist.avatar}
              alt={scientist.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                {scientist.primaryRegion}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {scientist.domain}
              </span>
            </div>

            <h2 
              onClick={() => onViewProfile(scientist)}
              className="text-base sm:text-lg font-bold font-serif text-[#093443] group-hover:text-[#0F5167] transition-colors cursor-pointer truncate mt-1"
            >
              {scientist.name}
            </h2>

            <p className="text-xs font-medium text-slate-700 truncate">
              {scientist.designation}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {scientist.institution}
            </p>
          </div>
        </div>

        {/* Short Bio Excerpt */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {scientist.bio}
        </p>

        {/* Station Affiliations */}
        <div className="flex flex-wrap gap-1 pt-1">
          {scientist.stationAffiliations.map((station) => (
            <span 
              key={station} 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
            >
              <MapPin className="w-2.5 h-2.5 text-[#0F5167]" />
              <span>{station}</span>
            </span>
          ))}
        </div>

      </div>

      {/* Middle: Metrics Matrix */}
      <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs font-mono">
        <div>
          <div className="text-[10px] text-slate-400 uppercase">H-Index</div>
          <div className="font-bold text-[#0F5167] text-sm sm:text-base mt-0.5">{scientist.hIndex}</div>
        </div>
        <div className="border-x border-slate-200">
          <div className="text-[10px] text-slate-400 uppercase">Papers</div>
          <div className="font-bold text-slate-800 text-sm sm:text-base mt-0.5">{scientist.publicationsCount}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase">Datasets</div>
          <div className="font-bold text-emerald-700 text-sm sm:text-base mt-0.5">{scientist.datasetsCount}</div>
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
        <Link
          href={`/assistant?q=Tell me about ${encodeURIComponent(scientist.name)} research and discoveries`}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F5167] text-xs font-semibold border border-slate-200 transition-colors"
          title="Ask AI about this scientist"
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </Link>

        <button
          onClick={() => onViewProfile(scientist)}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#0F5167] hover:bg-[#093443] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer group-hover:scale-102"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
