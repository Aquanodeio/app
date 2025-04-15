import React from "react";

interface ResourceSpec {
  label: string;
  value: string;
}

interface DefaultResourceViewProps {
  resources: ResourceSpec[];
}

export default function DefaultResourceView({ resources }: DefaultResourceViewProps) {
  return (
    <div className="dashboard-card mb-6 sm:mb-8">
      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
        Quick Deploy
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4 sm:mb-5">
        {resources.map((resource, index) => (
          <div key={index} className="p-3 rounded-lg bg-secondary/5 border border-border/30">
            <p className="text-xs text-muted-foreground mb-1">{resource.label}</p>
            <p className="text-base sm:text-lg font-medium">{resource.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 