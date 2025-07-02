import { useState, useMemo } from "react";
import { DeploymentConfig, ProviderType, ServiceType } from "@/lib/types";
import { useAuth } from "@/hooks/auth/useAuthContext";
import {
  CPU_CONSTRAINTS,
  MEMORY_CONSTRAINTS,
  DURATION_CONSTRAINTS,
  ENVIRONMENT_VARS_DEFAULT,
} from "@/constants/constrains";
import { ResourceValueOptions } from "@/components/services/common/interfaces";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { getProviderFromEnv } from "@/lib/utils";
import { toast } from "sonner";

export interface ServiceDeployConfig {
  serviceType: "BACKEND" | "VMS" | "JUPYTER";
  redirectPath: string;
  defaultPort?: number;
  title: string;
  description: string;
  showSourceControl?: boolean;
  showEnvironmentVars?: boolean;
  showBuildSettings?: boolean;
}

// Helper function to create service configurations
export const createServiceDeployConfig = (
  serviceType: ServiceDeployConfig["serviceType"],
  overrides?: Partial<ServiceDeployConfig>
): ServiceDeployConfig => {
  const baseConfigs: Record<
    ServiceDeployConfig["serviceType"],
    ServiceDeployConfig
  > = {
    BACKEND: {
      serviceType: "BACKEND",
      redirectPath: "/services/hosting",
      defaultPort: 3000,
      title: "Backend Deployment",
      description:
        "Deploy a custom backend service with your preferred configuration",
      showSourceControl: true,
      showEnvironmentVars: true,
      showBuildSettings: true,
    },
    VMS: {
      serviceType: "VMS",
      redirectPath: "/services/vm",
      defaultPort: 22,
      title: "VM Deployment",
      description:
        "Deploy a custom virtual machine with your preferred configuration",
      showSourceControl: true,
      showEnvironmentVars: true,
      showBuildSettings: true,
    },
    JUPYTER: {
      serviceType: "JUPYTER",
      redirectPath: "/services/jupyter",
      defaultPort: 8888,
      title: "Jupyter Deployment",
      description:
        "Deploy a Jupyter notebook instance with your preferred configuration",
      showSourceControl: true,
      showEnvironmentVars: true,
      showBuildSettings: false,
    },
  };

  return { ...baseConfigs[serviceType], ...overrides };
};

// Predefined service configurations
export const SERVICE_DEPLOY_CONFIGS = {
  BACKEND: createServiceDeployConfig("BACKEND"),
  VMS: createServiceDeployConfig("VMS"),
  JUPYTER: createServiceDeployConfig("JUPYTER"),
} as const;

