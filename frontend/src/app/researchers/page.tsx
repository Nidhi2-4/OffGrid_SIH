'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScientistCard from '@/components/scientists/ScientistCard';
import ScientistFilterBar from '@/components/scientists/ScientistFilterBar';
import ScientistProfileModal from '@/components/scientists/ScientistProfileModal';
import { SCIENTISTS_DATA, Scientist } from '@/data/scientistsData';
import { 
  Users, 
  UserCheck, 
  Sparkles, 
  BookOpen, 
  Database, 
  Compass, 
  Award, 
  ShieldCheck 
} from 'lucide-react';

export default function ResearchersDirectoryPage() {
  const [selectedScientist, setSelectedScientist] = useState<Scientist | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'citations' | 'hindex' | 'publications' | 'datasets' | 'name'>('citations');

  // Filter & Sort Scientists
  const filteredScientists = useMemo(() => {
    return SCIENTISTS_DATA.filter((s) => {
      // Region filter
      if (selectedRegion !== 'all' && s.primaryRegion !== selectedRegion) return false;

      // Domain filter
      if (selectedDomain !== 'all' && s.domain !== selectedDomain) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = s.name.toLowerCase().includes(q);
        const inDesig = s.designation.toLowerCase().includes(q);
        const inInst = s.institution.toLowerCase().includes(q);
        const inBio = s.bio.toLowerCase().includes(q);
        const inTags = s.expertiseTags.some((t) => t.toLowerCase().includes(q));
        const inStations = s.stationAffiliations.some((st) => st.toLowerCase().includes(q));
        const inPubs = s.publications.some((p) => p.title.toLowerCase().includes(q) || p.journal.toLowerCase().includes(q));
        const inDatasets = s.datasets.some((d) => d.title.toLowerCase().includes(q));
        return inName || inDesig || inInst || inBio || inTags || inStations || inPubs || inDatasets;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'citations') return b.totalCitations - a.totalCitations;
      if (sortBy === 'hindex') return b.hIndex - a.hIndex;
      if (sortBy === 'publications') return b.publicationsCount - a.publicationsCount;
      if (sortBy === 'datasets') return b.datasetsCount - a.datasetsCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedRegion, selectedDomain, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Official Government Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-7">
        
        {/* Hero Banner (White & Oceanic Blue Theme) */}
        <div className="bg-gradient-to-r from-[#0F5167] via-[#0D4658] to-[#093443] border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-mono font-bold border border-white/20">
              <Users className="w-3.5 h-3.5 text-cyan-300" />
              <span>National Polar & Cryosphere Scientific Directory • NCPOR / MoES</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Indian Polar Scientists & Researchers Directory
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
              Explore profiles of lead investigators, glaciologists, oceanographers, and expedition leaders behind India's scientific missions in the Arctic, Antarctica, Himalayas, and Southern Ocean.
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <ScientistFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredScientists.length}
        />

        {/* Scientists Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>SHOWING {filteredScientists.length} SCIENTIFIC INVESTIGATORS</span>
            <span>Verified Institutional Affiliations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredScientists.map((scientist) => (
              <ScientistCard
                key={scientist.id}
                scientist={scientist}
                onViewProfile={(s) => setSelectedScientist(s)}
              />
            ))}
          </div>
        </div>

      </main>

      {/* Full Profile Modal with Publications & Datasets view */}
      {selectedScientist && (
        <ScientistProfileModal
          scientist={selectedScientist}
          onClose={() => setSelectedScientist(null)}
        />
      )}

      {/* Official MoES Footer */}
      <Footer />
    </div>
  );
}
