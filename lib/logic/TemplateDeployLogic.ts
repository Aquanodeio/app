import { useRouter } from "next/navigation";
import { getProviderFromEnv } from "@/lib/utils";
import { ServiceType } from "@/lib/types";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { toast } from "sonner";
import { Template } from "@/components/List";

export interface User {
  id: string;
}

interface UseTemplateDeployProps {
  template: Template | null;
  user: User | null;
  isAuthLoading: boolean;
}

export function useTemplateDeploy({
  template,
  user,
  isAuthLoading,
}: UseTemplateDeployProps) {
  const router = useRouter();

  const { mutate: createDeployment, isPending: isDeploying } =
    useCreateDeployment("/app/dashboard");

  const handleDeploy = async () => {
    if (!user?.id) {
      toast.error(
        "Authentication Required. Please sign in to deploy a template."
      );
      return;
    }

    if (!template) {
      toast.error("Template not found.");
      return;
    }

    const config = {
      serviceType: ServiceType.BACKEND,
      image: template.image,
      deploymentDuration: template.config.deploymentDuration,
      appPort: Number(template.config.appPort),
      appCpuUnits: Number(template.config.cpuUnits),
      appMemorySize: template.config.memorySize,
      appStorageSize: template.config.storageSize,
      allowAutoscale: false,
      disablePull: false,
    };

    createDeployment(
      {
        service: "BACKEND",
        tier: "DEFAULT",
        provider: getProviderFromEnv(),
        config,
      },
      {
        onError: (error) => {
          console.error("Error deploying template:", error);
          toast.error("Failed to deploy template. Please try again.");
        },
        onSuccess: () => {
          toast.success("Template deployed successfully!");
          router.push("/app/dashboard");
        },
      }
    );
  };

  return {
    isDeploying,
    handleDeploy,
    isButtonDisabled: isAuthLoading || !user?.id || isDeploying || !template,
  };
}
