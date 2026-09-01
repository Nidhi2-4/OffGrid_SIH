'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  MapPin, 
  Compass, 
  Calendar, 
  ExternalLink, 
  Bot, 
  BarChart3, 
  BookOpen, 
  Share2, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Building2, 
  Ship, 
  Database, 
  FileText, 
  Camera, 
  Activity,
  Wind,
  Thermometer,
  Layers,
  Link2
} from 'lucide-react';
import { MapEntity, ConnectedEntityRef, MAP_ENTITIES } from '@/data/polarMapData';

interface EntityDrawerProps {
  entity: MapEntity | null;
  onClose: () => void;
  onSelectEntityId: (id: string) => void;
}

export default function EntityDrawer({
  entity,
  onClose,
  onSelectEntityId,
}: EntityDrawerProps) {
  const [explainSimply, setExplainSimply] = useState(false);

  if (!entity) return null;

  const categoryMeta = {
    station: { label: 'Polar Station', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', icon: Building2 },
    expedition: { label: 'Expedition / Vessel', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30', icon: Ship },
    dataset: { label: 'Scientific Dataset', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', icon: Database },
    publication: { label: 'Research Publication', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30', icon: FileText },
    media: { label: 'Field Observation', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30', icon: Camera },
  }[entity.category];

  const Icon = categoryMeta.icon;

  return (
    <aside 
      className="fixed inset-y-0 right-0 w-full sm:w-[420px] md:w-[480px] bg-[#00142B]/95 backdrop-blur-xl border-l border-blue-500/30 shadow-2xl z-500 text-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      aria-label="Entity Details Drawer"
    >
      {/* Top Drawer HUD Bar */}
      <div className="px-4 py-3 bg-[#000E20] border-b border-blue-900/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-md border ${categoryMeta.color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-gray-400 block">
              IDENTIFIER: {entity.id}
            </span>
            <span className="text-xs font-semibold text-blue-200">
              {categoryMeta.label} • {entity.region}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {entity.status && (
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${
              entity.status === 'Operational' || entity.status === 'Active'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
            }`}>
              {entity.status}
            </span>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-blue-900/60 transition-colors"
            title="Close Drawer (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 no-scrollbar">
        
        {/* Visual Cover Banner */}
        {entity.coverImage ? (
          <div className="relative h-48 w-full rounded-xl overflow-hidden border border-blue-800/60 bg-slate-950 shadow-md">
            <Image
              src={entity.coverImage}
              alt={entity.title}
              fill
              className="object-cover"
              sizes="480px"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#00142B] via-transparent to-black/30"></div>
            
            {/* Overlay Coordinates Pill */}
            <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-[11px] font-mono text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>{entity.lat.toFixed(3)}°, {entity.lng.toFixed(3)}°</span>
            </div>

            {entity.elevationMeters !== undefined && (
              <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-[11px] font-mono text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Alt: {entity.elevationMeters}m
              </div>
            )}
            {entity.depthMeters !== undefined && (
              <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-[11px] font-mono text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                Depth: -{entity.depthMeters}m
              </div>
            )}
          </div>
        ) : null}

        {/* Entity Title & Core Meta */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">
            {entity.title}
          </h2>
          
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-300">
            {entity.authorOrLead && (
              <span className="flex items-center gap-1">
                <span className="text-gray-400">Lead:</span>
                <span className="font-semibold text-blue-200">{entity.authorOrLead}</span>
              </span>
            )}
            {entity.institution && (
              <span className="text-gray-400">• {entity.institution}</span>
            )}
            {entity.dateStr && (
              <span className="text-amber-300 font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {entity.dateStr}
              </span>
            )}
          </div>
        </div>

        {/* Live Telemetry / Scientific Instruments Grid */}
        {entity.telemetry && (
          <div className="bg-blue-950/50 rounded-xl p-3.5 border border-blue-800/60 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold font-mono text-cyan-300 uppercase">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Real-Time Telemetry & Sensors
              </span>
              <span className="text-[10px] text-emerald-400 font-sans font-normal">Live Feed</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {entity.telemetry.temperature && (
                <div className="bg-blue-900/40 p-2 rounded border border-blue-800/40 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-cyan-300 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Surface Temp</div>
                    <div className="font-mono font-bold text-white">{entity.telemetry.temperature}</div>
                  </div>
                </div>
              )}
              {entity.telemetry.windSpeed && (
                <div className="bg-blue-900/40 p-2 rounded border border-blue-800/40 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-teal-300 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Wind Velocity</div>
                    <div className="font-mono font-bold text-white">{entity.telemetry.windSpeed}</div>
                  </div>
                </div>
              )}
              {entity.telemetry.salinity && (
                <div className="bg-blue-900/40 p-2 rounded border border-blue-800/40 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-300 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Salinity</div>
                    <div className="font-mono font-bold text-white">{entity.telemetry.salinity}</div>
                  </div>
                </div>
              )}
              {entity.telemetry.iceThickness && (
                <div className="bg-blue-900/40 p-2 rounded border border-blue-800/40 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-300 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Sea Ice</div>
                    <div className="font-mono font-bold text-white">{entity.telemetry.iceThickness}</div>
                  </div>
                </div>
              )}
            </div>

            {entity.sensorModel && (
              <div className="text-[11px] font-mono text-gray-300 pt-1 border-t border-blue-900/60">
                <span className="text-gray-400">Sensor: </span>
                <span>{entity.sensorModel}</span>
              </div>
            )}
          </div>
        )}

        {/* AI Explainer Toggle (SIH Core Outreach Feature) */}
        <div className="bg-blue-950/30 rounded-xl p-3.5 border border-blue-800/40 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Overview & Science Summary
            </span>

            <button
              onClick={() => setExplainSimply(!explainSimply)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded transition-all ${
                explainSimply
                  ? 'bg-amber-400 text-gray-950 shadow-xs'
                  : 'bg-blue-900/60 text-blue-200 hover:bg-blue-800'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>{explainSimply ? 'Scientific View' : 'Explain Simply'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
            {explainSimply 
              ? `Simplified Summary: ${entity.description.split('.')[0]}. This research conducted by Indian scientists directly helps understand global climate change, sea-level impact, and polar biodiversity conservation.`
              : entity.description}
          </p>

          {entity.doi && (
            <div className="pt-2 border-t border-blue-900/60 text-xs flex items-center justify-between text-gray-400 font-mono">
              <span>DOI: {entity.doi}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>
          )}
        </div>

        {/* Knowledge Graph Connections (Researcher ➔ Expedition ➔ Dataset ➔ Publication ➔ Media) */}
        {entity.connectedEntities && entity.connectedEntities.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" />
                Connected Knowledge Graph ({entity.connectedEntities.length})
              </span>
              <span className="text-[10px] text-gray-400">Click to jump & inspect</span>
            </div>

            <div className="space-y-1.5">
              {entity.connectedEntities.map((conn) => {
                const target = MAP_ENTITIES.find(e => e.id === conn.id);
                const IconComponent = {
                  station: Building2,
                  expedition: Ship,
                  dataset: Database,
                  publication: FileText,
                  media: Camera,
                }[conn.category] || Activity;

                return (
                  <button
                    key={conn.id}
                    onClick={() => onSelectEntityId(conn.id)}
                    className="w-full text-left p-2.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/40 hover:border-cyan-400/60 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1 rounded bg-blue-900/80 text-cyan-300 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {conn.title}
                        </div>
                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                          <span className="text-amber-400/90 font-mono uppercase">{conn.relation}</span>
                          <span>•</span>
                          <span>{conn.category}</span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-300 shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {entity.tags.map((t, idx) => (
            <span 
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-200 border border-blue-800/60"
            >
              #{t}
            </span>
          ))}
        </div>

      </div>

      {/* Action Footer Button Matrix */}
      <div className="p-3.5 bg-[#000E20] border-t border-blue-900/80 grid grid-cols-2 gap-2">
        <Link
          href={`/assistant?q=Tell me about ${encodeURIComponent(entity.title)} in detail`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#0B3D91] hover:bg-blue-700 rounded-lg transition-colors border border-blue-400/40 shadow-xs"
        >
          <Bot className="w-3.5 h-3.5 text-cyan-300" />
          <span>Ask AI Assistant</span>
        </Link>

        <Link
          href={`/explore?id=${entity.id}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0B3D91] bg-white hover:bg-blue-50 rounded-lg transition-colors shadow-xs"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#0B3D91]" />
          <span>Data Explorer</span>
        </Link>
      </div>

    </aside>
  );
}
