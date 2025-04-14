"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeployCustomJupyterRequest, ProviderType } from "@/services/types";
import { useAuth } from "@/lib/auth/AuthContext";
import { Layers, Server } from "lucide-react";
import {
  CPU_CONSTRAINTS,
  MEMORY_CONSTRAINTS,
  DURATION_CONSTRAINTS,
} from "@/constants/constrains";
import { toast } from "sonner";
import ResourceSettingSection from "@/components/services/common/ResourceSettingSection";
import { ResourceValueOptions } from "@/components/services/common/interfaces";
import { useCreateDeployment } from "@/hooks/queries/useCreateDeployment";
import ServiceDeployForm from "@/components/services/common/ServiceDeployForm";
import DefaultResourceView from "@/components/services/common/DefaultResourceView";

export default function JupyterDeployment() {
  const { user } = useAuth();
  const { mutate: createDeployment, isPending: isLoading } =
    useCreateDeployment("/app/services/jupyter");

  // Resource settings for custom deployment
  const [values, setValues] = useState<ResourceValueOptions>({
    cpuValue: String(CPU_CONSTRAINTS.DEFAULT),
    memoryValue: MEMORY_CONSTRAINTS.DEFAULT_MI,
    memoryUnit: "Mi",
    ephemeralValue: 5,
    ephemeralUnit: "Gi",
    deploymentDuration: DURATION_CONSTRAINTS.DEFAULT_HOURS,
  });
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

  const handleDefaultDeploy = (provider: ProviderType) => {
    createDeployment({
      provider: provider,
      service: "JUPYTER",
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

    const data: DeployCustomJupyterRequest = {
      cpuUnits: Number(values.cpuValue),
      memorySize: memorySize,
      storageSize: storageSize,
      duration: duration,
      provider: provider,
    };

    createDeployment({
      provider: provider,
      service: "JUPYTER",
      tier: "CUSTOM",
      userId: 2,
      config: data,
    });
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
    <ServiceDeployForm
      title="Deploy Jupyter Notebook"
      description="Create a new Jupyter notebook instance with your preferred configuration"
      deploymentOptions={deploymentOptions}
      defaultResourceView={<DefaultResourceView resources={defaultResources} />}
      customResourceView={<ResourceSettingSection values={values} setValues={setValues} />}
      onDefaultDeploy={handleDefaultDeploy}
      customDeployButton={{
        text: "Deploy Custom Backend",
        onClick: () => {
          toast.message("Want to use custom deployment?", {
            description:
              "Contact us at contact@aquanode.io, or try our Standard deployment for free!",
          });
        },
      }}
      isLoading={isLoading}
    />
  );
}
