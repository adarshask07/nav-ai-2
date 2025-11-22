
import React from 'react';
import SmoothScroll from '../components/layout/smooth-scroll';
import NoiseOverlay from '../components/visuals/noise-overlay';
import '../app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen bg-transparent text-white selection:bg-[#22D3EE] selection:text-[#020617]">
        <NoiseOverlay />
        {children}
      </div>
    </SmoothScroll>
  );
}
