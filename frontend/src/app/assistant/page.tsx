import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssistantChat from '@/components/assistant/AssistantChat';

export const metadata: Metadata = {
  title: 'AI Polar Research Assistant | HimSagar - MoES & NCPOR',
  description: 'RAG-grounded polar research AI assistant for scientists, educators, and students. Verified citations for Arctic, Antarctic, and Himalayan datasets.',
};

export default function AssistantPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Official Government Header */}
      <Header />

      {/* Main Assistant Interactive Workspace */}
      <main className="flex-1 flex flex-col h-[calc(100vh-125px)] min-h-[600px]">
        <AssistantChat />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
