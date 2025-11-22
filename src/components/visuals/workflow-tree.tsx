
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Mail, 
  Scale, 
  Brain, 
  User, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

type Step = 'idle' | 'input' | 'parsing' | 'stock_api' | 'logic' | 'email' | 'complete';

const WorkflowTree: React.FC = () => {
  const [step, setStep] = useState<Step>('idle');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSequence = async () => {
      setStep('input');
      await wait(1500);
      
      setStep('parsing');
      await wait(1500);
      
      setStep('stock_api');
      await wait(1500);
      
      setStep('logic');
      await wait(1500);
      
      setStep('email');
      await wait(1500);
      
      setStep('complete');
      await wait(3000);
      
      setStep('idle');
      await wait(500);
      runSequence();
    };

    runSequence();
    return () => clearTimeout(timeout);
  }, []);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="relative w-full h-full bg-[#0B1121] flex items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
         <defs>
           <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.1" />
             <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
             <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
           </linearGradient>
         </defs>

         <ConnectionLine 
            d="M80,50% L180,50%" 
            isActive={['parsing', 'stock_api', 'logic', 'email', 'complete'].includes(step)} 
         />

         <ConnectionLine 
            d="M260,50% C300,50% 300,25% 340,25%" 
            isActive={['stock_api', 'logic', 'email', 'complete'].includes(step)} 
         />

         <ConnectionLine 
            d="M420,32% L420,42%" 
            isActive={['logic', 'email', 'complete'].includes(step)} 
            dashed
         />

         <ConnectionLine 
            d="M420,62% L420,72%" 
            isActive={['email', 'complete'].includes(step)} 
            dashed
         />
      </svg>

      <div className="relative z-10 w-full h-full flex items-center justify-between gap-2">
         
         <div className="w-[25%] flex justify-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ 
                 opacity: 1, 
                 scale: step === 'input' ? 1.05 : 1,
                 borderColor: step === 'input' ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)'
               }}
               className="w-full p-3 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur shadow-xl relative"
            >
               <div className="flex items-center gap-1 mb-2 text-neutral-400">
                 <User className="w-3 h-3" />
                 <span className="text-[8px] font-mono uppercase">Trigger</span>
               </div>
               <p className="text-[10px] text-white leading-tight">
                 "If AAPL &lt; $180, buy."
               </p>
               {step === 'input' && (
                 <motion.div layoutId="pulse" className="absolute -inset-1 rounded-xl border border-brand-cyan/50 animate-pulse" />
               )}
            </motion.div>
         </div>

         <div className="w-[20%] flex justify-center">
            <motion.div 
               animate={{ 
                 boxShadow: step === 'parsing' ? '0 0 20px rgba(139,92,246,0.3)' : 'none',
                 borderColor: step === 'parsing' ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.1)'
               }}
               className="w-16 h-16 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur flex flex-col items-center justify-center relative z-10"
            >
               {step === 'parsing' ? (
                 <Loader2 className="w-6 h-6 text-brand-violet animate-spin mb-1" />
               ) : (
                 <Brain className="w-6 h-6 text-white mb-1" />
               )}
               <span className="text-[8px] font-mono font-bold text-brand-violet uppercase tracking-wider">
                 Core
               </span>
            </motion.div>
         </div>

         <div className="w-[45%] flex flex-col justify-center gap-4 h-full py-8">
            
            <ToolNode 
              icon={<TrendingUp className="w-3 h-3 text-brand-cyan" />}
              title="Stock API"
              status={['stock_api', 'logic', 'email', 'complete'].includes(step) ? 'success' : step === 'parsing' ? 'idle' : 'idle'}
              active={step === 'stock_api'}
              label={step === 'stock_api' ? "GET /price" : step === 'complete' || ['logic', 'email'].includes(step) ? "$179.50" : "Wait"}
            />

            <ToolNode 
              icon={<Scale className="w-3 h-3 text-orange-400" />}
              title="Logic"
              status={['logic', 'email', 'complete'].includes(step) ? 'success' : 'idle'}
              active={step === 'logic'}
              label={step === 'logic' ? "< $180?" : step === 'complete' || step === 'email' ? "TRUE" : "Wait"}
            />

            <ToolNode 
              icon={<Mail className="w-3 h-3 text-green-400" />}
              title="Email"
              status={step === 'complete' ? 'success' : 'idle'}
              active={step === 'email'}
              label={step === 'email' ? "Sending..." : step === 'complete' ? "Sent" : "Wait"}
            />

         </div>

      </div>

    </div>
  );
};

const ConnectionLine = ({ d, isActive, dashed = false }: { d: string, isActive: boolean, dashed?: boolean }) => (
  <motion.path 
    d={d}
    fill="none"
    stroke={isActive ? "url(#flowGradient)" : "#334155"}
    strokeWidth="2"
    strokeDasharray={dashed ? "3,3" : "none"}
    initial={{ pathLength: 0, opacity: 0.2 }}
    animate={{ 
      pathLength: 1, 
      opacity: isActive ? 1 : 0.2 
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    vectorEffect="non-scaling-stroke"
  />
);

const ToolNode = ({ icon, title, status, active, label }: { 
  icon: React.ReactNode, 
  title: string, 
  status: 'idle' | 'active' | 'success',
  active: boolean,
  label: string 
}) => (
  <motion.div 
    animate={{ 
      scale: active ? 1.05 : 1,
      borderColor: active ? 'rgba(34,211,238,0.5)' : status === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)',
      backgroundColor: active ? 'rgba(34,211,238,0.05)' : 'rgba(15,23,42,0.6)'
    }}
    className="w-full p-2 rounded-lg border border-white/10 backdrop-blur flex items-center gap-2 relative"
  >
    <div className={`p-1.5 rounded ${active ? 'bg-brand-cyan/20' : 'bg-white/5'} border border-white/5`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
       <div className="flex justify-between items-center mb-0.5">
         <h4 className="text-xs font-bold text-white truncate">{title}</h4>
         {status === 'success' && <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />}
         {active && <Loader2 className="w-3 h-3 text-brand-cyan animate-spin shrink-0" />}
       </div>
       <div className={`text-[8px] font-mono px-1.5 py-0.5 rounded border inline-block ${active ? 'bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan' : status === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-black/20 border-white/5 text-neutral-500'}`}>
          {label}
       </div>
    </div>
  </motion.div>
);

export default WorkflowTree;
