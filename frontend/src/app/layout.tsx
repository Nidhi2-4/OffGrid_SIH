import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'HimSagar • National Polar & Ocean Science Knowledge Portal',
  description: 'Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal — Ministry of Earth Sciences (MoES) & NCPOR',
  keywords: ['NCPOR', 'MoES', 'HimSagar', 'Antarctica', 'Arctic', 'Himadri', 'Bharati', 'Maitri', 'Himansh', 'Polar Science'],
  icons: {
    icon: '/Himsagar.png',
    shortcut: '/Himsagar.png',
    apple: '/Himsagar.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-white text-gray-900 selection:bg-blue-900 selection:text-white font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
