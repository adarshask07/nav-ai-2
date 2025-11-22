
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NeuroThread: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const opacityKnot = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const opacityLine = useTransform(scrollYProgress, [0.2, 0.25, 0.5, 0.55], [0, 1, 1, 0]);
  const scaleLineY = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const opacityNetwork = useTransform(scrollYProgress, [0.5, 0.55, 0.8, 0.85], [0, 1, 1, 0]);
  const opacityFrame = useTransform(scrollYProgress, [0.8, 0.85, 1], [0, 1, 1]);

  return (
    <div ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center">
      <svg className="w-full h-full max-w-[1200px] overflow-visible" viewBox="0 0 100 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
             <stop offset="20%" stopColor="#22D3EE" stopOpacity="0.8" />
             <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.8" />
             <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
             <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
             <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
             </feMerge>
          </filter>
        </defs>

        <motion.g style={{ opacity: opacityKnot }} className="origin-center">
           <motion.path 
             d="M50,40 C70,40 80,60 50,80 C20,100 30,120 50,120 C70,120 80,100 50,80 C20,60 30,40 50,40"
             fill="none"
             stroke="url(#threadGradient)"
             strokeWidth="0.5"
             filter="url(#glow)"
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           />
        </motion.g>

        <motion.line 
          x1="50" y1="0" x2="50" y2="200"
          stroke="url(#threadGradient)"
          strokeWidth="0.5"
          filter="url(#glow)"
          style={{ opacity: opacityLine, scaleY: scaleLineY }}
          className="origin-top"
        />

        <motion.g style={{ opacity: opacityNetwork }}>
           <line x1="50" y1="0" x2="50" y2="200" stroke="url(#threadGradient)" strokeWidth="0.2" />
           <path d="M50,80 L20,100" stroke="#22D3EE" strokeWidth="0.3" strokeOpacity="0.5" />
           <path d="M50,120 L80,140" stroke="#8B5CF6" strokeWidth="0.3" strokeOpacity="0.5" />
           <circle cx="50" cy="80" r="1" fill="#22D3EE" />
           <circle cx="50" cy="120" r="1" fill="#8B5CF6" />
           <circle cx="20" cy="100" r="1" fill="#22D3EE" />
           <circle cx="80" cy="140" r="1" fill="#8B5CF6" />
        </motion.g>

        <motion.rect
          x="10" y="10" width="80" height="180" rx="2"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth="0.5"
          filter="url(#glow)"
          style={{ opacity: opacityFrame }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />

      </svg>
    </div>
  );
};

export default NeuroThread;
