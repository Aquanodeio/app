import React, { useEffect, useState } from "react";
import { Card, Grid, Heading, Text } from "@/components/ui/design-system";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Activity, Cpu, MemoryStick, Clock } from "lucide-react";
import { SectionProps } from "@/lib/serviceConfig";
import { isDeploymentActive } from "@/lib/deployment";

interface DeploymentStats {
  deployment_id: number;
  memory_current_bytes: number;
  memory_max_bytes: number;
  cpu_usage_usec: number;
  cpu_user_usec: number;
  cpu_system_usec: number;
  created_at: string;
}

export function LiveMetricsSection({ deployment }: SectionProps) {
  const [stats, setStats] = useState<DeploymentStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if deployment is active
  const deploymentActive = isDeploymentActive(
    deployment.created_at,
    deployment.duration
  );

  const fetchStats = async () => {
    // Don't fetch if deployment is expired
    if (!deploymentActive) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/monitoring/stats/${deployment.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch metrics");
    }
  };

  useEffect(() => {
    const getInitialStats = async () => {
      await fetchStats();
      setIsLoading(false);
    };

    getInitialStats();

    // Only set up interval if deployment is active
    if (deploymentActive) {
      const interval = setInterval(fetchStats, 1000);
      return () => clearInterval(interval);
    }
  }, [deployment.id, deploymentActive]);

  // Show expired state
  if (!deploymentActive) {
    return (
      <Card variant="primary">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-muted-foreground" />
            <Heading level={4}>Live Metrics</Heading>
          </div>

          <div className="py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <Clock size={32} className="text-muted-foreground" />
              <div>
                <Text variant="base" className="text-muted-foreground">
                  Metrics not available
                </Text>
                <Text variant="small" muted>
                  This deployment has expired
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card variant="primary">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            <Heading level={4}>Live Metrics</Heading>
          </div>
          <Grid variant="responsive-2" className="gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </Grid>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="primary">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              <Heading level={4}>Live Metrics</Heading>
            </div>
            <Button variant="ghost" size="sm" onClick={fetchStats}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
          <div className="py-8 text-center">
            <Text variant="base" className="text-destructive">
              Error loading metrics: {error}
            </Text>
          </div>
        </div>
      </Card>
    );
  }

  const latestStats = stats[0];
  if (!latestStats) {
    return (
      <Card variant="primary">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            <Heading level={4}>Live Metrics</Heading>
          </div>
          <div className="py-8 text-center">
            <Text variant="base" className="text-muted-foreground">
              No metrics available yet
            </Text>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="primary">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            <Heading level={4}>Live Metrics</Heading>
          </div>
          <Button variant="ghost" size="sm" onClick={fetchStats}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Grid variant="responsive-2" className="gap-6">
          {/* Memory Usage Card */}
          <Card variant="compact" className="bg-secondary/5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MemoryStick size={16} className="text-blue-500" />
                <Text variant="small" className="font-medium text-blue-500">
                  Memory Usage
                </Text>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Text variant="caption" muted>
                    Current
                  </Text>
                  <Text variant="small" className="font-mono font-medium">
                    {(latestStats.memory_current_bytes / 1024 / 1024).toFixed(
                      2
                    )}{" "}
                    MB
                  </Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="caption" muted>
                    Maximum
                  </Text>
                  <Text variant="small" className="font-mono font-medium">
                    {(latestStats.memory_max_bytes / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{
                      width: `${Math.min((latestStats.memory_current_bytes / latestStats.memory_max_bytes) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* CPU Usage Card */}
          <Card variant="compact" className="bg-secondary/5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-green-500" />
                <Text variant="small" className="font-medium text-green-500">
                  CPU Usage
                </Text>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Text variant="caption" muted>
                    Total
                  </Text>
                  <Text variant="small" className="font-mono font-medium">
                    {(latestStats.cpu_usage_usec / 1000000).toFixed(2)}s
                  </Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="caption" muted>
                    User
                  </Text>
                  <Text variant="small" className="font-mono font-medium">
                    {(latestStats.cpu_user_usec / 1000000).toFixed(2)}s
                  </Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="caption" muted>
                    System
                  </Text>
                  <Text variant="small" className="font-mono font-medium">
                    {(latestStats.cpu_system_usec / 1000000).toFixed(2)}s
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </div>
    </Card>
  );
}
