'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ScientistFilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedRegion: string;
  setSelectedRegion: (r: string) => void;
  selectedDomain: string;
  setSelectedDomain: (d: string) => void;
  sortBy: string;
  setSortBy: (s: any) => void;
  totalCount: number;
}

export default function ScientistFilterBar({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedDomain,
  setSelectedDomain,
  sortBy,
  setSortBy,
  totalCount,
}: ScientistFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
      
      {/* Row 1: Search & Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scientists by name, research specialty (e.g. ice core, glaciology, mooring), or institution..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-[#0F5167] focus:bg-white outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 shrink-0 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#0F5167]" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[#0F5167] font-bold outline-none cursor-pointer"
          >
            <option value="citations">Most Citations</option>
            <option value="hindex">Highest H-Index</option>
            <option value="publications">Most Publications</option>
            <option value="datasets">Most Datasets</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

      </div>

      {/* Row 2: Region Pills & Domain Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
        
        {/* Region Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-slate-500 font-mono text-[11px] mr-1">Region:</span>
          {['all', 'Arctic', 'Antarctica', 'Himalayas', 'Southern Ocean'].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#0F5167] text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {reg === 'all' ? 'All Regions' : reg}
            </button>
          ))}
        </div>

        {/* Domain Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono text-[11px]">Specialty Domain:</span>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-slate-50 text-slate-700 font-mono text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
          >
            <option value="all">All Disciplines</option>
            <option value="Cryosphere & Glaciology">Cryosphere & Glaciology</option>
            <option value="Oceanography">Oceanography</option>
            <option value="Paleoclimate">Paleoclimate</option>
            <option value="Atmospheric Science">Atmospheric Science</option>
          </select>
        </div>

      </div>

    </div>
  );
}
