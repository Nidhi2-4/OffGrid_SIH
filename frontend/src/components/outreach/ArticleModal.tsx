'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  FileText, 
  ExternalLink, 
  Database, 
  Bot, 
  Sparkles, 
  Quote, 
  ShieldCheck,
  Bookmark
} from 'lucide-react';
import { NewsArticle } from '@/data/outreachArticles';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [citationFormat, setCitationFormat] = useState<'apa' | 'bibtex'>('apa');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [onClose]);

  if (!article) return null;

  // Audio Speech Narration Toggle (Web Speech API)
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${article.headline}. ${article.subheadline}. ${article.leadHook} Key takeaways: ${article.keyTakeaways.join('. ')}. ${article.bodySections.map(s => `${s.heading}. ${s.content}`).join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-500 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white text-[#0F5167] border border-slate-200 shadow-2xs">
              {article.region}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Listen / Audio Narration Button */}
            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-[#0F5167] border border-slate-200'
              }`}
              title={isSpeaking ? 'Stop Audio Narration' : 'Listen to News Story'}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Pause Audio' : 'Listen'}</span>
            </button>

            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Headline & Deck */}
          <div className="space-y-3 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
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

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-[#093443] leading-tight">
              {article.headline}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              {article.subheadline}
            </p>

            {/* Author Byline */}
            <div className="pt-2 text-xs text-slate-700 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span><strong>By:</strong> {article.author}</span>
              <span>•</span>
              <span className="text-slate-500">{article.institution}</span>
            </div>
          </div>

          {/* Lead Hook Paragraph */}
          <p className="text-base sm:text-lg text-slate-800 font-serif leading-relaxed italic border-l-4 border-[#0F5167] pl-4 py-1">
            {article.leadHook}
          </p>

          {/* Key Takeaways Callout Box */}
          <div className="bg-gradient-to-br from-blue-50/70 to-cyan-50/40 rounded-2xl p-5 border border-blue-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0F5167] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Key Scientific Breakthroughs & Takeaways</span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              {article.keyTakeaways.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F5167] mt-2 shrink-0" />
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Body Paragraphs with Subheadings */}
          <div className="space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed font-sans">
            {article.bodySections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#093443]">
                  {sec.heading}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Scientist Quote Card */}
          {article.scientistQuote && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 relative overflow-hidden">
              <Quote className="absolute -top-2 -left-2 w-16 h-16 text-slate-200/80 pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <p className="text-sm sm:text-base font-serif italic text-slate-800 leading-relaxed">
                  {article.scientistQuote.quote}
                </p>
                <div className="text-xs text-slate-600 font-mono pt-1">
                  — <strong className="text-[#0F5167]">{article.scientistQuote.scientist}</strong>, {article.scientistQuote.designation}
                </div>
              </div>
            </div>
          )}

          {/* MANDATORY END SECTION: VERIFIED SCIENTIFIC CITATIONS & OPEN DATA */}
          <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-200 space-y-4 pt-5 mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#0F5167] font-mono flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0F5167]" />
                  <span>Peer-Reviewed Scientific Citations & References</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Verified primary publication source and open data links for researchers & students.
                </p>
              </div>

              {/* Citation Format Switcher */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                <button
                  onClick={() => setCitationFormat('apa')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg cursor-pointer ${
                    citationFormat === 'apa' ? 'bg-[#0F5167] text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  APA
                </button>
                <button
                  onClick={() => setCitationFormat('bibtex')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg cursor-pointer ${
                    citationFormat === 'bibtex' ? 'bg-[#0F5167] text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  BibTeX
                </button>
              </div>
            </div>

            {/* Citation Text Box */}
            <div className="relative bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-800 shadow-2xs">
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-700">
                {citationFormat === 'apa' ? article.citation.apa : article.citation.bibtex}
              </pre>

              <button
                onClick={() => copyToClipboard(citationFormat === 'apa' ? article.citation.apa : article.citation.bibtex)}
                className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-[11px] cursor-pointer shadow-2xs"
                title="Copy Citation"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-mono">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-mono">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* DOI & Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-mono text-[11px]">DOI:</span>
                <a
                  href={`https://doi.org/${article.citation.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0F5167] font-mono font-bold hover:underline flex items-center gap-1"
                >
                  <span>{article.citation.doi}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="flex items-center gap-2">
                {article.relatedDatasetId && (
                  <Link
                    href={`/explore?id=${article.relatedDatasetId}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0F5167] hover:bg-[#093443] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                  >
                    <Database className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Explore Raw Dataset</span>
                  </Link>
                )}

                <Link
                  href={`/assistant?q=Explain ${encodeURIComponent(article.headline)} findings in detail`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-100 text-[#0F5167] text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-all"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI Assistant</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>National Centre for Polar and Ocean Research (NCPOR) • Science Dissemination</span>
          <button
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close Story
          </button>
        </div>

      </div>

    </div>
  );
}
