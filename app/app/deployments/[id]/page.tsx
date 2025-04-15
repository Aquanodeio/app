"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Deployment } from "../../../../lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy, ExternalLink, RefreshCw } from "lucide-react";
import {
  useDeployment,
  useCloseDeployment,
  useDeploymentLogs,
} from "@/hooks/queries/useDeployments";
import { isDeploymentActive } from "@/lib/deployment/utils";

export default function DeploymentDetailsPage() {
  const params = useParams();
  const { toast } = useToast();

  // tanstack query to fetch deployment details
  const {
    data: deployment,
    isLoading: loading,
    error,
    refetch: fetchDeployment,
  } = useDeployment(Number(params.id));

  // tanstack mutation for closing deployment
  const { mutate: closeDeploymentMutation, isPending: closing } =
    useCloseDeployment();

  // error toast if fetching fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch deployment details",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleClose = () => {
    if (!deployment) return;

    closeDeploymentMutation(Number(deployment.deploymentId));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground px-0 sm:px-6 py-4 sm:py-6">
        <div className="animate-pulse space-y-4 px-4 sm:px-0">
          <div className="h-8 w-64 bg-secondary/20 rounded"></div>
          <div className="h-32 bg-secondary/20 rounded"></div>
          <div className="h-32 bg-secondary/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="min-h-screen bg-background text-foreground px-0 sm:px-6 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 px-4 sm:px-0">
          Deployment Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-0 sm:px-6 py-4 sm:py-6">
      <div className="ml-4 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 px-4 sm:px-0 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-4xl font-bold">Deployment Details</h1>
        <Button
          variant="destructive"
          onClick={handleClose}
          disabled={closing}
          className="w-full sm:w-auto"
        >
          {closing ? "Closing..." : "Close Deployment"}
        </Button>
      </div>

      <div className="ml-4 space-y-4 sm:space-y-6 px-4 sm:px-0">
        {/* Top Row with Status, Timestamps, and App URL */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
          {/* Status - 25% width */}
          <div className="bg-secondary/20 p-4 sm:p-6 rounded-xl hover:bg-secondary/30 transition-colors">
            <span className="text-sm text-muted-foreground block mb-1">
              Status
            </span>
            <span className="text-foreground font-semibold">
              {isDeploymentActive(
                deployment.createdAt,
                deployment.duration
              )
                ? "Active"
                : "Expired"}
            </span>
          </div>
          {/* Timestamps - 25% width */}
          <div className="bg-secondary/20 p-4 sm:p-6 rounded-xl">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Timestamps
            </h2>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div>
                <span className="text-sm text-muted-foreground block">
                  Created
                </span>
                <span className="text-foreground">
                  {new Date(deployment.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* App URL - 50% width */}
          {deployment.appUrl && (
            <div className="sm:col-span-2 bg-secondary/20 p-4 sm:p-6 rounded-xl hover:bg-secondary/30 transition-colors">
              <div className="flex justify-between items-center">
                <div className="max-w-[calc(100%-50px)] overflow-hidden">
                  <span className="text-sm text-muted-foreground block mb-1">
                    App URL
                  </span>
                  <a
                    href={deployment.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-mono hover:text-primary transition-colors inline-flex items-center gap-2 truncate text-sm sm:text-base"
                  >
                    <span className="truncate">{deployment.appUrl}</span>
                    <ExternalLink size={16} className="flex-shrink-0" />
                  </a>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    copyToClipboard(deployment.appUrl!, "App URL")
                  }
                  className="hover:bg-secondary/30 flex-shrink-0"
                >
                  <Copy size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Configuration Row - Full Width */}
        <div className="bg-secondary/20 p-4 sm:p-6 rounded-xl">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Configuration
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <span className="text-sm text-muted-foreground block">
                Provider
              </span>
              <span className="text-foreground capitalize">
                {deployment.provider}
              </span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">
                CPU
              </span>
              <span className="text-foreground">
                {deployment.cpu} units
              </span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">
                Memory
              </span>
              <span className="text-foreground">{deployment.memory}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">
                Storage
              </span>
              <span className="text-foreground">{deployment.storage}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">
                Duration
              </span>
              <span className="text-foreground">{deployment.duration}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">
                Deployment ID
              </span>
              <span className="text-foreground break-words">
                {deployment.deploymentId}
              </span>
            </div>
          </div>
        </div>
        
        {/* Logs Panel */}
        {/* <LogsPanel leaseId={Number(deployment.leaseId)} /> */}
      </div>
    </div>
  );
}

// Logs Panel Component
function LogsPanel({ leaseId }: { leaseId: number }) {
  const { 
    data: logs, 
    isLoading: logsLoading, 
    error: logsError,
    refetch: refetchLogs
  } = useDeploymentLogs(leaseId);
  
  // Format logs for display
  const formattedLogs = logs || "No logs available";
  
  return (
    <div className="bg-secondary/20 p-4 sm:p-6 rounded-xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold">Instance Logs</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => refetchLogs()}
          className="hover:bg-secondary/30"
        >
          <RefreshCw size={16} className="mr-2" />
          Refresh
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
    </div>
  );
}
