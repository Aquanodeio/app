"use client";

import { ReactNode } from "react";
import ServiceDeployPage from "./ServiceDeployPage";
import { DeploymentOption } from "./interfaces";
import { ProviderType } from "@/services/types";

interface ServiceDeployFormProps {
  title: string;
  description: string;
  deploymentOptions: DeploymentOption[];
  defaultResourceView: ReactNode;
  customResourceView?: ReactNode;
  onDefaultDeploy: (provider: ProviderType) => void;
  onCustomDeploy?: () => void;
  customDeployButton?: {
    text: string;
    onClick: () => void;
  };
  isLoading: boolean;
}

export default function ServiceDeployForm({
  title,
  description,
  deploymentOptions,
  defaultResourceView,
  customResourceView,
  onDefaultDeploy,
  onCustomDeploy,
  customDeployButton,
  isLoading,
}: ServiceDeployFormProps) {
  const handleDefaultDeploy = (provider?: ProviderType) => {
    if (provider) {
      onDefaultDeploy(provider);
    }
  };

  const handleCustomDeploy = () => {
    if (customDeployButton) {
      customDeployButton.onClick();
    } else if (onCustomDeploy) {
      onCustomDeploy();
    }
  };

  return (
    <ServiceDeployPage
      title={title}
      description={description}
      deploymentOptions={deploymentOptions}
      resourceSettingSection={customResourceView || defaultResourceView}
      handleDefaultDeploy={handleDefaultDeploy}
      handleCustomDeploy={handleCustomDeploy}
      isLoading={isLoading}
      defaultView={defaultResourceView}
      customDeployButtonText={customDeployButton?.text}
    />
  );
} 