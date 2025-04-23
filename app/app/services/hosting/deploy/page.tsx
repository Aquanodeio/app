"use client";

import { useState, useMemo } from "react";
import { DeploymentConfig, ProviderType, ServiceType } from "@/lib/types";
import { useAuth } from "@/hooks/auth/useAuthContext";
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
import BuildSettings from "@/components/services/common/BuildSettings";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import ServiceDeployPage from "@/components/services/common/ServiceDeployPage";
import DefaultResourceView from "@/components/services/common/DefaultResourceView";
import { Button } from "@/components/ui/button";
import { getProviderFromEnv } from "@/lib/utils";
import { toast } from "sonner";

export default function CustomServiceDeployment() {
  const { user } = useAuth();
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [branchName, setBranchName] = useState<string>("main");
  const [portNumber, setPortNumber] = useState<number>(3000);
  const [envVarsJson, setEnvVarsJson] = useState<string>(
    ENVIRONMENT_VARS_DEFAULT
  );
  const [selectedProvider, setSelectedProvider] =
    useState<ProviderType>(getProviderFromEnv());
  
  // Build settings state
  const [buildCommand, setBuildCommand] = useState<string>("npm run build");
  const [runCommand, setRunCommand] = useState<string>("npm start");
  const [installCommand, setInstallCommand] = useState<string>("npm install");
  const [outputDirectory, setOutputDirectory] = useState<string>("dist");

  const [values, setValues] = useState<ResourceValueOptions>({
    appCpuUnits: String(CPU_CONSTRAINTS.DEFAULT),
    appMemorySize: MEMORY_CONSTRAINTS.DEFAULT_MI,
    memoryUnit: "Mi",
    appStorageSize: 1,
    storageUnit: "Gi",
    deploymentDuration: DURATION_CONSTRAINTS.DEFAULT_HOURS,
    runCommands: "",
  });

  const { mutate: createDeployment, isPending: isLoading } =
    useCreateDeployment("/app/services/hosting");

  // Create deployment config object
  const createConfigObject = (customValues?: ResourceValueOptions) => {
    const vals = customValues || values;
    
    // Create a config object with all required properties
    return {
      appPort: portNumber,
      deploymentDuration: `${vals.deploymentDuration}h`,
      appCpuUnits: Number(vals.appCpuUnits),
      appMemorySize: `${vals.appMemorySize}${vals.memoryUnit}`,
      appStorageSize: `${vals.appStorageSize}${vals.storageUnit}`,
      image: "", // Empty string instead of null/undefined
      runCommands: runCommand || "", // Use runCommand from build settings
    };
  };

  // Create environment variables object from JSON
  const parseEnvVars = () => {
    try {
      return JSON.parse(envVarsJson);
    } catch (e) {
      console.error("Error parsing environment variables:", e);
      return {};
    }
  };

  // Source control data is separate from config in the API
  const sourceControlConfig = useMemo(() => ({
    repoUrl,
    branchName
  }), [repoUrl, branchName]);

  // Build settings config
  const buildSettingsConfig = useMemo(() => ({
    buildCommand,
    runCommand,
    installCommand,
    outputDirectory,
  }), [buildCommand, runCommand, installCommand, outputDirectory]);

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

  const handleDefaultDeploy = (provider?: ProviderType, config?: any) => {
    if (provider) {
      setSelectedProvider(provider);

      // Get environment variables

      //This is hacky, but it works for now. When backend is updated, we should update this to use the new backend variables.
      const envVars = {
        ...parseEnvVars(),
        BUILD_COMMAND: buildSettingsConfig.buildCommand,
        INSTALL_COMMAND: buildSettingsConfig.installCommand,
        OUTPUT_DIRECTORY: buildSettingsConfig.outputDirectory,
      };

      // Create the complete payload for the API
      createDeployment({
        service: "BACKEND",
        tier: "DEFAULT",
        provider: provider,
        config: {
          ...createConfigObject(),
          repoUrl: sourceControlConfig.repoUrl,
          branchName: sourceControlConfig.branchName,
          envVars, // Use the combined envVars
          runCommands: buildSettingsConfig.runCommand,
        }
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

  return (
    <ServiceDeployPage
      title="Deployments Instance"
      description="Deploy a custom service with your preferred configuration"
      deploymentOptions={deploymentOptions}
      resourceSettingSection={
        <ResourceSettingSection values={values} setValues={setValues} />
      }
      handleDefaultDeploy={handleDefaultDeploy}
      handleCustomDeploy={handleCustomDeploy}
      isLoading={isLoading}
      defaultView={<DefaultResourceView resources={defaultResources} />}
      sourceControlSection={
        <SourceControlSection
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          branchName={branchName}
          setBranchName={setBranchName}
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
