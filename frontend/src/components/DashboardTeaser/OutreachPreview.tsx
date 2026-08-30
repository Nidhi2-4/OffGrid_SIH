'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, BookOpen, Quote, Share2, Check, ArrowRight } from 'lucide-react';

export const OutreachPreview: React.FC = () => {
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const scientificContent = {
    title: 'High-Resolution Stable Isotopic Analysis of Coastal Antarctic Ice Cores',
    subtitle: 'NCPOR / 43rd Indian Scientific Expedition to Antarctica',
    author: 'Dr. Thamban Meloth et al., Cryosphere Sciences Group',
    date: 'August 2026',
    abstract:
      'High-resolution δ18O and δD profiles retrieved from a 120-meter firn core near Bharati Station demonstrate statistically significant multi-decadal warming trends across the Princess Elizabeth Land sector. Spatial correlation with Southern Annular Mode (SAM) anomalies indicates enhanced poleward moisture advection during positive SAM phases.',
    citation: 'NCPOR Technical Report #ANT-2026-088; DOI: 10.1016/j.polar.2026.04.012',
    tags: ['Glaciology', 'Isotope Geochemistry', 'Antarctica', 'SAM Mode'],
  };

  const simpleContent = {
    title: 'How Ice Cores Tell Us Earth\'s 100-Year Climate Story',
    subtitle: 'Simplified Student Explainer • NCPOR Smart Science',
    author: 'HimSagar AI Outreach Engine (Verified by NCPOR)',
    date: 'August 2026',
    abstract:
      'Think of Antarctic ice like the rings in a tree trunk! Every year, fresh snowfall traps tiny bubbles of ancient air and atmospheric moisture. By drilling long cylinders of ice at Bharati Station, Indian scientists can count back year-by-year to measure how cold Antarctica was decades ago and discover how changing wind patterns affect global climate.',
    citation: 'Source: 120m Ice Core Analysis from Bharati Station (ISEA-43)',
    tags: ['School Science', 'Climate Change', 'How Ice Cores Work'],
  };

  const current = isSimpleMode ? simpleContent : scientificContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `"How Indian scientists study 100 years of climate history using Antarctic ice cores at Bharati Station! Read on HimSagar Portal."`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-[#CCCCCC] rounded-xs shadow-xs p-4 flex flex-col h-full">
      {/* Header with AI Outreach Badge & Toggle */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#FF9933] text-black font-bold rounded-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-[#0B3D91]">
              AI Outreach Engine
            </h2>
            <p className="text-[11px] text-gray-500">Automated Public Science Dissemination</p>
          </div>
        </div>

        {/* Explain It Simply Toggle Switch */}
        <button
          onClick={() => setIsSimpleMode(!isSimpleMode)}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xs border transition-all ${
            isSimpleMode
              ? 'bg-[#138808] text-white border-green-700 shadow-xs scale-102'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
          }`}
          title="Toggle Simplified Student Explainer"
        >
          <span>{isSimpleMode ? '✨ Simple Mode ON' : '💡 Explain It Simply'}</span>
        </button>
      </div>

      {/* Article Preview Card */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata pill */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-2xs ${
                isSimpleMode
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-blue-100 text-blue-800 border border-blue-300'
              }`}
            >
              {isSimpleMode ? 'STUDENT & PUBLIC EXPLAINER' : 'PEER-REVIEWED PUBLICATION'}
            </span>
            <span className="text-[11px] text-gray-400 font-mono">{current.date}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-sm md:text-base text-gray-900 leading-snug mb-1.5">
            {current.title}
          </h3>

          <p className="text-[11px] text-gray-500 mb-2.5 font-medium">
            {current.subtitle} • <span className="text-gray-700">{current.author}</span>
          </p>

          {/* Abstract / Explainer Text */}
          <div className="bg-[#F2F2F2] p-3 rounded-xs border border-gray-200 text-xs leading-relaxed text-gray-800 mb-3 relative">
            <Quote className="w-4 h-4 text-gray-400 absolute top-2 right-2 opacity-50" />
            <p>{current.abstract}</p>
          </div>

          {/* Verified Citation Box (PRD Feature) */}
          <div className="p-2 bg-blue-50 border-l-3 border-[#0B3D91] rounded-r-xs text-[11px] text-[#003366] mb-3">
            <span className="font-bold">Verified Citation: </span>
            <span className="font-mono text-[10px] text-gray-700">{current.citation}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xs border border-gray-300 flex items-center justify-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Post Caption!' : 'Get Social Caption'}</span>
            </button>

            <Link
              href="/articles/1"
              className="py-1.5 px-3 bg-[#0B3D91] hover:bg-[#002147] text-white text-xs font-bold rounded-xs flex items-center gap-1 transition-colors"
            >
              <span>Read Full</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-1">
            {current.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded-2xs border border-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
