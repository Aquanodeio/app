"use client";

import { use } from "react";
import vmTemplatesData from "@/lib/launchables/vms.json";
import LaunchableDeploymentPage, {
  LaunchableTemplate,
  SERVICE_CONFIGS,
} from "@/components/services/common/LaunchableDeploymentPage";

type TemplateDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TemplateDetailsPage = ({ params }: TemplateDetailPageProps) => {
  const { id } = use(params);

  // Cast the imported JSON data to the LaunchableTemplate type
  const templates = vmTemplatesData as LaunchableTemplate[];

  return (
    <LaunchableDeploymentPage
      templateId={id}
      templates={templates}
      serviceConfig={SERVICE_CONFIGS.VMS}
    />
  );
};

export default TemplateDetailsPage;