export const useServiceDeploy = (config: ServiceDeployConfig) => {
  const { user } = useAuth();

  // Source control state
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [branchName, setBranchName] = useState<string>("main");
  const [portNumber, setPortNumber] = useState<number>(
    config.defaultPort || 3000
  );

  // Environment variables state
  const [envVarsJson, setEnvVarsJson] = useState<string>(
    ENVIRONMENT_VARS_DEFAULT
  );

  // Provider state
  const [selectedProvider, setSelectedProvider] =
    useState<ProviderType>(getProviderFromEnv());

  // Build settings state
  const [buildCommand, setBuildCommand] = useState<string>("npm run build");
  const [runCommand, setRunCommand] = useState<string>("npm start");
  const [installCommand, setInstallCommand] = useState<string>("npm install");
  const [outputDirectory, setOutputDirectory] = useState<string>("dist");

  // Resource settings state
  const [values, setValues] = useState<ResourceValueOptions>({
    appCpuUnits: String(CPU_CONSTRAINTS.DEFAULT),
    appMemorySize: MEMORY_CONSTRAINTS.DEFAULT_MI,
    memoryUnit: "Mi",
    appStorageSize: 1,
    storageUnit: "Gi",
    deploymentDuration: DURATION_CONSTRAINTS.DEFAULT_HOURS,
    runCommands: "",
    allowAutoscale: false,
    disablePull: false,
  });

  // Docker/source control type state
  const [sourceType, setSourceType] = useState<"github" | "docker">("github");
  const [dockerImage, setDockerImage] = useState<string>("");
  const [dockerTag, setDockerTag] = useState<string>("latest");
  const [dockerUsername, setDockerUsername] = useState<string>("");
  const [dockerPassword, setDockerPassword] = useState<string>("");
  const [privateRegistry, setPrivateRegistry] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("nodejs");

  const { mutate: createDeployment, isPending: isLoading } =
    useCreateDeployment(config.redirectPath);

  // Create deployment config object
  const createConfigObject = (customValues?: ResourceValueOptions) => {
    const vals = customValues || values;

    const baseConfig = {
      deploymentDuration: `${vals.deploymentDuration}h`,
      appCpuUnits: Number(vals.appCpuUnits),
      appMemorySize: `${vals.appMemorySize}${vals.memoryUnit}`,
      appStorageSize: `${vals.appStorageSize}${vals.storageUnit}`,
      image: "", // Empty string instead of null/undefined
      runCommands: runCommand || "", // Use runCommand from build settings
      allowAutoscale: vals.allowAutoscale ?? false,
      disablePull: vals.disablePull ?? false,
    };

    // Add port if specified
    if (config.defaultPort || portNumber) {
      (baseConfig as any).appPort = portNumber;
    }

    return baseConfig;
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

  // Source control configuration
  const sourceControlConfig = useMemo(
    () => ({
      repoUrl,
      branchName,
    }),
    [repoUrl, branchName]
  );

  // Build settings configuration
  const buildSettingsConfig = useMemo(
    () => ({
      buildCommand,
      runCommand,
      installCommand,
      outputDirectory,
    }),
    [buildCommand, runCommand, installCommand, outputDirectory]
  );

  const handleDefaultDeploy = (
    provider?: ProviderType,
    configOverrides?: any
  ) => {
    if (provider) {
      setSelectedProvider(provider);

      // Get environment variables
      const envVars = {
        ...parseEnvVars(),
        ...(config.showBuildSettings && {
          BUILD_COMMAND: buildSettingsConfig.buildCommand,
          INSTALL_COMMAND: buildSettingsConfig.installCommand,
          OUTPUT_DIRECTORY: buildSettingsConfig.outputDirectory,
        }),
      };

      // Create the complete payload for the API
      createDeployment({
        service: config.serviceType,
        tier: "DEFAULT",
        provider: provider,
        config: {
          ...createConfigObject(),
          ...(config.showSourceControl && {
            repoUrl: sourceControlConfig.repoUrl,
            branchName: sourceControlConfig.branchName,
          }),
          ...(config.showEnvironmentVars && { envVars }),
          ...(config.showBuildSettings && {
            runCommands: buildSettingsConfig.runCommand,
            outputDirectory: buildSettingsConfig.outputDirectory,
          }),
          ...configOverrides,
        },
      });
    }
  };

  const handleCustomDeploy = (
    provider: ProviderType,
    configOverrides?: any
  ) => {
    // Get environment variables
    const envVars = {
      ...parseEnvVars(),
      ...(config.showBuildSettings && {
        BUILD_COMMAND: buildSettingsConfig.buildCommand,
        INSTALL_COMMAND: buildSettingsConfig.installCommand,
        OUTPUT_DIRECTORY: buildSettingsConfig.outputDirectory,
      }),
    };

    // Create the complete payload for the API
    createDeployment({
      service: config.serviceType,
      tier: "CUSTOM",
      provider: provider,
      config: {
        ...createConfigObject(),
        ...(config.showSourceControl && {
          repoUrl: sourceControlConfig.repoUrl,
          branchName: sourceControlConfig.branchName,
        }),
        ...(config.showEnvironmentVars && { envVars }),
        ...(config.showBuildSettings && {
          runCommands: buildSettingsConfig.runCommand,
          outputDirectory: buildSettingsConfig.outputDirectory,
        }),
        // Handle Docker deployments
        ...(sourceType === "docker" && {
          image: dockerImage,
          tag: dockerTag,
          ...(privateRegistry && {
            dockerUsername,
            dockerPassword,
          }),
        }),
        ...configOverrides,
      },
    });

    // Show custom deployment toast
    const customDeployButtonAction = () => {
      toast.message("Want to use custom deployment?", {
        description:
          "Contact us at contact@aquanode.io, or try our Standard deployment for free!",
      });
    };

    customDeployButtonAction();
  };

  return {
    // User state
    user,
    isLoading,

    // Source control state
    repoUrl,
    setRepoUrl,
    branchName,
    setBranchName,
    portNumber,
    setPortNumber,

    // Environment variables state
    envVarsJson,
    setEnvVarsJson,

    // Provider state
    selectedProvider,
    setSelectedProvider,

    // Build settings state
    buildCommand,
    setBuildCommand,
    runCommand,
    setRunCommand,
    installCommand,
    setInstallCommand,
    outputDirectory,
    setOutputDirectory,
    language,
    setLanguage,

    // Resource settings state
    values,
    setValues,

    // Docker state
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

    // Computed values
    sourceControlConfig,
    buildSettingsConfig,

    // Actions
    handleDefaultDeploy,
    handleCustomDeploy,
  };
};
