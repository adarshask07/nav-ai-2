
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, 
  Database, 
  Grid, 
  Plus, 
  Edit3, 
  Loader2,
  Search,
  CheckCircle2
} from 'lucide-react';
import SpotlightCard from '../ui/spotlight-card';
import BlurTextReveal from '../ui/blur-text-reveal';
import MagneticButton from '../ui/magnetic-button';

type TabType = 'AI Models' | 'Embeddings' | 'Vector Stores' | 'Datasets' | 'Function Tools' | 'Document Parser' | 'Nav.AI Tools';

interface RegistryItem {
  id: string;
  name: string;
  type: TabType;
  description: string;
  status: 'active' | 'config_required' | 'deploying';
  icon: React.ReactNode;
}

const PREMIUM_SPRING = { type: "spring", stiffness: 120, damping: 20, mass: 0.5 } as const;

const TABS: TabType[] = [
  'AI Models', 
  'Embeddings', 
  'Vector Stores', 
  'Datasets', 
  'Function Tools', 
  'Document Parser', 
  'Nav.AI Tools'
];

const INITIAL_DATA: RegistryItem[] = [
  {
    id: 'mod-01',
    name: 'GPT-4o on Azure',
    type: 'AI Models',
    description: 'Context: 128k | Region: East-US',
    status: 'active',
    icon: <Brain className="w-5 h-5 text-brand-cyan" />
  },
  {
    id: 'mod-02',
    name: 'Gemini 1.5 Flash',
    type: 'AI Models',
    description: 'Context: 1M | Region: Global',
    status: 'active',
    icon: <Brain className="w-5 h-5 text-brand-violet" />
  },
  {
    id: 'mod-03',
    name: 'Llama 3 70B (Local)',
    type: 'AI Models',
    description: 'Quantization: 4bit | GPU: A100',
    status: 'config_required',
    icon: <Brain className="w-5 h-5 text-orange-400" />
  },
  {
    id: 'vec-01',
    name: 'Corporate Knowledge',
    type: 'Vector Stores',
    description: 'Pinecone | Dim: 1536',
    status: 'active',
    icon: <Database className="w-5 h-5 text-green-400" />
  }
];

