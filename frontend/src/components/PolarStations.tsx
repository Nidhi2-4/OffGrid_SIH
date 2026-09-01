'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MapPin, 
  Compass, 
  Radio, 
  Thermometer, 
  Wind, 
  ExternalLink,
  Snowflake
} from 'lucide-react';

export default function PolarStations() {
  const { t, language } = useLanguage();

  const stations = [
    {
      id: 'himadri',
      name: t.stationHimadriTitle,
      location: 'Ny-Ålesund, Spitsbergen, Svalbard',
      coords: '78°55′ N, 11°56′ E',
      type: 'Arctic Research Base',
      established: '2008',
      desc: t.stationHimadriDesc,
      temp: '-8.4°C',
      wind: '14 kt ENE',
      accentColor: 'border-cyan-500',
      badgeBg: 'bg-cyan-50 text-cyan-900 border-cyan-200',
      region: 'Arctic (North Pole)',
    },
    {
      id: 'maitri',
      name: t.stationMaitriTitle,
      location: 'Schirmacher Oasis, Queen Maud Land',
      coords: '70°45′ S, 11°44′ E',
      type: 'Antarctic Base Station',
      established: '1989',
      desc: t.stationMaitriDesc,
      temp: '-19.2°C',
      wind: '22 kt SE',
      accentColor: 'border-blue-600',
      badgeBg: 'bg-blue-50 text-blue-900 border-blue-200',
      region: 'Antarctica (South Pole)',
    },
    {
      id: 'bharati',
      name: t.stationBharatiTitle,
      location: 'Larsemann Hills, East Antarctica',
      coords: '69°24′ S, 76°11′ E',
      type: 'Modern Antarctic Oceanographic Base',
      established: '2012',
      desc: t.stationBharatiDesc,
      temp: '-14.8°C',
      wind: '18 kt S',
      accentColor: 'border-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      region: 'Antarctica (South Pole)',
    },
    {
      id: 'himansh',
      name: t.stationHimanshTitle,
      location: 'Chandra Basin, Spiti Valley, Himachal Pradesh',
      coords: '32°24′ N, 77°37′ E (4,000m)',
      type: 'High-Altitude Cryosphere Base',
      established: '2016',
      desc: t.stationHimanshDesc,
      temp: '-4.1°C',
      wind: '9 kt W',
      accentColor: 'border-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      region: 'Himalayan Cryosphere',
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-gray-50/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-3 border-b border-gray-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Snowflake className="w-4 h-4 text-[#0B3D91]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
                National Polar Infrastructure
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#002147]">
              {t.stationsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-sans">
              {t.stationsSubtitle}
            </p>
          </div>

          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3D91] hover:underline"
          >
            <span>{t.viewAllStations}</span>
          </Link>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stations.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-[#0B3D91] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-4 space-y-3">
                {/* Station Region Badge & Live Status */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${st.badgeBg}`}>
                    {st.region}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live</span>
                  </div>
                </div>

                {/* Station Name */}
                <h3 className="text-base font-bold font-serif text-[#002147] group-hover:text-[#0B3D91] transition-colors">
                  {st.name}
                </h3>

                {/* Location & Coords */}
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{st.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
                    <Compass className="w-3 h-3 text-[#0B3D91]" />
                    <span>{st.coords}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed font-sans line-clamp-3">
                  {st.desc}
                </p>
              </div>

              {/* Weather Telemetry Strip */}
              <div className="bg-gray-50 border-t border-gray-100 px-4 py-2.5 flex items-center justify-between text-[11px] text-gray-700 font-mono">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-blue-600" />
                  {st.temp}
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-gray-500" />
                  {st.wind}
                </span>
                <span className="text-[10px] text-gray-400">Est. {st.established}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
