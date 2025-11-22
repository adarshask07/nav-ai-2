
import React, { useEffect, useRef, useState } from 'react';

const LOGS = [
  { type: 'info', text: 'Agent_01 initiating task sequence...' },
  { type: 'warn', text: 'Analyzing query context for PII...' },
  { type: 'success', text: 'PII Detected: [REDACTED]' },
  { type: 'info', text: 'Connecting to Vector Store...' },
  { type: 'success', text: 'Policy Check: PASSED (Compliance v2)' },
  { type: 'info', text: 'Executing tool call: API_Connector' },
  { type: 'success', text: 'Output generated successfully.' },
];

const TerminalBlock: React.FC = () => {
  const [lines, setLines] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        if (prev < LOGS.length) return prev + 1;
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto font-mono text-xs md:text-sm leading-relaxed">
      <div className="rounded-t-lg bg-[#1e1e1e] px-4 py-2 flex items-center gap-2 border-b border-neutral-800">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-neutral-500 text-xs">gov_module.exe</span>
      </div>
      <div className="bg-[#0B1121]/90 backdrop-blur p-6 rounded-b-lg border border-white/10 h-[300px] overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {LOGS.slice(0, lines).map((log, i) => (
          <div key={i} className="mb-2 animate-fade-in">
            <span className="text-neutral-500 mr-2">
              {new Date().toLocaleTimeString()}
            </span>
            {log.type === 'info' && <span className="text-blue-400 mr-2">[INFO]</span>}
            {log.type === 'warn' && <span className="text-yellow-400 mr-2">[WARN]</span>}
            {log.type === 'success' && <span className="text-green-400 mr-2">[OK]</span>}
            <span className="text-neutral-300 typing-effect">{log.text}</span>
          </div>
        ))}
        <div className="mt-2 animate-pulse text-brand-cyan">_</div>
      </div>
    </div>
  );
};

export default TerminalBlock;
