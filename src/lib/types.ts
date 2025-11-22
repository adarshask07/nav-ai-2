
export interface AgentFeature {
  id: number;
  title: string;
  description: string;
  iconType: 'cpu' | 'users' | 'workflow' | 'eye';
}

export interface EcosystemItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}
