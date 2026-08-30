'use client';

import React from 'react';
import Link from 'next/link';
import { Users, BookOpen, Compass, ArrowRight, Award } from 'lucide-react';

export const ScientistShowcase: React.FC = () => {
  const scientists = [
    {
      id: 'dr-thamban-meloth',
      name: 'Dr. Thamban Meloth',
      role: 'Director & Chief Scientist',
      affiliation: 'NCPOR Goa',
      expertise: ['Glaciology', 'Ice Core Drilling', 'Paleoclimatology'],
      expeditions: '8 Antarctic Missions',
      publications: '120+ Papers',
      avatarBg: 'from-blue-700 to-indigo-900',
      initials: 'TM',
    },
    {
      id: 'dr-rahul-mohan',
      name: 'Dr. Rahul Mohan',
      role: 'Group Director, Polar Sciences',
      affiliation: 'NCPOR Goa',
      expertise: ['Oceanography', 'Marine Micropaleontology', 'Southern Ocean'],
      expeditions: '6 Antarctic & SO Missions',
      publications: '95+ Papers',
      avatarBg: 'from-teal-700 to-emerald-900',
      initials: 'RM',
    },
    {
      id: 'dr-archana-dayal',
      name: 'Dr. Archana Dayal',
      role: 'Polar Microbial Ecologist',
      affiliation: 'Cryosphere Sciences',
      expertise: ['Cryoconite Holes', 'Glacier Microbes', 'Himalayan Glaciology'],
      expeditions: '4 Arctic & Antarctic Missions',
      publications: '48+ Papers',
      avatarBg: 'from-purple-700 to-indigo-900',
      initials: 'AD',
    },
    {
      id: 'dr-rohit-srivastava',
      name: 'Dr. Rohit Srivastava',
      role: 'Lead Atmospheric Scientist',
      affiliation: 'Atmospheric Sciences Group',
      expertise: ['Aerosol Physics', 'Boundary Layer Meteorology', 'Polar Clouds'],
      expeditions: '5 ISEA Expeditions',
      publications: '62+ Papers',
      avatarBg: 'from-amber-700 to-orange-900',
      initials: 'RS',
    },
  ];

  return (
    <section className="py-10 bg-[#F2F2F2] border-b border-[#CCCCCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#0B3D91] font-bold text-xs uppercase tracking-widest mb-1">
              <Users className="w-4 h-4 text-[#FF9933]" />
              <span>Scientific Community Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#002147]">
              Meet Our Polar Scientists
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mt-1">
              Public profiles connecting Indian polar researchers to their expeditions, published papers, datasets, and field media.
            </p>
          </div>

          <Link
            href="/researchers"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B3D91] hover:bg-[#002147] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
          >
            <span>View All Scientists</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Scientist Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scientists.map((scientist) => (
            <div
              key={scientist.id}
              className="bg-white border border-[#CCCCCC] rounded-xs p-4 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Avatar and Affiliation */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-linear-to-br ${scientist.avatarBg} text-white font-bold text-base flex items-center justify-center shrink-0 border-2 border-white shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    {scientist.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-sm text-[#0B3D91] group-hover:text-[#002147] transition-colors truncate">
                      {scientist.name}
                    </h3>
                    <div className="text-[11px] font-semibold text-[#138808]">
                      {scientist.role}
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">{scientist.affiliation}</div>
                  </div>
                </div>

                {/* Expertise Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {scientist.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-2xs border border-gray-200"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2 rounded-xs border border-gray-200 mb-4">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <Compass className="w-3.5 h-3.5 text-[#0B3D91]" />
                    <span className="text-[11px] font-semibold">{scientist.expeditions}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <BookOpen className="w-3.5 h-3.5 text-[#138808]" />
                    <span className="text-[11px] font-semibold">{scientist.publications}</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <Link
                href={`/researchers/${scientist.id}`}
                className="w-full text-center py-1.5 bg-gray-100 hover:bg-[#0B3D91] hover:text-white text-gray-800 text-xs font-bold rounded-xs border border-gray-300 transition-colors"
              >
                View Research Story →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
