"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ProviderType } from "@/lib/types";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Layers, Server } from "lucide-react";
import {
  CPU_CONSTRAINTS,
  MEMORY_CONSTRAINTS,
  DURATION_CONSTRAINTS,
} from "@/constants/constrains";
import { toast } from "sonner";
import ResourceSettingSection from "@/components/services/common/ResourceSettingSection";
import { ResourceValueOptions } from "@/components/services/common/interfaces";
import { useCreateDeployment } from "@/hooks/api/useCreateDeployment";
import ServiceDeployPage from "@/components/services/common/ServiceDeployPage";
import DefaultResourceView from "@/components/services/common/DefaultResourceView";

export default function JupyterDeployment() {
  const { user } = useAuth();
  const { mutate: createDeployment, isPending: isLoading } =
    useCreateDeployment("/app/services/jupyter");

  // Resource settings for custom deployment
  const [values, setValues] = useState<ResourceValueOptions>({
    appCpuUnits: String(CPU_CONSTRAINTS.DEFAULT),
    appMemorySize: MEMORY_CONSTRAINTS.DEFAULT_MI,
    memoryUnit: "Mi",
    appStorageSize: 5,
    storageUnit: "Gi",
    deploymentDuration: DURATION_CONSTRAINTS.DEFAULT_HOURS,
    runCommands: null
  });
  
  // Create deployment config object
  const createConfigObject = (customValues?: ResourceValueOptions) => {
    const vals = customValues || values;
    
    // Create a config object with all required properties
    return {
      appPort: 8888, // Default Jupyter port
      deploymentDuration: `${vals.deploymentDuration}h`,
      appCpuUnits: Number(vals.appCpuUnits),
      appMemorySize: `${vals.appMemorySize}${vals.memoryUnit}`,
      appStorageSize: `${vals.appStorageSize}${vals.storageUnit}`,
      image: "", // Empty string instead of null/undefined,
      runCommands: vals.runCommands || undefined
    };
  };
  
  const userId = user?.id;

  if (!userId) {
    return (
      <div className="dashboard-card text-center py-8 sm:py-12 px-4 sm:px-6">
        <p className="text-base sm:text-lg mb-4">
          Please sign in to deploy Jupyter notebooks
        </p>
        <Button variant="outline" className="hover-effect mt-2">
          Sign In
        </Button>
      </div>
    );
  }

  const handleDefaultDeploy = (provider?: ProviderType, config?: any) => {
    if (provider) {
      // Create the complete payload for the API

      
      createDeployment({
        service: "JUPYTER",
        tier: "DEFAULT",
        provider: provider,
        config: createConfigObject()
      });
    }
  };

  const handleCustomDeploy = (config?: any) => {
    const customDeployButtonAction = () => {
      toast.message("Want to use custom deployment?", {
        description:
          "Contact us at contact@aquanode.io, or try our Standard deployment for free!",
      });
    };

    customDeployButtonAction();
  };

  const deploymentOptions = [
    {
      title: "Default Deployment",
      description: "Quick deployment with standard resources",
      resources: ["CPU: 1 unit", "Memory: 1Gi", "Storage: 5Gi", "Duration: 1h"],
      free: true,
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

  const defaultResources = [
    { label: "CPU", value: "1 Unit" },
    { label: "Memory", value: "1 Gi" },
    { label: "Storage", value: "5 Gi" },
    { label: "Duration", value: "1 Hours" },
  ];

  return (
    <ServiceDeployPage
      title="Jupyter Notebook Instance"
      description="Create a new Jupyter notebook instance with your preferred configuration"
      deploymentOptions={deploymentOptions}
      resourceSettingSection={
        <ResourceSettingSection values={values} setValues={setValues} />
      }
      handleDefaultDeploy={handleDefaultDeploy}
      handleCustomDeploy={handleCustomDeploy}
      isLoading={isLoading}
      defaultView={<DefaultResourceView resources={defaultResources} />}
      customDeployButtonText="Deploy Custom Backend"
      serviceName="jupyter"
      showSourceControlInDefault={false}
      showEnvironmentVarsInDefault={false}
      resourceConfig={values}
    />
  );
}
