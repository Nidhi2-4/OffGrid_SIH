'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  AssistantPersona, 
  AssistantLanguage, 
  AssistantResponse, 
  generateAssistantAnswer 
} from '@/lib/aiAssistantEngine';
import { KnowledgeItem } from '@/data/polarKnowledgeBase';
import SuggestedPrompts from './SuggestedPrompts';
import CitationDrawer from './CitationDrawer';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Microscope, 
  Globe, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  responsePayload?: AssistantResponse;
  timestamp: string;
}

export default function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<AssistantPersona>('scientist');
  const [language, setLanguage] = useState<AssistantLanguage>('en');
  const [selectedCitation, setSelectedCitation] = useState<KnowledgeItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll internal chat container when messages are sent/received, not on initial page load
    if (messages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSendQuery = async (queryText: string) => {
    const q = queryText.trim();
    if (!q || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setLoading(true);

    try {
      // Simulate intelligent fast RAG streaming/generation
      const answer = await generateAssistantAnswer(q, persona, language);
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: answer.answerText,
        responsePayload: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Assistant Query Error:', err);
      const errorMessage: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        sender: 'assistant',
        text: 'An error occurred while querying the polar knowledge base. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;
    
    let report = `# HimSagar AI Research Assistant Brief\n\n`;
    report += `**Generated At:** ${new Date().toLocaleString()}\n`;
    report += `**Persona:** ${persona.toUpperCase()} | **Language:** ${language.toUpperCase()}\n\n---\n\n`;

    messages.forEach((m) => {
      if (m.sender === 'user') {
        report += `### 👤 Research Query:\n> ${m.text}\n\n`;
      } else {
        report += `### 🤖 Grounded Polar AI Response:\n${m.text}\n\n`;
        if (m.responsePayload?.matchedItems) {
          report += `#### 📑 Verified Sources:\n`;
          m.responsePayload.matchedItems.forEach((it) => {
            report += `- **[${it.citationId}] ${it.title}** (${it.year}). DOI: ${it.doi || 'N/A'}\n`;
          });
        }
        report += `\n---\n\n`;
      }
    });

    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HimSagar_Research_Brief_${Date.now()}.md`;
    a.click();
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  // Helper to render text with clickable citation badges [1], [2], etc.
  const renderMessageContent = (msg: ChatMessage) => {
    const text = msg.text;
    const items = msg.responsePayload?.matchedItems || [];

    // Parse citation brackets like [1], [2]
    const parts = text.split(/(\[\d+\])/g);

    return (
      <div className="space-y-2.5 text-sm leading-relaxed font-sans text-gray-800">
        {parts.map((part, idx) => {
          const match = part.match(/\[(\d+)\]/);
          if (match) {
            const citId = parseInt(match[1], 10);
            const targetItem = items.find((it) => it.citationId === citId);

            return (
              <button
                key={idx}
                onClick={() => targetItem && setSelectedCitation(targetItem)}
                className="inline-flex items-center px-1.5 py-0.5 mx-0.5 text-xs font-mono font-bold text-[#0F5167] bg-teal-50 hover:bg-teal-100 border border-teal-300 rounded cursor-pointer transition-all hover:scale-105 shadow-2xs"
                title={targetItem ? `View Citation: ${targetItem.title}` : 'View Citation'}
              >
                [{citId}]
              </button>
            );
          }

          // Format markdown headers, lists, quotes
          if (part.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-base sm:text-lg font-bold font-serif text-[#093443] mt-3 mb-1.5">
                {part.replace('### ', '')}
              </h3>
            );
          }
          if (part.startsWith('#### ')) {
            return (
              <h4 key={idx} className="text-sm font-bold text-[#0F5167] mt-2.5 mb-1 font-serif">
                {part.replace('#### ', '')}
              </h4>
            );
          }
          if (part.startsWith('> ')) {
            return (
              <blockquote key={idx} className="pl-3 border-l-3 border-[#0F5167] text-teal-950 italic my-1.5 bg-teal-50/70 py-1.5 rounded-r">
                {part.replace('> ', '')}
              </blockquote>
            );
          }

          return <span key={idx} className="whitespace-pre-wrap">{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-gray-900 relative">
      
      {/* Top Toolbar Bar */}
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-2xs">
        
        {/* Left: Persona Switcher */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg border border-gray-200 shadow-inner">
          <button
            onClick={() => setPersona('scientist')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${
              persona === 'scientist'
                ? 'bg-[#0F5167] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Microscope className="w-3.5 h-3.5 text-teal-200" />
            <span>Scientist Mode</span>
          </button>

          <button
            onClick={() => setPersona('student')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${
              persona === 'student'
                ? 'bg-[#0F5167] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>Student Explainer</span>
          </button>
        </div>

        {/* Center: Language Toggle */}
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-gray-300 text-xs shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-[#0F5167]" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as AssistantLanguage)}
            className="bg-transparent text-gray-800 text-xs font-bold outline-none cursor-pointer pr-1"
          >
            <option value="en">English (EN)</option>
            <option value="hi">हिन्दी (HI)</option>
            <option value="bn">বাংলা (BN)</option>
            <option value="ta">தமிழ் (TA)</option>
          </select>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <>
              <button
                onClick={handleExportChat}
                className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#0F5167] bg-white hover:bg-teal-50 rounded border border-gray-300 shadow-2xs transition-colors"
                title="Export conversation as Markdown Brief"
              >
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">Export Brief</span>
              </button>

              <button
                onClick={handleClearChat}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

      </div>

      {/* Main Chat Stream Container */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        {/* Welcome Banner when empty */}
        {messages.length === 0 && (
          <div className="space-y-6 pt-2">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#093443] tracking-tight">
                HimSagar AI Polar Research Assistant
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                RAG-grounded conversational intelligence connecting India&apos;s Arctic, Antarctic, and Himalayan expeditions with verified DOIs, CTD telemetry, and dual scientist/student persona modes.
              </p>
            </div>

            {/* Suggested Prompts Cards */}
            <SuggestedPrompts onSelectPrompt={handleSendQuery} />
          </div>
        )}

        {/* Message Thread */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl mx-auto ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Assistant Avatar */}
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-[#0F5167] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot className="w-4.5 h-4.5" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`rounded-2xl p-4 sm:p-5 shadow-sm max-w-2xl sm:max-w-3xl border transition-all ${
                msg.sender === 'user'
                  ? 'bg-[#0F5167] border-[#0F5167] text-white ml-12 rounded-tr-xs'
                  : 'bg-white border-gray-200 text-gray-800 mr-12 rounded-tl-xs shadow-xs'
              }`}
            >
              {/* Message Header */}
              <div className={`flex items-center justify-between gap-4 mb-2 pb-1.5 border-b text-xs ${
                msg.sender === 'user' ? 'border-white/20 text-teal-100' : 'border-gray-100 text-gray-500'
              }`}>
                <span className="font-bold flex items-center gap-1.5">
                  {msg.sender === 'user' ? (
                    <>
                      <User className="w-3.5 h-3.5 text-amber-300" />
                      <span>Research Query</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#0F5167]" />
                      <span className="text-[#0F5167]">HimSagar Grounded Engine</span>
                      {msg.responsePayload && (
                        <span className="ml-2 px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 text-[10px] font-mono border border-emerald-300 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          {msg.responsePayload.groundingConfidence}% Grounded
                        </span>
                      )}
                    </>
                  )}
                </span>
                <span className="text-[10px] opacity-75 font-mono">{msg.timestamp}</span>
              </div>

              {/* Message Body with Citation Parser */}
              {renderMessageContent(msg)}

              {/* Key Metrics Pill Grid if available */}
              {msg.responsePayload?.keyMetrics && (
                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {Object.entries(msg.responsePayload.keyMetrics).map(([k, v]) => (
                    <div key={k} className="p-2.5 rounded bg-gray-50 border border-gray-200">
                      <span className="text-[10px] text-gray-500 block truncate">{k}</span>
                      <span className="font-bold text-[#093443] font-mono">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Citation Sources Footnotes Strip */}
              {msg.responsePayload?.matchedItems && msg.responsePayload.matchedItems.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                  <span className="text-[11px] font-mono text-[#0F5167] font-bold uppercase tracking-wider block">
                    Verified Citations & Evidence:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {msg.responsePayload.matchedItems.map((cit) => (
                      <button
                        key={cit.id}
                        onClick={() => setSelectedCitation(cit)}
                        className="text-left px-2.5 py-1 rounded bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 text-xs transition-all flex items-center gap-2 group cursor-pointer shadow-2xs"
                      >
                        <span className="w-4 h-4 rounded bg-[#0F5167] text-white font-mono font-bold text-[10px] flex items-center justify-center">
                          {cit.citationId}
                        </span>
                        <span className="text-gray-800 group-hover:text-[#0F5167] font-medium max-w-[200px] truncate">
                          {cit.title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-[#0F5167] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Footer Toolbar */}
              {msg.sender === 'assistant' && (
                <div className="mt-3 pt-2 flex items-center justify-between text-xs text-gray-500">
                  <button
                    onClick={() => handleCopyText(msg.id, msg.text)}
                    className="inline-flex items-center gap-1 hover:text-[#0F5167] transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Answer</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/map"
                    className="inline-flex items-center gap-1 text-[#0F5167] hover:underline font-bold text-xs"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>View Map Telemetry</span>
                  </Link>
                </div>
              )}

              {/* Suggested Follow-Ups */}
              {msg.responsePayload?.suggestedFollowUps && (
                <div className="mt-3 pt-2 border-t border-gray-100 space-y-1">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Suggested Next Questions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.responsePayload.suggestedFollowUps.map((f, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendQuery(f)}
                        className="text-left text-[11px] px-2.5 py-1 rounded-full bg-gray-50 hover:bg-teal-50 text-gray-700 hover:text-[#0F5167] border border-gray-200 hover:border-teal-300 transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <ChevronRight className="w-2.5 h-2.5 text-amber-500" />
                        <span>{f}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* User Avatar */}
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-gray-950 flex items-center justify-center shrink-0 font-bold shadow-sm mt-1">
                <User className="w-4.5 h-4.5" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Typing Indicator */}
        {loading && (
          <div className="flex gap-3 max-w-4xl mx-auto">
            <div className="w-8 h-8 rounded-lg bg-[#0F5167] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 text-xs text-gray-600 flex items-center gap-3 shadow-xs">
              <RefreshCw className="w-4 h-4 text-[#0F5167] animate-spin" />
              <span>Synthesizing grounded citations across MoES & NCPOR knowledge graph...</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Query Input Bar */}
      <div className="p-4 border-t border-gray-200 bg-white/95 backdrop-blur-md shrink-0 shadow-lg">
        <div className="max-w-4xl mx-auto">
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputQuery);
            }}
            className="flex items-center gap-2 bg-gray-50 hover:bg-white focus-within:bg-white border border-gray-300 focus-within:border-[#0F5167] focus-within:ring-2 focus-within:ring-[#0F5167]/20 rounded-xl p-1.5 shadow-sm transition-all"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask about Indian Arctic/Antarctic stations, IndARC, glaciology, or expeditions... (${persona === 'scientist' ? 'Scientist Mode' : 'Student Mode'})`}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-4 py-2 rounded-lg bg-[#0F5167] hover:bg-[#093443] disabled:opacity-40 disabled:hover:bg-[#0F5167] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Grounded in official MoES/NCPOR peer-reviewed publications and expeditions.</span>
            </span>
            <span className="hidden sm:inline">Press Enter to send</span>
          </div>

        </div>
      </div>

      {/* Slide-out Citation Evidence Drawer */}
      <CitationDrawer
        item={selectedCitation}
        onClose={() => setSelectedCitation(null)}
      />

    </div>
  );
}
