import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserDeployments,
  getDeploymentById,
  closeDeployment,
  getUserDeploymentsByType,
} from "@/hooks/endpoints";
import { getDepLogs } from "@/lib/getlogs";
import { ServiceType, ProviderType } from "@/lib/types";
import { toast } from "sonner";

// Query key factory
export const deploymentKeys = {
  all: ["deployments"] as const,
  lists: () => [...deploymentKeys.all, "list"] as const,
  list: (filters: {
    user: string;
    type?: ServiceType;
    provider?: ProviderType;
  }) => [...deploymentKeys.lists(), filters] as const,
  details: () => [...deploymentKeys.all, "detail"] as const,
  detail: (id: number) => [...deploymentKeys.details(), id] as const,
  logs: () => [...deploymentKeys.all, "logs"] as const,
  log: (id: number) => [...deploymentKeys.logs(), id] as const,
};

// Get all deployments for a user
export function useDeployments(
  user: string,
  type?: ServiceType,
  provider?: ProviderType
) {
  return useQuery({
    queryKey: deploymentKeys.list({ user, type, provider }),
    queryFn: () => getUserDeployments(user, type, provider),
    enabled: !!user,
  });
}

// Get deployments by type
export function useDeploymentsByType(
  userId: string,
  type: string,
  provider?: ProviderType
) {
  return useQuery({
    queryKey: [...deploymentKeys.lists(), { userId, type, provider }],
    queryFn: () => getUserDeploymentsByType(userId, type, provider),
    enabled: !!userId && !!type,
  });
}

// Get a single deployment by ID
export function useDeployment(deploymentId: number) {
  return useQuery({
    queryKey: deploymentKeys.detail(deploymentId),
    queryFn: () => getDeploymentById(deploymentId),
    enabled: !!deploymentId,
  });
}

// Close a deployment (mutation)
export function useCloseDeployment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: closeDeployment,
    onSuccess: (_, deploymentId) => {
      toast.success("Deployment closed successfully");

      // Invalidate and refetch deployments lists
      queryClient.invalidateQueries({ queryKey: deploymentKeys.lists() });

      // invalidate the specific deployment detail if it exists in cache
      queryClient.invalidateQueries({
        queryKey: deploymentKeys.detail(deploymentId),
      });
    },
    onError: (error) => {
      toast.error("Failed to close deployment", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    },
  });
}

// Fetch deployment logs
export const useDeploymentLogs = (leaseId: number) => {
  return useQuery({
    queryKey: deploymentKeys.log(leaseId),
    queryFn: () => getDepLogs(leaseId.toString()),
    enabled: !!leaseId,
    refetchInterval: 5000, // Auto-refresh logs every 5 seconds
  });
};
