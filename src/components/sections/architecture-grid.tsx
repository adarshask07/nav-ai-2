
import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import BlurTextReveal from '../ui/blur-text-reveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PREMIUM_SPRING = { type: "spring", stiffness: 120, damping: 20, mass: 0.5 } as const;

const ENTITIES = [
  {
    id: 'agents',
    title: 'AGENTS',
    badge: 'AUTONOMOUS NETWORK',
    copy: "Deploy a coordinated workforce of specialized agents. From marketing optimization to supply chain logistics, orchestrate complex, multi-step workflows with human-like reasoning.",
    icon: <Cpu className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-6",
  },
  {
    id: 'knowledge',
    title: 'KNOWLEDGE',
    badge: 'ENTERPRISE CONTEXT',
    copy: "Ground your AI in truth. Ingest, index, and retrieve proprietary data from across your organization—PDFs, ERPs, and codebases—securely and in real-time.",
    icon: <BookOpen className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-6",
  },
  {
    id: 'models',
    title: 'MODELS',
    badge: 'MODEL AGNOSTIC',
    copy: "Future-proof your stack. Switch seamlessly between GPT-4, Claude, and local Llama models. Optimize for cost, latency, or privacy without rewriting your application logic.",
    icon: <Layers className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-6",
  },
  {
    id: 'governance',
    title: 'GOVERNANCE',
    badge: 'RESPONSIBLE AI',
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
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { filter: "blur(20px)", opacity: 0, y: 50 },
        { 
          filter: "blur(0px)", 
          opacity: 1, 
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-brand-navy text-white border-b border-white/5 will-change-transform">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            <BlurTextReveal text="Intelligence. Orchestrated." />
          </h2>
          <p className="text-xl text-neutral-400 font-light leading-relaxed">
            NAV AI isn't just a chatbot. It is a rigid architectural framework for autonomous enterprise workforces. You define the logic. The agents execute the labor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {ENTITIES.map((item, i) => (
            <motion.div
              key={item.id}
              className={`group relative p-8 rounded-3xl bg-[#0B1121] border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl overflow-hidden ${item.colSpan}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ ...PREMIUM_SPRING, delay: i * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col items-start">
                <TactileBadge text={`[ ${item.badge} ]`} />
                
                <div className="mt-auto">
                  <div className="flex items-center gap-3 mb-4 text-white group-hover:text-brand-cyan transition-colors duration-300">
                    {item.icon}
                    <h3 className="font-display font-bold text-lg tracking-wide">{item.title}</h3>
                  </div>
                  
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {item.copy}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArchitectureGrid;
