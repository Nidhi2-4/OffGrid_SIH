'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Volume2, 
  FileText, 
  CheckCircle2, 
  Compass, 
  Bot 
} from 'lucide-react';
import { NewsArticle } from '@/data/outreachArticles';

interface FeaturedNewsHeroProps {
  article: NewsArticle;
  onReadArticle: (article: NewsArticle) => void;
}

export default function FeaturedNewsHero({ article, onReadArticle }: FeaturedNewsHeroProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Col: Visual Image */}
        <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] bg-slate-900">
          <Image
            src={article.coverImage || '/2379df2aa50b403dfa7e1d319eb3c478.jpg'}
            alt={article.headline}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Region Badge & Breaking Tag */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LEAD STORY</span>
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/90 text-[#0F5167] shadow-sm backdrop-blur-md">
              {article.region}
            </span>
          </div>

          {/* Bottom Infographic Pill */}
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md text-white p-3 rounded-2xl border border-white/20 flex items-center justify-between shadow-lg">
            <div>
              <div className="text-[10px] text-cyan-300 uppercase font-mono">{article.infographicMetric.label}</div>
              <div className="text-sm sm:text-base font-bold text-white font-mono">{article.infographicMetric.value}</div>
            </div>
            <div className="text-[11px] text-slate-300 text-right max-w-[180px] truncate">
              {article.infographicMetric.subtext}
            </div>
          </div>
        </div>

        {/* Right Col: Article Content & Actions */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
              <span className="text-[#0F5167] font-bold">{article.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            {/* Headline */}
            <h1 
              onClick={() => onReadArticle(article)}
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-[#093443] hover:text-[#0F5167] transition-colors cursor-pointer leading-tight"
            >
              {article.headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
              {article.subheadline}
            </p>

            {/* Key Takeaway Bullet Highlights */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 mt-2">
              <div className="text-xs font-bold font-mono text-[#0F5167] uppercase tracking-wider">
                Key Scientific Breakthroughs:
              </div>
              <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                {article.keyTakeaways.slice(0, 2).map((pt, i) => (
                  <li key={i} className="line-clamp-2 leading-relaxed">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Byline & Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-800">{article.author.split('•')[0]}</span>
              <div className="text-[11px] text-slate-400">{article.institution}</div>
            </div>

            <button
              onClick={() => onReadArticle(article)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5167] hover:bg-[#093443] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
