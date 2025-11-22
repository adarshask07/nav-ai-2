
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const VectorizationAnim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cols = 10;
    const rows = 14;
    const particles: { 
      x: number; 
      y: number; 
      originX: number; 
      originY: number; 
      targetX: number; 
      targetY: number;
      size: number;
    }[] = [];

    const startX = 50;
    const startY = 100;
    const gap = 8;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const px = startX + i * gap;
        const py = startY + j * gap;
        particles.push({
          x: px,
          y: py,
          originX: px,
          originY: py,
          targetX: canvas.width - 80 + (Math.random() * 40),
          targetY: (canvas.height / 2) - 30 + (Math.random() * 60),
          size: Math.random() * 2 + 1
        });
      }
    }

    const animState = { progress: 0 };

    const getContainerAnim = () => {
      const st = ScrollTrigger.getById("ecosystem-scroll");
      return st ? st.animation : null;
    };

    let tween: gsap.core.Tween | null = null;

    const initAnimation = () => {
      const containerAnim = getContainerAnim();
      if (!containerAnim) return;

      tween = gsap.to(animState, {
        progress: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: container,
          containerAnimation: containerAnim,
          start: "left 80%",
          end: "right 20%",
          scrub: true,
          id: "vector-anim"
        }
      });
    };

    initAnimation();

    let animationFrameId: number;
    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetCX = canvas.width - 60;
      const targetCY = canvas.height / 2;
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(34, 211, 238, 0.3)`;
      ctx.lineWidth = 2;
      ctx.arc(targetCX, targetCY, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(34, 211, 238, 0.1)`;
      ctx.fill();

      particles.forEach(p => {
        const noise = Math.sin(p.originY * 0.1 + animState.progress * 10) * 20 * animState.progress;
        const currX = p.originX + (p.targetX - p.originX) * animState.progress;
        const currY = p.originY + (p.targetY - p.originY) * animState.progress + noise;
        const alpha = 1 - (animState.progress * 0.2);

        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.fillRect(currX, currY, p.size, p.size);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      if (tween) tween.kill();
      ScrollTrigger.getById("vector-anim")?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default VectorizationAnim;
