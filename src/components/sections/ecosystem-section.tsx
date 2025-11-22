
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TheRegistry from './registry';
import BlurTextReveal from '../ui/blur-text-reveal';

const EcosystemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

      tl.fromTo(contentRef.current,
        { scale: 0.9, filter: "blur(10px)", opacity: 0.5 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.25, ease: "power2.out" }
      ).to(contentRef.current,
        { scale: 1.1, filter: "blur(15px)", opacity: 0.5, duration: 0.25, ease: "power2.in" },
        ">0.5"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] md:h-[300vh] bg-gradient-ecosystem border-t border-white/5 overflow-clip">

      <div className="sticky top-0 h-screen w-full overflow-hidden border-t border-white/5 flex flex-col justify-center">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#8B5CF608,transparent_50%)] pointer-events-none"></div>

        <div ref={contentRef} className="max-w-[1600px] mx-auto w-full h-full flex flex-col xl:flex-row will-change-transform origin-center">

          <div className="w-full xl:w-1/3 h-full flex flex-col justify-center px-8 md:px-16 relative z-10 py-10 xl:py-0">

            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></span>
              <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase font-bold">// Central Fabrication Hub</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-[1.1] text-white">
              Build Once. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">Reuse Everywhere.</span>
            </h2>

            <div className="text-neutral-400 text-lg leading-relaxed mb-10 font-light">
              <BlurTextReveal
                text="The Registry is your organization's central nervous system. Define your models, tools, and memory stores once, and instantly deploy them across any Agent, Workflow, or Pipeline."
                delay={0.2}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-1.5 rounded border border-white/10 bg-white/5 flex items-center gap-2 text-xs font-mono text-neutral-300">
                <GlobeIcon className="w-3 h-3 text-brand-cyan" />
                Global Availability
              </div>
              <div className="px-3 py-1.5 rounded border border-white/10 bg-white/5 flex items-center gap-2 text-xs font-mono text-neutral-300">
                <GitBranchIcon className="w-3 h-3 text-brand-violet" />
                Version Control
              </div>
              <div className="px-3 py-1.5 rounded border border-white/10 bg-white/5 flex items-center gap-2 text-xs font-mono text-neutral-300">
                <LockIcon className="w-3 h-3 text-green-400" />
                Secure Vault
              </div>
            </div>
          </div>

          <div className="w-full xl:w-2/3 h-full flex items-center justify-center px-4 md:px-12 pb-10 xl:pb-0">
            <TheRegistry />
          </div>
        </div>
      </div>

    </section>
  );
};

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);
const GitBranchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>
);
const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);

export default EcosystemSection;
