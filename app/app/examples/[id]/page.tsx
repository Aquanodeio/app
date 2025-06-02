"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Example, examples } from "@/components/List";
import { useExampleDeploy } from "@/lib/logic/ExampleDeployLogic";

const ExamplesDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const from = searchParams.get("from") || "/app/examples";
  const { user, isLoading } = useAuth();
  const [example, setExample] = useState<Example | null>(null);

  useEffect(() => {
    if (params.id) {
      const exampleId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundExample = examples.find(e => e.id === exampleId);
      setExample(foundExample || null);
    }
  }, [params.id]);

  const handleBack = () => {
    router.push(from);
  };

  // Always call hooks at the top level
  const { isDeploying, handleDeploy, isButtonDisabled } = useExampleDeploy({
    example,
    user,
    isAuthLoading: isLoading,
  });

  // If template is not found, show not found message
  if (!example) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={handleBack}
          className="hover-effect flex items-center gap-2"
          size="sm"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold">Template not found</h1>
          <p className="mt-2 text-muted-foreground">
            The template you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Create display details for the UI
  const displayDetails = {
    "Name": example.name,
    "Description": example.description,
    "Repository URL": example.config?.repoUrl,
    "Branch Name": example.config?.branchName,
    "App Port": example.config?.appPort,
    "Run Commands": example.config?.runCommands,
    "Deployment Duration": example.config?.deploymentDuration || "1h",
    "CPU Units": example.config?.cpuUnits || "0.5",
    "Memory Size": example.config?.memorySize || "1Gi",
    "Storage Size": example.config?.storageSize || "2Gi",
  };

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="hover-effect flex items-center gap-2 text-sm sm:text-base"
            size="sm"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-foreground">
            {example.name}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {example.description}
          </p>
        </div>

        <div className="dashboard-card subtle-glow">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold">Configuration</h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {Object.entries(displayDetails).map(([key, value]) => (
                <div
                  key={key}
                  className="p-3 sm:p-4 rounded-lg bg-secondary/5 border border-border/30"
                >
                  <p className="text-xs text-muted-foreground mb-1">{key}</p>
                  <p className="text-xs sm:text-sm font-medium font-mono break-all">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button
                size="default"
                className="btn-primary shadow-lg shadow-primary/10 hover-effect w-full sm:w-auto"
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
        </div>
      </div>
    </div>
  );
};

export default ExamplesDetailsPage;
