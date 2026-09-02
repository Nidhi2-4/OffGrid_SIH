'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface MapTimelineBarProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  minYear?: number;
  maxYear?: number;
}

export default function MapTimelineBar({
  selectedYear,
  setSelectedYear,
  minYear = 1981,
  maxYear = 2024,
}: MapTimelineBarProps) {
  const timelineYears = [1981, 1990, 2000, 2010, 2020, 2024];

  return (
    <div className="absolute bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-400 pointer-events-auto bg-[#00142B]/40 backdrop-blur-2xl px-4 py-2.5 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-white flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto max-w-lg before:absolute before:inset-x-0 before:top-0 before:h-px before:rounded-t-2xl before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent">
      
      {/* Left: Year Badge */}
      <div className="flex items-center gap-1.5 bg-[#001026]/50 backdrop-blur-xl px-2.5 py-1.5 rounded-xl border border-white/15 shrink-0 shadow-inner">
        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-xs font-mono font-bold text-amber-300">
          {selectedYear === maxYear ? 'ALL YEARS' : `YEAR ${selectedYear}`}
        </span>
      </div>

      {/* Right: Year Range Slider & Year Timeline */}
      <div className="flex-1 w-full sm:w-72 flex flex-col justify-center">
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-blue-950/80 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          aria-label="Timeline Year Slider"
        />

        {/* Clean Numerical Timeline (1981 - 2024) */}
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mt-1.5 px-0.5">
          {timelineYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`hover:text-cyan-300 transition-colors cursor-pointer ${
                selectedYear === yr ? 'text-cyan-300 font-bold underline underline-offset-2' : ''
              }`}
              title={`Jump to year ${yr}`}
            >
              {yr === 2024 ? '2024 (Now)' : yr}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

