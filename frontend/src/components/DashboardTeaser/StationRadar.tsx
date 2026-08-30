'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Thermometer, Wind, Compass, ExternalLink } from 'lucide-react';

export const StationRadar: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState(0);

  const stations = [
    {
      id: 'bharati',
      name: 'Bharati Station',
      hindiName: 'भारती स्टेशन',
      region: 'Larsemann Hills, East Antarctica',
      lat: '69°24′28″S',
      lng: '76°11′14″E',
      temp: '-18.4°C',
      wind: '24 knots (E)',
      status: 'Active (Wintering)',
      est: '2012',
      focus: 'Atmospheric Physics, Oceanography, Glaciology',
      image: '/images/bharati_polar_station.jpg',
    },
    {
      id: 'maitri',
      name: 'Maitri Station',
      hindiName: 'मैत्री स्टेशन',
      region: 'Schirmacher Oasis, Queen Maud Land, Antarctica',
      lat: '70°45′58″S',
      lng: '11°43′56″E',
      temp: '-22.1°C',
      wind: '18 knots (SE)',
      status: 'Active (Operational)',
      est: '1989',
      focus: 'Geology, Meteorology, Human Biology',
      image: '/images/himsagar_polar_hero.jpg',
    },
    {
      id: 'himadri',
      name: 'Himadri Station',
      hindiName: 'हिमाद्रि स्टेशन',
      region: 'Ny-Ålesund, Spitsbergen, Svalbard (Arctic)',
      lat: '78°55′00″N',
      lng: '11°56′00″E',
      temp: '-4.2°C',
      wind: '12 knots (N)',
      status: 'Active (Summer Research)',
      est: '2008',
      focus: 'Arctic Glaciers, Marine Biology, Aerosol Physics',
      image: '/images/bharati_polar_station.jpg',
    },
    {
      id: 'himansh',
      name: 'Himansh Station',
      hindiName: 'हिमांश स्टेशन',
      region: 'Chandra Basin, Spiti, Himachal Pradesh (Third Pole)',
      lat: '32°24′00″N',
      lng: '77°37′00″E',
      temp: '-8.5°C',
      wind: '15 knots (W)',
      status: 'Active (High Altitude)',
      est: '2016',
      focus: 'Himalayan Glaciology, Cryosphere Dynamics',
      image: '/images/himsagar_polar_hero.jpg',
    },
  ];

  const current = stations[selectedStation];

  return (
    <div className="bg-white border border-[#CCCCCC] rounded-xs shadow-xs p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#0B3D91] text-white rounded-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-[#0B3D91]">
              Indian Polar Stations
            </h2>
            <p className="text-[11px] text-gray-500">Live Station Telemetry & Coordinates</p>
          </div>
        </div>
        <Link
          href="/map"
          className="text-xs font-bold text-[#003366] hover:underline flex items-center gap-1"
        >
          <span>Interactive Map</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Station Tabs */}
      <div className="grid grid-cols-4 gap-1 mb-3 bg-gray-100 p-1 rounded-xs border border-gray-200">
        {stations.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setSelectedStation(idx)}
            className={`py-1 text-xs font-bold transition-all rounded-xs truncate px-1 ${
              selectedStation === idx
                ? 'bg-[#0B3D91] text-white shadow-xs'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {s.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Selected Station Card */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="relative h-32 w-full rounded-xs overflow-hidden mb-3 border border-gray-300">
          <Image
            src={current.image}
            alt={current.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
            <div className="text-white">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm leading-tight">{current.name}</span>
                <span className="text-xs text-[#FF9933]">({current.hindiName})</span>
              </div>
              <p className="text-[10px] text-gray-300 leading-tight">{current.region}</p>
            </div>
          </div>
          <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#138808] text-white rounded-2xs shadow-xs">
            {current.status}
          </span>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="bg-[#F2F2F2] p-2 rounded-xs border border-gray-200 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Surface Temp</div>
              <div className="font-bold font-mono text-gray-900">{current.temp}</div>
            </div>
          </div>
          <div className="bg-[#F2F2F2] p-2 rounded-xs border border-gray-200 flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-600" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Wind Speed</div>
              <div className="font-bold font-mono text-gray-900">{current.wind}</div>
            </div>
          </div>
        </div>

        {/* Details List */}
        <div className="text-xs space-y-1.5 bg-gray-50 p-2.5 rounded-xs border border-gray-200 text-gray-700 mb-3">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Coordinates:</span>
            <span className="font-mono font-semibold">{current.lat}, {current.lng}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Established:</span>
            <span className="font-semibold">{current.est}</span>
          </div>
          <div className="flex flex-col pt-1 border-t border-gray-200">
            <span className="text-gray-500 font-medium">Core Research Domain:</span>
            <span className="font-semibold text-[#0B3D91] text-[11px]">{current.focus}</span>
          </div>
        </div>

        <Link
          href={`/map?station=${current.id}`}
          className="w-full text-center py-2 bg-[#0B3D91] hover:bg-[#002147] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
        >
          Explore Station on 3D Map →
        </Link>
      </div>
    </div>
  );
};
