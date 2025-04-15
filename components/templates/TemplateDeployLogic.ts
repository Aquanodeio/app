import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getProviderFromEnv } from "@/lib/utils";
import { ServiceType } from "@/lib/types";
import { TemplateDetails } from "./TemplateDetailsCard";
import { useCreateDeployment } from "@/hooks/api/useCreateDeployment";

export interface User {
  id: string;
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
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);
  const { mutate: createDeployment } = useCreateDeployment("/app/dashboard");

  const handleDeploy = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to deploy a template.",
        variant: "destructive",
      });
      return;
    }

    setIsDeploying(true);
    try {
      const config = {
        serviceType: ServiceType.BACKEND,
        repoUrl: templateDetails["Repository URL"],
        branchName: templateDetails["Branch Name"],
        env: {},
        appPort: Number(templateDetails["App Port"]),
        deploymentDuration: templateDetails["Deployment Duration"],
        appCpuUnits: Number(templateDetails["CPU Units"]),
        appMemorySize: templateDetails["Memory Size"],
        appStorageSize: templateDetails["Storage Size"],
        runCommands: templateDetails["Run Commands"] || "",
      };

      createDeployment({
        service: "BACKEND",
        tier: "DEFAULT",
        provider: getProviderFromEnv(),
        config
      });

      toast({
        title: "Success",
        description: "Template deployed successfully!",
        variant: "default",
      });

      router.push("/app/dashboard");
    } catch (error) {
      console.error("Error deploying template:", error);
      toast({
        title: "Error",
        description: "Failed to deploy template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return {
    isDeploying,
    handleDeploy,
    isButtonDisabled: isAuthLoading || !user?.id || isDeploying,
  };
}
