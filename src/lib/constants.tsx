
import React from 'react';
import { Cpu, Users, GitMerge, Eye } from 'lucide-react';
import { AgentFeature, EcosystemItem } from './types';

export const AGENT_FEATURES: AgentFeature[] = [
  {
    id: 1,
    title: "AGENTS",
    description: "Configurable prompts, reasoning, and personalities. They don't just talk; they execute code and call APIs.",
    iconType: 'cpu'
  },
  {
    id: 2,
    title: "SUPER AGENTS",
    description: "The Managers. They delegate tasks, route queries, and enforce policy constraints across your AI team.",
    iconType: 'users'
  },
  {
    id: 3,
    title: "FUNCTION TOOLS",
    description: "Extend Intelligence. Equip agents with secure, deterministic access to external APIs, proprietary databases, and real-time environments.",
    iconType: 'workflow'
  },
  {
    id: 4,
    title: "OBSERVABILITY",
    description: "Complete transparency. Trace every thought, tool call, and hallucination check in real-time.",
    iconType: 'eye'
  }
];

export const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  {
    id: 1,
    title: "VECTOR STORE",
    subtitle: "Knowledge Base",
    description: "Semantic search and RAG pipeline integration.",
    tags: ["Pinecone", "Weaviate", "Chroma"]
  },
  {
    id: 2,
    title: "FILE STORE",
    subtitle: "Secure Data",
    description: "Enterprise-grade encrypted storage for PDFs, CSVs.",
    tags: ["AES-256", "SOC2", "HIPAA"]
  },
  {
    id: 3,
    title: "LLM AGNOSTIC",
    subtitle: "Model Switcher",
    description: "Swap between GPT-4, Claude, and Gemini instantly.",
    tags: ["OpenAI", "Anthropic", "Google"]
  },
  {
    id: 4,
    title: "GOVERNANCE",
    subtitle: "Control Layer",
    description: "PII Redaction, Audit Logs, and RBAC built-in.",
    tags: ["Compliance", "Audit", "Security"]
  }
];

export const getIcon = (type: string, className?: string) => {
  switch (type) {
    case 'cpu': return <Cpu className={className} />;
    case 'users': return <Users className={className} />;
    case 'workflow': return <GitMerge className={className} />;
    case 'eye': return <Eye className={className} />;
    default: return <Cpu className={className} />;
  }
};
