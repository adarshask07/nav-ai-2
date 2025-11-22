
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const OrchestrationGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".orbit-system", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
        transformOrigin: "200px 200px"
      });

      gsap.to(".core-glow", {
        attr: { r: 60, opacity: 0 },
        duration: 2,
        repeat: -1,
        ease: "power1.out"
      });

      const items = [1, 2, 3];
      items.forEach((i) => {
        gsap.to(`.packet-${i}`, {
          motionPath: {
            path: `.line-path-${i}`,
            align: `.line-path-${i}`,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 2,
          repeat: -1,
          ease: "power1.inOut",
          delay: i * 0.6
        });
      });

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative pointer-events-none">
      <svg ref={svgRef} viewBox="0 0 400 400" className="w-full h-full max-w-[500px] max-h-[500px] overflow-visible">
        <defs>
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
             <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
             <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <g className="orbit-system">
          <path className="line-path-1" d="M200,200 L200,50" stroke="url(#line-gradient)" strokeWidth="1" fill="none"/>
          <circle className="packet-1" r="4" fill="#fff" filter="url(#glow-cyan)" />
          <g transform="translate(200, 50)">
             <circle r="10" fill="#020617" stroke="#22D3EE" strokeWidth="2" />
             <circle r="4" fill="#22D3EE" />
          </g>

          <g transform="rotate(120, 200, 200)">
            <path className="line-path-2" d="M200,200 L200,50" stroke="url(#line-gradient)" strokeWidth="1" fill="none"/>
            <circle className="packet-2" r="4" fill="#fff" filter="url(#glow-cyan)" />
            <g transform="translate(200, 50)">
              <circle r="10" fill="#020617" stroke="#22D3EE" strokeWidth="2" />
              <circle r="4" fill="#22D3EE" />
            </g>
          </g>

          <g transform="rotate(240, 200, 200)">
            <path className="line-path-3" d="M200,200 L200,50" stroke="url(#line-gradient)" strokeWidth="1" fill="none"/>
            <circle className="packet-3" r="4" fill="#fff" filter="url(#glow-cyan)" />
            <g transform="translate(200, 50)">
              <circle r="10" fill="#020617" stroke="#22D3EE" strokeWidth="2" />
              <circle r="4" fill="#22D3EE" />
            </g>
          </g>
        </g>

        <g className="center-core">
          <circle className="core-glow" cx="200" cy="200" r="30" fill="#8B5CF6" opacity="0.3" />
          <circle cx="200" cy="200" r="20" fill="#020617" stroke="#8B5CF6" strokeWidth="2" filter="url(#glow-cyan)" />
          <circle cx="200" cy="200" r="8" fill="#22D3EE" />
        </g>

      </svg>
    </div>
  );
};

export default OrchestrationGraph;
