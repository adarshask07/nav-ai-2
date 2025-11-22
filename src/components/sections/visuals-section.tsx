
import React from 'react';
import VisualIntelligence from './visual-intelligence';
import BlurTextReveal from '../ui/blur-text-reveal';

const VisualsSection: React.FC = () => {
   return (
      <section className="relative w-full min-h-screen bg-gradient-visuals py-20 overflow-hidden">

         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-brand-cyan to-transparent opacity-50"></div>
            <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-brand-violet to-transparent opacity-30"></div>
            <div className="absolute top-0 left-[60%] w-[1px] h-full bg-gradient-to-b from-transparent via-brand-cyan to-transparent opacity-40"></div>
            <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-brand-violet to-transparent opacity-20"></div>
         </div>

         <div className="container mx-auto px-4 mb-16 text-center relative z-10">

            <div className="inline-block mb-6">
               <div className="px-4 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 backdrop-blur text-brand-cyan font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)]">
               // Beyond Text Generation
               </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white tracking-tight">
               From Insight to <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">Action.</span>
            </h2>

            <div className="max-w-2xl mx-auto text-lg text-neutral-400 leading-relaxed mb-10 font-light">
               <BlurTextReveal
                  text="Move beyond chat. NAV AI generates structured business artifacts—interactive dashboards, strategic flowcharts, and geospatial analysis—empowering leaders to make data-driven decisions faster."
                  delay={0.3}
               />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
               {[
                  "Interactive Maps",
                  "Mermaid Workflows",
                  "Radar Analytics",
                  "One-Click Export"
               ].map((feature, i) => (
                  <div key={i} className="px-4 py-2 rounded bg-white/5 border border-white/10 text-sm font-mono text-neutral-300 hover:bg-white/10 hover:border-brand-cyan/30 transition-all cursor-default">
                     [ {feature} ]
                  </div>
               ))}
            </div>
         </div>

         <div className="w-full relative z-10">
            <VisualIntelligence />
         </div>

      </section>
   );
};

export default VisualsSection;
