import React, { useState } from "react";
import Link from "next/link";
import { Container, Heading, Text, Card } from "@/components/ui/design-system";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DeploymentConfig, ProviderType } from "@/lib/types";
import {
  CPU_CONSTRAINTS,
  MEMORY_CONSTRAINTS,
  DURATION_CONSTRAINTS,
} from "@/constants/constrains";
import { ResourceValueOptions } from "@/components/services/common/interfaces";
import ResourceSettingSection from "@/components/services/common/ResourceSettingSection";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Generic template type that can work for VMs, Models, or any launchable
export interface LaunchableTemplate {
  name: string;
  description: string;
  category: string;
  slug: string;
  repository?: string;
  model_docker_image?: string;
  [key: string]: any;
}

// Service configuration for different types
export interface ServiceConfig {
  type: "VMS" | "MODELS" | "JUPYTER" | "BACKEND";
  redirectPath: string;
  backLink: string;
  backLinkText: string;
  provider: ProviderType;
  requiresSSHKey?: boolean;
  defaultPort?: number;
  additionalEnvVars?: Record<string, string>;
}

export interface LaunchableDeploymentPageProps {
  templateId: string;
  templates: LaunchableTemplate[];
  serviceConfig: ServiceConfig;
  children?: React.ReactNode;
  customFields?: React.ReactNode;
}

// Helper function to create service configurations
export const createServiceConfig = (
  type: ServiceConfig["type"],
  overrides?: Partial<ServiceConfig>
): ServiceConfig => {
  const baseConfigs: Record<ServiceConfig["type"], ServiceConfig> = {
    VMS: {
      type: "VMS",
      redirectPath: "/services/vm",
      backLink: "/services/vm/pre-configured",
      backLinkText: "Back to Pre-Configured VMs",
      provider: ProviderType.SPHERON,
      requiresSSHKey: true,
      defaultPort: 22,
    },
    MODELS: {
      type: "MODELS",
      redirectPath: "/services/inference",
      backLink: "/services/inference/models-gallery",
      backLinkText: "Back to Models Gallery",
      provider: ProviderType.SPHERON,
    },
    JUPYTER: {
      type: "JUPYTER",
      redirectPath: "/services/jupyter",
      backLink: "/services/jupyter",
      backLinkText: "Back to Jupyter Services",
      provider: ProviderType.SPHERON,
    },
    BACKEND: {
      type: "BACKEND",
      redirectPath: "/services/backend",
      backLink: "/services/backend",
      backLinkText: "Back to Backend Services",
      provider: ProviderType.SPHERON,
    },
  };

  return { ...baseConfigs[type], ...overrides };
};

// Predefined service configurations for common use cases
export const SERVICE_CONFIGS = {
  VMS: createServiceConfig("VMS"),
  MODELS: createServiceConfig("MODELS"),
  JUPYTER: createServiceConfig("JUPYTER"),
  BACKEND: createServiceConfig("BACKEND"),
} as const;

