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
        <div className="p-4 sm:p-8 flex flex-col items-center justify-center">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mb-4 text-primary" />
          <p className="text-muted-foreground text-sm sm:text-base">
            Loading authentication...
          </p>
        </div>
      );
    }

    if (!user?.id) {
      return (
        <div className="dashboard-card text-center py-8 sm:py-12">
          <p className="text-base sm:text-lg mb-4">
            Please sign in to create a deployment
          </p>
          <Button variant="outline" className="hover-effect mt-2">
            Sign In
          </Button>
        </div>
      );
    }

    return content;
  };

  return (
    <div className="bg-background text-foreground">
      <div className="container ml-5 px-0 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 px-4 sm:px-0">
          <div>
            <h1 className="section-title text-xl sm:text-2xl md:text-3xl mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {description}
            </p>
          </div>
        </div>

        {renderAuthContent(
          <div className="px-4 sm:px-0">
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

            <div className="dashboard-card subtle-glow mb-6 sm:mb-8">
              {/* Provider Selection (Common for both default and custom) */}
              <div className="mb-4 sm:mb-5">
                <label className="block text-xs font-medium mb-2 ml-2">
                  Deployment Provider
                </label>
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
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                        Quick Deploy
                      </h3>
  
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4 sm:mb-5">
                        {deploymentOptions[0].resources.map((resource, i) => {
                          const [label, value] = resource.split(":");
                          return (
                            <div key={i} className="p-3 rounded-lg bg-secondary/5 border border-border/30">
                              <p className="text-xs text-muted-foreground mb-1">{label.trim()}</p>
                              <p className="text-base sm:text-lg font-medium">{value.trim()}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {showSourceControlInDefault && sourceControlSection && (
                    <div className="mt-6">
                      {sourceControlSection}
                    </div>
                  )}

                  {showBuildSettingsInDefault && buildSettingsSection && (
                    <div className="mt-6">
                      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                        Build Settings
                      </h3>
                      {buildSettingsSection}
                    </div>
                  )}

                  {showEnvironmentVarsInDefault && environmentVariablesSection && (
                    <div className="mt-6">
                      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                        Environment Variables
                      </h3>
                      {environmentVariablesSection}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-900/30 w-full sm:w-auto"
                      size="default"
                      onClick={() => handleDefaultDeploy(selectedProvider, getConfigData())}
                      disabled={isLoading}
                    >
                      {isLoading ? "Deploying..." : "Deploy Default Instance"}
                      {!isLoading && <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                        Resource Settings
                      </h3>
                      {resourceSettingSection}
                    </div>
                    
                    {sourceControlSection && (
                      <div>
                        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                          Source Control
                        </h3>
                        {sourceControlSection}
                      </div>
                    )}
                    
                    {buildSettingsSection && (
                      <div>
                        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                          Build Settings
                        </h3>
                        {buildSettingsSection}
                      </div>
                    )}
                    
                    {environmentVariablesSection && (
                      <div>
                        {environmentVariablesSection}
                      </div>
                    )}
                    
                    {children}

                    <div className="flex justify-end mt-4 sm:mt-5">
                      <Button
                        size="default"
                        className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-900/30 w-full sm:w-auto"
                        onClick={() => handleDefaultDeploy(selectedProvider, getConfigData())}
                        disabled={isLoading}
                      >
                        {isLoading ? "Deploying..." : customDeployButtonText || "Deploy Custom Instance"}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 