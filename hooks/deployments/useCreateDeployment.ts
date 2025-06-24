import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deploymentKeys } from "./useDeployments";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateDeploymentSchemaType } from "@/lib/schemas/deployment";
import { createDeploymentNew } from "@/hooks/service";

export function useCreateDeployment(redirectPath?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateDeploymentSchemaType) => createDeploymentNew(data),
    onSuccess: (response) => {
      toast.success("Deployment created successfully", {
        description: `Your deployment has been created successfully. ${response.appUrl ? `App URL: ${response.appUrl}` : ""} ${response.leaseId ? `Lease ID: ${response.leaseId}` : ""}`,
      });

      queryClient.invalidateQueries({ queryKey: deploymentKeys.lists() });

      if (redirectPath) {
        router.push(redirectPath);
      }
    },
    onError: (error) => {
      toast.error("Failed to create deployment", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    },
  });
}
