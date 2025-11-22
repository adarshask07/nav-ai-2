
import React, { useEffect, useState, useRef } from 'react';
import { FileText, Brain, Database, Check } from 'lucide-react';
import gsap from 'gsap';

type Phase = 'idle' | 'input' | 'thinking' | 'handoff' | 'processing' | 'complete';

interface LogMessage {
  id: number;
  text: string;
  type: 'thinking' | 'retrieval' | 'tool' | 'handoff' | 'success';
}

const OrchestratorSimulation: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [activeWorker, setActiveWorker] = useState<'researcher' | 'writer' | null>(null);

  const packetRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const runSimulation = () => {
    setPhase('idle');
    setLogs([]);
    setActiveWorker(null);
    if (packetRef.current) {
      gsap.set(packetRef.current, { opacity: 0, x: 0, y: 0 });
    }

    const tl = gsap.timeline();

    tl.call(() => setPhase('input'));
    tl.to({}, { duration: 1.5 });

    tl.call(() => {
      setPhase('thinking');
      addLog("🧠 THINKING: Breaking down user request...", 'thinking');
    });
    tl.to({}, { duration: 0.8 });

    tl.call(() => addLog("🔎 CONTEXT_RETRIEVAL: Scanning 'Q3_Report.pdf'...", 'retrieval'));
    tl.to({}, { duration: 0.8 });

    tl.call(() => addLog("🛠️ TOOL_CALL: extract_text(page=1-10)", 'tool'));
    tl.to({}, { duration: 0.8 });

    tl.call(() => addLog("✅ DATA: Extracted 4500 tokens.", 'success'));
    tl.to({}, { duration: 0.5 });

    tl.call(() => {
      setPhase('handoff');
      addLog("🔄 HANDOFF_TO: 'Summarizer_Bot'", 'handoff');
      setActiveWorker('writer');
    });

    if (packetRef.current) {
      tl.fromTo(packetRef.current,
        { opacity: 1, left: '25%', top: '50%' },
        { left: '75%', top: '70%', duration: 1, ease: "power2.inOut" }
      );
    }

    tl.call(() => {
      setPhase('processing');
      addLog("📜 TASK: Summarize extracted text.", 'thinking');
    });
    tl.to({}, { duration: 1.5 });

    tl.call(() => {
      setPhase('complete');
      addLog("✅ OUTPUT RECEIVED.", 'success');
      addLog("🏁 FINAL RESPONSE GENERATED.", 'success');
    });

    tl.to({}, { duration: 3 });

    tl.call(() => runSimulation());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      runSimulation();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const addLog = (text: string, type: LogMessage['type']) => {
    setLogs(prev => [...prev, { id: Date.now(), text, type }].slice(-6));
  };

  return (
    <section className="relative z-30 w-full min-h-screen bg-gradient-orchestrator flex flex-col items-center justify-center py-20 overflow-hidden border-t border-white/5">

      <div className="text-center mb-12 z-10 px-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
          LIVE ORCHESTRATION
        </h2>
        <p className="text-brand-cyan font-mono text-sm tracking-widest uppercase">
          Real-time Multi-Agent Reasoning
        </p>
      </div>

      <div className="relative w-[95vw] max-w-[1200px] aspect-[16/9] md:aspect-[2/1] bg-brand-dark/50 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">

        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8B5CF620_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF620_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M25 50 C 50 50, 50 30, 75 30"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
            className="opacity-30"
          />
          <path
            ref={pathRef}
            d="M25 50 C 50 50, 50 70, 75 70"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
            className="opacity-30"
          />
        </svg>

        <div
          ref={packetRef}
          className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white] z-20 opacity-0 pointer-events-none"
        ></div>

        <div className={`absolute left-[10%] top-1/2 -translate-y-1/2 w-64 p-6 rounded-xl border transition-all duration-500 z-10 bg-brand-navy
          ${phase === 'thinking' || phase === 'handoff' ? 'border-brand-cyan shadow-[0_0_30px_rgba(34,211,238,0.3)]' : 'border-white/10'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${phase === 'thinking' ? 'bg-brand-cyan text-brand-navy' : 'bg-white/10 text-white'}`}>
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white">Orchestrator</h3>
              <div className="text-xs font-mono text-neutral-400">Model: GPT-4o</div>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded bg-white/5 border border-white/5 text-xs text-neutral-300 transition-all duration-500 ${phase !== 'idle' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            "Analyze the uploaded PDF and summarize key findings."
          </div>
        </div>

        <div className="absolute right-[10%] top-[20%] w-56 p-4 rounded-xl border border-white/10 bg-brand-navy opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Database className="w-5 h-5 text-neutral-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-neutral-400">Researcher</h3>
              <div className="text-[10px] font-mono text-neutral-600">Status: Idle</div>
            </div>
          </div>
        </div>

        <div className={`absolute right-[10%] top-[60%] w-56 p-4 rounded-xl border transition-all duration-500 bg-brand-navy
           ${activeWorker === 'writer' ? 'border-brand-violet shadow-[0_0_30px_rgba(139,92,246,0.3)] opacity-100' : 'border-white/10 opacity-50'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeWorker === 'writer' ? 'bg-brand-violet text-white' : 'bg-white/5 text-neutral-400'}`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white">Summarizer_Bot</h3>
              <div className="text-[10px] font-mono text-neutral-400">
                {phase === 'processing' ? 'Status: Generating...' : phase === 'complete' ? 'Status: Complete' : 'Status: Idle'}
              </div>
            </div>
          </div>
          {phase === 'complete' && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Check className="w-3 h-3 text-black" />
            </div>
          )}
        </div>

        <div className={`absolute left-[12%] top-[15%] md:left-[30%] md:top-[55%] w-80 md:w-96 p-1 rounded-lg backdrop-blur-md transition-all duration-500 ${phase === 'idle' || phase === 'input' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="bg-black/80 rounded-lg border border-white/10 shadow-2xl overflow-hidden">
            <div className="h-8 bg-white/5 flex items-center px-3 gap-2 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="ml-2 font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Live_Trace_Log</span>
            </div>

            <div className="p-4 min-h-[160px] font-mono text-xs space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="animate-fade-in">
                  <span className={`
                     ${log.type === 'thinking' ? 'text-yellow-400' : ''}
                     ${log.type === 'retrieval' ? 'text-blue-400' : ''}
                     ${log.type === 'tool' ? 'text-brand-cyan' : ''}
                     ${log.type === 'handoff' ? 'text-brand-violet' : ''}
                     ${log.type === 'success' ? 'text-green-400' : ''}
                   `}>
                    {log.text}
                  </span>
                </div>
              ))}
              <div className="w-2 h-4 bg-brand-cyan animate-pulse inline-block align-middle ml-1"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OrchestratorSimulation;
