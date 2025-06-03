import React from "react";
import { Deployment } from "@/lib/types";
import { getCustomSections } from "@/lib/serviceConfig";

interface ServiceSectionRendererProps {
  deployment: Deployment;
}

export function ServiceSectionRenderer({ deployment }: ServiceSectionRendererProps) {
  const customSections = getCustomSections(deployment.deployment_type);

  return (
    <div className="space-component">
      {customSections.map((section) => {
        const SectionComponent = section.component;
        
        return (
          <SectionComponent 
            key={section.key} 
            deployment={deployment} 
          />
        );
      })}
    </div>
  );
} 