import { ReactNode } from "react";
import { Unit } from "@/constants/constrains";

export type { Unit };

/**
 * Standard interface for deployment options used across all services
 */
export interface DeploymentOption {
  title: string;
  description: string;
  icon: ReactNode;
  resources: string[];
  free?: boolean;
}

/**
 * Standard interface for resource value options used across all services
 */
export interface ResourceValueOptions {
  appCpuUnits: string;
  appMemorySize: number;
  memoryUnit: Unit;
  appStorageSize: number;
  storageUnit: Unit;
  deploymentDuration: number; // In hours
  runCommands: string | undefined;
}

/**
 * Standard interface for deployment configuration used across all services
 */
export interface DeploymentResourceConfig {
  appCpuUnits: number;
  appMemorySize: string;
  appStorageSize: string;
  deploymentDuration: string;
} 