
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface BlurTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const PREMIUM_SPRING = { type: "spring", stiffness: 120, damping: 20, mass: 0.5 } as const;

const BlurTextReveal: React.FC<BlurTextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i + delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: PREMIUM_SPRING,
    },
    hidden: {
      opacity: 0,
      y: 15,
      filter: "blur(5px)",
    },
  };

  return (
    <motion.div
      style={{ overflow: "visible", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`${className} relative`}
    >
      {words.map((word, index) => (
        <motion.span 
          variants={child} 
          style={{ marginRight: "0.25em", display: "inline-block" }} 
          key={index}
          className="relative"
        >
          <span className="relative z-10">{word}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer pointer-events-none mix-blend-overlay" aria-hidden="true">
            {word}
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurTextReveal;
