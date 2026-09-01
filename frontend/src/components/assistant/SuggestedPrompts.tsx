'use client';

import React from 'react';
import { SUGGESTED_RESEARCH_PROMPTS, SuggestedPromptItem } from '@/data/polarKnowledgeBase';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (promptText: string) => void;
}

export default function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 my-6">
      
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-teal-50 border border-teal-200 text-[#0F5167]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#093443] tracking-wide font-serif">
              Suggested Polar Science Research Queries
            </h3>
            <p className="text-xs text-gray-600">
              Select a domain query below or type your own question with RAG citation grounding.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {SUGGESTED_RESEARCH_PROMPTS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectPrompt(item.prompt)}
            className="text-left p-4 rounded-xl bg-white hover:bg-teal-50/40 border border-gray-200/90 hover:border-[#0F5167] transition-all duration-200 group flex flex-col justify-between shadow-2xs hover:shadow-md cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-[#0F5167] border border-teal-200/80">
                  {item.category}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#093443] group-hover:text-[#0F5167] transition-colors line-clamp-1 font-serif">
                {item.title}
              </h4>
              <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed font-sans">
                {item.prompt}
              </p>
            </div>

            <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-end text-[11px] font-bold text-[#0F5167] group-hover:translate-x-0.5 transition-transform">
              <span className="mr-1">Run Query</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
