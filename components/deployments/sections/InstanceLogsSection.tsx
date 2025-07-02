import React from "react";
import { Card, Heading, Text } from "@/components/ui/design-system";
import { Button } from "@/components/ui/button";
import { RefreshCw, Terminal, Clock } from "lucide-react";
import { useDeploymentLogs } from "@/hooks/deployments/useDeployments";
import { ProviderType } from "@/lib/types";
import { SectionProps } from "@/lib/serviceConfig";
import { isDeploymentActive } from "@/lib/deployment";

export function InstanceLogsSection({ deployment }: SectionProps) {
  // Check if deployment is active
  const deploymentActive = isDeploymentActive(
    deployment.created_at,
    deployment.duration
  );

  const {
    data: logs,
    isLoading: logsLoading,
    error: logsError,
    refetch: refetchLogs,
    isFetching,
  } = useDeploymentLogs(
    Number(deployment.lease_id),
    deployment.provider as ProviderType
  );

  // Format logs for display
  const formattedLogs = logs || "No logs available";

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-primary" />
            <Heading level={2}>Instance Logs</Heading>
          </div>
          {deploymentActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetchLogs()}
              disabled={isFetching}
              className="hover:bg-secondary/30"
            >
              <RefreshCw
                size={16}
                className={`mr-2 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Refreshing..." : "Refresh"}
            </Button>
          )}
        </div>
      </div>

      <Card variant="primary" className="h-full flex flex-col">
        {!deploymentActive ? (
          <div className="py-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <Clock size={32} className="text-muted-foreground" />
              <div>
                <Text variant="base" className="text-muted-foreground">
                  Logs not available
                </Text>
                <Text variant="small" muted>
                  This deployment has expired
                </Text>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-black/90 rounded-md p-4 overflow-auto flex-grow font-mono text-sm min-h-[400px] border border-border/50">
            {logsLoading ? (
              <div className="text-gray-400 flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border border-gray-400 border-t-transparent rounded-full"></div>
                Loading logs...
              </div>
            ) : logsError ? (
              <div className="text-red-400">
                Error loading logs: {String(logsError)}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-all text-gray-100 leading-relaxed">
                {formattedLogs}
              </pre>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
