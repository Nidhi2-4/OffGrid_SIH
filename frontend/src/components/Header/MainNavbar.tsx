'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass, Bot, BarChart2, Users, FileText, Globe, LogIn, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const MainNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('navHome'), href: '/' },
    { name: t('navMap'), href: '/map' },
    { name: t('navAssistant'), href: '/assistant', highlight: true },
    { name: t('navDataExplorer'), href: '/explore' },
    { name: t('navKnowledgeGraph'), href: '/articles' },
    { name: t('navResearchers'), href: '/researchers' },
  ];

  return (
    <header className="bg-white border-b border-[#CCCCCC] shadow-xs sticky top-0 z-50">
      {/* Tricolor decorative ribbon accent */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo & Portal Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Custom Transparent HimSagar Logo */}
            <div className="relative h-11 w-36 sm:w-44 shrink-0 transition-transform group-hover:scale-102">
              <Image
                src="/images/himsagar_logo.png"
                alt="HimSagar हिमसागर Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Vertical Institutional Divider */}
            <div className="hidden sm:block h-9 w-[1.5px] bg-gray-300 mx-1" />

            {/* Ministry & Centre Subtitle */}
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-[11px] font-black tracking-wide text-[#0B3D91] uppercase leading-tight">
                National Polar & Ocean Knowledge Portal
              </span>
              <span className="text-[10px] text-gray-500 font-semibold leading-tight">
                National Centre for Polar and Ocean Research (NCPOR) • MoES, Govt. of India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all relative rounded-xs ${
                    isActive
                      ? 'text-[#0B3D91] bg-blue-50 border-b-2 border-[#FF9933]'
                      : 'text-gray-700 hover:text-[#0B3D91] hover:bg-gray-100'
                  } ${link.highlight ? 'text-[#0B3D91] font-extrabold flex items-center gap-1' : ''}`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />}
                  {link.name}
                </Link>
              );
            })}

            {/* Login / Portal Access Button */}
            <Link
              href="/login"
              className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B3D91] hover:bg-[#002147] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors border border-[#0B3D91] shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t('navLogin')}</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-2.5 py-1 bg-[#0B3D91] text-white text-xs font-bold rounded-xs"
            >
              {t('navLogin')}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xs border border-gray-300 text-gray-700 hover:bg-gray-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-gray-50 px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-[#0B3D91] rounded-xs"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
