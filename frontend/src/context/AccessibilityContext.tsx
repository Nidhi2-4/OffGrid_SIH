'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'sm' | 'md' | 'lg';
type ThemeMode = 'standard' | 'high-contrast';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isAudioActive: boolean;
  toggleAudio: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 'md',
  setFontSize: () => {},
  themeMode: 'standard',
  setThemeMode: () => {},
  isAudioActive: false,
  toggleAudio: () => {},
});

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [themeMode, setThemeMode] = useState<ThemeMode>('standard');
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  useEffect(() => {
    // Apply font size class to document element
    const root = document.documentElement;
    root.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
    root.classList.add(`font-size-${fontSize}`);

    if (fontSize === 'sm') {
      root.style.fontSize = '14px';
    } else if (fontSize === 'lg') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'high-contrast') {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
  }, [themeMode]);

  const toggleAudio = () => {
    setIsAudioActive(prev => {
      const next = !prev;
      if (next && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Screen reader mode enabled on HimSagar Portal');
        window.speechSynthesis.speak(utterance);
      }
      return next;
    });
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        themeMode,
        setThemeMode,
        isAudioActive,
        toggleAudio,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
