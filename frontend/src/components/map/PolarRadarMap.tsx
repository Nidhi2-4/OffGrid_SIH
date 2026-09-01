'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapEntity, EntityCategory, POLAR_REGIONS } from '@/data/polarMapData';

export type MapTileLayer = 'dark' | 'ocean' | 'satellite' | 'hybrid' | 'terrain' | 'roadmap' | 'light';

interface PolarRadarMapProps {
  entities: MapEntity[];
  selectedEntity: MapEntity | null;
  onSelectEntity: (entity: MapEntity) => void;
  activeRegion: string;
  tileLayerType: MapTileLayer;
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
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayTileLayerRef = useRef<L.TileLayer | null>(null);
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

  // Update Tile Layer with 7 supported layer styles
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove previous base & overlay layers
    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
      baseTileLayerRef.current = null;
    }
    if (overlayTileLayerRef.current) {
      map.removeLayer(overlayTileLayerRef.current);
      overlayTileLayerRef.current = null;
    }

    let baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    let overlayUrl: string | null = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}';
    let attribution = '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; GIS User Community';

    if (tileLayerType === 'ocean') {
      baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}';
      overlayUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a>, GEBCO, NOAA, National Geographic';
    } else if (tileLayerType === 'satellite') {
      baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      overlayUrl = null;
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics';
    } else if (tileLayerType === 'hybrid') {
      baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      overlayUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, GeoEye';
    } else if (tileLayerType === 'terrain') {
      baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      overlayUrl = null;
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; World Topographic Map';
    } else if (tileLayerType === 'roadmap') {
      baseUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      overlayUrl = null;
      attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
    } else if (tileLayerType === 'light') {
      baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
      overlayUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Light Gray Canvas';
    }

    const newBaseLayer = L.tileLayer(baseUrl, {
      attribution,
      maxZoom: 18,
      subdomains: 'abc',
    }).addTo(map);

    baseTileLayerRef.current = newBaseLayer;

    if (overlayUrl) {
      const newOverlayLayer = L.tileLayer(overlayUrl, {
        maxZoom: 18,
        pane: 'overlayPane',
      }).addTo(map);
      overlayTileLayerRef.current = newOverlayLayer;
    }
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
            <div class="relative flex items-center gap-1.5 bg-[#00142B] border-2 ${
              isSelected ? 'border-amber-400 scale-125 shadow-[0_0_20px_#F59E0B]' : 'border-amber-500 shadow-xl'
            } text-amber-300 px-2 py-1 rounded-full text-[11px] font-bold font-mono transition-transform duration-200 hover:scale-115">
              <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span>${entity.title.split(' ')[0]}</span>
              ${entity.telemetry?.temperature ? `<span class="text-[9px] text-gray-300 border-l border-amber-500/50 pl-1">${entity.telemetry.temperature}</span>` : ''}
            </div>
          </div>
        `;
      } else if (entity.category === 'expedition') {
        iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="absolute -inset-2 bg-cyan-500/30 rounded-full animate-pulse pointer-events-none"></div>
            <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#00142B] border-2 ${
              isSelected ? 'border-cyan-300 scale-125 shadow-[0_0_20px_#06B6D4]' : 'border-cyan-400 shadow-xl'
            } text-cyan-300 transition-transform duration-200 hover:scale-120">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17l2-6h14l2 6M6 17a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm9 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM12 4v7m-3-3h6"/>
              </svg>
            </div>
          </div>
        `;
      } else if (entity.category === 'dataset') {
        iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#00142B] border-2 ${
              isSelected ? 'border-emerald-300 scale-125 shadow-[0_0_18px_#10B981]' : 'border-emerald-400 shadow-xl'
            } text-emerald-300 transition-transform duration-200 hover:scale-120">
              <svg class="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <ellipse cx="12" cy="5" rx="9" ry="3" stroke-width="2"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
              <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
          </div>
        `;
      } else if (entity.category === 'publication') {
        iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#00142B] border-2 ${
              isSelected ? 'border-indigo-300 scale-125 shadow-[0_0_18px_#818CF8]' : 'border-indigo-400 shadow-xl'
            } text-indigo-300 transition-transform duration-200 hover:scale-120">
              <svg class="w-3.5 h-3.5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
          </div>
        `;
      } else if (entity.category === 'media') {
        iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#00142B] border-2 ${
              isSelected ? 'border-pink-300 scale-125 shadow-[0_0_18px_#EC4899]' : 'border-pink-400 shadow-xl'
            } text-pink-300 transition-transform duration-200 hover:scale-120">
              <svg class="w-3.5 h-3.5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <circle cx="12" cy="13" r="3" stroke-width="2"/>
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
