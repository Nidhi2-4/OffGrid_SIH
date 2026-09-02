'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedNewsHero from '@/components/outreach/FeaturedNewsHero';
import AiNewsroomStudio from '@/components/outreach/AiNewsroomStudio';
import NewsCardGrid from '@/components/outreach/NewsCardGrid';
import ArticleModal from '@/components/outreach/ArticleModal';
import { OUTREACH_ARTICLES, NewsArticle } from '@/data/outreachArticles';
import { 
  Newspaper, 
  Sparkles, 
  BookOpen, 
  Bot, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';

export default function ScienceOutreachPage() {
  const [articlesList, setArticlesList] = useState<NewsArticle[]>(OUTREACH_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const featuredLeadArticle = articlesList[0];

  const handleArticleGenerated = (newArticle: NewsArticle) => {
    // Add newly generated article to the list at the top and open the modal
    setArticlesList((prev) => [newArticle, ...prev]);
    setSelectedArticle(newArticle);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Official Government Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-8">
        
        {/* Top Header Hero Banner */}
        <div className="bg-gradient-to-r from-[#0F5167] via-[#0D4658] to-[#093443] border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-mono font-bold border border-white/20">
              <Newspaper className="w-3.5 h-3.5 text-cyan-300" />
              <span>National Polar & Ocean Science Outreach • NCPOR / MoES</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Science Newsroom & Media Dissemination
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
              Transforming complex polar datasets and peer-reviewed research papers into accessible, engaging science journalism—complete with verified citations and open data links.
            </p>
          </div>
        </div>

        {/* 1. Breaking / Featured Lead Story */}
        {featuredLeadArticle && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold text-[#0F5167] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Featured Editorial Showcase
              </span>
              <span>Updated Daily from Arctic, Antarctic & Himalayan Bases</span>
            </div>

            <FeaturedNewsHero
              article={featuredLeadArticle}
              onReadArticle={(art) => setSelectedArticle(art)}
            />
          </div>
        )}

        {/* 2. Interactive AI Science Newsroom Studio */}
        <AiNewsroomStudio onArticleGenerated={handleArticleGenerated} />

        {/* 3. Categorized News Grid */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-200 pb-3">
            <span className="font-bold text-[#0F5167] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0F5167]" />
              Explore All Science Stories & Dispatches
            </span>
            <span>Peer-Reviewed & Verified</span>
          </div>

          <NewsCardGrid
            articles={articlesList}
            onReadArticle={(art) => setSelectedArticle(art)}
          />
        </div>

      </main>

      {/* Full Article Reader Modal with Audio Speech & Citations Footer */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Official MoES Footer */}
      <Footer />
    </div>
  );
}
