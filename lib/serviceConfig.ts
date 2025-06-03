import React from "react";
import { Deployment, ServiceType } from "@/lib/types";
import { NotebookEnvironmentSection } from "@/components/deployments/sections/NotebookEnvironmentSection";
import { InstanceLogsSection } from "@/components/deployments/sections/InstanceLogsSection";

export interface SectionProps {
  deployment: Deployment;
}

export interface SectionConfig {
  key: string;
  name: string;
  component: React.ComponentType<SectionProps>;
}

export interface ServiceConfig {
  name: string;
  description: string;
  // Basic sections that are handled in the main page
  basicSections: {
    status: boolean;
    timestamps: boolean;
    appUrl: boolean;
    configuration: boolean;
    liveMetrics: boolean;
  };
  // Custom sections with actual components
  customSections: SectionConfig[];
}

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  BACKEND: {
    name: "Backend Service",
    description: "Node.js, Flask, or Go backends with monitoring",
    basicSections: {
      status: true,
      timestamps: true,
      appUrl: true,
      configuration: true,
      liveMetrics: true,
    },
    customSections: [
      { key: 'instanceLogs', name: 'Instance Logs', component: InstanceLogsSection },
    ],
  },
  JUPYTER: {
    name: "Jupyter Notebook",
    description: "Interactive computing environment",
    basicSections: {
      status: true,
      timestamps: true,
      appUrl: true,
      configuration: true,
      liveMetrics: false,
    },
    customSections: [
      { key: 'notebookEnvironment', name: 'Notebook Environment', component: NotebookEnvironmentSection },
    ],
  },
  AI_MODEL: {
    name: "AI Model Endpoint",
    description: "LLaMA, Whisper, SDXL API endpoints",
    basicSections: {
      status: true,
      timestamps: true,
      appUrl: true,
      configuration: true,
      liveMetrics: false,
    },
    customSections: [
      { key: 'instanceLogs', name: 'Instance Logs', component: InstanceLogsSection },
    ],
  },
  CUSTOM_VM: {
    name: "Custom VM",
    description: "Orchestrated VM with GPU for advanced compute",
    basicSections: {
      status: true,
      timestamps: true,
      appUrl: false,
      configuration: true,
      liveMetrics: true,
    },
    customSections: [
      { key: 'instanceLogs', name: 'Instance Logs', component: InstanceLogsSection },
    ],
  },
};

// Service type mapping for different naming conventions
const SERVICE_TYPE_MAPPING: Record<string, string> = {
  BACKEND: ServiceType.BACKEND,
  JUPYTER: ServiceType.JUPYTER, 
  CONTAINER_VM: ServiceType.CONTAINER_VM,
  AI_MODEL: ServiceType.AI_MODEL,
  backend: ServiceType.BACKEND,
  jupyter: ServiceType.JUPYTER,
  ai_model: ServiceType.AI_MODEL,
  container_vm: ServiceType.CONTAINER_VM,
};

// Main API functions
export function getServiceConfig(serviceType: string): ServiceConfig {
  const normalizedType = serviceType?.toUpperCase();
  const mappedType = SERVICE_TYPE_MAPPING[normalizedType] || normalizedType;
  const config = SERVICE_CONFIGS[mappedType];
  
  if (!config) {
    // Return default config for unknown service types
    return {
      name: "Unknown Service",
      description: "Service type not recognized",
      basicSections: {
        status: true,
        timestamps: true,
        appUrl: false,
        configuration: true,
        liveMetrics: false,
      },
      customSections: [
        { key: 'instanceLogs', name: 'Instance Logs', component: InstanceLogsSection },
      ],
    };
  }
  
  return config;
}

export function isBasicSectionEnabled(serviceType: string, sectionKey: keyof ServiceConfig['basicSections']): boolean {
  const config = getServiceConfig(serviceType);
  return config.basicSections[sectionKey];
}

export function getCustomSections(serviceType: string): SectionConfig[] {
  const config = getServiceConfig(serviceType);
  return config.customSections;
}

// Legacy compatibility functions
export function shouldShowMonitoring(serviceType: string): boolean {
  return isBasicSectionEnabled(serviceType, 'liveMetrics');
}

export function shouldShowLogs(serviceType: string): boolean {
  const customSections = getCustomSections(serviceType);
  return customSections.some(section => section.key === 'instanceLogs');
} 