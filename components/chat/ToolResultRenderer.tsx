import { DeploymentResultCard } from "./DeploymentResultCard";
import { DeploymentListCard } from "./DeploymentListCard";
import { PricingCard } from "./PricingCard";
import { DeploymentStatusCard } from "./DeploymentStatusCard";

interface ToolResultRendererProps {
  toolInvocation: any;
}

export const ToolResultRenderer = ({ toolInvocation }: ToolResultRendererProps) => {
  if (toolInvocation.state !== 'result') return null;

  const result = toolInvocation.result;

  switch (toolInvocation.toolName) {
    case 'deployApplication':
    case 'deployJupyter':
    case 'deployVM':
    case 'deployInference':
      return <DeploymentResultCard result={result} />;
    
    case 'listDeployments':
      return <DeploymentListCard list={result} />;
    
    case 'getResourcePricing':
      return <PricingCard pricing={result} />;
    
    case 'getDeploymentStatus':
      return <DeploymentStatusCard result={result} />;

    default:
      return null;
  }
}; 