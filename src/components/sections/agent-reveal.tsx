
import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { AGENT_FEATURES, getIcon } from '../../lib/constants';
import TextReveal from '../ui/text-reveal';
import TerminalBlock from '../ui/terminal-block';
import AgentCard from './agent-card';
import WorkspacesSection from './workspaces-section';
import ConnectivityLayer from './connectivity-layer';

const AgentReveal: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray<HTMLElement>('.agent-text-block');
      
      texts.forEach((text, i) => {
        ScrollTrigger.create({
          trigger: text,
          start: "top 60%", 
          end: "bottom 40%",
          onEnter: () => setActiveStep(i + 1),
          onEnterBack: () => setActiveStep(i + 1),
          fastScrollEnd: true,
          preventOverlaps: true,
        });
        
        gsap.fromTo(text, 
           { opacity: 0.1, filter: 'blur(5px)' },
           { 
             opacity: 1, 
             filter: 'blur(0px)',
             scrollTrigger: {
               trigger: text,
               start: "top 80%",
               end: "top 40%",
               scrub: true,
             }
           }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-brand-navy text-white overflow-visible">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 py-[10vh] px-6 md:px-20 relative z-10">
           <div className="mb-[15vh]">
              <h3 className="text-brand-cyan font-mono text-sm tracking-widest mb-4 uppercase">
                 <TextReveal text="System Architecture" />
              </h3>
              <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-8 text-white">
                INTELLIGENCE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">REDEFINED.</span>
              </h2>
              <p className="text-xl text-neutral-400 max-w-md font-light">
                Bridge the gap between simple chatbots and autonomous, policy-compliant AI workforces.
              </p>
           </div>

           <div className="flex flex-col gap-[70vh] pb-[20vh]">
             {AGENT_FEATURES.map((feature) => (
               <div key={feature.id} className="agent-text-block group relative z-20">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="p-3 rounded-lg bg-brand-dark border border-white/10 text-brand-violet group-hover:text-brand-cyan group-hover:border-brand-cyan/50 transition-colors duration-300">
                        {getIcon(feature.iconType, "w-6 h-6")}
                     </div>
                     <span className="text-xl font-mono font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                       0{feature.id} // {feature.title}
                     </span>
                  </div>
                  <p className="text-3xl md:text-4xl font-display font-medium text-neutral-400 group-hover:text-white transition-colors duration-500 leading-tight">
                    {feature.description}
                  </p>
               </div>
             ))}
           </div>
        </div>

        <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center border-l border-white/5 z-10">
           
           <div className="relative w-[500px] h-[600px] bg-[#0B1121] rounded-3xl border border-white/10 flex flex-col shadow-2xl overflow-hidden">
              
              <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-black/20 z-20 relative">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                 </div>
                 <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                   Module: {AGENT_FEATURES[activeStep - 1].title}
                 </div>
              </div>

              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    {activeStep === 1 && <AgentCard />}
                    {activeStep === 2 && <WorkspacesSection />}
                    {activeStep === 3 && <ConnectivityLayer />}
                    {activeStep === 4 && (
                      <div className="flex items-center justify-center h-full w-full">
                        <TerminalBlock />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="h-10 border-t border-white/10 flex items-center px-6 bg-black/20 z-20 relative">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan">
                    <span className="animate-pulse">●</span>
                    <span>System Stable</span>
                  </div>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
};

export default AgentReveal;
