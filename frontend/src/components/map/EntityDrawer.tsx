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
import { MapEntity, MAP_ENTITIES } from '@/data/polarMapData';

interface EntityDrawerProps {
  entity: MapEntity | null;
  onClose: () => void;
  onSelectEntityId: (id: string) => void;
  batterySaver?: boolean;
}

export default function EntityDrawer({
  entity,
  onClose,
  onSelectEntityId,
  batterySaver = false,
}: EntityDrawerProps) {
  const [explainSimply, setExplainSimply] = useState(false);

  if (!entity) return null;

  const categoryMeta = {
    station: { label: 'Polar Station', color: 'text-amber-300 bg-amber-500/20 border-amber-400/40', icon: Building2 },
    expedition: { label: 'Expedition / Vessel', color: 'text-cyan-300 bg-cyan-500/20 border-cyan-400/40', icon: Ship },
    dataset: { label: 'Scientific Dataset', color: 'text-emerald-300 bg-emerald-500/20 border-emerald-400/40', icon: Database },
    publication: { label: 'Research Publication', color: 'text-indigo-300 bg-indigo-500/20 border-indigo-400/40', icon: FileText },
    media: { label: 'Field Observation', color: 'text-pink-300 bg-pink-500/20 border-pink-400/40', icon: Camera },
  }[entity.category];

  const Icon = categoryMeta.icon;

  return (
    <aside 
      className={`fixed inset-y-0 right-0 w-full sm:w-[420px] md:w-[460px] bg-[#00142B]/35 backdrop-blur-2xl border-l border-white/20 shadow-[-12px_0_40px_rgba(0,0,0,0.5)] z-500 text-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 ${
        batterySaver ? '' : 'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent'
      }`}
      aria-label="Entity Details Drawer"
    >
      {/* Top Drawer Glass HUD Bar - 30-40% Transparency */}
      <div className="px-4 py-3 bg-[#000E20]/40 backdrop-blur-xl border-b border-white/15 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl border ${categoryMeta.color} shadow-sm backdrop-blur-md`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-100 flex items-center gap-1.5">
              <span>{categoryMeta.label}</span>
              <span className="text-gray-400">•</span>
              <span className="text-cyan-300 font-mono text-[11px]">{entity.region}</span>
            </div>
            {entity.dateStr && (
              <span className="text-[11px] text-gray-400 font-mono block">
                {entity.dateStr}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {entity.status && (
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
              entity.status === 'Operational' || entity.status === 'Active'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                : 'bg-blue-500/20 text-blue-300 border-blue-400/40'
            }`}>
              {entity.status}
            </span>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Drawer (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
        
        {/* Visual Cover Banner */}
        {entity.coverImage ? (
          <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-white/15 bg-slate-950/60 shadow-lg">
            <Image
              src={entity.coverImage}
              alt={entity.title}
              fill
              className="object-cover"
              sizes="480px"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#00142B]/80 via-transparent to-black/30"></div>
            
            {/* Overlay Coordinates Pill */}
            <div className="absolute bottom-2.5 left-2.5 bg-[#00142B]/60 backdrop-blur-md text-[11px] font-mono text-cyan-300 px-2.5 py-0.5 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-md">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>{entity.lat.toFixed(3)}°, {entity.lng.toFixed(3)}°</span>
            </div>

            {entity.elevationMeters !== undefined && (
              <div className="absolute bottom-2.5 right-2.5 bg-[#00142B]/60 backdrop-blur-md text-[11px] font-mono text-amber-300 px-2 py-0.5 rounded-lg border border-white/20 shadow-md">
                Alt: {entity.elevationMeters}m
              </div>
            )}
            {entity.depthMeters !== undefined && (
              <div className="absolute bottom-2.5 right-2.5 bg-[#00142B]/60 backdrop-blur-md text-[11px] font-mono text-cyan-300 px-2 py-0.5 rounded-lg border border-white/20 shadow-md">
                Depth: -{entity.depthMeters}m
              </div>
            )}
          </div>
        ) : null}

        {/* Entity Title & Clean Lead Author */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">
            {entity.title}
          </h2>
          
          {entity.authorOrLead && (
            <div className="mt-1 text-xs text-gray-300 flex items-center gap-1.5">
              <span className="text-gray-400">Lead:</span>
              <span className="font-semibold text-blue-200">{entity.authorOrLead}</span>
              {entity.institution && (
                <span className="text-gray-400">• {entity.institution}</span>
              )}
            </div>
          )}
        </div>

        {/* AI Explainer / Science Summary Card (Glass Card 35% opacity) */}
        <div className="bg-[#001833]/35 backdrop-blur-xl rounded-2xl p-4 border border-white/15 space-y-2.5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Science Summary
            </span>

            <button
              onClick={() => setExplainSimply(!explainSimply)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                explainSimply
                  ? 'bg-amber-400 text-gray-950 shadow-sm'
                  : 'bg-[#00224d]/60 text-blue-200 hover:bg-[#002e66] border border-white/15'
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
            <div className="pt-2 border-t border-white/10 text-xs flex items-center justify-between text-gray-400 font-mono">
              <span className="truncate mr-2">DOI: {entity.doi}</span>
              <span className="text-emerald-400 flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>
          )}
        </div>

        {/* Live Telemetry / Scientific Instruments Grid (Glass Card 35% opacity) */}
        {entity.telemetry && (
          <div className="bg-[#001833]/35 backdrop-blur-xl rounded-2xl p-3.5 border border-white/15 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold font-mono text-cyan-300 uppercase">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Live Telemetry & Sensors
              </span>
              <span className="text-[10px] text-emerald-400 font-sans font-normal">Active</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {entity.telemetry.temperature && (
                <div className="bg-[#00142B]/50 p-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-cyan-300 shrink-0" />
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Surface Temp</div>
                    <div className="font-mono font-bold text-white text-xs">{entity.telemetry.temperature}</div>
                  </div>
                </div>
              )}
              {entity.telemetry.windSpeed && (
                <div className="bg-[#00142B]/50 p-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-teal-300 shrink-0" />
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Wind Velocity</div>
                    <div className="font-mono font-bold text-white text-xs">{entity.telemetry.windSpeed}</div>
                  </div>
                </div>
              )}
              {entity.telemetry.salinity && (
                <div className="bg-[#00142B]/50 p-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-300 shrink-0" />
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Salinity</div>
                    <div className="font-mono font-bold text-white text-xs">{entity.telemetry.salinity}</div>
                  </div>
                </div>
              )}
              {entity.telemetry.iceThickness && (
                <div className="bg-[#00142B]/50 p-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-300 shrink-0" />
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-mono">Sea Ice</div>
                    <div className="font-mono font-bold text-white text-xs">{entity.telemetry.iceThickness}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Connected Knowledge Graph (Glass items 35% opacity) */}
        {entity.connectedEntities && entity.connectedEntities.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Link2 className="w-3.5 h-3.5" />
                Connected Knowledge Graph ({entity.connectedEntities.length})
              </span>
            </div>

            <div className="space-y-1.5">
              {entity.connectedEntities.map((conn) => {
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
                    className="w-full text-left p-2.5 rounded-xl bg-[#001833]/35 hover:bg-[#0B3D91]/60 border border-white/15 hover:border-cyan-400/60 transition-all flex items-center justify-between group backdrop-blur-md cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-[#00142B]/60 text-cyan-300 group-hover:scale-105 transition-transform border border-white/10">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {conn.title}
                        </div>
                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                          <span className="text-amber-300 font-mono uppercase">{conn.relation}</span>
                          <span>•</span>
                          <span className="capitalize">{conn.category}</span>
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

      </div>

      {/* Action Footer Button Matrix (Glass 40% opacity) */}
      <div className="p-3.5 bg-[#000E20]/40 backdrop-blur-2xl border-t border-white/15 grid grid-cols-2 gap-2.5">
        <Link
          href={`/assistant?q=Tell me about ${encodeURIComponent(entity.title)} in detail`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white bg-[#0B3D91]/80 hover:bg-[#0B3D91] rounded-xl transition-all border border-cyan-400/40 shadow-sm"
        >
          <Bot className="w-3.5 h-3.5 text-cyan-300" />
          <span>Ask AI Assistant</span>
        </Link>

        <Link
          href={`/explore?id=${entity.id}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-[#001833] bg-white/90 hover:bg-white rounded-xl transition-all shadow-sm"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#0B3D91]" />
          <span>Data Explorer</span>
        </Link>
      </div>

    </aside>
  );
}

