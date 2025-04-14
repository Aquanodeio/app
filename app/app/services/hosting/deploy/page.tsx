"use client";

import { useState } from "react";
import { DeployCustomBackendRequest, ProviderType } from "@/services/types";
import { useAuth } from "@/lib/auth/AuthContext";
import { Database, Layers } from "lucide-react";
import {
  CPU_CONSTRAINTS,
  MEMORY_CONSTRAINTS,
  DURATION_CONSTRAINTS,
  ENVIRONMENT_VARS_DEFAULT,
} from "@/constants/constrains";
import { ResourceValueOptions } from "@/components/services/common/interfaces";
import ResourceSettingSection from "@/components/services/common/ResourceSettingSection";
import SourceControlSection from "@/components/services/hosting/SourceControlSection";
import EnviromentVariableSection from "@/components/services/hosting/EnviromentVariableSection";
import { useCreateDeployment } from "@/hooks/queries/useCreateDeployment";
import ServiceDeployForm from "@/components/services/common/ServiceDeployForm";
import DefaultResourceView from "@/components/services/common/DefaultResourceView";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProviderFromEnv } from "@/lib/utils";

export default function CustomServiceDeployment() {
  const { user } = useAuth();
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [branchName, setBranchName] = useState<string>("main");
  const [portNumber, setPortNumber] = useState<number>(3000);
  const [envVarsJson, setEnvVarsJson] = useState<string>(ENVIRONMENT_VARS_DEFAULT);
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>(getProviderFromEnv());

  const [values, setValues] = useState<ResourceValueOptions>({
    cpuValue: String(CPU_CONSTRAINTS.DEFAULT),
    memoryValue: MEMORY_CONSTRAINTS.DEFAULT_MI,
    memoryUnit: "Mi",
    ephemeralValue: 1,
    ephemeralUnit: "Gi",
    deploymentDuration: DURATION_CONSTRAINTS.DEFAULT_HOURS,
  });

  const { mutate: createDeployment, isPending: isLoading } = useCreateDeployment("/app/services/custom");

  if (!user?.id) {
    return (
      <div className="dashboard-card text-center py-8 sm:py-12 px-4 sm:px-6">
        <p className="text-base sm:text-lg mb-4">
          Please sign in to deploy custom services
        </p>
        <Button variant="outline" className="hover-effect mt-2">
          Sign In
        </Button>
      </div>
    );
  }

  const handleDefaultDeploy = (provider: ProviderType) => {
    setSelectedProvider(provider);
    createDeployment({
      provider: provider,
      service: "BACKEND",
      tier: "DEFAULT",
      userId: 2,
    });
  };

  const handleCustomDeploy = (provider: ProviderType) => {
    // Calculate the duration
    const duration = `${values.deploymentDuration}h`;

    // Format memory and storage size
    const memorySize = `${values.memoryValue}${values.memoryUnit}`;
    const storageSize = `${values.ephemeralValue}${values.ephemeralUnit}`;

    // Parse environment variables
    let env = {};
    try {
      env = JSON.parse(envVarsJson);
    } catch (e) {
      console.error("Invalid JSON for environment variables");
    }

    const data: DeployCustomBackendRequest = {
      config: {
        appCpuUnits: Number(values.cpuValue),
        appMemorySize: memorySize,
        appStorageSize: storageSize,
        deploymentDuration: duration,
        appPort: portNumber,
      },
      provider: provider,
      repoUrl,
      branchName,
      env,
      userId: "2",
    };

    createDeployment({
      provider: provider,
      service: "BACKEND",
      tier: "CUSTOM",
      userId: 2,
      config: data,
    });
  };

  const deploymentOptions = [
    {
      title: "Default Deployment",
      description: "Quick deployment with standard resources",
      resources: ["CPU: 1 unit", "Memory: 1Gi", "Storage: 1Gi", "Duration: 1h"],
      free: true,
      icon: <Database className="h-5 w-5" />,
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

  const defaultResources = [
    { label: "CPU", value: "1 Unit" },
    { label: "Memory", value: "1 Gi" },
    { label: "Storage", value: "1 Gi" },
    { label: "Duration", value: "1 Hours" },
  ];

  const customResourceView = (
    <Tabs defaultValue="resources" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="source">Source Control</TabsTrigger>
        <TabsTrigger value="environment">Environment</TabsTrigger>
      </TabsList>
      <TabsContent value="resources">
        <ResourceSettingSection values={values} setValues={setValues} />
      </TabsContent>
      <TabsContent value="source">
        <SourceControlSection 
          repoUrl={repoUrl} 
          setRepoUrl={setRepoUrl}
          branchName={branchName}
          setBranchName={setBranchName}
          portNumber={portNumber}
          setPortNumber={setPortNumber}
        />
      </TabsContent>
      <TabsContent value="environment">
        <EnviromentVariableSection
          envVarsJson={envVarsJson}
          setEnvVarsJson={setEnvVarsJson}
        />
      </TabsContent>
    </Tabs>
  );

  return (
    <ServiceDeployForm
      title="Custom Service Deployment"
      description="Deploy a custom service with your preferred configuration"
      deploymentOptions={deploymentOptions}
      defaultResourceView={<DefaultResourceView resources={defaultResources} />}
      customResourceView={customResourceView}
      onDefaultDeploy={handleDefaultDeploy}
      onCustomDeploy={() => handleCustomDeploy(selectedProvider)}
      isLoading={isLoading}
    />
  );
} 