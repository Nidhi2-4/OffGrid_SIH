import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { TopUtilityBar } from '@/components/Header/TopUtilityBar';
import { MainNavbar } from '@/components/Header/MainNavbar';
import { GovFooter } from '@/components/Footer/GovFooter';

export const metadata: Metadata = {
  title: 'HimSagar • National Polar Science Outreach & Knowledge Repository Portal',
  description:
    'Official Government of India portal for polar science research, expeditions (Antarctica, Arctic, Himalayas), in-browser data explorer, AI research assistant, and public science outreach (MoES / NCPOR).',
  keywords: [
    'HimSagar',
    'NCPOR',
    'MoES',
    'Polar Science',
    'Antarctica',
    'Bharati Station',
    'Maitri Station',
    'Himadri Station',
    'Himansh',
    'Southern Ocean',
    'Smart Education',
    'SIH26063',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#333333] selection:bg-[#FF9933]/30 selection:text-[#0B3D91]">
        <LanguageProvider>
          <AccessibilityProvider>
            {/* Top Accessibility & Language Header */}
            <TopUtilityBar />

            {/* Main Institutional Navigation Header */}
            <MainNavbar />

            {/* Page Content */}
            <main className="flex-1 flex flex-col">{children}</main>

            {/* Standard Government Footer */}
            <GovFooter />
          </AccessibilityProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
