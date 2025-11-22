
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../ui/text-reveal';
import MagneticButton from '../ui/magnetic-button';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(logoRef.current, {
        scale: 50,
        opacity: 0,
        ease: "power3.inOut",
        duration: 2
      });

      tl.fromTo(textContentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        "-=1"
      );

      tl.to(textContentRef.current, {
        opacity: 0,
        filter: "blur(20px)",
        scale: 0.9,
        duration: 0.5,
        ease: "power2.in"
      }, "+=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-brand-darker">

      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-brand-darker z-0"></div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-violet/20 via-brand-darker to-transparent opacity-40 blur-3xl animate-aurora mix-blend-screen"></div>
        <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-cyan/20 via-brand-darker to-transparent opacity-40 blur-3xl animate-aurora animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-violet/10 via-brand-darker to-transparent opacity-30 blur-3xl animate-aurora animation-delay-4000 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] z-10"></div>

        <div ref={textContentRef} className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 opacity-0">
          <div className="text-center space-y-8 max-w-4xl">
            <h2 className="text-sm md:text-base font-mono text-brand-cyan tracking-[0.3em] uppercase font-semibold">
              NAV AI Enterprise Platform
            </h2>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white leading-[1.1]">
              Scale AI. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                <TextReveal text="Reinvent Performance." />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
              NAV AI is the foundational platform for enterprise reinvention. Turn raw generative AI into an autonomous, governed workforce that drives tangible business outcomes across every function.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <MagneticButton>
                <button className="px-8 py-4 bg-brand-cyan text-brand-navy font-bold text-sm tracking-widest uppercase rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  Request Pilot
                </button>
              </MagneticButton>

              <MagneticButton>
                <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded hover:bg-white/5 transition-colors backdrop-blur-sm">
                  Platform Overview
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div ref={logoRef} className="absolute inset-0 z-30 flex items-center justify-center origin-center will-change-transform pointer-events-none bg-transparent">
        <svg viewBox="0 0 1000 300" className="w-[80vw] h-auto overflow-visible">
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#666" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            fill="url(#textGradient)"
            className="font-display font-black tracking-tighter text-[200px] md:text-[250px]"
          >
            NAV AI
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
