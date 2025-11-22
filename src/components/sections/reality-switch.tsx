
import React, { useState } from 'react';
import TextReveal from '../ui/text-reveal';

const RealitySwitch: React.FC = () => {
  const [isCodeMode, setIsCodeMode] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-brand-navy overflow-hidden py-20 border-t border-white/5">
      
      <div className="text-center mb-16 z-10 px-4">
         <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
           <TextReveal text="DUAL REALITY ENGINE" />
         </h2>
         <p className="text-neutral-400 max-w-xl mx-auto font-light">
           Empower everyone. Visual builders for operations, raw code access for engineers. Seamlessly synchronized.
         </p>
      </div>

      <div className="z-20 mb-10 flex items-center gap-4 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur">
         <button 
           onClick={() => setIsCodeMode(false)}
           className={`px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 ${!isCodeMode ? 'bg-brand-cyan text-brand-navy font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'text-neutral-400 hover:text-white'}`}
         >
           VISUAL_MODE
         </button>
         <button 
           onClick={() => setIsCodeMode(true)}
           className={`px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 ${isCodeMode ? 'bg-brand-violet text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'text-neutral-400 hover:text-white'}`}
         >
           SOURCE_CODE
         </button>
      </div>

      <div className="relative w-[90vw] max-w-[900px] h-[500px] perspective-1000 group z-10">
        <div className={`relative w-full h-full transition-transform duration-1000 preserve-3d ${isCodeMode ? 'rotate-y-180' : ''}`}>
          
          <div className="absolute inset-0 w-full h-full backface-hidden bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
             <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <div className="ml-4 text-xs font-mono text-neutral-500">Workflow Builder v2.4</div>
             </div>
             <div className="flex-1 relative p-8">
                <div className="absolute top-12 left-12 w-40 h-24 bg-brand-cyan/10 border border-brand-cyan/50 rounded-lg flex items-center justify-center backdrop-blur text-brand-cyan font-mono text-sm">
                   Input Trigger
                </div>
                <svg className="absolute inset-0 pointer-events-none">
                   <path d="M160,90 C250,90 250,200 340,200" fill="none" stroke="#22D3EE" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-48 h-32 bg-brand-violet/10 border border-brand-violet/50 rounded-lg flex flex-col items-center justify-center backdrop-blur text-brand-violet font-mono text-sm shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                   <div className="mb-2">AI Agent (Reasoning)</div>
                   <div className="text-[10px] opacity-70">Model: GPT-4</div>
                </div>
                <svg className="absolute inset-0 pointer-events-none">
                   <path d="M560,200 C650,200 650,320 740,320" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
                 <div className="absolute bottom-12 right-12 w-40 h-24 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center justify-center backdrop-blur text-green-400 font-mono text-sm">
                   Output API
                </div>
             </div>
          </div>

          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#0d1117] rounded-2xl border border-brand-violet/30 shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden flex flex-col">
             <div className="h-12 bg-[#161b22] border-b border-white/10 flex items-center px-4 gap-2 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs font-mono text-brand-violet">workflow_config.json</div>
             </div>
             <div className="flex-1 p-6 font-mono text-sm text-neutral-400 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 text-brand-cyan opacity-20 text-6xl select-none">{`{}`}</div>
                <pre>
{`{
  "workflow_id": "wf_8923_alpha",
  "nodes": [
    {
      "id": "trigger_input",
      "type": "webhook",
      "config": { "auth": "bearer_token" }
    },
    {
      "id": "agent_reasoning",
      "type": "llm_chain",
      "model": "gpt-4-turbo",
      "temperature": 0.7,
      "tools": ["calculator", "web_search"]
    },
    {
      "id": "output_api",
      "type": "rest_post",
      "endpoint": "https://api.corp.com/v1/data"
    }
  ],
  "edges": [
    { "from": "trigger_input", "to": "agent_reasoning" },
    { "from": "agent_reasoning", "to": "output_api" }
  ]
}`}
                </pre>
             </div>
          </div>

        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-cyber opacity-10 blur-[100px] rounded-full pointer-events-none z-0"></div>
    </section>
  );
};

export default RealitySwitch;
