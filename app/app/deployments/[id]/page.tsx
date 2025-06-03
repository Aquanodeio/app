"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy, ExternalLink, Clock, Server, Cpu, HardDrive, Database, Timer } from "lucide-react";
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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="space-y-2">
          <Heading level={1}>Deployment Details</Heading>
          <Text variant="base" muted>
            {serviceConfig.name} • ID: {deployment.deploymentId}
          </Text>
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

      <div className="space-y-8">
        {/* Status Overview Row */}
        {(showStatus || showTimestamps || showAppUrl) && (
          <Grid variant="responsive-3" className="gap-4">
            {/* Status Card */}
            {showStatus && (
              <StatsCard
                title="Status"
                value={isDeploymentActive(deployment.createdAt, deployment.duration) ? "Active" : "Expired"}
              />
            )}
            
            {/* Timestamps Card */}
            {showTimestamps && (
              <Card variant="compact" className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <Text variant="caption" muted>
                    Created
                  </Text>
                </div>
                <Text variant="small" className="font-medium">
                  {new Date(deployment.createdAt).toLocaleString()}
                </Text>
              </Card>
            )}

            {/* App URL Card */}
            {showAppUrl && deployment.appUrl && (
              <Card variant="compact" interactive>
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink size={16} className="text-muted-foreground flex-shrink-0" />
                      <Text variant="caption" muted>
                        App URL
                      </Text>
                    </div>
                    <a
                      href={deployment.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors font-mono text-sm truncate block"
                      title={deployment.appUrl}
                    >
                      {deployment.appUrl.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(deployment.appUrl!, "App URL")}
                    className="hover:bg-secondary/30 flex-shrink-0 ml-2"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </Card>
            )}
          </Grid>
        )}
        
        {/* Configuration Section */}
        {showConfiguration && (
          <Card variant="primary">
            <Grid variant="responsive-3" className="gap-6">
              {/* Service & Provider Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Server size={16} className="text-primary" />
                  <Text variant="small" className="font-medium text-primary">
                    Service Details
                  </Text>
                </div>
                <div className="space-y-3">
                  <div>
                    <Text variant="caption" muted>Service Type</Text>
                    <Text variant="small" className="font-medium capitalize">
                      {serviceConfig.name}
                    </Text>
                  </div>
                  <div>
                    <Text variant="caption" muted>Provider</Text>
                    <Text variant="small" className="font-medium capitalize">
                      {deployment.provider}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Resource Allocation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-primary" />
                  <Text variant="small" className="font-medium text-primary">
                    Resources
                  </Text>
                </div>
                <div className="space-y-3">
                  <div>
                    <Text variant="caption" muted>CPU</Text>
                    <Text variant="small" className="font-medium">
                      {deployment.cpu} units
                    </Text>
                  </div>
                  <div>
                    <Text variant="caption" muted>Memory</Text>
                    <Text variant="small" className="font-medium">
                      {deployment.memory}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Storage & Duration */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-primary" />
                  <Text variant="small" className="font-medium text-primary">
                    Storage & Time
                  </Text>
                </div>
                <div className="space-y-3">
                  <div>
                    <Text variant="caption" muted>Storage</Text>
                    <Text variant="small" className="font-medium">
                      {deployment.storage}
                    </Text>
                  </div>
                  <div>
                    <Text variant="caption" muted>Duration</Text>
                    <Text variant="small" className="font-medium">
                      {deployment.duration}
                    </Text>
                  </div>
                </div>
              </div>
            </Grid>
          </Card>
        )}

        {/* Live Metrics Section */}
        {showLiveMetrics && <LiveMetricsSection deployment={deployment} />}

        {/* Service-Specific Custom Sections */}
        <ServiceSectionRenderer deployment={deployment} />
      </div>
    </Container>
  );
}
