"use client";

import { Database, Layers } from "lucide-react";
import ResourceSettingSection from "@/components/services/common/ResourceSettingSection";
import SourceControlSection from "@/components/services/hosting/SourceControlSection";
import EnviromentVariableSection from "@/components/services/hosting/EnviromentVariableSection";
import BuildSettings from "@/components/services/common/BuildSettings";
import ServiceDeployPage from "@/components/services/common/ServiceDeployPage";
import DefaultResourceView from "@/components/services/common/DefaultResourceView";
import { Button } from "@/components/ui/button";
import { Card, Text } from "@/components/ui/design-system";
import {
  useServiceDeploy,
  SERVICE_DEPLOY_CONFIGS,
} from "@/hooks/deployments/useServiceDeploy";

export default function BackendDeployment() {
  const deployHook = useServiceDeploy(SERVICE_DEPLOY_CONFIGS.BACKEND);

  const {
    user,
    isLoading,
    // Source control state
    repoUrl,
    setRepoUrl,
    branchName,
    setBranchName,
    portNumber,
    setPortNumber,
    // Environment variables
    envVarsJson,
    setEnvVarsJson,
    // Build settings
    runCommand,
    setRunCommand,
    installCommand,
    setInstallCommand,
    outputDirectory,
    setOutputDirectory,
    language,
    setLanguage,
    // Resource settings
    values,
    setValues,
    // Docker settings
    sourceType,
    setSourceType,
    dockerImage,
    setDockerImage,
    dockerTag,
    setDockerTag,
    dockerUsername,
    setDockerUsername,
    dockerPassword,
    setDockerPassword,
    privateRegistry,
    setPrivateRegistry,
    // Computed configs
    sourceControlConfig,
    buildSettingsConfig,
    // Actions
    handleDefaultDeploy,
    handleCustomDeploy,
  } = deployHook;

  if (!user?.id) {
    return (
      <Card variant="elevated" className="text-center space-element">
        <Text variant="large" className="space-tight">
          Please sign in to deploy custom services
        </Text>
        <Button variant="outline">Sign In</Button>
      </Card>
    );
  }

  const deploymentOptions = [
    {
      title: "Default Deployment",
      description: "Deploy instantly on shared infrastructure",
      resources: ["CPU: 1 unit", "Memory: 1Gi", "Storage: 1Gi", "Duration: 1h"],
      free: true,
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Custom Deployment",
      description: "Configure your own dedicated resources",
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

  return (
    <ServiceDeployPage
      title={SERVICE_DEPLOY_CONFIGS.BACKEND.title}
      description={SERVICE_DEPLOY_CONFIGS.BACKEND.description}
      deploymentOptions={deploymentOptions}
      resourceSettingSection={
        <ResourceSettingSection values={values} setValues={setValues} />
      }
      handleDefaultDeploy={handleDefaultDeploy}
      handleCustomDeploy={handleCustomDeploy}
      isLoading={isLoading}
      defaultView={
        <DefaultResourceView
          resources={defaultResources}
          allowAutoscale={values.allowAutoscale || false}
          autoRedeploy={!values.disablePull}
          onAllowAutoscaleChange={(value) =>
            setValues({ ...values, allowAutoscale: value })
          }
          onAutoRedeployChange={(value) =>
            setValues({ ...values, disablePull: !value })
          }
        />
      }
      sourceControlSection={
        <SourceControlSection
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          branchName={branchName}
          setBranchName={setBranchName}
          dockerImage={dockerImage}
          setDockerImage={setDockerImage}
          dockerTag={dockerTag}
          setDockerTag={setDockerTag}
          dockerUsername={dockerUsername}
          setDockerUsername={setDockerUsername}
          dockerPassword={dockerPassword}
          setDockerPassword={setDockerPassword}
          privateRegistry={privateRegistry}
          setPrivateRegistry={setPrivateRegistry}
          sourceType={sourceType}
          setSourceType={setSourceType}
        />
      }
      environmentVariablesSection={
        <EnviromentVariableSection
          envVarsJson={envVarsJson}
          setEnvVarsJson={setEnvVarsJson}
        />
      }
      buildSettingsSection={
        <BuildSettings
          runCommand={runCommand}
          setRunCommand={setRunCommand}
          installCommand={installCommand}
          setInstallCommand={setInstallCommand}
          outputDirectory={outputDirectory}
          setOutputDirectory={setOutputDirectory}
          portNumber={portNumber}
          setPortNumber={setPortNumber}
          language={language}
          setLanguage={setLanguage}
        />
      }
      serviceName="hosting"
      showSourceControlInDefault={true}
      showEnvironmentVarsInDefault={true}
      showBuildSettingsInDefault={true}
      sourceControlConfig={sourceControlConfig}
      environmentVarsConfig={{ envVarsJson }}
      buildSettingsConfig={buildSettingsConfig}
      resourceConfig={values}
    />
  );
}
