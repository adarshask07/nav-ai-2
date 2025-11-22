
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Maximize2, FileText, MapPin, Activity, GitMerge, Check, Share2 } from 'lucide-react';

type ScenarioType = 'radar' | 'flowchart' | 'map';
type Phase = 'typing' | 'thinking' | 'rendering' | 'complete';

interface Scenario {
  id: ScenarioType;
  prompt: string;
  artifactTitle: string;
  icon: React.ReactNode;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'radar',
    prompt: "Compare Agent performance: Accuracy vs Speed vs Cost.",
    artifactTitle: "Performance Matrix_v4",
    icon: <Activity className="w-4 h-4" />
  },
  {
    id: 'flowchart',
    prompt: "Visualize the approval workflow for POs > $10k.",
    artifactTitle: "Workflow_Logic_Tree",
    icon: <GitMerge className="w-4 h-4" />
  },
  {
    id: 'map',
    prompt: "Show active server nodes by region.",
    artifactTitle: "Global_Node_Distribution",
    icon: <MapPin className="w-4 h-4" />
  }
];

const RadarChart = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full overflow-visible">
    <g className="opacity-20" stroke="#fff" strokeWidth="1" fill="none">
      <polygon points="150,20 262,85 262,115 150,180 38,115 38,85" />
      <polygon points="150,50 206,82 206,118 150,150 94,118 94,82" />
      <line x1="150" y1="100" x2="150" y2="20" />
      <line x1="150" y1="100" x2="262" y2="115" />
      <line x1="150" y1="100" x2="38" y2="115" />
    </g>
    <motion.polygon 
      initial={{ scale: 0, opacity: 0, originX: "150px", originY: "100px" }}
      animate={{ scale: 1, opacity: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      points="150,30 250,100 60,130" 
      fill="rgba(34, 211, 238, 0.2)" 
      stroke="#22D3EE" 
      strokeWidth="2" 
    />
    <motion.polygon 
      initial={{ scale: 0, opacity: 0, originX: "150px", originY: "100px" }}
      animate={{ scale: 1, opacity: 0.6 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      points="150,60 230,120 80,100" 
      fill="rgba(139, 92, 246, 0.2)" 
      stroke="#8B5CF6" 
      strokeWidth="2" 
    />
    <text x="150" y="15" textAnchor="middle" fill="#fff" fontSize="8" className="font-mono opacity-70">ACCURACY</text>
    <text x="270" y="120" textAnchor="start" fill="#fff" fontSize="8" className="font-mono opacity-70">SPEED</text>
    <text x="30" y="120" textAnchor="end" fill="#fff" fontSize="8" className="font-mono opacity-70">COST</text>
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.5 }}>
       <circle cx="250" cy="100" r="3" fill="#fff" />
       <rect x="255" y="85" width="60" height="20" rx="4" fill="#000" stroke="#333" />
       <text x="260" y="98" fill="#22D3EE" fontSize="8" fontFamily="monospace">98ms Latency</text>
    </motion.g>
  </svg>
);

const Flowchart = () => (
  <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible">
     <motion.rect initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} x="10" y="60" width="60" height="30" rx="4" fill="#0F172A" stroke="#22D3EE" strokeWidth="1" />
     <text x="40" y="78" textAnchor="middle" fill="#22D3EE" fontSize="8" className="font-mono">START</text>

     <motion.rect initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} x="110" y="60" width="80" height="30" rx="4" fill="#0F172A" stroke="#8B5CF6" strokeWidth="1" />
     <text x="150" y="78" textAnchor="middle" fill="#8B5CF6" fontSize="8" className="font-mono">CHECK_AMT</text>

     <motion.rect initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} x="230" y="20" width="60" height="30" rx="4" fill="#0F172A" stroke="#22c55e" strokeWidth="1" />
     <text x="260" y="38" textAnchor="middle" fill="#22c55e" fontSize="8" className="font-mono">APPROVE</text>

     <motion.rect initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} x="230" y="100" width="60" height="30" rx="4" fill="#0F172A" stroke="#ef4444" strokeWidth="1" />
     <text x="260" y="118" textAnchor="middle" fill="#ef4444" fontSize="8" className="font-mono">REJECT</text>

     <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }} d="M70,75 L110,75" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowhead)" />
     <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} d="M190,75 L210,75 L210,35 L230,35" stroke="#64748b" strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} d="M190,75 L210,75 L210,115 L230,115" stroke="#64748b" strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />

     <defs>
       <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
         <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
       </marker>
     </defs>
  </svg>
);

