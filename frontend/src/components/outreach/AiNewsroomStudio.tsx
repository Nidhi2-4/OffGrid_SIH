'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Newspaper, 
  GraduationCap, 
  Landmark, 
  Megaphone, 
  Send, 
  Loader2, 
  CheckCircle2, 
  FileText, 
  Database,
  ArrowRight
} from 'lucide-react';
import { JournalismMode, synthesizeScienceNews } from '@/lib/aiNewsSynthesizer';
import { NewsArticle } from '@/data/outreachArticles';
import { EXPLORER_DATASETS } from '@/data/explorerDatasets';

interface AiNewsroomStudioProps {
  onArticleGenerated: (article: NewsArticle) => void;
}

export default function AiNewsroomStudio({ onArticleGenerated }: AiNewsroomStudioProps) {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('ds-indarc-ctd');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [mode, setMode] = useState<JournalismMode>('frontpage');
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSuccessMessage(false);

    try {
      const result = await synthesizeScienceNews({
        topicOrText: customPrompt.trim() || 'Polar Science & Climate Change',
        mode,
        datasetId: selectedDatasetId || undefined,
      });

      if (result && result.article) {
        onArticleGenerated(result.article);
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3500);
      }
    } catch (err) {
      console.error('Error generating news article:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const modeOptions: { id: JournalismMode; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    {
      id: 'frontpage',
      label: 'Front-Page News',
      icon: Newspaper,
      desc: 'Engaging journalism for general public with climate hooks'
    },
    {
      id: 'education',
      label: 'School & Youth',
      icon: GraduationCap,
      desc: 'Simplified explanations with analogies for students'
    },
    {
      id: 'policy',
      label: 'Policy Brief',
      icon: Landmark,
      desc: 'Executive summary with strategic recommendations'
    },
    {
      id: 'pressrelease',
      label: 'Press Release',
      icon: Megaphone,
      desc: 'Official MoES/NCPOR institutional announcement'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/40 rounded-3xl p-6 sm:p-7 border border-blue-200 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#093443]">
            Transform Scientific Papers & Datasets into News
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select an official polar dataset or type a scientific discovery. Our LLM will format it into a news article with verified citations at the end.
          </p>
        </div>

        {successMessage && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Article Formed & Ready!</span>
          </div>
        )}
      </div>

      {/* Target Audience Mode Pills */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold text-slate-700 uppercase">
          1. Select Editorial Tone & Audience
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {modeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = mode === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setMode(opt.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0F5167] text-white border-[#0F5167] shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-[#0F5167]'}`} />
                  <span className="text-xs font-bold">{opt.label}</span>
                </div>
                <p className={`text-[11px] mt-1.5 leading-snug ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Source Selection & Custom Prompt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Source Dataset Selector */}
        <div className="lg:col-span-5 space-y-1.5">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase">
            2. Choose Grounding Dataset / Paper
          </label>
          <div className="relative">
            <Database className="absolute left-3 top-3 w-4 h-4 text-[#0F5167]" />
            <select
              value={selectedDatasetId}
              onChange={(e) => setSelectedDatasetId(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-white text-slate-900 border border-slate-200 rounded-xl focus:border-[#0F5167] outline-none font-medium shadow-2xs cursor-pointer"
            >
              {EXPLORER_DATASETS.map((ds) => (
                <option key={ds.id} value={ds.id}>
                  [{ds.region}] {ds.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Angle or Topic (Optional) */}
        <div className="lg:col-span-7 space-y-1.5">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase">
            3. Add Custom Journalistic Focus / Angle (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Focus on monsoon connection, water security, or marine food chains..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:border-[#0F5167] outline-none shadow-2xs"
            />

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5167] hover:bg-[#093443] disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate News</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
