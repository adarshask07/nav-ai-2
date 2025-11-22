
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/magnetic-button';


const footer: React.FC = () => {
  return (
    <footer className="relative w-full min-h-screen flex flex-col justify-end bg-transparent pt-32 pb-8 overflow-hidden">
      
      {/* ATMOSPHERE: Horizon Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-[#020617] via-indigo-950/20 to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-brand-cyan/5 to-transparent pointer-events-none z-0 blur-3xl" />

      {/* MAIN CONTENT STACK */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center gap-16 mb-24">
        
        {/* 1. Parent Entity Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default"
        >
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
            Part of
          </span>
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
             <div className="w-3 h-3 bg-white rounded-[1px] rotate-45 group-hover:rotate-90 transition-transform duration-500" /> 
             <span className="text-xs font-bold text-white tracking-wide">ACN_AI</span>
          </div>
        </motion.div>

        {/* 2. The Signature (Iridescent Chrome) */}
        <div className="text-center space-y-2 select-none">
           <h1 className="text-5xl md:text-7xl lg:text-9xl font-sans font-bold tracking-tighter leading-[0.9]">
             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-slate-200 to-slate-500 bg-[length:200%_auto] animate-shimmer opacity-80">
               We are
             </span>
             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-[length:200%_auto] animate-shimmer opacity-100 pb-2">
               Reinventor.
             </span>
           </h1>
        </div>

        {/* 3. Deploy CTA */}
        <MagneticButton>
           <button className="group relative flex items-center gap-4 px-10 py-5 bg-white text-brand-navy rounded-full font-bold text-lg tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.2)] overflow-hidden">
              <span className="relative z-10">Deploy Architecture</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              
              {/* Internal Button Shine */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 opacity-50" />
           </button>
        </MagneticButton>

      </div>

      {/* 4. UTILITY BAR */}
      <div className="relative z-10 border-t border-white/5 mx-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
         
         {/* Left: Copyright */}
         <div className="text-slate-600 text-[10px] md:text-xs font-mono tracking-widest uppercase">
           © 2025 NAV AI Inc. <span className="hidden md:inline mx-2">|</span> All rights reserved.
         </div>
         
         {/* Right: Status & Links */}
         <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white text-[10px] md:text-xs font-mono uppercase tracking-wider transition-colors">Privacy Protocol</a>
              <a href="#" className="text-slate-500 hover:text-white text-[10px] md:text-xs font-mono uppercase tracking-wider transition-colors">Terms of Service</a>
            </div>
            
            {/* System Status Indicator */}
            <div className="flex items-center gap-3 pl-0 md:pl-6 md:border-l border-white/5">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
               <span className="text-[10px] font-mono text-emerald-500/80 font-bold tracking-widest uppercase">
                 System Operational
               </span>
            </div>
         </div>
      </div>

    </footer>
  );
};

export default footer;
