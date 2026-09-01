'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage, Language } from '@/context/LanguageContext';
import { 
  Globe, 
  Search, 
  Menu, 
  X, 
  Compass, 
  Bot, 
  MapPin, 
  BarChart3, 
  BookOpen, 
  UserCheck, 
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');

  const handleFontSize = (size: 'normal' | 'large' | 'larger') => {
    setFontSize(size);
    if (typeof document !== 'undefined') {
      if (size === 'normal') document.documentElement.style.fontSize = '100%';
      if (size === 'large') document.documentElement.style.fontSize = '108%';
      if (size === 'larger') document.documentElement.style.fontSize = '116%';
    }
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50 shadow-xs">
      {/* Tricolor Government Strip */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white border-y border-gray-100"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* Topmost Official Bar (Govt / MoES / Language Toggle) */}
      <div className="bg-[#002147] text-white text-xs px-4 py-1.5 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Official Government Credentials */}
          <div className="flex items-center space-x-3 divide-x divide-blue-800/80">
            <span className="font-semibold tracking-wide text-amber-300 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              {t.govtIndia}
            </span>
            <span className="pl-3 text-blue-100 hidden sm:inline">{t.moesTitle}</span>
            <span className="pl-3 text-blue-200 hidden md:inline text-[11px]">{t.ncporTitle}</span>
          </div>

          {/* Right: Accessibility & LANGUAGE TOGGLE AT THE TOP RIGHT */}
          <div className="flex items-center space-x-3">
            {/* Accessibility Font Size Buttons */}
            <div className="hidden lg:flex items-center space-x-1 text-[11px] bg-blue-900/60 px-2 py-0.5 rounded border border-blue-800/60">
              <span className="text-gray-300 mr-1">A/A:</span>
              <button 
                onClick={() => handleFontSize('normal')}
                className={`px-1 rounded hover:text-white ${fontSize === 'normal' ? 'font-bold text-amber-300' : 'text-gray-300'}`}
                title="Standard Text Size"
              >
                A-
              </button>
              <button 
                onClick={() => handleFontSize('large')}
                className={`px-1 rounded hover:text-white ${fontSize === 'large' ? 'font-bold text-amber-300' : 'text-gray-300'}`}
                title="Larger Text Size"
              >
                A
              </button>
              <button 
                onClick={() => handleFontSize('larger')}
                className={`px-1 rounded hover:text-white ${fontSize === 'larger' ? 'font-bold text-amber-300' : 'text-gray-300'}`}
                title="Extra Large Text Size"
              >
                A+
              </button>
            </div>

            {/* PROMINENT TOP-RIGHT LANGUAGE TOGGLE */}
            <div className="relative">
              <div className="flex items-center bg-[#0B3D91] hover:bg-blue-800 border border-blue-400/40 rounded-sm p-0.5 transition-all shadow-inner">
                {/* Language Quick Switch Buttons */}
                <div className="flex items-center">
                  <span className="px-1.5 py-0.5 text-[11px] text-blue-200 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline font-medium">Lang:</span>
                  </span>
                  
                  <div className="flex items-center bg-blue-950/60 rounded px-0.5">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-2 py-0.5 text-xs font-semibold rounded transition-all duration-150 ${
                          language === lang.code
                            ? 'bg-amber-400 text-gray-950 shadow-xs font-bold'
                            : 'text-blue-100 hover:text-white hover:bg-blue-900/80'
                        }`}
                        aria-label={`Switch to ${lang.label}`}
                      >
                        {lang.nativeName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* More Language Dropdown Trigger */}
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="px-1.5 py-0.5 text-blue-200 hover:text-white border-l border-blue-800 ml-1 flex items-center text-[10px]"
                  title="More regional languages"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Language Dropdown Menu */}
              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-48 bg-white text-gray-900 rounded shadow-xl border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-500 uppercase border-b border-gray-100">
                    Select Language / भाषा चुनें
                  </div>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                        language === lang.code ? 'font-bold text-[#0B3D91] bg-blue-50/80' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.nativeName}</span>
                        <span className="text-[11px] text-gray-400">({lang.label})</span>
                      </span>
                      {language === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-[#0B3D91]"></span>
                      )}
                    </button>
                  ))}
                  <div className="px-3 py-1 text-[10px] text-gray-500 bg-gray-50 border-t border-gray-100 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Powered by IndicTrans2 AI</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Emblem Brand Identity */}
          <Link href="/" className="flex items-center gap-4 group text-decoration-none py-1">
            <div className="relative h-14 sm:h-16 md:h-18 w-auto flex items-center">
              <Image
                src="/Himsagar.png"
                alt="HimSagar National Polar & Ocean Knowledge Portal"
                width={240}
                height={70}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                priority
              />
            </div>

            <div className="hidden sm:flex flex-col border-l-2 border-gray-200 pl-3.5 justify-center">
              <span className="text-xs sm:text-sm font-extrabold text-[#0B3D91] tracking-wider uppercase leading-tight font-sans">
                National Polar Portal
              </span>
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium tracking-normal mt-0.5 line-clamp-1">
                {language === 'hi' 
                  ? 'पृथ्वी विज्ञान मंत्रालय (MoES)'
                  : 'Ministry of Earth Sciences (MoES)'}
              </span>
            </div>
          </Link>

          {/* Center/Right Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-14 py-2 text-xs bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] rounded-md outline-none transition-all placeholder:text-gray-400"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-200/80 rounded border border-gray-300">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right Action: Researcher Login Button */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B3D91] bg-blue-50/80 hover:bg-blue-100/90 border border-blue-200 rounded-md transition-all"
            >
              <Bot className="w-3.5 h-3.5 text-blue-700" />
              <span>{t.aiAssistant}</span>
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0B3D91] hover:bg-[#002147] rounded-md transition-all shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t.login}</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#0B3D91] hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar (Navy Blue Theme) */}
      <nav className="bg-[#0B3D91] text-white border-t border-blue-900/50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
            <div className="flex items-center space-x-1 py-1">
              <Link 
                href="/" 
                className="px-3.5 py-2 text-white bg-blue-950/70 rounded-xs border-b-2 border-amber-400 flex items-center gap-1.5"
              >
                <span>{t.home}</span>
              </Link>
              
              <Link 
                href="/map" 
                className="px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded-xs transition-colors flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.interactiveMap}</span>
              </Link>

              <Link 
                href="/assistant" 
                className="px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded-xs transition-colors flex items-center gap-1"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-300" />
                <span>{t.aiAssistant}</span>
              </Link>

              <Link 
                href="/explore" 
                className="px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded-xs transition-colors flex items-center gap-1"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.dataExplorer}</span>
              </Link>

              <Link 
                href="/articles" 
                className="px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded-xs transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                <span>{t.articles}</span>
              </Link>

              <Link 
                href="/researchers" 
                className="px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded-xs transition-colors flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-200" />
                <span>{t.researchers}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-[#0B3D91]"
            />
          </div>

          <div className="space-y-1 text-sm font-medium text-gray-800">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded bg-blue-50 text-[#0B3D91] font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.home}
            </Link>
            <Link 
              href="/map" 
              className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.interactiveMap}
            </Link>
            <Link 
              href="/assistant" 
              className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.aiAssistant}
            </Link>
            <Link 
              href="/explore" 
              className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.dataExplorer}
            </Link>
            <Link 
              href="/articles" 
              className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.articles}
            </Link>
            <Link 
              href="/researchers" 
              className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.researchers}
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2 text-xs font-bold text-white bg-[#0B3D91] rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.login}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
