'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DatasetOverview from '@/components/explore/DatasetOverview';
import DatasetVisualizer from '@/components/explore/DatasetVisualizer';
import DatasetTable from '@/components/explore/DatasetTable';
import ColumnInspector from '@/components/explore/ColumnInspector';
import { 
  EXPLORER_DATASETS, 
  DatasetItem, 
  PolarRegion, 
  ScientificDomain 
} from '@/data/explorerDatasets';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  Table, 
  Layers, 
  Info, 
  ChevronLeft, 
  ArrowRight, 
  Compass, 
  FileText, 
  Sparkles, 
  Bot, 
  Globe,
  SlidersHorizontal,
  Check
} from 'lucide-react';

function DataExplorerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const datasetIdParam = searchParams.get('id');

  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(datasetIdParam || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'visualizer' | 'table' | 'columns'>('overview');
  
  // Catalog Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'size' | 'title'>('popular');

  // Sync state if URL query param changes
  useEffect(() => {
    if (datasetIdParam) {
      setSelectedDatasetId(datasetIdParam);
    }
  }, [datasetIdParam]);

  // Selected dataset object
  const currentDataset = useMemo(() => {
    if (!selectedDatasetId) return null;
    return EXPLORER_DATASETS.find((d) => d.id === selectedDatasetId) || null;
  }, [selectedDatasetId]);

  // Filtered dataset catalog
  const filteredDatasets = useMemo(() => {
    return EXPLORER_DATASETS.filter((ds) => {
      // Region filter
      if (selectedRegion !== 'all' && ds.region !== selectedRegion) return false;

      // Domain filter
      if (selectedDomain !== 'all' && ds.domain !== selectedDomain) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = ds.title.toLowerCase().includes(q);
        const inShort = ds.shortName.toLowerCase().includes(q);
        const inDesc = ds.description.toLowerCase().includes(q);
        const inLead = ds.authorOrLead.toLowerCase().includes(q);
        const inTags = ds.tags.some((t) => t.toLowerCase().includes(q));
        const inDoi = ds.doi.toLowerCase().includes(q);
        const inCols = ds.columns.some((c) => c.name.toLowerCase().includes(q) || c.label.toLowerCase().includes(q));
        return inTitle || inShort || inDesc || inLead || inTags || inDoi || inCols;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.downloadCount - a.downloadCount;
      if (sortBy === 'recent') return b.updateDate.localeCompare(a.updateDate);
      if (sortBy === 'size') return b.sizeBytes - a.sizeBytes;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [selectedRegion, selectedDomain, searchQuery, sortBy]);

  // Download generator
  const handleDownloadDataset = (format: 'csv' | 'json', datasetToDownload?: DatasetItem) => {
    const target = datasetToDownload || currentDataset;
    if (!target) return;

    if (format === 'csv') {
      const colHeaders = target.columns.map((c) => `${c.name}`).join(',');
      const rows = target.sampleData.map((row) =>
        target.columns.map((col) => row[col.name] ?? '').join(',')
      );
      const csvContent = `# ${target.title}\n# DOI: ${target.doi}\n# NCPOR Open Polar Data Repository\n` + [colHeaders, ...rows].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${target.id}_data.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const jsonContent = JSON.stringify({
        metadata: {
          id: target.id,
          title: target.title,
          doi: target.doi,
          region: target.region,
          domain: target.domain,
          lead: target.authorOrLead,
          institution: target.institution,
          columns: target.columns,
        },
        records: target.sampleData,
      }, null, 2);

      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${target.id}_data.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSelectDataset = (id: string) => {
    setSelectedDatasetId(id);
    setActiveTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedDatasetId(null);
    router.push('/explore');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-6">
        
        {/* VIEW 1: DATASET STUDIO (When a dataset is open) */}
        {currentDataset ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Navigation & Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <button
                onClick={handleBackToCatalog}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0F5167] text-xs font-bold border border-slate-200 transition-all shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to All Datasets</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>Repository: </span>
                <span className="text-[#0F5167] font-bold">{currentDataset.shortName}</span>
              </div>
            </div>

            {/* Kaggle-Style Tab Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto border-b border-slate-200 pb-2 no-scrollbar">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#0F5167] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Info className="w-4 h-4 text-cyan-200" />
                <span>Overview & Metadata</span>
              </button>

              <button
                onClick={() => setActiveTab('visualizer')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'visualizer'
                    ? 'bg-[#0F5167] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-300" />
                <span>Data Visualizer</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  Interactive
                </span>
              </button>

              <button
                onClick={() => setActiveTab('table')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'table'
                    ? 'bg-[#0F5167] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Table className="w-4 h-4 text-amber-300" />
                <span>Data Preview & Table</span>
              </button>

              <button
                onClick={() => setActiveTab('columns')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'columns'
                    ? 'bg-[#0F5167] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 text-pink-300" />
                <span>Column Statistics ({currentDataset.columns.length})</span>
              </button>
            </div>

            {/* Tab Views */}
            <div className="pt-2">
              {activeTab === 'overview' && (
                <DatasetOverview 
                  dataset={currentDataset} 
                  onDownload={(fmt) => handleDownloadDataset(fmt)} 
                />
              )}

              {activeTab === 'visualizer' && (
                <DatasetVisualizer 
                  dataset={currentDataset} 
                />
              )}

              {activeTab === 'table' && (
                <DatasetTable 
                  dataset={currentDataset} 
                  onDownloadCsv={() => handleDownloadDataset('csv')} 
                />
              )}

              {activeTab === 'columns' && (
                <ColumnInspector 
                  dataset={currentDataset} 
                />
              )}
            </div>

          </div>
        ) : (
          /* VIEW 2: DATASET CATALOG LIST (Kaggle-like Directory) */
          <div className="space-y-6">
            
            {/* Header Hero Banner (White & Oceanic Blue Government Theme) */}
            <div className="bg-gradient-to-r from-[#0F5167] via-[#0D4658] to-[#093443] border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden text-white">
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-mono font-bold border border-white/20">
                  <Database className="w-3.5 h-3.5 text-cyan-300" />
                  <span>National Polar Data Repository • NCPOR</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
                  Polar & Himalayan Data Explorer
                </h1>

                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
                  Explore, visualize, and download open-access scientific datasets from India's research stations (Himadri, Bharati, Maitri, Himansh) and expedition vessels.
                </p>
              </div>
            </div>

            {/* Filter and Search Controls (Clean White Card) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
              
              {/* Row 1: Search & Sort */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search datasets by variable (e.g. salinity, mass balance, CO2, ice core)..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-[#0F5167] focus:bg-white outline-none transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 shrink-0 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#0F5167]" />
                  <span>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-transparent text-[#0F5167] font-bold outline-none cursor-pointer"
                  >
                    <option value="popular">Most Downloaded</option>
                    <option value="recent">Most Recent</option>
                    <option value="size">File Size</option>
                    <option value="title">Dataset Title</option>
                  </select>
                </div>

              </div>

              {/* Row 2: Region & Domain Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                
                {/* Region Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <span className="text-slate-500 font-mono text-[11px] mr-1">Region:</span>
                  {['all', 'Arctic', 'Antarctica', 'Himalayas', 'Southern Ocean'].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        selectedRegion === reg
                          ? 'bg-[#0F5167] text-white font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {reg === 'all' ? 'All Regions' : reg}
                    </button>
                  ))}
                </div>

                {/* Domain Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono text-[11px]">Domain:</span>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="bg-slate-50 text-slate-700 font-mono text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
                  >
                    <option value="all">All Scientific Domains</option>
                    <option value="Oceanography">Oceanography</option>
                    <option value="Glaciology">Glaciology</option>
                    <option value="Paleoclimate">Paleoclimate</option>
                    <option value="Atmospheric Physics">Atmospheric Physics</option>
                    <option value="Marine Ecology">Marine Ecology</option>
                    <option value="Cryosphere">Cryosphere</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Datasets List Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>SHOWING {filteredDatasets.length} DATASETS</span>
                <span>Open Science Format (CSV, NetCDF, GeoTIFF)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredDatasets.map((ds) => (
                  <div
                    key={ds.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#0F5167] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                            {ds.region}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {ds.domain}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-slate-500">
                          {ds.sizeStr}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 
                        onClick={() => handleSelectDataset(ds.id)}
                        className="text-base font-bold font-serif text-[#093443] group-hover:text-[#0F5167] transition-colors cursor-pointer leading-snug"
                      >
                        {ds.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {ds.description}
                      </p>

                      {/* Feature Columns Preview Chips */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {ds.columns.slice(0, 4).map((c) => (
                          <span key={c.name} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                            {c.label}
                          </span>
                        ))}
                        {ds.columns.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-100">
                            +{ds.columns.length - 4} more
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Card Footer: Metadata & Action Buttons */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="text-[11px] text-slate-500 font-mono">
                        <span>{ds.downloadCount.toLocaleString()} downloads</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadDataset('csv', ds)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                          title="Download CSV"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleSelectDataset(ds.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0F5167] hover:bg-[#093443] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer group-hover:scale-102"
                        >
                          <span>Explore Data</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function DataExplorerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-[#0F5167] font-mono text-xs">
        Loading Polar Data Explorer Matrix...
      </div>
    }>
      <DataExplorerContent />
    </Suspense>
  );
}
