
import React, { useEffect, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1.2,
    });

    setLenis(lenisInstance);

    lenisInstance.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <div className="w-full min-h-screen">
        {children}
      </div>
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
