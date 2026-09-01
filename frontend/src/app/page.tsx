import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedImageSection from '@/components/FeaturedImageSection';
import PolarStations from '@/components/PolarStations';
import PlatformFeatures from '@/components/PlatformFeatures';
import QuickStats from '@/components/QuickStats';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar & Header with Language Toggle at Top Right */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Quick Numbers / National Research Impact */}
        <QuickStats />

        {/* Featured Polar Observation Showcase (Using the attached image) */}
        <FeaturedImageSection />

        {/* India's 4 Polar & Cryosphere Research Stations */}
        <PolarStations />

        {/* Core Platform Capabilities */}
        <PlatformFeatures />
      </main>

      {/* Official MoES / NCPOR Footer */}
      <Footer />

      {/* Floating Back to Top */}
      <ScrollToTop />
    </div>
  );
}

