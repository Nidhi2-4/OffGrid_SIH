'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const GovFooter: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#002147] text-white border-t-4 border-[#0B3D91] select-none">
      {/* Tricolor Accent Stripe */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Institutional Identity & Address */}
          <div>
            <div className="bg-white/95 p-2 rounded-xs inline-block mb-3 border border-white/20">
              <div className="relative h-9 w-36">
                <Image
                  src="/images/himsagar_logo.png"
                  alt="HimSagar Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              An autonomous institution under the Ministry of Earth Sciences (MoES), Government of India, coordinating polar science expeditions and Southern Ocean research.
            </p>
            <div className="space-y-1.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                <span>Headland Sada, Vasco da Gama, Goa - 403804, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF9933] shrink-0" />
                <span>+91-832-2525600 / 2525601</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF9933] shrink-0" />
                <span className="text-[#FF9933]">outreach@ncpor.res.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: MoES Sister Organizations */}
          <div>
            <h3 className="font-serif font-bold text-sm text-[#FF9933] uppercase tracking-wider mb-3 pb-1 border-b border-gray-700">
              MoES Institutions
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a
                  href="https://moes.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white hover:underline flex items-center justify-between"
                >
                  <span>Ministry of Earth Sciences (MoES)</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://mausam.imd.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white hover:underline flex items-center justify-between"
                >
                  <span>India Meteorological Dept (IMD)</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://incois.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white hover:underline flex items-center justify-between"
                >
                  <span>INCOIS (Ocean Information)</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://niot.res.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white hover:underline flex items-center justify-between"
                >
                  <span>National Institute of Ocean Tech (NIOT)</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://tropmet.res.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white hover:underline flex items-center justify-between"
                >
                  <span>IITM Pune (Tropical Meteorology)</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Polar Portal Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-sm text-[#FF9933] uppercase tracking-wider mb-3 pb-1 border-b border-gray-700">
              Portal Directory
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/map" className="hover:text-white hover:underline">
                  Indian Polar Stations (Maitri & Bharati)
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white hover:underline">
                  Arctic Station (Himadri) & Himalayas (Himansh)
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-white hover:underline text-[#FF9933] font-semibold">
                  AI Polar Research Assistant (RAG)
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-white hover:underline">
                  Ice Core & Ocean Salinity Data Explorer
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white hover:underline">
                  Public Science Explainers ("Explain It Simply")
                </Link>
              </li>
              <li>
                <Link href="/researchers" className="hover:text-white hover:underline">
                  Scientist Directory & Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Compliance & Policies */}
          <div>
            <h3 className="font-serif font-bold text-sm text-[#FF9933] uppercase tracking-wider mb-3 pb-1 border-b border-gray-700">
              Policies & Compliance
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-300 mb-4">
              <li><a href="#" className="hover:text-white hover:underline">Website Policies</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Hyperlinking Policy</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Privacy Policy & Terms of Use</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-white hover:underline">Help & Sitemap</a></li>
            </ul>

            <div className="p-2.5 bg-black/40 border border-gray-700 rounded-xs text-[11px] text-gray-300">
              <div className="flex items-center gap-1.5 text-[#138808] font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Certified Government Platform</span>
              </div>
              <span>Compliant with Guidelines for Indian Government Websites (GIGW 3.0).</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400">
          <div>
            © 2026 <strong className="text-gray-200">National Centre for Polar and Ocean Research (NCPOR)</strong>, Ministry of Earth Sciences, Government of India.
          </div>
          <div className="flex items-center gap-3">
            <span>Problem Statement: <strong className="text-[#FF9933]">SIH26063</strong></span>
            <span>•</span>
            <span>Team: <strong className="text-white">OffGrid</strong></span>
            <span>•</span>
            <span>Last Updated: <strong>30-08-2026</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
