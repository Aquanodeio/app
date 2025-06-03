"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy, ExternalLink, RefreshCw } from "lucide-react";
import {
  useDeployment,
  useCloseDeployment,
  useDeploymentLogs,
} from "@/hooks/deployments/useDeployments";
import { isDeploymentActive } from "@/lib/deployment";
import { LiveMetrics } from "@/components/deployments/LiveMetrics";
import { ProviderType } from "@/lib/types";
import { Container, Heading, Text, Card, Grid, StatsCard } from "@/components/ui/design-system";

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
      <Container variant="wide" className="space-dashboard">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-secondary/20 rounded"></div>
          <div className="h-32 bg-secondary/20 rounded"></div>
          <div className="h-32 bg-secondary/20 rounded"></div>
        </div>
      </Container>
    );
  }

  if (!deployment) {
    return (
      <Container variant="wide" className="space-dashboard">
        <Heading level={1}>
          Deployment Not Found
        </Heading>
      </Container>
    );
  }

  return (
    <Container variant="wide" className="space-dashboard">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-element gap-4 sm:gap-0">
        <Heading level={1}>Deployment Details</Heading>
        <Button
          variant="destructive"
          onClick={handleClose}
          disabled={closing}
          className="w-full sm:w-auto"
        >
          {closing ? "Closing..." : "Close Deployment"}
        </Button>
      </div>

      <div className="space-component">
        {/* Top Row with Status, Timestamps, and App URL */}
        <Grid variant="responsive-4" className="space-tight">
          {/* Status */}
          <StatsCard
            title="Status"
            value={isDeploymentActive(deployment.createdAt, deployment.duration) ? "Active" : "Expired"}
          />
          
          {/* Timestamps */}
          <Card variant="compact">
            <Heading level={6} className="space-tight">
              Timestamps
            </Heading>
            <div className="space-y-2">
              <div>
                <Text variant="caption" muted>
                  Created
                </Text>
                <Text variant="small">
                  {new Date(deployment.createdAt).toLocaleString()}
                </Text>
              </div>
            </div>
          </Card>

          {/* App URL */}
          {deployment.appUrl && (
            <Card variant="compact" className="sm:col-span-2" interactive>
              <div className="flex justify-between items-center">
                <div className="max-w-[calc(100%-50px)] overflow-hidden">
                  <Text variant="caption" muted className="space-tight">
                    App URL
                  </Text>
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
            </Card>
          )}
        </Grid>
        
        {/* Configuration Row */}
        <Card variant="primary">
          <Heading level={2} className="space-tight">
            Configuration
          </Heading>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <Text variant="caption" muted>
                Provider
              </Text>
              <Text variant="small" className="capitalize">
                {deployment.provider}
              </Text>
            </div>
            <div>
              <Text variant="caption" muted>
                CPU
              </Text>
              <Text variant="small">
                {deployment.cpu} units
              </Text>
            </div>
            <div>
              <Text variant="caption" muted>
                Memory
              </Text>
              <Text variant="small">{deployment.memory}</Text>
            </div>
            <div>
              <Text variant="caption" muted>
                Storage
              </Text>
              <Text variant="small">{deployment.storage}</Text>
            </div>
            <div>
              <Text variant="caption" muted>
                Duration
              </Text>
              <Text variant="small">{deployment.duration}</Text>
            </div>
            <div>
              <Text variant="caption" muted>
                Deployment ID
              </Text>
              <Text variant="small" className="break-words">
                {deployment.deploymentId}
              </Text>
            </div>
          </div>
        </Card>

        {/* Live Metrics */}
        <Card variant="primary">
          <LiveMetrics deploymentId={deployment.deploymentId} />
        </Card>
        
        {/* Logs Panel */}
        <LogsPanel leaseId={Number(deployment.leaseId)} provider={deployment.provider as ProviderType} />
      </div>
    </Container>
  );
}

// Logs Panel Component
function LogsPanel({ leaseId, provider }: { leaseId: number, provider: ProviderType }) {
  const { 
    data: logs, 
    isLoading: logsLoading, 
    error: logsError,
    refetch: refetchLogs,
    isFetching
  } = useDeploymentLogs(leaseId, provider);
  
  // Format logs for display
  const formattedLogs = logs || "No logs available";
  
  return (
    <Card variant="primary" className="h-full flex flex-col">
      <div className="flex justify-between items-center space-tight">
        <Heading level={2}>Instance Logs</Heading>
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