const GeoMap = () => (
  <svg viewBox="0 0 300 150" className="w-full h-full">
    <pattern id="dotPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.5" />
    </pattern>
    <path d="M20,40 Q60,20 100,40 T180,30 T260,50 V120 H20 Z" fill="url(#dotPattern)" opacity="0.5" />
    <g>
      <circle cx="70" cy="60" r="2" fill="#22D3EE"><animate attributeName="r" values="2;8;2" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" /></circle>
      <text x="70" y="75" textAnchor="middle" fill="#22D3EE" fontSize="6" className="font-mono">US-WEST</text>
    </g>
    <g>
      <circle cx="160" cy="50" r="2" fill="#8B5CF6"><animate attributeName="r" values="2;8;2" dur="2s" begin="0.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0;1" dur="2s" begin="0.5s" repeatCount="indefinite" /></circle>
      <text x="160" y="65" textAnchor="middle" fill="#8B5CF6" fontSize="6" className="font-mono">EU-CENTRAL</text>
    </g>
    <g>
       <circle cx="220" cy="80" r="2" fill="#ec4899"><animate attributeName="r" values="2;8;2" dur="2s" begin="1s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0;1" dur="2s" begin="1s" repeatCount="indefinite" /></circle>
      <text x="220" y="95" textAnchor="middle" fill="#ec4899" fontSize="6" className="font-mono">APAC-SOUTH</text>
    </g>
  </svg>
);

const VisualIntelligence: React.FC = () => {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [displayPrompt, setDisplayPrompt] = useState("");
  const [flash, setFlash] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const currentScenario = SCENARIOS[scenarioIdx];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const runCycle = async () => {
      setDisplayPrompt("");
      setPhase('typing');
      setFlash(false);
      setShowToast(false);
      const promptChars = currentScenario.prompt.split("");
      for (let i = 0; i < promptChars.length; i++) {
        await new Promise(r => setTimeout(r, 30));
        setDisplayPrompt(prev => prev + promptChars[i]);
      }
      await new Promise(r => setTimeout(r, 500));
      setPhase('thinking');
      await new Promise(r => setTimeout(r, 1000));
      setPhase('rendering');
      await new Promise(r => setTimeout(r, 3500));
      setFlash(true);
      setShowToast(true);
      setTimeout(() => setFlash(false), 200);
      await new Promise(r => setTimeout(r, 2000));
      setScenarioIdx(prev => (prev + 1) % SCENARIOS.length);
    };
    runCycle();
    return () => clearTimeout(timeout);
  }, [scenarioIdx]);

  return (
    <div className="relative w-[90vw] max-w-[600px] h-[500px] bg-[#0B1121]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden mx-auto">
      <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between">
         <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
           <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
         </div>
         <div className="text-xs font-mono text-neutral-500">NAV_AI_CHAT_v3.0</div>
         <Share2 className="w-4 h-4 text-neutral-500" />
      </div>

      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 relative">
         <div className="flex justify-end">
           <div className="bg-[#1E293B] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] border border-white/5">
             <div className="text-xs font-mono text-neutral-400 mb-1">USER</div>
             <p className="text-sm">{displayPrompt}<span className="animate-pulse">|</span></p>
           </div>
         </div>

         <AnimatePresence mode="wait">
           {phase !== 'typing' && (
             <motion.div 
               key="ai-response"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               className="flex justify-start w-full"
             >
                <div className="w-full bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-2xl rounded-tl-sm border border-brand-cyan/20 overflow-hidden relative group">
                   <div className="h-10 bg-black/20 border-b border-white/5 flex items-center justify-between px-4">
                      <div className="flex items-center gap-2 text-brand-cyan">
                        {currentScenario.icon}
                        <span className="text-xs font-mono font-bold">{currentScenario.artifactTitle}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <button className={`p-1.5 rounded hover:bg-white/10 transition-colors text-neutral-400 hover:text-white ${showToast ? 'text-green-400' : ''}`}><Download className="w-3 h-3" /></button>
                         <button className="p-1.5 rounded hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"><FileText className="w-3 h-3" /></button>
                         <button className="p-1.5 rounded hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"><Maximize2 className="w-3 h-3" /></button>
                      </div>
                   </div>
                   <div className="h-[240px] w-full p-4 flex items-center justify-center relative bg-[#020617]">
                      {phase === 'thinking' ? (
                        <div className="flex gap-1">
                           <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                           <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                           <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      ) : (
                        <div className="w-full h-full">
                           {currentScenario.id === 'radar' && <RadarChart />}
                           {currentScenario.id === 'flowchart' && <Flowchart />}
                           {currentScenario.id === 'map' && <GeoMap />}
                        </div>
                      )}
                      <AnimatePresence>
                        {flash && (
                          <motion.div 
                            initial={{ opacity: 0.8 }} 
                            animate={{ opacity: 0 }} 
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-white pointer-events-none z-50 mix-blend-overlay"
                          />
                        )}
                      </AnimatePresence>
                   </div>
                   <div className="h-8 bg-black/20 border-t border-white/5 flex items-center justify-between px-4 text-[10px] font-mono text-neutral-500">
                      <span>Generated in 1.2s</span>
                      <span>Source: NavAI_Engine</span>
                   </div>
                </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur font-mono text-xs"
          >
             <Check className="w-3 h-3" />
             File Downloaded Successfully
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisualIntelligence;
