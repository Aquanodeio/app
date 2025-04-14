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
  cpuValue: string;
  memoryValue: number;
  memoryUnit: Unit;
  ephemeralValue: number;
  ephemeralUnit: Unit;
  deploymentDuration: number; // In hours
}

/**
 * Standard interface for deployment configuration used across all services
 */
export interface DeploymentResourceConfig {
  cpuUnits: number;
  memorySize: string;
  storageSize: string;
  duration: string;
} 