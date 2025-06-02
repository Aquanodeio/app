import { useRouter } from "next/navigation";
import { getProviderFromEnv } from "@/lib/utils";
import { ServiceType } from "@/lib/types";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { toast } from "sonner";
import { Example } from "@/components/List";

export interface User {
  id: string;
}

interface UseExampleDeployProps {
  example: Example | null;
  user: User | null;
  isAuthLoading: boolean;
}

export function useExampleDeploy({
  example,
  user,
  isAuthLoading,
}: UseExampleDeployProps) {
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

    if (!example) {
      toast.error("Template not found.");
      return;
    }

    const config = {
      serviceType: ServiceType.BACKEND,
      image: example.config.repoUrl,
      deploymentDuration: example.config.deploymentDuration,
      appPort: Number(example.config.appPort),
      appCpuUnits: Number(example.config.cpuUnits),
      appMemorySize: example.config.memorySize,
      appStorageSize: example.config.storageSize,
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
    isButtonDisabled: isAuthLoading || !user?.id || isDeploying || !example,
  };
}
