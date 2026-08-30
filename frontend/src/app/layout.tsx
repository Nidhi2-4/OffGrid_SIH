import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HimSagar • National Polar Science Portal',
  description: 'National Centre for Polar and Ocean Research (NCPOR) / MoES',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
