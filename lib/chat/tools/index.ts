import { 
  deployApplicationTool, 
  deployJupyterTool, 
  deployVMTool, 
  deployInferenceTool 
} from "./deployment";
import { 
  getDeploymentStatusTool, 
  listDeploymentsTool, 
  getResourcePricingTool 
} from "./management";

export const createChatTools = (authToken?: string) => ({
  deployApplication: deployApplicationTool(authToken),
  deployJupyter: deployJupyterTool(authToken),
  deployVM: deployVMTool(authToken),
  deployInference: deployInferenceTool(authToken),
  getDeploymentStatus: getDeploymentStatusTool(authToken),
  listDeployments: listDeploymentsTool(authToken),
  getResourcePricing: getResourcePricingTool(),
}); 