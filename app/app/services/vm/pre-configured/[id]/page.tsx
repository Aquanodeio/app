"use client";

import { use } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import vmTemplatesData from "@/lib/launchables/vms.json";
import {
  Container,
  Heading,
  Text,
  Card
} from "@/components/ui/design-system";
import { useState } from "react";
import { DeploymentConfig, ProviderType, ServiceType } from "@/lib/types";
import {
  CPU_CONSTRAINTS,
  MEMORY_CONSTRAINTS,
  DURATION_CONSTRAINTS
} from "@/constants/constrains";
import { ResourceValueOptions } from "@/components/services/common/interfaces";
import ResourceSettingSection from "@/components/services/common/ResourceSettingSection";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define the VM template type based on the JSON structure
type VMTemplate = {
  name: string;
  description: string;
  category: string;
  slug: string;
  repository?: string;
  model_docker_image?: string;
  [key: string]: any;
};

type TemplateDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TemplateDetailsPage = ({ params }: TemplateDetailPageProps) => {
  const { id } = use(params);

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

  const [publicKey, setPublicKey] = useState<string>("");

  // Cast the imported JSON data to our VMTemplate type
  const templates = vmTemplatesData as VMTemplate[];

  // Find the template by slug
  const template = templates.find((template) => template.slug === id);

  const { mutate: createDeployment, isPending } = useCreateDeployment(
    "/app/services/vm"
  );

  const createConfigObject = (customValues?: ResourceValueOptions) => {
    const vals = customValues || values;

    // Create a config object with all required properties
    return {
      deploymentDuration: `${vals.deploymentDuration}h`,
      appCpuUnits: Number(vals.appCpuUnits),
      appMemorySize: `${vals.appMemorySize}${vals.memoryUnit}`,
      appStorageSize: `${vals.appStorageSize}${vals.storageUnit}`,
      allowAutoscale: vals.allowAutoscale ?? false,
      disablePull: vals.disablePull ?? false,
    };
  };

  const handleDeploy = () => {
    const configToPass: DeploymentConfig = {
      ...createConfigObject(),
      envVars: {
        SSH_PUBKEY: publicKey,
      },
      slug: id,

    };

    createDeployment({
      service: "VMS",
      tier: "CUSTOM",
      provider: ProviderType.SPHERON,
      config: configToPass,
    });

    console.log(configToPass);
     };

  // If template is not found, show not found message
  if (!template) {
    return (
      <Container variant="wide" className="space-dashboard">
        <Link
          href="/app/services/vm/pre-configured"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pre-Configured VMs
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
    <Container variant="wide" className="space-dashboard">
      {/* Back Navigation */}
      <Link
        href="/app/services/vm/pre-configured"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Pre-Configured VMs
      </Link>

      {/* App Header */}
      <div className="space-element">
        <Heading level={1} className="space-tight">
          {template.name}
        </Heading>
        <Text variant="base" muted>
          {template.description}
        </Text>
      </div>

      <div></div>
      <Card variant="primary" className="space-component">
        <div className="space-y-4 sm:space-y-6">
          <Heading level={2}>Configuration</Heading>

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

          <ResourceSettingSection values={values} setValues={setValues} />

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
    </Container>
  );
};

export default TemplateDetailsPage;
