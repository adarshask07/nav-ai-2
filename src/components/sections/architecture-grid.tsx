import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, BookOpen, Layers, ShieldCheck } from "lucide-react";
import BlurTextReveal from "../ui/blur-text-reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PREMIUM_SPRING = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.5,
} as const;

const ENTITIES = [
  {
    id: "agents",
    title: "AGENTS",
    badge: "AUTONOMOUS NETWORK",
    copy: "Deploy a coordinated workforce of specialized agents. From marketing optimization to supply chain logistics, orchestrate complex, multi-step workflows with human-like reasoning.",
    icon: <Cpu className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-6",
  },
  {
    id: "knowledge",
    title: "KNOWLEDGE",
    badge: "ENTERPRISE CONTEXT",
    copy: "Ground your AI in truth. Ingest, index, and retrieve proprietary data from across your organization—PDFs, ERPs, and codebases—securely and in real-time.",
    icon: <BookOpen className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-6",
  },
  {
    id: "models",
    title: "MODELS",
    badge: "MODEL AGNOSTIC",
    copy: "Future-proof your stack. Switch seamlessly between GPT-4, Claude, and local Llama models. Optimize for cost, latency, or privacy without rewriting your application logic.",
    icon: <Layers className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-6",
  },
  {
    id: "governance",
    title: "GOVERNANCE",
    badge: "RESPONSIBLE AI",
    copy: "Scale with confidence. Built-in guardrails for PII redaction, policy enforcement, and audit trails ensure your AI operations remain compliant and secure by design.",
    icon: <ShieldCheck className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-6",
  },
];

const TactileBadge = ({ text }: { text: string }) => (
  <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 border-t-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-500 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/20 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]">
    <span className="text-[10px] font-mono font-semibold tracking-widest text-neutral-400 uppercase group-hover:text-brand-cyan transition-colors">
      {text}
    </span>
  </div>
);

const ArchitectureGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;

      if (!track || !section) return;

      // Calculate the total scrollable width
      // Width of track - Viewport Width + Padding buffer
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth + 100);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300%", // Scroll duration relative to viewport height
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-transparent text-white overflow-hidden flex flex-col justify-center py-20"
    >
      {/* Header - Fixed Position within Pinned Section */}
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
          SYSTEM{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">
            ARCHITECTURE
          </span>
        </h2>
        <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
          A rigid architectural framework for autonomous enterprise workforces.
          You define the logic. The agents execute the labor.
        </p>
      </div>

      {/* Horizontal Track Container with Dual Fade Mask */}
      <div
        className="w-full relative z-20"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 px-[10vw] w-max will-change-transform"
        >
          {ENTITIES.map((item, index) => (
            <div
              key={item.id}
              className="group relative w-[85vw] md:w-[30vw] min-w-[350px] max-w-[600px] p-8 md:p-12 rounded-3xl bg-[#0B1121]/90 backdrop-blur-md border border-white/10 hover:border-brand-cyan/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col"
            >
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 w-max shadow-inner">
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase group-hover:text-brand-cyan transition-colors">
                  {item.badge}
                </span>
              </div>

              {/* Content */}
              <div className="mt-auto relative z-10">
                <div className="flex items-center gap-4 mb-6 text-white group-hover:text-brand-cyan transition-colors duration-300">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/30 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-bold text-3xl tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-lg text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {item.copy}
                </p>
              </div>

              {/* Flash Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

              {/* Large Index Number */}
              <div className="absolute top-6 right-8 text-6xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors select-none">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureGrid;
