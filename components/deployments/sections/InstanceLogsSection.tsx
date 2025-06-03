import React from "react";
import { Card, Heading } from "@/components/ui/design-system";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useDeploymentLogs } from "@/hooks/deployments/useDeployments";
import { ProviderType } from "@/lib/types";
import { SectionProps } from "@/lib/serviceConfig";

export function InstanceLogsSection({ deployment }: SectionProps) {
  const { 
    data: logs, 
    isLoading: logsLoading, 
    error: logsError,
    refetch: refetchLogs,
    isFetching
  } = useDeploymentLogs(Number(deployment.leaseId), deployment.provider as ProviderType);
  
  // Format logs for display
  const formattedLogs = logs || "No logs available";
  
  return (
    <Card variant="primary" className="h-full flex flex-col">
      <div className="flex justify-between items-center space-tight">
        <Heading level={4}>Instance Logs</Heading>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => refetchLogs()}
          disabled={isFetching}
          className="hover:bg-secondary/30"
        >
          <RefreshCw size={16} className={`mr-2 ${isFetching ? 'animate-spin' : ''}`} />
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
      
      <div className="bg-black/80 rounded-md p-3 overflow-auto flex-grow font-mono text-xs sm:text-sm min-h-[300px]">
        {logsLoading ? (
          <div className="text-gray-400">Loading logs...</div>
        ) : logsError ? (
          <div className="text-red-400">Error loading logs</div>
        ) : (
          <pre className="whitespace-pre-wrap break-all text-gray-300">{formattedLogs}</pre>
        )}
      </div>
    </Card>
  );
} 