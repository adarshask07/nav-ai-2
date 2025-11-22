
import React from 'react';
import TextReveal from '../ui/text-reveal';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-violet opacity-5 blur-[150px] rounded-full pointer-events-none"></div>

       <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="text-brand-cyan font-mono mb-6 tracking-widest animate-pulse text-xs">SYSTEM STATUS: READY_TO_DEPLOY</p>
          
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.9] mb-12 mix-blend-lighten">
             PRODUCTION <br/> 
             <span className="text-transparent bg-clip-text bg-gradient-cyber glow-text">READY.</span>
          </h2>

          <h3 className="text-xl md:text-3xl font-mono mb-16 text-neutral-400 max-w-3xl mx-auto">
             <TextReveal text="ENTERPRISE GRADE AGENTIC WORKFORCE" />
          </h3>

          <button className="group relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white transition-all duration-200 bg-transparent font-display focus:outline-none">
             <span className="absolute inset-0 w-full h-full -mt-1 rounded opacity-30 bg-gradient-to-b from-transparent via-transparent to-brand-cyan"></span>
             <span className="relative block border border-brand-cyan/50 group-hover:border-brand-cyan px-12 py-6 bg-brand-navy/80 backdrop-blur transition-all duration-300 group-hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                Deploy Your Workforce
             </span>
          </button>
       </div>

       <div className="absolute bottom-10 w-full px-10 flex justify-between text-neutral-600 text-[10px] font-mono uppercase">
          <span>NAV AI © 2024</span>
          <span>San Francisco / New York / Tokyo</span>
       </div>
    </footer>
  );
};

export default Footer;
