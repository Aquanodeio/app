import React from "react";
import { Button } from "@/components/ui/button";
import { Deployment } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Card, Heading, Text } from "../../ui/design-system";

interface ServiceSidebarProps {
  deployments: Deployment[];
  onRefresh: () => void;
  onCreateNew: () => void;
  isDeploymentActive: (createdAt: string, duration: string) => boolean;
  serviceName: string;
}

const ServiceSidebar: React.FC<ServiceSidebarProps> = ({
  deployments,
  onRefresh,
  onCreateNew,
  isDeploymentActive,
  serviceName,
}) => {
  return (
    <div className="space-component">
      {/* Quick Actions */}
      {/* <Card variant="primary">
        <Heading level={5} className="space-element">
          Quick Actions
        </Heading>
        <div className="space-y-2">
          <Button
            onClick={onRefresh}
            className="btn-secondary btn-sm w-full"
            variant="outline"
          >
            Refresh Deployments
          </Button>
          <Button
            className="btn-primary btn-sm w-full"
            onClick={onCreateNew}
          >
            Create New Instance
          </Button>
        </div>
      </Card> */}

      {/* Recent Activity */}
      <Card variant="primary">
        <Heading level={5} className="space-element">
          Recent Activity
        </Heading>
        {deployments.length === 0 ? (
          <Text variant="small" muted>No recent activity</Text>
        ) : (
          <div className="space-y-3">
            {deployments.slice(0, 3).map((deployment) => (
              <div
                key={deployment.deploymentId}
                className="border-b border-border/40 pb-2 last:border-0"
              >
                <div className="flex items-center justify-between space-tight">
                  <Text variant="small" className="font-medium">
                    {serviceName} {deployment.deploymentId}
                  </Text>
                  <span
                    className={`status-badge ${
                      isDeploymentActive(
                        deployment.createdAt,
                        deployment.duration
                      )
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {isDeploymentActive(
                      deployment.createdAt,
                      deployment.duration
                    )
                      ? "Active"
                      : "Expired"}
                  </span>
                </div>
                <Text variant="small" muted>
                  {formatDistanceToNow(new Date(deployment.createdAt))} ago
                </Text>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ServiceSidebar;
