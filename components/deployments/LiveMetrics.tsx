import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { Card, Grid, Heading, Text } from "../ui/design-system";

interface DeploymentStats {
  deployment_id: number;
  memory_current_bytes: number;
  memory_max_bytes: number;
  cpu_usage_usec: number;
  cpu_user_usec: number;
  cpu_system_usec: number;
  created_at: string;
}

interface LiveMetricsProps {
  deploymentId: string;
}

export function LiveMetrics({ deploymentId }: LiveMetricsProps) {
  const [stats, setStats] = useState<DeploymentStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/monitoring/stats/${deploymentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    }
  };

  useEffect(() => {
    const getInitialStats = async () => {
      await fetchStats();
      setIsLoading(false);
    };

    getInitialStats();
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, [deploymentId]);

  if (isLoading) {
    return (
      <Grid variant="responsive-2" className="space-component">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </Grid>
    );
  }

  if (error) {
    return (
      <Card variant="elevated" className="text-destructive">
        <Text variant="base">Error loading metrics: {error}</Text>
        <Button variant="ghost" size="sm" onClick={fetchStats} className="btn-ghost btn-sm mt-2">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </Card>
    );
  }

  const latestStats = stats[0];
  if (!latestStats) {
    return (
      <Card variant="glass" className="text-muted-foreground">
        <Text variant="base">No metrics available yet</Text>
      </Card>
    );
  }

  return (
    <div className="space-component">
      <div className="flex justify-between items-center space-element">
        <Heading level={4}>Live Metrics</Heading>
        <Button variant="ghost" size="sm" onClick={fetchStats} className="btn-ghost btn-sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <Grid variant="responsive-2">
        <Card variant="primary">
          <Heading level={6} className="text-muted-foreground space-tight">Memory Usage</Heading>
          <div className="space-y-1">
            <div className="flex justify-between">
              <Text variant="small">Current:</Text>
              <Text variant="small" className="font-mono">{(latestStats.memory_current_bytes / 1024 / 1024).toFixed(2)} MB</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="small">Max:</Text>
              <Text variant="small" className="font-mono">{(latestStats.memory_max_bytes / 1024 / 1024).toFixed(2)} MB</Text>
            </div>
          </div>
        </Card>

        <Card variant="primary">
          <Heading level={6} className="text-muted-foreground space-tight">CPU Usage</Heading>
          <div className="space-y-1">
            <div className="flex justify-between">
              <Text variant="small">Total:</Text>
              <Text variant="small" className="font-mono">{(latestStats.cpu_usage_usec / 1000000).toFixed(2)}s</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="small">User:</Text>
              <Text variant="small" className="font-mono">{(latestStats.cpu_user_usec / 1000000).toFixed(2)}s</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="small">System:</Text>
              <Text variant="small" className="font-mono">{(latestStats.cpu_system_usec / 1000000).toFixed(2)}s</Text>
            </div>
          </div>
        </Card>
      </Grid>
    </div>
  );
}