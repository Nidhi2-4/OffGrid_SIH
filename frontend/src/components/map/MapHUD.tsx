'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapTileLayer } from '@/components/map/PolarRadarMap';
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
  ChevronDown,
  Menu,
  Check,
  Globe,
  Map as MapIcon,
  Mountain,
  Sun,
  Moon,
  Zap,
  BatteryCharging
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
  tileLayer: MapTileLayer;
  setTileLayer: (layer: MapTileLayer) => void;
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
  const [layerDropdownOpen, setLayerDropdownOpen] = React.useState(false);

  const mapLayerOptions: { id: MapTileLayer; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { 
      id: 'roadmap', 
      label: 'Default (Roadmap)', 
      desc: 'Standard 2D vector drawings of streets, buildings & labels',
      icon: MapIcon 
    },
    { 
      id: 'satellite', 
      label: 'Satellite', 
      desc: 'High-resolution aerial & space photography of Earth',
      icon: Globe 
    },
    { 
      id: 'hybrid', 
      label: 'Hybrid', 
      desc: 'Satellite imagery with street names & borders overlaid',
      icon: Layers 
    },
    { 
      id: 'terrain', 
      label: 'Terrain', 
      desc: 'Physical contours, elevation changes & mountain relief',
      icon: Mountain 
    },
    { 
      id: 'ocean', 
      label: 'Ocean', 
      desc: 'Seabed bathymetry, marine trenches & ocean depth',
      icon: Compass 
    },
    { 
      id: 'dark', 
      label: 'Dark', 
      desc: 'High-contrast dark radar matrix for night operations',
      icon: Moon 
    },
    { 
      id: 'light', 
      label: 'Light', 
      desc: 'Minimalist high-contrast light cartography',
      icon: Sun 
    },
  ];

  const currentLayerObj = mapLayerOptions.find((l) => l.id === tileLayer) || mapLayerOptions[0];

  const categoryConfigs: { id: EntityCategory; label: string; icon: React.ComponentType<{ className?: string }>; color: string; activeClass: string }[] = [
    { 
      id: 'station', 
      label: 'Stations', 
      icon: Building2, 
      color: '#F59E0B', 
      activeClass: 'bg-[#001833]/85 text-amber-300 border-amber-400/90 shadow-[0_4px_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/40' 
    },
    { 
      id: 'expedition', 
      label: 'Expeditions & Vessels', 
      icon: Ship, 
      color: '#06B6D4', 
      activeClass: 'bg-[#001833]/85 text-cyan-300 border-cyan-400/90 shadow-[0_4px_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/40' 
    },
    { 
      id: 'dataset', 
      label: 'Datasets', 
      icon: Database, 
      color: '#10B981', 
      activeClass: 'bg-[#001833]/85 text-emerald-300 border-emerald-400/90 shadow-[0_4px_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/40' 
    },
    { 
      id: 'publication', 
      label: 'Publications', 
      icon: FileText, 
      color: '#818CF8', 
      activeClass: 'bg-[#001833]/85 text-indigo-300 border-indigo-400/90 shadow-[0_4px_20px_rgba(129,140,248,0.3)] ring-1 ring-indigo-400/40' 
    },
    { 
      id: 'media', 
      label: 'Field Media', 
      icon: Camera, 
      color: '#EC4899', 
      activeClass: 'bg-[#001833]/85 text-pink-300 border-pink-400/90 shadow-[0_4px_20px_rgba(236,72,153,0.3)] ring-1 ring-pink-400/40' 
    },
  ];

  return (
    <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 z-400 pointer-events-none flex flex-col gap-2">
      
      {/* Top Unified HUD Bar (Glass Screen Effect with 35% opacity) */}
      <div className="relative z-30 pointer-events-auto bg-[#00142B]/40 backdrop-blur-2xl rounded-2xl border border-white/20 p-2 sm:p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-wrap items-center justify-between gap-2 text-white before:absolute before:inset-x-0 before:top-0 before:h-px before:rounded-t-2xl before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent">
        
        {/* Left: Home Link + Live Status + Hamburger Menu Beside Him-Radar */}
        <div className="flex items-center gap-2">
          {/* Portal Home Button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#001833]/50 hover:bg-[#0B3D91]/80 text-white border border-white/20 shadow-sm backdrop-blur-xl transition-all group"
            title="Return to Portal Home"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-bold text-blue-100">Home</span>
          </Link>

          {/* Live Radar Pill */}
          <div className="flex items-center gap-1.5 bg-[#001833]/45 px-2.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-xl">
            <Radio className={`w-3.5 h-3.5 ${isRadarLive ? 'text-emerald-400 animate-pulse' : 'text-emerald-400'}`} />
            <span className="text-[10px] font-mono font-bold uppercase text-blue-200 hidden sm:inline">
              HIM-RADAR
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/25 text-emerald-300 rounded font-mono font-bold border border-emerald-400/40">
              {totalVisible} LIVE
            </span>
          </div>

          {/* Hamburger Menu Toggle right beside HIM-RADAR */}
          <button
            onClick={() => setShowFullHeader(!showFullHeader)}
            className={`p-1.5 rounded-xl border text-xs backdrop-blur-xl transition-colors cursor-pointer ${
              showFullHeader
                ? 'bg-amber-400 text-gray-950 border-amber-300 font-bold shadow-md'
                : 'bg-[#001833]/45 hover:bg-[#00224d]/70 text-gray-300 border-white/15'
            }`}
            title="Toggle Navigation Bar"
          >
            <Menu className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Region Jumpers (Glass Chips - exactly where it already was) */}
        <div className="flex items-center gap-1 bg-[#001026]/40 backdrop-blur-xl p-1 rounded-xl border border-white/15 overflow-x-auto no-scrollbar">
          <Compass className="w-3.5 h-3.5 text-amber-400 ml-1.5 shrink-0" />
          <span className="text-[10px] text-gray-300 font-mono uppercase px-1 shrink-0">Region:</span>
          {POLAR_REGIONS.map((reg) => (
            <button
              key={reg.id}
              onClick={() => onSelectRegion(reg.id)}
              className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeRegion === reg.id
                  ? 'bg-[#0B3D91]/90 text-white shadow-sm font-bold border border-cyan-400/60'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

      </div>

      {/* Row Below Top Bar: Category Filters & HimSagar Logo */}
      <div className="relative z-10 pointer-events-auto flex flex-col gap-1.5 max-w-[calc(100vw-360px)]">
        
        {/* Category Filters (Glass Pills with 35% opacity) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          {categoryConfigs.map((cfg) => {
            const Icon = cfg.icon;
            const isSelected = selectedCategories.has(cfg.id);
            const count = counts[cfg.id] || 0;

            return (
              <button
                key={cfg.id}
                onClick={() => toggleCategory(cfg.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 backdrop-blur-xl shrink-0 shadow-lg cursor-pointer ${
                  isSelected
                    ? cfg.activeClass
                    : 'bg-[#00142B]/40 text-gray-300 border-white/15 hover:bg-[#001833]/60 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cfg.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  isSelected ? 'bg-black/50 text-white border border-white/20' : 'bg-black/40 text-gray-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* HimSagar Logo */}
        <div className="hidden md:flex items-center pl-1 pt-1">
          <Image
            src="/Himsagar.png"
            alt="HimSagar Logo"
            width={300}
            height={100}
            className="h-16 sm:h-18 md:h-20 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-300"
          />
        </div>

      </div>

      {/* Floating Right Controls: Search Bar + Glass Map Layer Button */}
      <div className="absolute top-16 sm:top-18 right-3 sm:right-4 z-400 pointer-events-auto hidden md:flex items-center gap-2">
        
        {/* 1. Search Bar (Frosted Glass 35% opacity) */}
        <div className="relative w-60 sm:w-64 md:w-72 shadow-2xl">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search station, species, DOI..."
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#00142B]/40 backdrop-blur-2xl text-white placeholder:text-gray-400 rounded-xl border border-white/20 focus:border-cyan-400 outline-none transition-all shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-gray-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* 2. Glass Circle Map Layer Button & Popup Box */}
        <div className="relative">
          <button
            onClick={() => setLayerDropdownOpen(!layerDropdownOpen)}
            className="w-9 h-9 rounded-xl bg-[#00142B]/40 hover:bg-[#0B3D91]/80 text-white border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center justify-center backdrop-blur-2xl transition-all hover:scale-105 group shrink-0 cursor-pointer"
            title={`Map Layers (Current: ${currentLayerObj.label})`}
          >
            <Layers className="w-4.5 h-4.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Map Layers Glass Popup Box */}
          {layerDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-52 bg-[#00142B]/75 backdrop-blur-2xl text-gray-100 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.7)] border border-white/20 p-2 z-550 animate-in fade-in slide-in-from-top-2 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent"
              onMouseLeave={() => setLayerDropdownOpen(false)}
            >
              <div className="px-2 py-1 text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-wider border-b border-white/10 flex items-center justify-between mb-1.5">
                <span>MAP LAYERS</span>
                <span>7 MODES</span>
              </div>

              <div className="space-y-1">
                {mapLayerOptions.map((opt) => {
                  const OptIcon = opt.icon;
                  const isCurrent = tileLayer === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setTileLayer(opt.id);
                        setLayerDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0B3D91]/90 text-white shadow-xs font-bold border border-cyan-400/50'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <OptIcon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-amber-300' : 'text-cyan-400'}`} />
                        <span className="text-xs truncate">{opt.label}</span>
                      </div>
                      {isCurrent && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}


