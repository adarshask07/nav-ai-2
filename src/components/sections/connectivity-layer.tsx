
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Terminal, Zap, Brain } from 'lucide-react';
import MagneticCard from '../ui/magnetic-button';

const ConnectivityLayer: React.FC = () => {
   const [activeCard, setActiveCard] = useState<number | null>(null);

   useEffect(() => {
      const runSequence = async () => {
         for (let i = 0; i < 4; i++) {
            setActiveCard(i);
            await new Promise(r => setTimeout(r, 2000));
            setActiveCard(null);
            await new Promise(r => setTimeout(r, 500));
         }
         runSequence();
      };

      runSequence();
      return () => { };
   }, []);

   return (
      <div className="w-full h-full bg-[#0B1121] relative flex flex-col md:block items-center justify-center overflow-hidden p-4">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible hidden md:block">
            <defs>
               <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
                  <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
               </linearGradient>
            </defs>

            <ConnectionBeam active={activeCard === 0} d="M50% 50% L15% 15%" />
            <ConnectionBeam active={activeCard === 1} d="M50% 50% L85% 15%" />
            <ConnectionBeam active={activeCard === 2} d="M50% 50% L15% 85%" />
            <ConnectionBeam active={activeCard === 3} d="M50% 50% L85% 85%" />
         </svg>

         {/* Mobile Grid Layout Container */}
         <div className="grid grid-cols-2 gap-3 w-full h-full md:block">

            {/* Top Left Card */}
            <div className="md:absolute md:top-[8%] md:left-[2%] md:w-[42%] z-10 col-span-1">
               <div className="relative h-full">
                  <ToolCardContent
                     isActive={activeCard === 0}
                     icon={<Globe className="w-4 h-4 text-blue-400" />}
                     label="API GATEWAY"
                     status="GET /data [200 OK]"
                  />
               </div>
            </div>

            {/* Top Right Card */}
            <div className="md:absolute md:top-[8%] md:right-[2%] md:w-[42%] z-10 col-span-1">
               <div className="relative h-full">
                  <ToolCardContent
                     isActive={activeCard === 1}
                     icon={<Database className="w-4 h-4 text-purple-400" />}
                     label="SQL CONNECT"
                     status="Querying 'Client'..."
                  />
               </div>
            </div>

            {/* Center Core - Hidden in grid flow, positioned absolutely on mobile to be in center or integrated?
               Let's place it in the center of the grid or use absolute centering for mobile too but ensuring z-index.
               Actually, for mobile, let's put it in the middle of the grid or just keep it absolute centered.
           */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none md:pointer-events-auto">
               <motion.div
                  animate={{
                     scale: activeCard !== null ? 1.1 : 1,
                     boxShadow: activeCard !== null ? "0 0 30px rgba(34,211,238,0.4)" : "0 0 0px rgba(0,0,0,0)"
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#020617] border border-brand-cyan/30 flex flex-col items-center justify-center relative z-20 backdrop-blur-xl"
               >
                  <Brain className={`w-5 h-5 md:w-6 md:h-6 mb-1 transition-colors ${activeCard !== null ? 'text-brand-cyan' : 'text-neutral-500'}`} />
                  <div className="text-[6px] md:text-[8px] font-mono font-bold text-white uppercase tracking-widest">Core</div>

                  <div className="absolute inset-0 rounded-full border border-brand-cyan/20 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute -inset-2 rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite_reverse]" />
               </motion.div>
            </div>

            {/* Bottom Left Card */}
            <div className="md:absolute md:bottom-[8%] md:left-[2%] md:w-[42%] z-10 col-span-1 self-end">
               <div className="relative h-full">
                  <ToolCardContent
                     isActive={activeCard === 2}
                     icon={<Terminal className="w-4 h-4 text-yellow-400" />}
                     label="PYTHON EXE"
                     status="Calc Complete."
                  />
               </div>
            </div>

            {/* Bottom Right Card */}
            <div className="md:absolute md:bottom-[8%] md:right-[2%] md:w-[42%] z-10 col-span-1 self-end">
               <div className="relative h-full">
                  <ToolCardContent
                     isActive={activeCard === 3}
                     icon={<Zap className="w-4 h-4 text-orange-400" />}
                     label="WEBHOOKS"
                     status="Triggering..."
                  />
               </div>
            </div>

         </div>

      </div>
   );
};

const ConnectionBeam = ({ active, d }: { active: boolean, d: string }) => (
   <motion.path
      d={d}
      stroke={active ? "#22D3EE" : "#1e293b"}
      strokeWidth={active ? 2 : 1}
      strokeDasharray={active ? "none" : "4,4"}
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
         pathLength: active ? [0, 1, 0] : 1,
         opacity: active ? 1 : 0.2,
         strokeOpacity: active ? 1 : 0.2
      }}
      transition={{
         duration: 2,
         ease: "easeInOut",
         times: [0, 0.5, 1]
      }}
   />
);

const ToolCardContent = ({ isActive, icon, label, status }: { isActive: boolean, icon: React.ReactNode, label: string, status: string }) => (
   <div className={`p-3 rounded-xl border transition-all duration-500 bg-[#0F172A] ${isActive ? 'border-brand-cyan/50 shadow-lg scale-105' : 'border-white/10'}`}>
      <div className="flex items-center gap-2 mb-2">
         <div className={`p-1.5 rounded-lg bg-black/40 border border-white/10 transition-colors ${isActive ? 'border-brand-cyan/30' : ''}`}>
            {icon}
         </div>
         <div className="min-w-0">
            <div className="text-[9px] font-bold text-white uppercase tracking-wider">{label}</div>
            <div className={`text-[8px] font-mono truncate ${isActive ? 'text-green-400' : 'text-neutral-500'}`}>
               {isActive ? status : 'Idle'}
            </div>
         </div>
      </div>
      {isActive && (
         <div className="absolute top-2 right-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e] animate-pulse" />
         </div>
      )}
   </div>
);

export default ConnectivityLayer;
