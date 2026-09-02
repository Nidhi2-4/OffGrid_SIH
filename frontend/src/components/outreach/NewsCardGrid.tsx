'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  FileText, 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { NewsArticle } from '@/data/outreachArticles';

interface NewsCardGridProps {
  articles: NewsArticle[];
  onReadArticle: (article: NewsArticle) => void;
}

export default function NewsCardGrid({ articles, onReadArticle }: NewsCardGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      if (selectedRegion !== 'all' && art.region !== selectedRegion) return false;
      if (selectedCategory !== 'all' && art.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inHeadline = art.headline.toLowerCase().includes(q);
        const inSub = art.subheadline.toLowerCase().includes(q);
        const inLead = art.leadHook.toLowerCase().includes(q);
        const inAuthor = art.author.toLowerCase().includes(q);
        const inCite = art.citation.authors.toLowerCase().includes(q);
        return inHeadline || inSub || inLead || inAuthor || inCite;
      }

      return true;
    });
  }, [articles, selectedRegion, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
        
        {/* Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search science news, glacier findings, ocean discoveries, authors..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-[#0F5167] focus:bg-white outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-slate-500 shrink-0">
            {filteredArticles.length} STORIES AVAILABLE
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 text-xs">
          {/* Region Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-slate-500 font-mono text-[11px] mr-1">Region:</span>
            {['all', 'Arctic', 'Antarctica', 'Himalayas', 'Southern Ocean'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#0F5167] text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {reg === 'all' ? 'All Regions' : reg}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px]">Domain:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 text-slate-700 font-mono text-xs border border-slate-200 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
            >
              <option value="all">All Domains</option>
              <option value="Climate & Cryosphere">Climate & Cryosphere</option>
              <option value="Oceanography">Oceanography</option>
              <option value="Atmospheric Science">Atmospheric Science</option>
              <option value="Paleoclimate">Paleoclimate</option>
            </select>
          </div>
        </div>

      </div>

      {/* Grid of News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-[#0F5167] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Image Banner */}
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <Image
                src={art.coverImage || '/2379df2aa50b403dfa7e1d319eb3c478.jpg'}
                alt={art.headline}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/90 text-[#0F5167] shadow-sm backdrop-blur-md">
                  {art.region}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/80 text-white shadow-sm backdrop-blur-md">
                  {art.category}
                </span>
              </div>

              {/* Read Time badge */}
              <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-slate-200 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {art.readTime}
              </div>
            </div>

            {/* Middle Content */}
            <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{art.publishedDate}</span>
                </div>

                <h2 
                  onClick={() => onReadArticle(art)}
                  className="text-base font-bold font-serif text-[#093443] group-hover:text-[#0F5167] transition-colors cursor-pointer leading-snug line-clamp-2"
                >
                  {art.headline}
                </h2>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {art.leadHook}
                </p>
              </div>

              {/* Bottom Byline & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-3">
                <div className="text-[11px] text-slate-500 truncate max-w-[170px]">
                  <span className="font-semibold text-slate-700">{art.author.split('•')[0]}</span>
                </div>

                <button
                  onClick={() => onReadArticle(art)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0F5167] hover:bg-[#093443] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
                >
                  <span>Read News</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
