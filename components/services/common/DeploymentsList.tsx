import React from "react";
import { Button } from "@/components/ui/button";
import { Deployment } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { useRouter } from "next/navigation";
import { isDeploymentActive } from "@/lib/deployment";
interface DeploymentsListProps {
  isLoading: boolean;
  error: string | null;
  deployments: Deployment[];
  onDelete?: (deploymentId: string) => void;
  serviceName?: string;
}

const DeploymentsList: React.FC<DeploymentsListProps> = ({
  isLoading,
  error,
  deployments,
  onDelete,
  serviceName,
}) => {
  const router = useRouter();

  const renderSkeletonDeployments = () => (
    <div className="grid gap-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="card-primary flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        >
          <div className="space-y-2 flex-grow">
            <Skeleton className="h-4 w-full max-w-[300px]" />
            <Skeleton className="h-4 w-full max-w-[250px]" />
            <Skeleton className="h-4 w-full max-w-[200px]" />
          </div>
          <div className="flex gap-2 self-end md:self-center">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return renderSkeletonDeployments();
  }

  if (error) {
    return <p className="body-base text-destructive">{error}</p>;
  }

  if (deployments.length === 0) {
    return (
      <div className="card-glass text-center py-16">
        <p className="heading-5 text-muted-foreground space-tight">No deployments found</p>
        <p className="body-small text-muted-foreground/70">
          Create a new instance to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 w-full">
      {deployments.map((deployment) => {
        const deploymentActive = isDeploymentActive(
          deployment.createdAt,
          deployment.duration
        );
        return (
          <div
            key={deployment.deploymentId}
            className="card-primary flex flex-col md:flex-row md:items-center md:justify-between gap-3 w-full overflow-hidden"
          >
            <div className="space-y-2 flex-grow min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="body-small text-muted-foreground">ID:</span>
                <Link
                  href={`/app/deployments/${deployment.deploymentId}`}
                  className="body-small text-foreground hover:text-primary hover:underline font-medium truncate max-w-[180px] sm:max-w-[240px]"
                  title={deployment.deploymentId}
                >
                  {deployment.deploymentId}
                </Link>
                <span
                  className={`status-badge ${
                    deploymentActive
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  {deploymentActive ? "Active" : "Expired"}
                </span>
              </div>
              {deployment.appUrl && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="body-small text-muted-foreground">URL:</span>
                  <a
                    href={deployment.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-small text-foreground hover:text-primary hover:underline truncate max-w-[180px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-md"
                    title={deployment.appUrl}
                  >
                    {deployment.appUrl}
                  </a>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <span className="body-small text-muted-foreground">Created:</span>
                <span className="body-small text-muted-foreground/90">
                  {formatDistanceToNow(new Date(deployment.createdAt))} ago
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="body-small text-muted-foreground">
                  Resources:
                </span>
                <span className="body-small text-muted-foreground/90 break-all sm:break-normal">
                  {deployment.cpu} CPU | {deployment.memory} RAM |{" "}
                  {deployment.storage} Storage
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 self-end md:self-center mt-2 md:mt-0">
              {deployment.appUrl && deploymentActive && (
                <a
                  href={
                    serviceName === "JUPYTER"
                      ? `${deployment.appUrl}?token=password`
                      : deployment.appUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="sm"
                    className="btn-primary btn-sm w-full sm:w-auto"
                  >
                    Open {serviceName === "JUPYTER" ? "Notebook" : "App"}
                  </Button>
                </a>
              )}

              <Button
                variant="outline"
                size="sm"
                className="btn-secondary btn-sm w-full sm:w-auto"
                onClick={() => {
                  router.push(`/app/deployments/${deployment.deploymentId}`);
                }}
              >
                View
              </Button>
              {deploymentActive && (
                <Button
                  variant="outline"
                  size="sm"
                  className="btn-secondary btn-sm text-destructive hover:text-destructive w-full sm:w-auto"
                  onClick={() => onDelete && onDelete(deployment.deploymentId)}
                >
                  Stop
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeploymentsList;
