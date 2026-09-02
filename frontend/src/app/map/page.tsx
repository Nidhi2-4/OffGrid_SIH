'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import MapHUD from '@/components/map/MapHUD';
import EntityDrawer from '@/components/map/EntityDrawer';
import MapTimelineBar from '@/components/map/MapTimelineBar';
import MapLegend from '@/components/map/MapLegend';
import { MapTileLayer } from '@/components/map/PolarRadarMap';
import { 
  MAP_ENTITIES, 
  MapEntity, 
  EntityCategory 
} from '@/data/polarMapData';
import { 
  Radio, 
  Layers, 
  Maximize2, 
  Compass, 
  Activity, 
  ExternalLink,
  ChevronLeft,
  Bot,
  Sparkles
} from 'lucide-react';

// Dynamically import Leaflet map with SSR disabled
const PolarRadarMap = dynamic(
  () => import('@/components/map/PolarRadarMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#000b18] text-cyan-400 gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
        <div className="font-mono text-xs tracking-widest uppercase text-gray-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Initializing Polar Radar Matrix & Geospatial Grid...
        </div>
      </div>
    ),
  }
);

export default function PolarMapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<EntityCategory>>(
    new Set<EntityCategory>(['station', 'expedition', 'dataset', 'publication', 'media'])
  );
  const [activeRegion, setActiveRegion] = useState('all');
  const [tileLayer, setTileLayer] = useState<MapTileLayer>('roadmap');
  const [selectedEntity, setSelectedEntity] = useState<MapEntity | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(false);
  const [batterySaver, setBatterySaver] = useState(false);

  // Toggle category filters
  const toggleCategory = (cat: EntityCategory) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat); // keep at least one
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  // Filter entities
  const filteredEntities = useMemo(() => {
    return MAP_ENTITIES.filter((entity) => {
      // 1. Category check
      if (!selectedCategories.has(entity.category)) return false;

      // 2. Year check
      if (selectedYear < 2024 && entity.year > selectedYear) return false;

      // 3. Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = entity.title.toLowerCase().includes(q);
        const matchesDesc = entity.description.toLowerCase().includes(q);
        const matchesLead = entity.authorOrLead?.toLowerCase().includes(q);
        const matchesTags = entity.tags.some((t) => t.toLowerCase().includes(q));
        const matchesRegion = entity.region.toLowerCase().includes(q);
        const matchesDoi = entity.doi?.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesLead || matchesTags || matchesRegion || matchesDoi;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedYear]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<EntityCategory, number> = {
      station: 0,
      expedition: 0,
      dataset: 0,
      publication: 0,
      media: 0,
    };
    MAP_ENTITIES.forEach((e) => {
      if (selectedYear === 2024 || e.year <= selectedYear) {
        counts[e.category] = (counts[e.category] || 0) + 1;
      }
    });
    return counts;
  }, [selectedYear]);

  // Handle entity selection by ID (for knowledge graph jump)
  const handleSelectEntityById = (id: string) => {
    const found = MAP_ENTITIES.find((e) => e.id === id);
    if (found) {
      // Ensure its category is enabled
      if (!selectedCategories.has(found.category)) {
        setSelectedCategories((prev) => new Set([...prev, found.category]));
      }
      setSelectedEntity(found);
    }
  };

  return (
    <div className={`relative w-screen h-screen overflow-hidden bg-[#000b18] flex flex-col font-sans select-none ${
      batterySaver ? 'battery-saver-active' : ''
    }`}>
      
      {/* Subtle Futuristic Glass Vignette & Screen Reflection (Optimized) */}
      <div className="pointer-events-none absolute inset-0 z-300 shadow-[inset_0_0_100px_rgba(0,14,35,0.6)]" />

      {/* Optional Top Collapsible Portal Navigation */}
      {showFullHeader && (
        <div className="shrink-0 z-600 animate-in slide-in-from-top duration-200">
          <Header />
        </div>
      )}

      {/* Main Full-Screen Radar Canvas Container */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        
        {/* Glassmorphism Flightradar24-Style Top HUD Bar */}
        <MapHUD
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          counts={categoryCounts}
          totalVisible={filteredEntities.length}
          onSelectRegion={setActiveRegion}
          activeRegion={activeRegion}
          tileLayer={tileLayer}
          setTileLayer={setTileLayer}
          isRadarLive={true}
          showFullHeader={showFullHeader}
          setShowFullHeader={setShowFullHeader}
        />

        {/* Leaflet Interactive Radar Map Canvas */}
        <PolarRadarMap
          entities={filteredEntities}
          selectedEntity={selectedEntity}
          onSelectEntity={setSelectedEntity}
          activeRegion={activeRegion}
          tileLayerType={tileLayer}
          batterySaver={batterySaver}
        />

        {/* Bottom Timeline Scrubber */}
        <MapTimelineBar
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          minYear={1981}
          maxYear={2024}
        />

        {/* Bottom-Left Map Index & Legend */}
        <MapLegend />

        {/* Side Flight Detail Inspection Drawer */}
        {selectedEntity && (
          <EntityDrawer
            entity={selectedEntity}
            onClose={() => setSelectedEntity(null)}
            onSelectEntityId={handleSelectEntityById}
            batterySaver={batterySaver}
          />
        )}

      </div>

    </div>
  );
}
