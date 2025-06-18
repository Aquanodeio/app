import { tool } from "ai";
import { z } from "zod";
import { apiRequest } from "@/lib/api/client";
import { Deployment } from "@/lib/types";
import { isDeploymentActive } from "@/lib/deployment";

export const getDeploymentStatusTool = (authToken?: string) => tool({
  description: "Get the status of a deployment",
  parameters: z.object({
    deploymentId: z.string().describe("Deployment ID to check status for"),
  }),
  execute: async (params) => {
    try {
      const result = await apiRequest<any>(
        `/api/deployments/${params.deploymentId}`,
        {},
        authToken
      );

      return {
        deploymentId: params.deploymentId,
        status: result.status || "unknown",
        uptime: result.uptime || "Unknown",
        url: result.app_url || result.appUrl,
        resources: {
          cpu: `${result.cpu || "Unknown"} core${result.cpu > 1 ? "s" : ""}`,
          memory: result.memory || "Unknown",
          storage: result.storage || "Unknown",
        },
        provider: result.provider,
        createdAt: result.created_at,
      };
    } catch (error) {
      return {
        error: `Failed to get deployment status: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

export const listDeploymentsTool = (authToken?: string) => tool({
  description: "List all deployments for the current user",
  parameters: z.object({
    status: z.enum(["all", "running", "stopped", "pending"]).default("all").describe("Filter by deployment status"),
    serviceType: z.enum(["all", "BACKEND", "FRONTEND", "JUPYTER", "VMS", "MODELS"]).default("all").describe("Filter by service type"),
  }),
  execute: async (params) => {
    try {
      const result = await apiRequest<any>(`/api/deployments/user`, {
        method: "POST",
        body: JSON.stringify({
          type: params.serviceType !== "all" ? params.serviceType : null,
        }),
      }, authToken);

      let deployments: Deployment[] = result.deployments || result;
      if (params.status !== "all") {
        deployments = deployments.filter(
          (dep: any) => dep.status?.toLowerCase() === params.status.toLowerCase()
        );
      }


      console.log(deployments, "deployments");

      const transformedDeployments = deployments.map((dep) => ({
        id: dep.deploymentId,
        name: dep.deploymentId,
        serviceType: dep.deployment_type,
        status: isDeploymentActive(
          dep.createdAt,
          dep.duration
        ) ? "running" : "stopped",
        url: dep.appUrl || "",
        createdAt: dep.createdAt,
        provider: dep.provider,
        resources: {
          cpu: dep.cpu,
          memory: dep.memory,
          storage: dep.storage,
        },
      }));

      return {
        deployments: transformedDeployments,
        total: transformedDeployments.length,
      };
    } catch (error) {
      return {
        error: `Failed to list deployments: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

export const getResourcePricingTool = () => tool({
  description: "Get pricing information for different resource configurations",
  parameters: z.object({
    provider: z.enum(["akash", "spheron", "auto"]).default("auto").describe("Deployment provider"),
    duration: z.enum(["1h", "24h", "7d", "30d"]).default("24h").describe("Deployment duration"),
  }),
  execute: async (params) => {
    try {
      return {
        error: `Real-time pricing data is not yet available. Please contact support for current pricing information for ${params.provider} provider with ${params.duration} duration. Pricing varies based on network conditions and resource availability.`,
      };
    } catch (error) {
      return {
        error: `Failed to get pricing: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
}); 