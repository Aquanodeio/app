"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy, ExternalLink } from "lucide-react";
import {
  useDeployment,
  useCloseDeployment,
} from "@/hooks/deployments/useDeployments";
import { isDeploymentActive } from "@/lib/deployment";
import { LiveMetricsSection } from "@/components/deployments/sections/LiveMetricsSection";
import { ServiceSectionRenderer } from "@/components/deployments/ServiceSectionRenderer";
import { getServiceConfig, isBasicSectionEnabled } from "@/lib/serviceConfig";
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

  // Get service configuration and section visibility
  const serviceConfig = getServiceConfig(deployment.deployment_type);
  const showStatus = isBasicSectionEnabled(deployment.deployment_type, 'status');
  const showTimestamps = isBasicSectionEnabled(deployment.deployment_type, 'timestamps');
  const showAppUrl = isBasicSectionEnabled(deployment.deployment_type, 'appUrl');
  const showConfiguration = isBasicSectionEnabled(deployment.deployment_type, 'configuration');
  const showLiveMetrics = isBasicSectionEnabled(deployment.deployment_type, 'liveMetrics');

  return (
    <Container variant="wide" className="space-dashboard">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-element gap-4 sm:gap-0">
        <div>
          <Heading level={1}>Deployment Details</Heading>
          {/* <Text variant="small" muted className="space-tight">
            {serviceConfig.name}
          </Text> */}
        </div>
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
        {/* Top Row with Status, Timestamps, and App URL - all conditionally rendered */}
        {(showStatus || showTimestamps || showAppUrl) && (
          <Grid variant="responsive-4" className="space-tight">
            {/* Status */}
            {showStatus && (
              <StatsCard
                title="Status"
                value={isDeploymentActive(deployment.createdAt, deployment.duration) ? "Active" : "Expired"}
              />
            )}
            
            {/* Timestamps */}
            {showTimestamps && (
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
            )}

            {/* App URL */}
            {showAppUrl && deployment.appUrl && (
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
        )}
        
        {/* Configuration Row */}
        {showConfiguration && (
          <Card variant="primary">
            <Heading level={2} className="space-tight">
              Configuration
            </Heading>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div>
                <Text variant="caption" muted>
                  Service Type
                </Text>
                <Text variant="small" className="capitalize">
                  {serviceConfig.name}
                </Text>
              </div>
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
            </div>
          </Card>
        )}

        {/* Conditionally show Live Metrics based on service type */}
        {showLiveMetrics && <LiveMetricsSection deployment={deployment} />}

        {/* Service-Specific Custom Sections */}
        <ServiceSectionRenderer deployment={deployment} />
      </div>
    </Container>
  );
}
