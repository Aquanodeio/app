"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { useExampleDeploy } from "@/lib/logic/ExampleDeployLogic";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { examples } from "@/components/list";

const StreamlitCalculatorTemplate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/app/templates";
  const { user, isLoading } = useAuth();

  const handleBack = () => {
    router.push(from);
  };

  const templateDetails = {
    "Repository URL": "https://github.com/Aquanodeio/templates.git",
    "Branch Name": "main",
    "Run Commands": "cd python-calculator-server && pip3 install -r requirements.txt && streamlit run main.py",
    "App Port": "8501",
    "Deployment Duration": "1h",
    "CPU Units": "0.5",
    "Memory Size": "1Gi",
    "Storage Size": "3Gi",
  };

  const { isDeploying, handleDeploy, isButtonDisabled } = useExampleDeploy({
    templateDetails,
    user,
    isAuthLoading: isLoading,
  });

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
            {examples[1].name}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {examples[1].description} 
          </p>
        </div>

        <div className="dashboard-card subtle-glow">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold">Configuration</h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {Object.entries(templateDetails).map(([key, value]) => (
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

export default StreamlitCalculatorTemplate;
