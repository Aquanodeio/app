"use client";

import React, { use } from "react";
import modelsData from "@/lib/launchables/models.json";
import LaunchableDeploymentPage, {
  LaunchableTemplate,
  SERVICE_CONFIGS,
} from "@/components/services/common/LaunchableDeploymentPage";

type ModelDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ModelDetailPage = ({ params }: ModelDetailPageProps) => {
  const { id } = use(params);

  // Cast the imported JSON data to the LaunchableTemplate type
  const templates = modelsData as LaunchableTemplate[];

  return (
    <LaunchableDeploymentPage
      templateId={id}
      templates={templates}
      serviceConfig={SERVICE_CONFIGS.MODELS}
    />
  );
};

export default ModelDetailPage;
