'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage, Language } from '@/context/LanguageContext';
import { 
  Globe, 
  Search, 
  Menu, 
  X, 
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full relative z-50">
      {/* Topmost Official Bar & Tricolor (Non-sticky, visible when at top) */}
      <div>
        {/* Tricolor Government Strip */}
        <div className="h-1 w-full flex">
          <div className="h-full w-1/3 bg-[#FF9933]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>

        {/* Top Official Credentials Bar */}
        <div className="bg-[#002147] text-white text-[11px] sm:text-xs px-4 py-1 border-b border-blue-950">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Left: Official Government Credentials */}
            <div className="flex items-center space-x-2 sm:space-x-3 divide-x divide-blue-800/80">
              <span className="font-semibold tracking-wide text-amber-300 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                {t.govtIndia}
              </span>
              <span className="pl-2 sm:pl-3 text-blue-100 hidden sm:inline">{t.moesTitle}</span>
              <span className="pl-2 sm:pl-3 text-blue-200 hidden md:inline text-[11px]">{t.ncporTitle}</span>
            </div>

            {/* Right: Language Quick Selector */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="flex items-center bg-[#0B3D91] hover:bg-blue-800 border border-blue-400/40 rounded px-1 py-0.5 transition-all shadow-inner">
                  <span className="px-1 text-[11px] text-blue-200 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-amber-400" />
                    <span className="hidden sm:inline font-medium">Lang:</span>
                  </span>
                  
                  <div className="flex items-center bg-blue-950/60 rounded px-0.5">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-1.5 py-0.5 text-[11px] font-semibold rounded transition-all duration-150 ${
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

                  <button
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="px-1 py-0.5 text-blue-200 hover:text-white border-l border-blue-800 ml-1 flex items-center text-[10px]"
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
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Branding Header Bar */}
        <div className="bg-white border-b border-gray-200 py-2 sm:py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              
              {/* Logo & Emblem */}
              <Link href="/" className="flex items-center gap-3 group text-decoration-none py-0.5">
                <div className="relative h-10 sm:h-12 w-auto flex items-center">
                  <Image
                    src="/Himsagar.png"
                    alt="HimSagar National Polar & Ocean Knowledge Portal"
                    width={200}
                    height={58}
                    className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                    priority
                  />
                </div>

                <div className="hidden sm:flex flex-col border-l-2 border-gray-200 pl-3 justify-center">
                  <span className="text-xs sm:text-sm font-extrabold text-[#0B3D91] tracking-wider uppercase leading-tight">
                    National Polar Portal
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium tracking-normal mt-0.5">
                    {language === 'hi' 
                      ? 'पृथ्वी विज्ञान मंत्रालय (MoES)'
                      : 'Ministry of Earth Sciences (MoES)'}
                  </span>
                </div>
              </Link>

              {/* Center Search Bar */}
              <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-8 pr-12 py-1.5 text-xs bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] rounded outline-none transition-all placeholder:text-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono text-gray-400 bg-gray-200/80 rounded border border-gray-300">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>

              {/* Right Action: Researcher Login Button */}
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#0B3D91] hover:bg-[#002147] rounded transition-all shadow-xs"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{t.login}</span>
                </Link>
              </div>

              {/* Mobile menu trigger */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded-md text-gray-700 hover:text-[#0B3D91] hover:bg-gray-100 focus:outline-none"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar with Smooth Scroll Behavior */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#002147]/95 backdrop-blur-md text-white shadow-md border-b border-blue-900 py-0.5' 
            : 'bg-[#0B3D91] text-white border-t border-blue-900/40 hidden md:block'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
            
            {/* Scrolled Compact Logo Icon */}
            <div className="flex items-center gap-3">
              {isScrolled && (
                <Link href="/" className="flex items-center gap-2 py-1 mr-2 text-white hover:opacity-90 transition-opacity">
                  <div className="h-7 w-auto bg-white/90 rounded px-1.5 py-0.5 flex items-center shadow-xs">
                    <Image
                      src="/Himsagar.png"
                      alt="HimSagar Logo"
                      width={100}
                      height={28}
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                </Link>
              )}

              {/* Nav Links */}
              <div className="hidden md:flex items-center space-x-1 py-1">
                <Link 
                  href="/" 
                  className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                    !isScrolled 
                      ? 'text-white bg-blue-950/70 border-b-2 border-amber-400' 
                      : 'text-white bg-blue-900/60'
                  }`}
                >
                  <span>{t.home}</span>
                </Link>
                
                <Link 
                  href="/map" 
                  className="px-2.5 py-1.5 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.interactiveMap}</span>
                </Link>

                <Link 
                  href="/assistant" 
                  className="px-2.5 py-1.5 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded transition-colors flex items-center gap-1"
                >
                  <Bot className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{t.aiAssistant}</span>
                </Link>

                <Link 
                  href="/explore" 
                  className="px-2.5 py-1.5 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded transition-colors flex items-center gap-1"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{t.dataExplorer}</span>
                </Link>

                <Link 
                  href="/articles" 
                  className="px-2.5 py-1.5 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                  <span>{t.articles}</span>
                </Link>

                <Link 
                  href="/researchers" 
                  className="px-2.5 py-1.5 text-blue-100 hover:text-white hover:bg-blue-800/80 rounded transition-colors flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-indigo-200" />
                  <span>{t.researchers}</span>
                </Link>
              </div>
            </div>

            {/* Scrolled Compact Right Actions */}
            {isScrolled && (
              <div className="hidden md:flex items-center space-x-3 py-1">
                <Link
                  href="/assistant"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-amber-300 bg-blue-900/60 hover:bg-blue-900 rounded border border-blue-700/50 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>AI Assistant</span>
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 text-gray-950 rounded transition-all shadow-xs"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>{t.login}</span>
                </Link>
              </div>
            )}

            {/* Mobile trigger when scrolled */}
            <div className="md:hidden flex items-center py-1.5 w-full justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-auto bg-white/90 rounded px-1.5 py-0.5 flex items-center">
                  <Image
                    src="/Himsagar.png"
                    alt="HimSagar"
                    width={80}
                    height={22}
                    className="h-4 w-auto object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold text-blue-100">HimSagar</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 rounded text-white hover:bg-blue-900"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 space-y-3 shadow-xl fixed top-[45px] left-0 right-0 z-50">
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

