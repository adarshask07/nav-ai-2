
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (cursor && glow) {
        gsap.to(cursor, {
          x: clientX,
          y: clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
        
        gsap.to(glow, {
          x: clientX,
          y: clientY,
          duration: 0.5,
          ease: 'power2.out'
        });
      }

      document.documentElement.style.setProperty('--cursor-x', `${clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${clientY}px`);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[100] pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-16 h-16 bg-brand-cyan/30 rounded-full blur-xl z-[99] pointer-events-none mix-blend-screen -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
};

export default CustomCursor;
