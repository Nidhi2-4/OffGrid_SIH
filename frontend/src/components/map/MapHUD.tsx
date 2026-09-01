'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Layers, 
  Building2, 
  Ship, 
  Database, 
  FileText, 
  Camera, 
  Crosshair, 
  Sparkles, 
  Compass,
  Radio,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { EntityCategory, POLAR_REGIONS } from '@/data/polarMapData';

interface MapHUDProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategories: Set<EntityCategory>;
  toggleCategory: (cat: EntityCategory) => void;
  counts: Record<EntityCategory, number>;
  totalVisible: number;
  onSelectRegion: (regionId: string) => void;
  activeRegion: string;
  tileLayer: 'dark' | 'satellite' | 'street';
  setTileLayer: (layer: 'dark' | 'satellite' | 'street') => void;
  isRadarLive: boolean;
  showFullHeader: boolean;
  setShowFullHeader: (show: boolean) => void;
}

export default function MapHUD({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  toggleCategory,
  counts,
  totalVisible,
  onSelectRegion,
  activeRegion,
  tileLayer,
  setTileLayer,
  isRadarLive,
  showFullHeader,
  setShowFullHeader,
}: MapHUDProps) {
  const categoryConfigs: { id: EntityCategory; label: string; icon: React.ComponentType<{ className?: string }>; color: string; activeClass: string }[] = [
    { 
      id: 'station', 
      label: 'Stations', 
      icon: Building2, 
      color: '#F59E0B', 
      activeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]' 
    },
    { 
      id: 'expedition', 
      label: 'Expeditions & Vessels', 
      icon: Ship, 
      color: '#06B6D4', 
      activeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
    },
    { 
      id: 'dataset', 
      label: 'Datasets', 
      icon: Database, 
      color: '#10B981', 
      activeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
    },
    { 
      id: 'publication', 
      label: 'Publications', 
      icon: FileText, 
      color: '#818CF8', 
      activeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/60 shadow-[0_0_12px_rgba(129,140,248,0.3)]' 
    },
    { 
      id: 'media', 
      label: 'Field Media', 
      icon: Camera, 
      color: '#EC4899', 
      activeClass: 'bg-pink-500/20 text-pink-300 border-pink-500/60 shadow-[0_0_12px_rgba(236,72,153,0.3)]' 
    },
  ];

  return (
    <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 z-400 pointer-events-none flex flex-col gap-2">
      
      {/* Top Unified HUD Bar */}
      <div className="pointer-events-auto bg-[#001833]/92 backdrop-blur-md rounded-xl border border-blue-500/30 p-2 sm:p-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-2.5 text-white">
        
        {/* Left: Home Link + Live Status */}
        <div className="flex items-center gap-2">
          {/* Portal Home Button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-950/90 hover:bg-[#0B3D91] text-white border border-blue-700/60 shadow-xs transition-all group"
            title="Return to Portal Home"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <div className="h-5 w-auto bg-white/95 rounded px-1 flex items-center shadow-xs">
              <Image
                src="/Himsagar.png"
                alt="HimSagar Logo"
                width={70}
                height={20}
                className="h-3.5 w-auto object-contain"
              />
            </div>
            <span className="text-[11px] font-bold text-blue-100 hidden md:inline">Home</span>
          </Link>

          {/* Live Radar Pill */}
          <div className="flex items-center gap-1.5 bg-blue-950/70 px-2 py-1 rounded-lg border border-blue-900/60">
            <Radio className={`w-3.5 h-3.5 ${isRadarLive ? 'text-emerald-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="text-[10px] font-mono font-bold uppercase text-blue-200 hidden sm:inline">
              HIM-RADAR
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-mono font-bold border border-emerald-500/30">
              {totalVisible} LIVE
            </span>
          </div>
        </div>

        {/* Center: Region Jumpers */}
        <div className="hidden xl:flex items-center gap-1 bg-blue-950/60 p-0.5 rounded-lg border border-blue-900/60">
          <Compass className="w-3.5 h-3.5 text-amber-400 ml-1.5" />
          <span className="text-[10px] text-gray-400 font-mono uppercase px-1">Region:</span>
          {POLAR_REGIONS.map((reg) => (
            <button
              key={reg.id}
              onClick={() => onSelectRegion(reg.id)}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-all ${
                activeRegion === reg.id
                  ? 'bg-[#0B3D91] text-white shadow-xs font-bold border border-blue-400/40'
                  : 'text-gray-300 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Right: Search, Layers & Menu */}
        <div className="flex items-center gap-1.5 flex-1 sm:flex-initial justify-end">
          
          {/* Quick Search */}
          <div className="relative w-full sm:w-56 md:w-64">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search station, species, DOI..."
              className="w-full pl-7 pr-7 py-1 text-xs bg-blue-950/90 text-white placeholder:text-gray-400 rounded-lg border border-blue-700/60 focus:border-cyan-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Layer Selector */}
          <div className="flex items-center bg-blue-950/80 rounded-lg p-0.5 border border-blue-800/80 text-[11px]">
            <button
              onClick={() => setTileLayer('dark')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                tileLayer === 'dark' ? 'bg-[#0B3D91] text-white font-bold shadow-xs' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTileLayer('street')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                tileLayer === 'street' ? 'bg-[#0B3D91] text-white font-bold shadow-xs' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Ocean
            </button>
            <button
              onClick={() => setTileLayer('satellite')}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                tileLayer === 'satellite' ? 'bg-[#0B3D91] text-white font-bold shadow-xs' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Full Portal Header Menu Toggle */}
          <button
            onClick={() => setShowFullHeader(!showFullHeader)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              showFullHeader
                ? 'bg-amber-400 text-gray-950 border-amber-300 font-bold'
                : 'bg-blue-950/80 hover:bg-blue-900 text-gray-300 border-blue-800/80'
            }`}
            title="Toggle Portal Navigation Bar"
          >
            <Menu className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* Secondary Bar: Entity Filter Toggles */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 no-scrollbar">
        {categoryConfigs.map((cfg) => {
          const Icon = cfg.icon;
          const isSelected = selectedCategories.has(cfg.id);
          const count = counts[cfg.id] || 0;

          return (
            <button
              key={cfg.id}
              onClick={() => toggleCategory(cfg.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all duration-200 backdrop-blur-md shrink-0 ${
                isSelected
                  ? cfg.activeClass
                  : 'bg-[#001833]/70 text-gray-400 border-blue-900/60 hover:bg-[#001833]/90 hover:text-gray-200 opacity-60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cfg.label}</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono font-bold ${
                isSelected ? 'bg-black/30 text-white' : 'bg-blue-950 text-gray-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}

