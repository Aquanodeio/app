import { useRouter } from "next/navigation";
import { getProviderFromEnv } from "@/lib/utils";
import { ProviderType, ServiceType } from "@/lib/types";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { toast } from "sonner";

export interface User {
  id: string;
}

interface UseLaunchablesDeployProps {
  repository: string;
  user: User | null;
  isAuthLoading: boolean;
  config?: any;
}

export function useLaunchablesDeploy({
  repository,
  user,
  isAuthLoading,
  config,
}: UseLaunchablesDeployProps) {
  const router = useRouter();

  const { mutate: createDeployment, isPending: isDeploying } =
    useCreateDeployment("/app/deployments");

  const handleDeploy = async () => {
    if (!user?.id) {
      toast.error(
        "Authentication Required. Please sign in to deploy a launchable."
      );
      return;
    }

    if (!repository) {
      toast.error("Launchable not found.");
      return;
    }

    // For basic templates, we need different handling
    const configArg = config ? config : {
      serviceType: ServiceType.BACKEND,
      image: repository,
      deploymentDuration: "1h",
      appPort: 22,
      appCpuUnits: 1,
      appMemorySize: "2Gi",
      appStorageSize: "10Gi",
      allowAutoscale: false,
      disablePull: false,
    };

    createDeployment(
      {
        service: "BACKEND",
        tier: "CUSTOM",
        provider: ProviderType.SPHERON,
        config: configArg,
      },
      {
        onError: (error) => {
          console.error("Error deploying template:", error);
          toast.error("Failed to deploy template. Please try again.");
        },
        onSuccess: () => {
          toast.success("Template deployed successfully!");
          router.push("/app/deployments");
        },
      }
    );
  };

  return {
    isDeploying,
    handleDeploy, 
    isButtonDisabled: isAuthLoading || !user?.id || isDeploying || !repository,
  };
}
