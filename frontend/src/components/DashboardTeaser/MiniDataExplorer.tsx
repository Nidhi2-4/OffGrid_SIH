'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BarChart3, Download, RefreshCw, Layers, ExternalLink } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

export const MiniDataExplorer: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<'ice' | 'salinity' | 'temp'>('ice');

  // Datasets matching real polar scientific parameters
  const datasets = {
    ice: {
      name: 'Bharati Ice Core δ18O Profile (120m Firn)',
      param: 'δ18O Ratio (‰)',
      color: '#0B3D91',
      unit: '‰',
      data: [
        { label: '10m', value: -32.4, depth: '10m' },
        { label: '25m', value: -33.8, depth: '25m' },
        { label: '40m', value: -31.9, depth: '40m' },
        { label: '60m', value: -34.2, depth: '60m' },
        { label: '80m', value: -32.7, depth: '80m' },
        { label: '100m', value: -35.1, depth: '100m' },
        { label: '120m', value: -33.5, depth: '120m' },
      ],
    },
    salinity: {
      name: 'Southern Ocean Salinity Transect (Prydz Bay)',
      param: 'Salinity (PSU)',
      color: '#008080',
      unit: 'PSU',
      data: [
        { label: '50°S', value: 33.9, depth: 'Surface' },
        { label: '55°S', value: 34.1, depth: 'Surface' },
        { label: '60°S', value: 34.4, depth: 'Surface' },
        { label: '63°S', value: 34.6, depth: 'Surface' },
        { label: '66°S', value: 34.2, depth: 'Surface' },
        { label: '69°S', value: 33.8, depth: 'Coastal' },
      ],
    },
    temp: {
      name: 'Maitri Meteorological Station (Annual Mean)',
      param: 'Temp (°C)',
      color: '#D9534F',
      unit: '°C',
      data: [
        { label: '2019', value: -10.2 },
        { label: '2020', value: -9.8 },
        { label: '2021', value: -11.1 },
        { label: '2022', value: -9.5 },
        { label: '2023', value: -10.4 },
        { label: '2024', value: -8.9 },
        { label: '2025', value: -9.2 },
      ],
    },
  };

  const current = datasets[selectedDataset];

  return (
    <div className="bg-white border border-[#CCCCCC] rounded-xs shadow-xs p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#138808] text-white rounded-xs">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-[#0B3D91]">
              In-Browser Data Explorer
            </h2>
            <p className="text-[11px] text-gray-500">Live Scientific Chart Engine</p>
          </div>
        </div>

        <Link
          href="/explore"
          className="text-xs font-bold text-[#003366] hover:underline flex items-center gap-1"
        >
          <span>Full Explorer</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Dataset Picker Buttons */}
      <div className="grid grid-cols-3 gap-1 mb-2 bg-gray-100 p-1 rounded-xs border border-gray-200">
        <button
          onClick={() => setSelectedDataset('ice')}
          className={`py-1 text-xs font-bold transition-all rounded-xs truncate px-1 ${
            selectedDataset === 'ice'
              ? 'bg-[#0B3D91] text-white shadow-xs'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          ❄️ Ice Core δ18O
        </button>
        <button
          onClick={() => setSelectedDataset('salinity')}
          className={`py-1 text-xs font-bold transition-all rounded-xs truncate px-1 ${
            selectedDataset === 'salinity'
              ? 'bg-[#0B3D91] text-white shadow-xs'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          🌊 Ocean Salinity
        </button>
        <button
          onClick={() => setSelectedDataset('temp')}
          className={`py-1 text-xs font-bold transition-all rounded-xs truncate px-1 ${
            selectedDataset === 'temp'
              ? 'bg-[#0B3D91] text-white shadow-xs'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          🌡️ Maitri Temp
        </button>
      </div>

      {/* Current Dataset Details */}
      <div className="text-xs font-semibold text-gray-800 mb-2 truncate">
        {current.name}
      </div>

      {/* Interactive Chart Container */}
      <div className="flex-1 min-h-[160px] w-full bg-[#F2F2F2] rounded-xs border border-gray-200 p-2 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={current.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={current.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={current.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#555' }} />
            <YAxis tick={{ fontSize: 10, fill: '#555' }} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#002147',
                color: '#fff',
                borderRadius: '2px',
                border: 'none',
                fontSize: '11px',
              }}
              formatter={(val: any) => [`${val} ${current.unit}`, current.param]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={current.color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Key Feature Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xs p-2 text-[11px] text-amber-900 flex items-center justify-between gap-2 mb-3">
        <span>⚡ Zero code required. Instant browser visualization.</span>
        <span className="font-bold text-[#0B3D91]">JSON/CSV API Ready</span>
      </div>

      <Link
        href={`/explore`}
        className="w-full text-center py-2 bg-[#0B3D91] hover:bg-[#002147] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
      >
        Open 50+ Datasets in Explorer →
      </Link>
    </div>
  );
};