const LaunchableDeploymentPage: React.FC<LaunchableDeploymentPageProps> = ({
  templateId,
  templates,
  serviceConfig,
  children,
  customFields,
}) => {
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

  // SSH key state for VMs
  const [publicKey, setPublicKey] = useState<string>("");

  // Find the template by slug
  const template = templates.find((template) => template.slug === templateId);

  const { mutate: createDeployment, isPending } = useCreateDeployment(
    serviceConfig.redirectPath
  );

  const createConfigObject = (customValues?: ResourceValueOptions) => {
    const vals = customValues || values;

    const baseConfig = {
      deploymentDuration: `${vals.deploymentDuration}h`,
      appCpuUnits: Number(vals.appCpuUnits),
      appMemorySize: `${vals.appMemorySize}${vals.memoryUnit}`,
      appStorageSize: `${vals.appStorageSize}${vals.storageUnit}`,
      allowAutoscale: vals.allowAutoscale ?? false,
      disablePull: vals.disablePull ?? false,
      slug: templateId,
    };

    // Add port for services that need it
    if (serviceConfig.defaultPort) {
      (baseConfig as any).appPort = serviceConfig.defaultPort;
    }

    return baseConfig;
  };

  const handleDeploy = () => {
    // Build environment variables
    const envVars: Record<string, string> = {
      ...(serviceConfig.additionalEnvVars || {}),
    };

    // Add SSH key for VMs
    if (serviceConfig.requiresSSHKey && publicKey) {
      envVars.SSH_PUBKEY = publicKey;
    }

    const configToPass: DeploymentConfig = {
      ...createConfigObject(),
      envVars: Object.keys(envVars).length > 0 ? envVars : undefined,
    };

    createDeployment({
      service: serviceConfig.type,
      tier: "CUSTOM",
      provider: serviceConfig.provider,
      config: configToPass,
    });

    console.log("Deployment config:", configToPass);
  };

  // Template not found
  if (!template) {
    return (
      <Container variant="wide" className="space-dashboard">
        <Link
          href={serviceConfig.backLink}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {serviceConfig.backLinkText}
        </Link>
        <Card variant="elevated" className="text-center space-component">
          <Heading level={2} className="space-tight">
            Template not found
          </Heading>
          <Text variant="base" muted>
            The template you're looking for doesn't exist or has been removed.
          </Text>
        </Card>
      </Container>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground space-dashboard">
      <Container variant={serviceConfig.type === "MODELS" ? "content" : "wide"}>
        <div className="space-element">
          {/* Back Navigation */}
          <Link
            href={serviceConfig.backLink}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {serviceConfig.backLinkText}
          </Link>

          {/* Template Header */}
          <div className="space-element">
            <Heading level={1} className="space-tight">
              {template.name}
            </Heading>
            <Text
              variant={serviceConfig.type === "MODELS" ? "large" : "base"}
              muted
              className={
                serviceConfig.type === "MODELS" ? "leading-relaxed mb-4" : ""
              }
            >
              {template.description}
            </Text>
          </div>

          {/* Configuration Card - Only for non-model services */}
          {serviceConfig.type !== "MODELS" ? (
            <Card variant="primary" className="space-component">
              <div className="space-y-4 sm:space-y-6">
                <Heading level={2}>Configuration</Heading>

                {/* SSH Key Section for VMs */}
                {serviceConfig.requiresSSHKey && (
                  <div className="dashboard-card mb-8">
                    <h3 className="text-lg font-medium mb-4">SSH Key</h3>
                    <div className="grid gap-3">
                      <Label htmlFor="public-key">Your Public Key</Label>
                      <Input
                        id="public-key"
                        name="public-key"
                        placeholder="ssh-ed25519 AAA..."
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                        className="w-full h-10 text-sm bg-secondary/10 border-border/30"
                      />
                    </div>
                  </div>
                )}

                {/* Custom Fields */}
                {customFields}

                {/* Resource Settings */}
                <ResourceSettingSection values={values} setValues={setValues} />

                {/* Additional Children */}
                {children}

                {/* Deploy Button */}
                <div className="flex justify-end mt-4">
                  <Button
                    size="default"
                    className="interactive-hover shadow-lg shadow-primary/10 w-full sm:w-auto"
                    onClick={handleDeploy}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="animate-pulse">Deploying...</span>
                    ) : (
                      <>
                        Deploy Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            /* For models - direct layout without card wrapper */
            <div className="space-y-4 sm:space-y-6">
              {/* Custom Fields */}
              {customFields}

              {/* Resource Settings */}
              <ResourceSettingSection values={values} setValues={setValues} />

              {/* Additional Children */}
              {children}

              {/* Deploy Button */}
              <div className="flex justify-end mt-4">
                <Button
                  size="default"
                  className="interactive-hover shadow-lg shadow-primary/10 w-full sm:w-auto"
                  onClick={handleDeploy}
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="animate-pulse">Deploying...</span>
                  ) : (
                    <>
                      Deploy Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default LaunchableDeploymentPage;
