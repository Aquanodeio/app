"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { Container, Heading, Text, Card } from "@/components/ui/design-system";
import { Badge } from "@/components/ui/badge";
import modelsData from "@/lib/launchables/models.json";
import { ExternalLink } from "lucide-react";
import { DeploymentConfig, ProviderType } from "@/lib/types";
import { ResourceValueOptions } from "@/components/services/common/interfaces";
import {
  CPU_CONSTRAINTS,
  MEMORY_CONSTRAINTS,
  DURATION_CONSTRAINTS,
} from "@/constants/constrains";
import { useCreateDeployment } from "@/hooks";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ResourceSettingSection from "@/components/services/common/ResourceSettingSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define the model type based on the JSON structure
type Model = {
  name: string;
  description: string;
  category: string;
  slug: string;
  repository?: string;
  [key: string]: any;
};

type ModelDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ModelDetailPage = ({ params }: ModelDetailPageProps) => {
  const { id } = use(params);

  const models = modelsData as Model[];

  const { mutate: createDeployment, isPending } = useCreateDeployment(
    "/app/services/inference"
  );

  const model = models.find((model) => model.slug === id);

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

  const createConfigObject = (customValues?: ResourceValueOptions) => {
    const vals = customValues || values;

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
      slug: id,
    };

    createDeployment({
      service: "MODELS",
      tier: "CUSTOM",
      provider: ProviderType.SPHERON,
      config: configToPass,
    });

    console.log(configToPass);
  };

  if (!model) {
    return (
      <section className="min-h-screen bg-background text-foreground space-dashboard">
        <Container variant="content">
          <div className="space-element">
            <Link
              href="/app/services/inference/models-gallery"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Models Gallery
            </Link>
            <div className="text-center py-12">
              <Heading level={1} className="mb-4">
                Model Not Found
              </Heading>
              <Text variant="base" muted>
                The model you're looking for could not be found.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground space-dashboard">
      <Container variant="content">
        <div className="space-element">
          {/* Back Navigation */}
          <Link
            href="/app/services/inference/models-gallery"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Models Gallery
          </Link>

          {/* Model Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Left: Model Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="min-w-0 flex flex-1">
                  <div className="flex items-center gap-3 mt-3">
                    <Heading level={1} className="space-tight">
                      {model.name}
                    </Heading>
                  </div>
                </div>
              </div>
              <Text
                variant="large"
                className="text-muted-foreground leading-relaxed mb-4"
              >
                {model.description}
              </Text>
              {/* Action Buttons */}
              {/* <Card variant="primary" className="space-component">
                <div className="space-y-4 sm:space-y-6">
                  <Heading level={2}>Configuration</Heading> */}

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
              {/* </div>
              </Card> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ModelDetailPage;
