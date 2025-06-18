export interface DeploymentResult {
  status: 'pending' | 'complete' | 'error';
  deploymentId?: string;
  message: string;
  config?: any;
  estimatedTime?: string;
  accessUrl?: string;
  appUrl?: string;
}

export interface DeploymentStatus {
  deploymentId: string;
  status: string;
  uptime?: string;
  url?: string;
  resources?: {
    cpu: string;
    memory: string;
    storage: string;
  };
}

export interface DeploymentList {
  deployments: Array<{
    id: string;
    name: string;
    serviceType: string;
    status: string;
    url: string;
    createdAt: string;
  }>;
  total: number;
}

export interface PricingResult {
  provider: string;
  duration: string;
  pricing: Record<string, string>;
  estimatedCost: Record<string, string>;
}

export interface SuggestedPrompt {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
  prompt: string;
  category: string;
} 