export enum ProviderType {
  AKASH = "akash",
  SPHERON = "spheron",
  AUTO = "auto",
}

export enum DeploymentTier {
  DEFAULT = "DEFAULT",
  CUSTOM = "CUSTOM",
}

export enum SpheronDeploymentMode {
  PROVIDER = "provider",
  FIZZ = "fizz",
}

export interface DeploymentResult {
  message: string;
  appUrl: string;
  leaseId: string;
  provider: string;
  token?: string;
  accessUrl?: string;
}

export interface DeploymentInfo {
  id: string;
  status: string;
  timestamp: string;
  details?: Record<string, any>;
}


// Jupyter Service Types
export interface DeployDefaultJupyterRequest {
  provider?: ProviderType;
}

export interface DeployCustomJupyterRequest {
  cpuUnits: number;
  memorySize: string;
  storageSize: string;
  duration: string;
  image?: string;
  provider?: ProviderType;
}

// Backend Service Types
export interface DeployDefaultBackendRequest {
  userId: string;
  repoUrl?: string;
  branchName?: string;
  env?: Record<string, string>;
  config: {
    appPort: number;
    deploymentDuration?: string;
    appCpuUnits?: number;
    appMemorySize?: string;
    appStorageSize?: string;
    runCommands?: string;
  };
  provider?: ProviderType;
}

export interface DeployCustomBackendRequest {
  userId: string;
  repoUrl?: string;
  branchName?: string;
  env?: Record<string, string>;
  config: DeploymentConfig;
  provider?: ProviderType;
}

export interface DeploymentConfig {
  serviceType: ServiceType;
  appCpuUnits?: number;
  appMemorySize?: string;
  appPort?: number;
  appStorageSize?: string;
  deploymentDuration?: string;
  image?: string;
  repoUrl?: string | undefined;
  branchName?: string;
  env?: Record<string, string>;
  runCommands?: string;
  spheronDeploymentMode?: SpheronDeploymentMode;
}
export interface EnvironmentVars {
  [key: string]: string;
}

export interface DeploymentResponse {
  status: string;
  deploymentId?: string;
  url?: string;
}


export enum ServiceType {
  JUPYTER = "JUPYTER",
  BACKEND = "BACKEND",
}

export interface Deployment {
  deploymentId: string;
  appUrl: string | null;
  createdAt: string;
  provider: string;
  serviceType: string;
  image: string;
  cpu: number;
  memory: string;
  storage: string;
  duration: string;
  leaseId: string;
}

export interface GetDeploymentsResponse {
  userId: string;
  deployments: Deployment[];
}

export interface GetDeploymentsRequest {
  user: string;
  type?: ServiceType | null;
  provider?: ProviderType | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface ChatResponse {
  text: string;
  error?: string;
}