const TheRegistry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('AI Models');
  const [items, setItems] = useState<RegistryItem[]>(INITIAL_DATA);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [simulatedInput, setSimulatedInput] = useState("");
  
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: contentRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (!isSimulating) return;

    let timeout: NodeJS.Timeout;
    const runSimulation = async () => {
      await wait(2000);
      
      setActiveTab('Vector Stores');
      await wait(1500);

      setIsDrawerOpen(true);
      await wait(1000);

      const targetText = "sk-pinecone-prod-8921...";
      for (let i = 0; i <= targetText.length; i++) {
        setSimulatedInput(targetText.slice(0, i));
        await wait(50 + Math.random() * 50);
      }
      await wait(800);

      setIsDrawerOpen(false);
      setItems(prev => [
        ...prev, 
        {
          id: `vec-${Date.now()}`,
          name: 'Legal Docs Index',
          type: 'Vector Stores',
          description: 'Pinecone | Dim: 1536',
          status: 'deploying',
          icon: <Database className="w-5 h-5 text-brand-cyan" />
        }
      ]);
      setSimulatedInput("");

      await wait(2000);
      setItems(prev => prev.map(item => item.status === 'deploying' ? { ...item, status: 'active' } : item));

      await wait(4000);
      setItems(INITIAL_DATA);
      setActiveTab('AI Models');
      runSimulation();
    };

    runSimulation();
    return () => clearTimeout(timeout);
  }, [isSimulating]);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const filteredItems = items.filter(i => i.type === activeTab);

  return (
    <div className="w-full h-[600px] bg-[#0B1121] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden relative group isolate">
      
      <div className="p-6 border-b border-white/10 bg-[#020617] z-20 relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-1">The Centralized AI Refinery</h3>
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-wide">
              <BlurTextReveal text="A unified catalog to manage your organization's AI assets. Define standard agents, tools, and prompts once." />
            </div>
          </div>
          
          <MagneticButton onClick={() => setIsDrawerOpen(true)} className="group">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isDrawerOpen ? 'bg-brand-cyan text-brand-navy shadow-[0_0_20px_#22D3EE]' : 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/50 group-hover:bg-brand-cyan group-hover:text-brand-navy'}`}>
              <Plus className="w-4 h-4" />
              <span className="text-sm font-bold">Create</span>
            </div>
          </MagneticButton>
        </div>

        <div className="w-full h-10 bg-white/5 rounded-lg border border-white/5 flex items-center px-4 mb-6 transition-colors focus-within:border-white/20">
           <Search className="w-4 h-4 text-neutral-500 mr-3" />
           <div className="text-sm text-neutral-600 font-mono">Search Workspaces, Agents, Super Agents...</div>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide border-b border-white/5">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative whitespace-nowrap text-sm font-mono font-medium transition-colors pb-3 px-1 outline-none ${
                activeTab === tab ? 'text-brand-cyan' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-cyan shadow-[0_0_10px_#22D3EE]"
                  transition={PREMIUM_SPRING}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div ref={contentRef} className="flex-1 bg-[#0B1121] p-6 overflow-y-auto relative z-10 custom-scrollbar">
         
         <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 w-full h-[200%] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"
         />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    transition={PREMIUM_SPRING}
                  >
                    <SpotlightCard className="h-full p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="p-2 rounded bg-black/40 border border-white/5 text-neutral-300 group-hover:text-brand-cyan transition-colors">
                            {item.icon}
                          </div>
                          <button className="text-neutral-600 hover:text-white transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <h4 className="text-white font-bold mb-1">{item.name}</h4>
                        <p className="text-xs text-neutral-500 font-mono mb-4">{item.description}</p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                          {item.status === 'deploying' ? (
                            <div className="flex items-center gap-2 text-xs font-mono text-yellow-500">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>Deploying...</span>
                            </div>
                          ) : item.status === 'active' ? (
                            <div className="flex items-center gap-2 text-xs font-mono text-green-500">
                                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></div>
                                <span>Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span>Config Req</span>
                            </div>
                          )}
                        </div>
                    </SpotlightCard>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full flex flex-col items-center justify-center h-40 text-neutral-600"
                >
                  <Grid className="w-8 h-8 mb-2 opacity-20" />
                  <span className="text-xs font-mono">No modules found. Create one.</span>
                </motion.div>
              )}
            </AnimatePresence>
         </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={PREMIUM_SPRING}
            className="absolute top-0 right-0 w-full md:w-[350px] h-full bg-[#0F172A] border-l border-white/10 shadow-2xl z-30 flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#020617]">
               <h4 className="font-bold text-white">New Vector Store</h4>
               <div className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider">Config</div>
            </div>
            
            <div className="p-6 space-y-6 flex-1 bg-[#0F172A]">
               <div className="space-y-2">
                 <label className="text-xs font-mono text-neutral-400 uppercase">Provider</label>
                 <div className="w-full p-3 bg-black/30 border border-white/10 rounded text-sm text-white flex items-center justify-between">
                    <span>Pinecone</span>
                    <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-mono text-neutral-400 uppercase">API Key</label>
                 <div className="w-full h-10 bg-black/30 border border-white/10 rounded flex items-center px-3 text-sm font-mono text-green-400 relative overflow-hidden">
                    {simulatedInput}
                    <span className="w-0.5 h-4 bg-green-500 ml-1 animate-pulse"></span>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label className="text-xs font-mono text-neutral-400 uppercase">Index Name</label>
                 <div className="w-full h-10 bg-black/30 border border-white/10 rounded flex items-center px-3 text-sm text-neutral-500">
                    legal-docs-v1
                 </div>
               </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-[#020617]">
               <button className="w-full py-3 bg-brand-cyan text-brand-navy font-bold rounded hover:bg-white transition-colors flex items-center justify-center gap-2">
                  {simulatedInput.length > 10 ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>{simulatedInput.length > 10 ? "Validating..." : "Add Module"}</span>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent pointer-events-none opacity-50 z-20"></div>
    </div>
  );
};

export default TheRegistry;
