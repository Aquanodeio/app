import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 p-4 rounded-lg text-destructive">
        <p>Error loading metrics: {error}</p>
        <Button variant="ghost" size="sm" onClick={fetchStats} className="mt-2">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  const latestStats = stats[0];
  if (!latestStats) {
    return (
      <div className="bg-secondary/10 p-4 rounded-lg text-muted-foreground">
        No metrics available yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Live Metrics</h3>
        <Button variant="ghost" size="sm" onClick={fetchStats}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-secondary/20 p-4 rounded-xl">
          <h4 className="text-sm text-muted-foreground mb-2">Memory Usage</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm">Current:</span>
              <span className="font-mono">{(latestStats.memory_current_bytes / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Max:</span>
              <span className="font-mono">{(latestStats.memory_max_bytes / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          </div>
        </div>

        <div className="bg-secondary/20 p-4 rounded-xl">
          <h4 className="text-sm text-muted-foreground mb-2">CPU Usage</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm">Total:</span>
              <span className="font-mono">{(latestStats.cpu_usage_usec / 1000000).toFixed(2)}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">User:</span>
              <span className="font-mono">{(latestStats.cpu_user_usec / 1000000).toFixed(2)}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">System:</span>
              <span className="font-mono">{(latestStats.cpu_system_usec / 1000000).toFixed(2)}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}