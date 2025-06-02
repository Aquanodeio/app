import { useRouter } from "next/navigation";
import { getProviderFromEnv } from "@/lib/utils";
import { ServiceType } from "@/lib/types";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { toast } from "sonner";

export interface User {
  id: string;
}

export interface TemplateDetails {
  [key: string]: string;
}

interface UseTemplateDeployProps {
  templateDetails: TemplateDetails;
  user: User | null;
  isAuthLoading: boolean;
}

export function useTemplateDeploy({
  templateDetails,
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

    const config = {
      serviceType: ServiceType.BACKEND,
      image: templateDetails["Image"],
      deploymentDuration: templateDetails["Deployment Duration"],
      appCpuUnits: Number(templateDetails["CPU Units"]),
      appMemorySize: templateDetails["Memory Size"],
      appStorageSize: templateDetails["Storage Size"],
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
    isButtonDisabled: isAuthLoading || !user?.id || isDeploying,
  };
}
