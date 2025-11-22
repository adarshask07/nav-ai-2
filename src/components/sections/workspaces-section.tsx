
import React from 'react';
import { FolderGit2, ShieldAlert, ShieldCheck, Lock, Globe, AlertTriangle } from 'lucide-react';

interface Workspace {
  id: string;
  name: string;
  icon: React.ReactNode;
  desc: string;
  compliant: boolean;
  issues?: string[];
}

const WORKSPACES: Workspace[] = [
  {
    id: 'ws-01',
    name: 'Graph DB Orchestrator',
    icon: <FolderGit2 className="w-5 h-5 text-brand-violet" />,
    desc: 'Knowledge graph synchronization pipeline.',
    compliant: true
  },
  {
    id: 'ws-02',
    name: 'Public Web Scraper',
    icon: <Globe className="w-5 h-5 text-orange-400" />,
    desc: 'Automated market research aggregation.',
    compliant: false,
    issues: ['PII Leak Potential', 'Unencrypted Export']
  },
  {
    id: 'ws-03',
    name: 'HR Data Processor',
    icon: <Lock className="w-5 h-5 text-blue-400" />,
    desc: 'Internal employee record analysis.',
    compliant: true
  },
  {
    id: 'ws-04',
    name: 'Marketing Content Gen',
    icon: <FolderGit2 className="w-5 h-5 text-pink-400" />,
    desc: 'Social media caption generation.',
    compliant: true
  }
];

const WorkspacesSection: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#1E1E1E] flex flex-col scale-[0.85] md:scale-100 origin-top">
      <div className="p-4 md:p-6 border-b border-white/5 bg-[#181818]">
        <h3 className="text-base md:text-lg font-display font-bold text-white flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-cyan" />
          Secure Workspaces
        </h3>
        <p className="text-[10px] md:text-xs text-neutral-500 mt-1">Managed environments with strict policy enforcement.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3 custom-scrollbar">
        {WORKSPACES.map((ws) => (
          <div
            key={ws.id}
            className="group relative bg-[#2A2A2A] rounded-lg p-4 border border-transparent hover:border-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-black/30 border border-white/5">
                  {ws.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{ws.name}</h4>
                  <div className="text-[10px] text-neutral-500 font-mono">{ws.id}</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              {ws.desc}
            </p>

            <div className={`relative w-full py-1.5 px-3 rounded-full border flex items-center gap-2 ${ws.compliant
              ? 'bg-green-500/5 border-green-500/20 text-green-400'
              : 'bg-red-500/5 border-red-500/20 text-red-400'
              }`}>
              {ws.compliant ? (
                <>
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-[10px] font-mono font-bold">All Policies Passed</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3 h-3" />
                  <span className="text-[10px] font-mono font-bold">2 Frameworks Non-Compliant</span>

                  <div className="absolute bottom-full left-0 mb-2 w-full bg-black border border-red-500/30 rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                    <div className="text-[10px] font-bold text-red-400 mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Violations:
                    </div>
                    <ul className="list-disc list-inside text-[10px] text-neutral-300">
                      {ws.issues?.map(i => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 md:p-4 border-t border-white/5 bg-[#181818]">
        <button className="w-full py-2 rounded border border-dashed border-white/20 text-[10px] md:text-xs font-mono text-neutral-400 hover:text-white hover:border-white/40 transition-colors">
          + Create New Workspace
        </button>
      </div>
    </div>
  );
};

export default WorkspacesSection;
