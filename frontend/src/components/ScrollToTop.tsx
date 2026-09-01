'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#0F5167] hover:bg-[#093443] text-white shadow-lg border border-[#7BCCEA]/40 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
      aria-label="Scroll back to top"
      title="Back to Top"
    >
      <ArrowUp className="w-4 h-4 text-amber-300" />
    </button>
  );
}
