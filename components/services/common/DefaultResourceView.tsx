import React from "react";

interface ResourceSpec {
  label: string;
  value: string;
}

interface DefaultResourceViewProps {
  resources: ResourceSpec[];
  allowAutoscale?: boolean;
  autoRedeploy?: boolean;
  onAllowAutoscaleChange?: (value: boolean) => void;
  onAutoRedeployChange?: (value: boolean) => void;
}

export default function DefaultResourceView({ 
  resources, 
  allowAutoscale = false, 
  autoRedeploy = true,
  onAllowAutoscaleChange,
  onAutoRedeployChange
}: DefaultResourceViewProps) {
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
      
      <div className="flex flex-col space-y-3 mt-4 border-t border-border/30 pt-4">
        <div className="flex items-center space-x-2 hover:bg-secondary/5 p-2 rounded-md cursor-pointer">
          <input
            type="checkbox"
            id="allowAutoscale"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            checked={allowAutoscale}
            onChange={(e) => onAllowAutoscaleChange?.(e.target.checked)}
          />
          <label 
            htmlFor="allowAutoscale" 
            className="text-sm font-medium cursor-pointer select-none"
            onClick={() => onAllowAutoscaleChange?.(!allowAutoscale)}
          >
            Allow Autoscale
          </label>
        </div>
        
        <div className="flex items-center space-x-2 hover:bg-secondary/5 p-2 rounded-md cursor-pointer">
          <input
            type="checkbox"
            id="autoRedeploy"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            checked={autoRedeploy}
            onChange={(e) => onAutoRedeployChange?.(e.target.checked)}
          />
          <div 
            className="flex flex-col cursor-pointer select-none"
            onClick={() => onAutoRedeployChange?.(!autoRedeploy)}
          >
            <label 
              htmlFor="autoRedeploy" 
              className="text-sm font-medium cursor-pointer"
            >
              Auto Redeploy on Git Updates
            </label>
            <p className="text-xs text-muted-foreground">
              Automatically redeploy when git repository is updated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 