
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AmbientBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const color1 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#4c1d95", "#059669", "#1e3a8a", "#78350f"]
  );

  const color2 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#312e81", "#0891b2", "#334155", "#c2410c"]
  );

  const color3 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#581c87", "#047857", "#1e40af", "#9a3412"]
  );

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020617]">
      <motion.div
        style={{ backgroundColor: color1 }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen opacity-30 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        style={{ backgroundColor: color2 }}
        className="absolute top-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-30 blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        style={{ backgroundColor: color3 }}
        className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[60vw] rounded-full mix-blend-screen opacity-20 blur-[120px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />

      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default AmbientBackground;
