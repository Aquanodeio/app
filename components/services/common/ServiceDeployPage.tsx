import React, { useState, ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DeploymentOptionCard from "./DeploymentOptionCard";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { ProviderType } from "@/lib/types";
import { getProviderFromEnv } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeploymentOption } from "./interfaces";
import { Container, Heading, Text, Card } from "@/components/ui/design-system";

export interface ServiceDeployPageProps {
  title: string;
  description: string;
  deploymentOptions: DeploymentOption[];
  sourceControlSection?: ReactNode;
  environmentVariablesSection?: ReactNode;
  buildSettingsSection?: ReactNode;
  resourceSettingSection: ReactNode;
  handleDefaultDeploy: (provider?: ProviderType, config?: any) => void;
  handleCustomDeploy:(provider: ProviderType, config?: any) => void;
  isLoading: boolean;
  children?: ReactNode;
  defaultView?: ReactNode;
  customDeployButtonText?: string;
  serviceName?: string;
  showSourceControlInDefault?: boolean;
  showEnvironmentVarsInDefault?: boolean;
  showBuildSettingsInDefault?: boolean;
  sourceControlConfig?: any;
  environmentVarsConfig?: any;
  buildSettingsConfig?: any;
  resourceConfig?: any;
}

export default function ServiceDeployPage({
  title,
  description,
  deploymentOptions,
  sourceControlSection,
  environmentVariablesSection,
  buildSettingsSection,
  resourceSettingSection,
  handleDefaultDeploy,
  handleCustomDeploy,
  isLoading,
  children,
  defaultView,
  customDeployButtonText,
  showSourceControlInDefault = false,
  showEnvironmentVarsInDefault = false,
  showBuildSettingsInDefault = false,
  sourceControlConfig,
  environmentVarsConfig,
  buildSettingsConfig,
  resourceConfig,
}: ServiceDeployPageProps) {
  const { user, isLoading: authLoading } = useAuth();
  const [selectedOption, setSelectedOption] = useState<"default" | "custom">("default");
  const defaultProvider = getProviderFromEnv();
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>(defaultProvider);
  
  // Collect all configuration data
  const getConfigData = () => {
    const config: any = {};
    
    if (sourceControlConfig) {
      config.sourceControl = sourceControlConfig;
    }
    
    if (environmentVarsConfig) {
      config.environmentVars = environmentVarsConfig;
    }
    
    if (buildSettingsConfig) {
      config.buildSettings = buildSettingsConfig;
    }
    
    if (resourceConfig) {
      config.resources = resourceConfig;
    }
    
    return config;
  };

  const renderAuthContent = (content: React.ReactNode) => {
    if (authLoading) {
      return (
        <Card variant="elevated" className="text-center space-element">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mb-4 text-primary mx-auto" />
          <Text variant="base" muted>
            Loading authentication...
          </Text>
        </Card>
      );
    }

    if (!user?.id) {
      return (
        <Card variant="elevated" className="text-center space-element">
          <Text variant="large" className="space-tight">
            Please sign in to create a deployment
          </Text>
          <Button variant="outline">
            Sign In
          </Button>
        </Card>
      );
    }

    return content;
  };

  return (
    <section className="min-h-screen bg-background text-foreground space-dashboard">
      <Container variant="wide">
        <div className="space-element">
          <Heading level={1} className="space-tight">
            {title}
          </Heading>
          <Text variant="base" muted>
            {description}
          </Text>
        </div>

        {renderAuthContent(
          <div className="space-component">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {deploymentOptions.map((option, index) => (
                <DeploymentOptionCard
                  key={index}
                  title={option.title}
                  description={option.description}
                  resources={option.resources}
                  selected={selectedOption === (index === 0 ? "default" : "custom")}
                  onClick={() => setSelectedOption(index === 0 ? "default" : "custom")}
                  free={option.free}
                  icon={option.icon}
                />
              ))}
            </div>

            <Card variant="primary" className="space-element">
              {/* Provider Selection (Common for both default and custom) */}
              <div className="space-tight">
                <Text variant="small" className="font-medium">
                  Deployment Provider
                </Text>
                <div className="w-full sm:w-1/3">
                  <Select
                    value={selectedProvider}
                    onValueChange={(value) => setSelectedProvider(value as ProviderType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultProvider === "auto" ? (
                        <>
                          <SelectItem value="auto">Auto (Default)</SelectItem>
                          <SelectItem value="akash">Akash Network</SelectItem>
                          <SelectItem value="spheron">Spheron Network</SelectItem>
                        </>
                      ) : (
                        <SelectItem value={defaultProvider}>
                          {defaultProvider.charAt(0).toUpperCase() + defaultProvider.slice(1)}{" "}
                          Network
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedOption === "default" ? (
                <div className="space-y-4">
                  {defaultView ? (
                    defaultView
                  ) : (
                    <div className="space-tight">
                      <Heading level={3} className="space-tight">
                        Quick Deploy
                      </Heading>
  
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 space-tight">
                        {deploymentOptions[0].resources.map((resource, i) => {
                          const [label, value] = resource.split(":");
                          return (
                            <Card key={i} variant="dense" className="space-tight">
                              <Text variant="caption" muted className="space-tight">{label.trim()}</Text>
                              <Text variant="base" className="font-medium">{value.trim()}</Text>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {showSourceControlInDefault && sourceControlSection && (
                    <div className="space-tight">
                      {sourceControlSection}
                    </div>
                  )}

                  {showBuildSettingsInDefault && buildSettingsSection && (
                    <div className="space-tight">
                      <Heading level={3} className="space-tight">
                        Build Settings
                      </Heading>
                      {buildSettingsSection}
                    </div>
                  )}

                  {showEnvironmentVarsInDefault && environmentVariablesSection && (
                    <div className="space-tight">
                      {environmentVariablesSection}
                    </div>
                  )}

                  <div className="flex justify-end space-tight">
                    <Button
                      size="default"
                      onClick={() => handleDefaultDeploy(selectedProvider, getConfigData())}
                      disabled={isLoading}
                      className="w-full sm:w-auto"
                    >
                      {isLoading ? "Deploying..." : "Deploy Instance"}
                      {!isLoading && <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <Heading level={3} className="space-tight">
                        Resource Settings
                      </Heading>
                      {resourceSettingSection}
                    </div>
                    
                    {sourceControlSection && (
                      <div>
                        <Heading level={3} className="space-tight">
                          Source Control
                        </Heading>
                        {sourceControlSection}
                      </div>
                    )}
                    
                    {buildSettingsSection && (
                      <div>
                        <Heading level={3} className="space-tight">
                          Build Settings
                        </Heading>
                        {buildSettingsSection}
                      </div>
                    )}
                    
                    {environmentVariablesSection && (
                      <div>
                        {environmentVariablesSection}
                      </div>
                    )}
                    
                    {children}

                    <div className="flex justify-end space-tight">
                      <Button
                        size="default"
                        onClick={() => handleCustomDeploy(selectedProvider, getConfigData())}
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                      >
                        {isLoading ? "Deploying..." : customDeployButtonText || "Deploy Custom Instance"}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </Container>
    </section>
  );
} 