'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapEntity, EntityCategory, POLAR_REGIONS } from '@/data/polarMapData';

interface PolarRadarMapProps {
  entities: MapEntity[];
  selectedEntity: MapEntity | null;
  onSelectEntity: (entity: MapEntity) => void;
  activeRegion: string;
  tileLayerType: 'dark' | 'satellite' | 'street';
}

export default function PolarRadarMap({
  entities,
  selectedEntity,
  onSelectEntity,
  activeRegion,
  tileLayerType,
}: PolarRadarMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);
  const routeGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet Map Instance
    const map = L.map(mapContainerRef.current, {
      center: [20.0, 30.0],
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
      worldCopyJump: true,
    });

    // Add zoom controls to bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Marker & Route Groups
    const markerGroup = L.layerGroup().addTo(map);
    const routeGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    markerGroupRef.current = markerGroup;
    routeGroupRef.current = routeGroup;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    let attribution = '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, DeLorme, NAVTEQ';

    if (tileLayerType === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics';
    } else if (tileLayerType === 'street') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a>, GEBCO, NOAA, National Geographic';
    }

    const newLayer = L.tileLayer(url, {
      attribution,
      maxZoom: 18,
    }).addTo(map);

    tileLayerRef.current = newLayer;
  }, [tileLayerType]);

  // Handle Region Flying
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const region = POLAR_REGIONS.find((r) => r.id === activeRegion);
    if (region) {
      mapInstanceRef.current.flyTo([region.lat, region.lng], region.zoom, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [activeRegion]);

  // Fly to selected entity
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedEntity) return;
    mapInstanceRef.current.flyTo([selectedEntity.lat, selectedEntity.lng], 9, {
      duration: 1.2,
    });
  }, [selectedEntity]);

  // Render Markers & Routes
  useEffect(() => {
    if (!mapInstanceRef.current || !markerGroupRef.current || !routeGroupRef.current) return;

    markerGroupRef.current.clearLayers();
    routeGroupRef.current.clearLayers();

    // 1. Draw Expedition Routes
    entities.forEach((entity) => {
      if (entity.routeCoordinates && entity.routeCoordinates.length > 1) {
        const polyline = L.polyline(entity.routeCoordinates, {
          color: '#06B6D4',
          weight: 2.5,
          opacity: 0.85,
          dashArray: '6, 8',
          lineCap: 'round',
        });

        polyline.bindTooltip(
          `<div class="text-[11px] font-mono font-bold text-cyan-300 bg-[#001833] px-2 py-1 rounded border border-cyan-500/40">${entity.title} Route</div>`,
          { sticky: true, className: 'custom-leaflet-tooltip' }
        );

        polyline.on('click', () => onSelectEntity(entity));
        routeGroupRef.current?.addLayer(polyline);
      }
    });

    // 2. Render Flightradar24-Style Custom DivIcons
    entities.forEach((entity) => {
      const isSelected = selectedEntity?.id === entity.id;
      
      // Marker HTML generator
      let iconHtml = '';

      if (entity.category === 'station') {
        iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="absolute -inset-2 bg-amber-500/30 rounded-full animate-ping pointer-events-none"></div>
            <div class="relative flex items-center gap-1 bg-[#001833] border-2 ${
              isSelected ? 'border-amber-400 scale-125 shadow-[0_0_20px_#F59E0B]' : 'border-amber-500 shadow-lg'
            } text-amber-300 px-2 py-1 rounded-full text-[11px] font-bold font-mono transition-transform duration-200 hover:scale-115">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>${entity.title.split(' ')[0]}</span>
              ${entity.telemetry?.temperature ? `<span class="text-[9px] text-gray-300 border-l border-amber-500/50 pl-1">${entity.telemetry.temperature}</span>` : ''}
            </div>
          </div>
        `;
      } else if (entity.category === 'expedition') {
        iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="absolute -inset-2 bg-cyan-500/30 rounded-full animate-pulse pointer-events-none"></div>
            <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#001833] border-2 ${
              isSelected ? 'border-cyan-300 scale-125 shadow-[0_0_20px_#06B6D4]' : 'border-cyan-500 shadow-md'
            } text-cyan-300 transition-transform duration-200 hover:scale-120">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20m0 0l-7-7m7 7l7-7M5 12h14"/>
              </svg>
            </div>
          </div>
        `;
      } else if (entity.category === 'dataset') {
        iconHtml = `
          <div class="relative cursor-pointer">
            <div class="flex items-center gap-1 bg-[#001833]/95 border ${
              isSelected ? 'border-emerald-300 scale-120 shadow-[0_0_15px_#10B981]' : 'border-emerald-500 shadow'
            } text-emerald-300 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-transform hover:scale-115">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>DATA</span>
            </div>
          </div>
        `;
      } else if (entity.category === 'publication') {
        iconHtml = `
          <div class="relative cursor-pointer">
            <div class="flex items-center gap-1 bg-[#001833]/95 border ${
              isSelected ? 'border-indigo-300 scale-120 shadow-[0_0_15px_#818CF8]' : 'border-indigo-500 shadow'
            } text-indigo-300 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-transform hover:scale-115">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>PAPER</span>
            </div>
          </div>
        `;
      } else if (entity.category === 'media') {
        iconHtml = `
          <div class="relative cursor-pointer">
            <div class="flex items-center justify-center w-7 h-7 rounded-full bg-[#001833] border ${
              isSelected ? 'border-pink-300 scale-120 shadow-[0_0_15px_#EC4899]' : 'border-pink-500 shadow'
            } text-pink-300 transition-transform hover:scale-115">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
          </div>
        `;
      }

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-polar-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([entity.lat, entity.lng], { icon: customIcon });

      // Flightradar24-style tooltip on hover
      marker.bindTooltip(
        `
        <div class="bg-[#000E20] text-white p-2 rounded-lg border border-blue-600/50 shadow-2xl text-xs max-w-xs font-sans">
          <div class="font-bold text-cyan-300 flex items-center justify-between gap-2 mb-0.5">
            <span>${entity.title}</span>
            <span class="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-blue-900/60 text-amber-300">${entity.category}</span>
          </div>
          <div class="text-[11px] text-gray-300 line-clamp-2">${entity.description}</div>
          <div class="mt-1 pt-1 border-t border-blue-900/60 flex items-center justify-between text-[10px] text-gray-400 font-mono">
            <span>${entity.lat.toFixed(2)}°, ${entity.lng.toFixed(2)}°</span>
            <span class="text-cyan-400">Click to Inspect →</span>
          </div>
        </div>
        `,
        {
          direction: 'top',
          offset: [0, -10],
          className: 'custom-leaflet-tooltip',
        }
      );

      marker.on('click', () => {
        onSelectEntity(entity);
      });

      markerGroupRef.current?.addLayer(marker);
    });
  }, [entities, selectedEntity, onSelectEntity]);

  return (
    <div className="w-full h-full relative bg-[#000b18]">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      
      {/* Global CSS for Leaflet styling */}
      <style jsx global>{`
        .leaflet-container {
          background-color: #000b18 !important;
          font-family: inherit;
        }
        .custom-polar-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-tooltip.custom-leaflet-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-tooltip.custom-leaflet-tooltip::before {
          display: none !important;
        }
        .leaflet-control-zoom a {
          background-color: #001833 !important;
          color: #93C5FD !important;
          border-color: #1E3A8A !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #0B3D91 !important;
          color: #FFFFFF !important;
        }
        .leaflet-control-attribution {
          background-color: rgba(0, 20, 43, 0.8) !important;
          color: #64748B !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a {
          color: #94A3B8 !important;
        }
      `}</style>
    </div>
  );
}
