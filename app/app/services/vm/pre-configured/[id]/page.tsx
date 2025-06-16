"use client";

import React, { use } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import vmTemplatesData from "@/lib/launchables/vms.json";
import { useLaunchablesDeploy } from "@/components/LaunchablesDeployHandler";
import {
  Container,
  Heading,
  Text,
  Card,
  Grid,
} from "@/components/ui/design-system";

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
  const { user, isLoading } = useAuth();

  // Cast the imported JSON data to our VMTemplate type
  const templates = vmTemplatesData as VMTemplate[];

  // Find the template by slug
  const template = templates.find((template) => template.slug === id);
  console.log("template", template);

  if (!template?.repository) throw new Error("Deployment repository not found");
  const { isDeploying, handleDeploy, isButtonDisabled } = useLaunchablesDeploy({
    repository: template?.repository,
    ...(template?.model_docker_image && {
      model_docker_image: template.model_docker_image,
    }),
    user,
    isAuthLoading: isLoading,
  });

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

  // Create display details for the UI
  const displayDetails = {
    Name: template.name,
    Repository: template.repository,
    Category: template.category,
  };

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

      <Card variant="primary" className="space-component">
        <div className="space-y-4 sm:space-y-6">
          <Heading level={2}>Configuration</Heading>
          <Grid variant="responsive-2">
            {Object.entries(displayDetails).map(([key, value]) => (
              <Card
                key={key}
                variant="dense"
                className="bg-secondary/5 border-border/30"
              >
                <Text variant="caption" muted className="space-tight">
                  {key}
                </Text>
                <Text
                  variant="small"
                  className="font-medium font-mono break-all"
                >
                  {value}
                </Text>
              </Card>
            ))}
          </Grid>
          <div className="flex justify-end mt-4">
            <Button
              size="default"
              className="interactive-hover shadow-lg shadow-primary/10 w-full sm:w-auto"
              onClick={handleDeploy}
              disabled={isButtonDisabled}
            >
              {isDeploying ? (
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
