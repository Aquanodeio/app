import React from "react";
import { DeploymentOption, DeploymentResourceConfig, ResourceValueOptions } from "./interfaces";
import { Layers, Server } from "lucide-react";
import {
  CPU_CONSTRAINTS,
  MEMORY_CONSTRAINTS,
  DURATION_CONSTRAINTS,
} from "@/constants/constrains";

/**
 * Creates default deployment options for a service
 * @param resourceSpecs - Array of resource specification strings for the default deployment
 * @param isFree - Whether the default option is free
 * @returns Array of deployment options
 */
export const createDeploymentOptions = (
  resourceSpecs: string[] = ["CPU: 1 unit", "Memory: 1Gi", "Storage: 1Gi", "Duration: 1h"],
  isFree: boolean = true
): DeploymentOption[] => {
  return [
    {
      title: "Default Deployment",
      description: "Quick deployment with standard resources",
      resources: resourceSpecs,
      free: isFree,
      icon: <Server className="h-5 w-5" />,
    },
    {
      title: "Custom Deployment",
      description: "Configure your own resources",
      resources: [
        "Customizable CPU",
        "Adjustable memory",
        "Configurable storage",
        "Flexible duration",
      ],
      free: false,
      icon: <Layers className="h-5 w-5" />,
    },
  ];
};

/**
 * Creates default resource values for a service
 * @param ephemeralValue - Default ephemeral storage value
 * @returns Default resource values
 */
export const createDefaultResourceValues = (ephemeralValue: number = 1): ResourceValueOptions => {
  return {
    appCpuUnits: String(CPU_CONSTRAINTS.DEFAULT),
    appMemorySize: MEMORY_CONSTRAINTS.DEFAULT_MI,
    memoryUnit: "Mi",
    appStorageSize: ephemeralValue,
    storageUnit: "Gi",
    deploymentDuration: DURATION_CONSTRAINTS.DEFAULT_HOURS,
  };
};

/**
 * Creates a resource configuration object from resource values
 * @param values - Resource values
 * @returns Resource configuration
 */
export const createResourceConfig = (values: ResourceValueOptions): DeploymentResourceConfig => {
  return {
    appCpuUnits: Number(values.appCpuUnits),
    appMemorySize: `${values.appMemorySize}${values.memoryUnit}`,
    appStorageSize: `${values.appStorageSize}${values.storageUnit}`,
    deploymentDuration: `${values.deploymentDuration}h`,
  };
};

/**
 * Creates a default resource configuration
 * @param storageSize - Default storage size
 * @returns Default resource configuration
 */
export const createDefaultResourceConfig = (storageSize: string = "1Gi"): DeploymentResourceConfig => {
  return {
    appCpuUnits: Number(CPU_CONSTRAINTS.DEFAULT),
    appMemorySize: `${MEMORY_CONSTRAINTS.DEFAULT_MI}Mi`,
    appStorageSize: storageSize,
    deploymentDuration: `${DURATION_CONSTRAINTS.DEFAULT_HOURS}h`,
  };
}; 