'use client';

import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Brush
} from 'recharts';
import { 
  TrendingUp, 
  Activity, 
  Sliders, 
  Maximize2, 
  BarChart3, 
  Info,
  Sparkles
} from 'lucide-react';
import { DatasetItem, DatasetColumn } from '@/data/explorerDatasets';

interface DatasetVisualizerProps {
  dataset: DatasetItem;
}

type ChartType = 'line' | 'area' | 'bar' | 'scatter';

export default function DatasetVisualizer({ dataset }: DatasetVisualizerProps) {
  const numericColumns = useMemo(() => {
    return dataset.columns.filter((c) => c.type === 'float64' || c.type === 'integer');
  }, [dataset]);

  const defaultXCol = useMemo(() => {
    const timeCol = dataset.columns.find((c) => c.name === 'date' || c.name === 'year' || c.name === 'month' || c.name === 'latitude' || c.name === 'depth_m');
    return timeCol ? timeCol.name : dataset.columns[0].name;
  }, [dataset]);

  const defaultY1Col = useMemo(() => {
    return numericColumns.length > 0 ? numericColumns[0].name : '';
  }, [numericColumns]);

  const defaultY2Col = useMemo(() => {
    return numericColumns.length > 1 ? numericColumns[1].name : '';
  }, [numericColumns]);

  const [chartType, setChartType] = useState<ChartType>('line');
  const [xAxisKey, setXAxisKey] = useState<string>(defaultXCol);
  const [yAxisKey1, setYAxisKey1] = useState<string>(defaultY1Col);
  const [yAxisKey2, setYAxisKey2] = useState<string>(defaultY2Col);
  const [showSecondaryAxis, setShowSecondaryAxis] = useState<boolean>(true);

  const colMeta1 = dataset.columns.find((c) => c.name === yAxisKey1);
  const colMeta2 = dataset.columns.find((c) => c.name === yAxisKey2);
  const xColMeta = dataset.columns.find((c) => c.name === xAxisKey);

  // Quick stats for selected primary metric
  const stats1 = useMemo(() => {
    if (!colMeta1 || dataset.sampleData.length === 0) return null;
    const values = dataset.sampleData.map((d) => Number(d[yAxisKey1])).filter((v) => !isNaN(v));
    if (values.length === 0) return null;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const first = values[0];
    const last = values[values.length - 1];
    const change = last - first;
    return { min, max, mean, change, first, last, count: values.length };
  }, [dataset, yAxisKey1, colMeta1]);

  return (
    <div className="space-y-5">
      
      {/* Visualizer Control Bar (White Card) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-slate-800">
        
        {/* Left: Chart Type Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setChartType('line')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'line' ? 'bg-[#0F5167] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span>Line</span>
          </button>

          <button
            onClick={() => setChartType('area')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'area' ? 'bg-[#0F5167] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            <span>Area</span>
          </button>

          <button
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'bar' ? 'bg-[#0F5167] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
            <span>Bar</span>
          </button>

          <button
            onClick={() => setChartType('scatter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'scatter' ? 'bg-[#0F5167] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Scatter</span>
          </button>
        </div>

        {/* Right: Dimension & Metric Selectors */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          
          {/* X Axis */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-mono text-[11px]">X-Axis:</span>
            <select
              value={xAxisKey}
              onChange={(e) => setXAxisKey(e.target.value)}
              className="bg-transparent text-[#0F5167] font-mono font-bold text-xs outline-none cursor-pointer"
            >
              {dataset.columns.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.label} ({c.name})
                </option>
              ))}
            </select>
          </div>

          {/* Primary Y Axis (Oceanic Blue) */}
          <div className="flex items-center gap-1.5 bg-blue-50/70 px-3 py-1.5 rounded-xl border border-blue-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F5167]" />
            <span className="text-slate-600 font-mono text-[11px]">Y1:</span>
            <select
              value={yAxisKey1}
              onChange={(e) => setYAxisKey1(e.target.value)}
              className="bg-transparent text-[#0F5167] font-mono font-bold text-xs outline-none cursor-pointer"
            >
              {numericColumns.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.label} {c.unit ? `(${c.unit})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Secondary Y Axis (Amber) */}
          {chartType !== 'scatter' && (
            <div className="flex items-center gap-1.5 bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-200">
              <input
                type="checkbox"
                id="secAxis"
                checked={showSecondaryAxis}
                onChange={(e) => setShowSecondaryAxis(e.target.checked)}
                className="accent-amber-600 cursor-pointer"
              />
              <label htmlFor="secAxis" className="flex items-center gap-1 text-slate-700 font-mono text-[11px] cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <span>Y2:</span>
              </label>
              {showSecondaryAxis && (
                <select
                  value={yAxisKey2}
                  onChange={(e) => setYAxisKey2(e.target.value)}
                  className="bg-transparent text-amber-700 font-mono font-bold text-xs outline-none cursor-pointer"
                >
                  {numericColumns.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.label} {c.unit ? `(${c.unit})` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Main Chart Canvas & Kaggle-Style Summary Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        
        {/* Metric Quick Stats Chips */}
        {stats1 && colMeta1 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F5167] font-mono">{colMeta1.label} Summary</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-mono text-[11px]">Unit: {colMeta1.unit || 'dimensionless'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500">Min: </span>
                <span className="font-bold text-slate-800">{stats1.min.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-500">Max: </span>
                <span className="font-bold text-slate-800">{stats1.max.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-500">Mean: </span>
                <span className="font-bold text-[#0F5167]">{stats1.mean.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-500">Net Shift: </span>
                <span className={`font-bold ${stats1.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stats1.change >= 0 ? `+${stats1.change.toFixed(2)}` : stats1.change.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Recharts Canvas */}
        <div className="h-[420px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={dataset.sampleData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey={xAxisKey} 
                  stroke="#64748B" 
                  tick={{ fontSize: 11, fill: '#64748B' }} 
                  dy={10} 
                />
                <YAxis 
                  yAxisId="left" 
                  stroke="#0F5167" 
                  tick={{ fontSize: 11, fill: '#0F5167' }} 
                  domain={['auto', 'auto']}
                />
                {showSecondaryAxis && yAxisKey2 && (
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#D97706" 
                    tick={{ fontSize: 11, fill: '#D97706' }} 
                    domain={['auto', 'auto']}
                  />
                )}
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: '#CBD5E1', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    color: '#0F172A', 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)' 
                  }} 
                />
                <Legend wrapperStyle={{ paddingTop: '15px' }} />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey={yAxisKey1} 
                  name={`${colMeta1?.label || yAxisKey1} (${colMeta1?.unit || ''})`} 
                  stroke="#0F5167" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#0F5167' }} 
                  activeDot={{ r: 7 }} 
                />
                {showSecondaryAxis && yAxisKey2 && (
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey={yAxisKey2} 
                    name={`${colMeta2?.label || yAxisKey2} (${colMeta2?.unit || ''})`} 
                    stroke="#D97706" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: '#D97706' }} 
                  />
                )}
                <Brush dataKey={xAxisKey} height={25} stroke="#0F5167" fill="#F8FAFC" />
              </LineChart>
            ) : chartType === 'area' ? (
              <AreaChart data={dataset.sampleData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorY1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F5167" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#0F5167" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorY2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey={xAxisKey} stroke="#64748B" tick={{ fontSize: 11, fill: '#64748B' }} dy={10} />
                <YAxis yAxisId="left" stroke="#0F5167" tick={{ fontSize: 11, fill: '#0F5167' }} />
                {showSecondaryAxis && yAxisKey2 && (
                  <YAxis yAxisId="right" orientation="right" stroke="#059669" tick={{ fontSize: 11, fill: '#059669' }} />
                )}
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: '#CBD5E1', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    color: '#0F172A', 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)' 
                  }} 
                />
                <Legend wrapperStyle={{ paddingTop: '15px' }} />
                <Area 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey={yAxisKey1} 
                  name={`${colMeta1?.label || yAxisKey1} (${colMeta1?.unit || ''})`} 
                  stroke="#0F5167" 
                  fillOpacity={1} 
                  fill="url(#colorY1)" 
                />
                {showSecondaryAxis && yAxisKey2 && (
                  <Area 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey={yAxisKey2} 
                    name={`${colMeta2?.label || yAxisKey2} (${colMeta2?.unit || ''})`} 
                    stroke="#059669" 
                    fillOpacity={1} 
                    fill="url(#colorY2)" 
                  />
                )}
              </AreaChart>
            ) : chartType === 'bar' ? (
              <BarChart data={dataset.sampleData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey={xAxisKey} stroke="#64748B" tick={{ fontSize: 11, fill: '#64748B' }} dy={10} />
                <YAxis yAxisId="left" stroke="#0F5167" tick={{ fontSize: 11, fill: '#0F5167' }} />
                {showSecondaryAxis && yAxisKey2 && (
                  <YAxis yAxisId="right" orientation="right" stroke="#D97706" tick={{ fontSize: 11, fill: '#D97706' }} />
                )}
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: '#CBD5E1', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    color: '#0F172A', 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)' 
                  }} 
                />
                <Legend wrapperStyle={{ paddingTop: '15px' }} />
                <Bar yAxisId="left" dataKey={yAxisKey1} fill="#0F5167" radius={[6, 6, 0, 0]} name={`${colMeta1?.label || yAxisKey1}`} />
                {showSecondaryAxis && yAxisKey2 && (
                  <Bar yAxisId="right" dataKey={yAxisKey2} fill="#D97706" radius={[6, 6, 0, 0]} name={`${colMeta2?.label || yAxisKey2}`} />
                )}
              </BarChart>
            ) : (
              <ScatterChart margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey={xAxisKey} 
                  name={colMeta1?.label || xAxisKey} 
                  stroke="#64748B" 
                  tick={{ fontSize: 11, fill: '#64748B' }} 
                  dy={10} 
                />
                <YAxis 
                  dataKey={yAxisKey1} 
                  name={colMeta1?.label || yAxisKey1} 
                  stroke="#DB2777" 
                  tick={{ fontSize: 11, fill: '#DB2777' }} 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: '#CBD5E1', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    color: '#0F172A', 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)' 
                  }} 
                />
                <Legend wrapperStyle={{ paddingTop: '15px' }} />
                <Scatter 
                  name={`${colMeta1?.label || yAxisKey1} vs ${xColMeta?.label || xAxisKey}`} 
                  data={dataset.sampleData} 
                  fill="#DB2777" 
                />
              </ScatterChart>
            )}
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}
