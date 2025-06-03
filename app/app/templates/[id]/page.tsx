"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Template, templates } from "@/lib/catalog";
import { useTemplateDeploy } from "@/lib/logic/TemplateDeployLogic";
import { Container, Heading, Text, Card, Grid } from "@/components/ui/design-system";

const TemplateDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const from = searchParams.get("from") || "/app/templates";
  const { user, isLoading } = useAuth();
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (params.id) {
      const templateId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundTemplate = templates.find(t => t.id === templateId);
      setTemplate(foundTemplate || null);
    }
  }, [params.id]);

  const handleBack = () => {
    router.push(from);
  };

  // Always call hooks at the top level
  const { isDeploying, handleDeploy, isButtonDisabled } = useTemplateDeploy({
    template,
    user,
    isAuthLoading: isLoading,
  });

  // If template is not found, show not found message
  if (!template) {
    return (
      <Container variant="wide" className="space-dashboard">
        <Button
          variant="outline"
          onClick={handleBack}
          className="interactive-hover flex items-center gap-2"
          size="sm"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
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
    "Name": template.name,
    "Description": template.description,
    "App Port": template.config?.appPort,
    "Deployment Duration": template.config?.deploymentDuration || "1h",
    "CPU Units": template.config?.cpuUnits || "0.5",
    "Memory Size": template.config?.memorySize || "1Gi",
    "Storage Size": template.config?.storageSize || "2Gi",
  };

  return (
    <Container variant="wide" className="space-dashboard">
      <div className="flex items-center space-element">
        <Button
          variant="outline"
          onClick={handleBack}
          className="interactive-hover flex items-center gap-2"
          size="sm"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>

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
                <Text variant="small" className="font-medium font-mono break-all">
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
