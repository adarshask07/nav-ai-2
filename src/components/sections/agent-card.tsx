
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Activity, Code, FileText, Database, ChevronRight, X, Bot } from 'lucide-react';

const AgentCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-[#0B1121] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative z-10">

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <Bot className="w-6 h-6 text-brand-violet" />
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-white">Finance_Analyst_04</h3>
                <div className="text-xs font-mono text-neutral-500">ID: AGT-892-XJ</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-mono text-green-500 uppercase tracking-wider">Online</span>
            </div>
          </div>

          <p className="text-sm text-neutral-400 leading-relaxed">
            Specialized in quarterly report synthesis and anomaly detection within operational expenses.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-4 bg-[#020617] border-t border-white/5 hover:bg-green-500/10 transition-colors flex items-center justify-center gap-2 group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-1 bg-green-500 left-0"></div>
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-xs font-mono font-bold text-green-500 uppercase tracking-widest">Lineage Verified</span>
          <ChevronRight className="w-3 h-3 text-green-500 opacity-50 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 bg-brand-dark/95 backdrop-blur-xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-cyan" />
                <h3 className="font-display font-bold text-white">Lineage Explorer</h3>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <div className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Scaled Container for Mobile */}
              <div className="relative w-[400px] h-[300px] scale-[0.65] md:scale-100 origin-center flex-shrink-0">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    d="M50,80 C150,80 150,150 250,150"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  <motion.path
                    d="M50,220 C150,220 150,150 250,150"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.path
                    d="M250,150 L350,150"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  />
                </svg>

                <div className="absolute inset-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    className="absolute top-[60px] left-[20px] flex items-center gap-2 p-2 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300"
                  >
                    <Database className="w-3 h-3 text-blue-400" />
                    Azure GPT-4
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                    className="absolute top-[200px] left-[20px] flex items-center gap-2 p-2 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300"
                  >
                    <FileText className="w-3 h-3 text-red-400" />
                    PDF Policy v2
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}
                    className="absolute top-[135px] left-[235px] w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center shadow-[0_0_20px_#22D3EE]"
                  >
                    <Code className="w-4 h-4 text-brand-navy" />
                  </motion.div>
                  <div className="absolute top-[170px] left-[210px] text-[10px] font-mono text-brand-cyan opacity-70">Processing</div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }}
                    className="absolute top-[130px] right-[20px] p-3 rounded bg-green-500/10 border border-green-500/30 text-xs font-mono text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                  >
                    Verified Agent
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10 text-[10px] font-mono text-neutral-500 flex justify-between">
              <span>Hash: 0x7f...3a9b</span>
              <span>Timestamp: 2024-10-24 14:30:01 UTC</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentCard;
