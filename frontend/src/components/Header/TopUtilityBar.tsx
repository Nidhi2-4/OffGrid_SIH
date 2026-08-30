'use client';

import React from 'react';
import { Volume2, VolumeX, Eye } from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';

export const TopUtilityBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { fontSize, setFontSize, themeMode, setThemeMode, isAudioActive, toggleAudio } = useAccessibility();

  return (
    <div className="bg-[#002147] text-white text-xs border-b border-[#0B3D91] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left Side: National & Ministry Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="text-[#FF9933]">भारत सरकार</span>
            <span className="text-gray-400">|</span>
            <span>Government of India</span>
          </div>
          <span className="hidden md:inline text-gray-500">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-gray-300">
            <span>पृथ्वी विज्ञान मंत्रालय</span>
            <span className="text-gray-500">|</span>
            <span>Ministry of Earth Sciences</span>
          </div>
        </div>

        {/* Center: State Emblem of India representation */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0B3D91]/60 px-3 py-0.5 rounded border border-[#0B3D91]">
          <span className="text-yellow-400 text-sm">🏛️</span>
          <span className="font-semibold text-yellow-300 text-[11px] tracking-wider uppercase">सत्यमेव जयते</span>
        </div>

        {/* Right Side: Accessibility & Language Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Screen reader / Audio Toggle */}
          <button
            onClick={toggleAudio}
            title={t('screenReader')}
            className={`p-1 rounded border transition-colors flex items-center gap-1 text-[11px] ${
              isAudioActive
                ? 'bg-[#138808] border-green-400 text-white'
                : 'bg-black/30 border-gray-600 hover:bg-black/50 text-gray-200'
            }`}
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
            <span className="hidden sm:inline">{isAudioActive ? 'Audio ON' : 'Audio'}</span>
          </button>

          {/* Font Resizing A- A A+ */}
          <div className="flex items-center border border-gray-600 rounded bg-black/30 overflow-hidden">
            <button
              onClick={() => setFontSize('sm')}
              title="Decrease Font Size"
              className={`px-1.5 py-0.5 text-[11px] font-bold transition-colors ${
                fontSize === 'sm' ? 'bg-[#FF9933] text-black' : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('md')}
              title="Standard Font Size"
              className={`px-1.5 py-0.5 text-[11px] font-bold border-x border-gray-600 transition-colors ${
                fontSize === 'md' ? 'bg-[#FF9933] text-black' : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              title="Increase Font Size"
              className={`px-1.5 py-0.5 text-[11px] font-bold transition-colors ${
                fontSize === 'lg' ? 'bg-[#FF9933] text-black' : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              A+
            </button>
          </div>

          {/* Theme / Contrast Adjuster */}
          <div className="flex items-center border border-gray-600 rounded bg-black/30 overflow-hidden">
            <button
              onClick={() => setThemeMode('standard')}
              title="Standard Contrast"
              className={`px-1.5 py-0.5 text-[11px] font-bold transition-colors ${
                themeMode === 'standard' ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setThemeMode('high-contrast')}
              title="High Contrast Theme"
              className={`px-1.5 py-0.5 text-[11px] font-bold border-l border-gray-600 transition-colors ${
                themeMode === 'high-contrast' ? 'bg-yellow-400 text-black' : 'bg-black text-yellow-400 hover:bg-gray-800'
              }`}
            >
              A
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center border border-[#FF9933]/60 rounded bg-black/40 overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                language === 'en' ? 'bg-[#0B3D91] text-white border-r border-[#FF9933]/50' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                language === 'hi' ? 'bg-[#0B3D91] text-white border-x border-[#FF9933]/50' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                language === 'mr' ? 'bg-[#0B3D91] text-white border-l border-[#FF9933]/50' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
