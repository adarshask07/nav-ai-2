
import React, { useEffect } from 'react';
import { useLenis } from './smooth-scroll';
import { motion, useSpring, useTransform } from 'framer-motion';

interface LiquidContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LiquidContainer: React.FC<LiquidContainerProps> = ({ children, className = "" }) => {
  const lenis = useLenis();
  const skewY = useSpring(0, { stiffness: 200, damping: 30 });
  const scaleY = useSpring(1, { stiffness: 200, damping: 30 });
  const blur = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (e: any) => {
      const velocity = e.velocity;
      
      const skewValue = Math.max(Math.min(velocity * 0.05, 5), -5);
      
      const scaleValue = 1 + Math.abs(velocity * 0.0005);
      
      const blurValue = Math.min(Math.abs(velocity * 0.02), 4);

      skewY.set(skewValue);
      scaleY.set(scaleValue);
      blur.set(blurValue);
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis, skewY, scaleY, blur]);

  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{
        skewY,
        scaleY,
        filter,
        transformOrigin: "center center",
        willChange: "transform"
      }}
      className={`w-full relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default LiquidContainer;
