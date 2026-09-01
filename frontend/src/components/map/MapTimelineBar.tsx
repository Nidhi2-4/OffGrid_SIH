'use client';

import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Calendar, History, Sparkles } from 'lucide-react';

interface MapTimelineBarProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  minYear?: number;
  maxYear?: number;
}

export default function MapTimelineBar({
  selectedYear,
  setSelectedYear,
  isPlaying,
  setIsPlaying,
  minYear = 1981,
  maxYear = 2024,
}: MapTimelineBarProps) {
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedYear((prev: number) => {
          if (prev >= maxYear) {
            setIsPlaying(false);
            return minYear;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, maxYear, minYear, setIsPlaying, setSelectedYear]);

  const milestones = [
    { year: 1981, label: '1st IAE' },
    { year: 1989, label: 'Maitri' },
    { year: 2008, label: 'Himadri' },
    { year: 2012, label: 'Bharati' },
    { year: 2016, label: 'Himansh' },
    { year: 2024, label: '43-ISEA' },
  ];

  return (
    <div className="absolute bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-400 pointer-events-auto bg-[#001833]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-blue-500/30 shadow-2xl text-white flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto max-w-2xl">
      
      {/* Play / Reset Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-lg bg-blue-900/80 hover:bg-[#0B3D91] text-amber-300 transition-colors border border-blue-700/60"
          title={isPlaying ? 'Pause Timeline' : 'Play Historical Progression'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => {
            setSelectedYear(maxYear);
            setIsPlaying(false);
          }}
          className="p-2 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-gray-300 transition-colors border border-blue-800/40"
          title="Reset to All / Latest (2024)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1.5 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/60">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-amber-300">
            {selectedYear === maxYear ? 'ALL YEARS (1981–2024)' : `YEAR ${selectedYear}`}
          </span>
        </div>
      </div>

      {/* Slider & Milestones */}
      <div className="flex-1 w-full sm:w-72 flex flex-col justify-center">
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(parseInt(e.target.value, 10));
            setIsPlaying(false);
          }}
          className="w-full h-1.5 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        {/* Milestone Tick Labels */}
        <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 mt-1 px-0.5">
          {milestones.map((m) => (
            <button
              key={m.year}
              onClick={() => {
                setSelectedYear(m.year);
                setIsPlaying(false);
              }}
              className={`hover:text-amber-300 transition-colors ${
                selectedYear === m.year ? 'text-amber-300 font-bold' : ''
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
