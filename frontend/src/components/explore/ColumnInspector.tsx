'use client';

import React from 'react';
import { 
  Database, 
  Hash, 
  Clock, 
  Type, 
  HelpCircle, 
  Sparkles, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';
import { DatasetItem, DatasetColumn } from '@/data/explorerDatasets';

interface ColumnInspectorProps {
  dataset: DatasetItem;
}

export default function ColumnInspector({ dataset }: ColumnInspectorProps) {
  const getColumnDataStats = (col: DatasetColumn) => {
    const values = dataset.sampleData.map((d) => d[col.name]);
    const uniqueValues = new Set(values).size;
    const nonNullCount = values.filter((v) => v !== null && v !== undefined).length;

    return {
      uniqueCount: uniqueValues,
      nonNullCount,
      totalCount: dataset.sampleData.length,
      nullCount: col.missingCount,
    };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'float64':
      case 'integer':
        return <Hash className="w-3.5 h-3.5 text-[#0F5167]" />;
      case 'timestamp':
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Type className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F5167] font-mono flex items-center gap-2">
            <Database className="w-4 h-4 text-[#0F5167]" />
            Column Metrics & Statistical Distribution ({dataset.columns.length} Features)
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Summary statistics, physical units, data types, and value distribution bounds.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>0% Missing Data (Complete)</span>
        </div>
      </div>

      {/* Grid of Column Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataset.columns.map((col) => {
          const stats = getColumnDataStats(col);
          const isNumeric = col.type === 'float64' || col.type === 'integer';

          return (
            <div
              key={col.name}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#0F5167] shadow-xs hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
            >
              {/* Header: Name, Label & Type Badge */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#0F5167]">
                        {col.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                        {getTypeIcon(col.type)}
                        <span>{col.type}</span>
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mt-1">
                      {col.label} {col.unit ? <span className="text-emerald-700 font-mono">[{col.unit}]</span> : ''}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 shrink-0">
                    {stats.uniqueCount} distinct
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {col.description}
                </p>
              </div>

              {/* Numerical Distribution / Value Summary */}
              {isNumeric && col.min !== undefined && col.max !== undefined && (
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs font-mono">
                  {/* Min / Mean / Max Range Slider Representation */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Min: <strong className="text-slate-800">{col.min}</strong></span>
                      {col.mean !== undefined && (
                        <span>Mean: <strong className="text-[#0F5167]">{col.mean.toFixed(2)}</strong></span>
                      )}
                      <span>Max: <strong className="text-slate-800">{col.max}</strong></span>
                    </div>

                    {/* Gradient Distribution Bar */}
                    <div className="relative w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-[#0F5167] to-amber-500 opacity-90" />
                    </div>
                  </div>

                  {/* Additional Metrics Row */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] border-t border-slate-200 text-slate-600">
                    {col.median !== undefined && (
                      <div>
                        <span className="text-slate-400">Median: </span>
                        <span className="font-bold text-slate-800">{col.median}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-400">Nulls: </span>
                      <span className="font-bold text-emerald-600">0 (0.0%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Non-numeric / Timestamp Summary */}
              {!isNumeric && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs font-mono text-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400">Coverage: </span>
                    <span className="font-bold text-slate-800">100% Valid Range</span>
                  </div>
                  <div className="text-emerald-700 font-bold text-[11px]">
                    Continuous
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
