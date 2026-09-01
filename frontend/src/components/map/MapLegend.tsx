'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Ship, 
  Database, 
  FileText, 
  Camera, 
  ChevronDown, 
  ChevronUp, 
  Info 
} from 'lucide-react';

export default function MapLegend() {
  const [isOpen, setIsOpen] = useState(true);

  const legendItems = [
    {
      label: 'Polar Stations',
      borderClass: 'border-amber-400 bg-amber-500/20 text-amber-300',
      icon: Building2,
    },
    {
      label: 'Expeditions & Vessels',
      borderClass: 'border-cyan-400 bg-cyan-500/20 text-cyan-300',
      icon: Ship,
    },
    {
      label: 'Scientific Datasets',
      borderClass: 'border-emerald-400 bg-emerald-500/20 text-emerald-300',
      icon: Database,
    },
    {
      label: 'Publications & Reports',
      borderClass: 'border-indigo-400 bg-indigo-500/20 text-indigo-300',
      icon: FileText,
    },
    {
      label: 'Field Media & Photos',
      borderClass: 'border-pink-400 bg-pink-500/20 text-pink-300',
      icon: Camera,
    },
  ];

  return (
    <div className="absolute bottom-6 left-4 z-400 pointer-events-auto hidden sm:block">
      <div className="bg-[#001833]/70 backdrop-blur-xl rounded-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white w-52 sm:w-56 overflow-hidden transition-all duration-200">
        
        {/* Header Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 bg-[#00142B]/75 hover:bg-[#002652]/85 flex items-center justify-between border-b border-white/10 transition-colors backdrop-blur-md"
          title="Toggle Map Legend"
        >
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100 font-mono">
              MAP INDEX
            </span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
          )}
        </button>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="p-2 space-y-1.5 text-xs">
            {legendItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 px-1 py-0.5 rounded-lg hover:bg-blue-950/60 transition-colors">
                  <div className={`p-1.5 rounded-md border ${item.borderClass} shrink-0 shadow-xs`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-200">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
