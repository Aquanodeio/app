import { tool } from "ai";
import { z } from "zod";
import { ProviderType } from "@/lib/types";
import { apiRequest } from "@/lib/api/client";
import vmsConfig from "@/lib/launchables/vms.json";

export const deployApplicationTool = (authToken?: string) => tool({
  description: "Deploy an application from a Git repository to decentralized compute infrastructure",
  parameters: z.object({
    repoUrl: z.string().describe("Git repository URL (GitHub, GitLab, etc.)"),
    branchName: z.string().default("main").describe("Git branch to deploy"),
    serviceType: z.enum(["BACKEND", "FRONTEND", "FULLSTACK"]).default("BACKEND").describe("Type of application service"),
    provider: z.enum(["akash", "spheron", "auto"]).default("auto").describe("Deployment provider"),
    cpuUnits: z.number().min(0.5).max(4).default(1).describe("CPU units (0.5-4)"),
    memorySize: z.string().default("1Gi").describe("Memory allocation (e.g., 1Gi, 2Gi)"),
    storageSize: z.string().default("1Gi").describe("Storage allocation (e.g., 1Gi, 5Gi)"),
    port: z.number().default(3000).describe("Application port"),
    duration: z.string().default("24h").describe("Deployment duration (e.g., 1h, 24h, 7d)"),
    envVars: z.record(z.string()).optional().describe("Environment variables"),
  }),
  execute: async (params) => {
    try {
      const config = {
        appPort: params.port,
        deploymentDuration: params.duration,
        appCpuUnits: params.cpuUnits,
        appMemorySize: params.memorySize,
        appStorageSize: params.storageSize,
        repoUrl: params.repoUrl,
        branchName: params.branchName,
        envVars: params.envVars || {},
        allowAutoscale: false,
        disablePull: false,
      };

      const deploymentData = {
        service: "BACKEND",
        tier: "CUSTOM",
        provider: params.provider,
        config,
      };

      const result = await apiRequest<any>("/api/deployments/deploy", {
        method: "POST",
        body: JSON.stringify(deploymentData),
      }, authToken);

      return {
        status: "pending",
        deploymentId: result.deploymentId || `dep_${Date.now()}`,
        message: `Backend deployment initiated for ${params.repoUrl}`,
        config: params,
        estimatedTime: "2-5 minutes",
        appUrl: result.appUrl,
        accessUrl: result.accessUrl,
      };
    } catch (error) {
      return {
        status: "error",
        message: `Failed to deploy application: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

export const deployJupyterTool = (authToken?: string) => tool({
  description: "Deploy a Jupyter notebook environment for data science and machine learning",
  parameters: z.object({
    provider: z.enum(["akash", "spheron", "auto"]).default("auto").describe("Deployment provider"),
    cpuUnits: z.number().min(0.5).max(4).default(2).describe("CPU units (0.5-4)"),
    memorySize: z.string().default("2Gi").describe("Memory allocation (e.g., 1Gi, 2Gi)"),
    storageSize: z.string().default("5Gi").describe("Storage allocation (e.g., 1Gi, 5Gi)"),
    duration: z.string().default("24h").describe("Deployment duration (e.g., 1h, 24h, 7d)"),
    pythonPackages: z.array(z.string()).optional().describe("Additional Python packages to install"),
  }),
  execute: async (params) => {
    try {
      const config = {
        appPort: 8888,
        deploymentDuration: params.duration,
        appCpuUnits: params.cpuUnits,
        appMemorySize: params.memorySize,
        appStorageSize: params.storageSize,
        allowAutoscale: false,
        disablePull: false,
      };

      const deploymentData = {
        service: "JUPYTER",
        tier: "CUSTOM",
        provider: params.provider,
        config,
      };

      const result = await apiRequest<any>("/api/deployments/deploy", {
        method: "POST",
        body: JSON.stringify(deploymentData),
      }, authToken);

      return {
        status: "pending",
        deploymentId: result.deploymentId || `jupyter_${Date.now()}`,
        message: "Jupyter notebook environment deployment initiated",
        config: params,
        accessUrl: result.accessUrl || result.appUrl,
        token: result.token || "password",
        estimatedTime: "2-3 minutes",
      };
    } catch (error) {
      return {
        status: "error",
        message: `Failed to deploy Jupyter: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

export const deployVMTool = (authToken?: string) => tool({
  description: "Deploy a virtual machine with custom configuration",
  parameters: z.object({
    vmType: z.enum(vmsConfig.map((vm) => vm.slug) as [string, ...string[]]).default("ubuntu-24-vm").describe("VM type/image to deploy"),
    cpuUnits: z.number().min(1).max(4).default(2).describe("CPU units (1-4)"),
    memorySize: z.string().default("2Gi").describe("Memory allocation (e.g., 1Gi, 2Gi)"),
    storageSize: z.string().default("10Gi").describe("Storage allocation (e.g., 1Gi, 20Gi)"),
    duration: z.string().default("24h").describe("Deployment duration (e.g., 1h, 24h, 7d)"),
    sshKey: z.string().optional().describe("SSH public key for access"),
  }),
  execute: async (params) => {
    try {
      const selectedVM = vmsConfig.find((vm) => vm.slug === params.vmType);
      if (!selectedVM) {
        throw new Error(`VM type ${params.vmType} not found`);
      }

      const config = {
        appPort: 22,
        deploymentDuration: params.duration,
        appCpuUnits: params.cpuUnits,
        appMemorySize: params.memorySize,
        appStorageSize: params.storageSize,
        slug: selectedVM.slug,
        allowAutoscale: false,
        disablePull: false,
        envVars: params.sshKey ? { SSH_PUBLIC_KEY: params.sshKey } : {},
      };

      const deploymentData = {
        service: "VMS",
        tier: "CUSTOM",
        provider: ProviderType.SPHERON,
        config,
      };

      const result = await apiRequest<any>("/api/deployments/deploy", {
        method: "POST",
        body: JSON.stringify(deploymentData),
      }, authToken);

      return {
        status: "pending",
        deploymentId: result.deploymentId || `vm_${Date.now()}`,
        message: `Virtual machine deployment initiated with ${selectedVM.name}`,
        config: params,
        accessUrl: result.accessUrl || result.appUrl,
        estimatedTime: "3-5 minutes",
      };
    } catch (error) {
      return {
        status: "error",
        message: `Failed to deploy VM: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

export const deployInferenceTool = (authToken?: string) => tool({
  description: "Deploy AI/ML model inference endpoints",
  parameters: z.object({
    modelType: z.enum(["llm", "vision", "audio", "custom"]).describe("Type of AI model"),
    modelName: z.string().describe('Model name or identifier (e.g., "gpt-3.5-turbo", "llama-2-7b")'),
    provider: z.enum(["akash", "spheron", "auto"]).default("auto").describe("Deployment provider"),
    cpuUnits: z.number().min(2).max(4).default(4).describe("CPU units (2-4, inference needs more compute)"),
    memorySize: z.string().default("4Gi").describe("Memory allocation (e.g., 2Gi, 8Gi)"),
    storageSize: z.string().default("10Gi").describe("Storage allocation for model weights"),
    duration: z.string().default("24h").describe("Deployment duration (e.g., 1h, 24h, 7d)"),
    gpuEnabled: z.boolean().default(false).describe("Enable GPU acceleration"),
    gpuModel: z.string().optional().describe('GPU model (e.g., "rtx4090", "a100")'),
  }),
  execute: async (params) => {
    try {
      const getModelImage = (modelType: string, modelName: string) => {
        switch (modelType) {
          case "llm":
            if (modelName.toLowerCase().includes("llama")) {
              return "ollama/ollama:latest";
            }
            return "vllm/vllm-openai:latest";
          case "vision":
            return "pytorch/pytorch:latest";
          case "audio":
            return "pytorch/pytorch:latest";
          default:
            return "python:3.9-slim";
        }
      };

      const config = {
        appPort: 8000,
        deploymentDuration: params.duration,
        appCpuUnits: params.cpuUnits,
        appMemorySize: params.memorySize,
        appStorageSize: params.storageSize,
        image: getModelImage(params.modelType, params.modelName),
        allowAutoscale: false,
        disablePull: false,
        envVars: {
          MODEL_NAME: params.modelName,
          MODEL_TYPE: params.modelType,
        },
        ...(params.gpuEnabled && {
          gpuUnits: 1,
          gpuModel: params.gpuModel || "rtx4090",
        }),
      };

      const deploymentData = {
        service: "MODELS",
        tier: "CUSTOM",
        provider: params.provider,
        config,
      };

      const result = await apiRequest<any>("/api/deployments/deploy", {
        method: "POST",
        body: JSON.stringify(deploymentData),
      }, authToken);

      return {
        status: "pending",
        deploymentId: result.deploymentId || `inference_${Date.now()}`,
        message: `AI model inference deployment initiated for ${params.modelName}`,
        config: params,
        accessUrl: result.accessUrl || result.appUrl,
        estimatedTime: "5-10 minutes",
      };
    } catch (error) {
      return {
        status: "error",
        message: `Failed to deploy inference: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
}); 