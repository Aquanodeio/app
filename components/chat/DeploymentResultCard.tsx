import {
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DeploymentResult } from "./types";

interface DeploymentResultCardProps {
  result: DeploymentResult;
}

export const DeploymentResultCard = ({ result }: DeploymentResultCardProps) => {
  const getStatusIcon = () => {
    switch (result.status) {
      case "pending":
        return <Loader2 size={16} className="text-amber-600 animate-spin" />;
      case "complete":
        return <CheckCircle size={16} className="text-green-600" />;
      case "error":
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case "pending":
        return "border-amber-500/20 bg-amber-500/5";
      case "complete":
        return "border-green-500/20 bg-green-500/5";
      case "error":
        return "border-red-500/20 bg-red-500/5";
      default:
        return "border-border/20 bg-secondary/5";
    }
  };

  const getStatusText = () => {
    switch (result.status) {
      case "pending":
        return "Deployment in Progress";
      case "complete":
        return "Deployment Complete";
      case "error":
        return "Deployment Failed";
      default:
        return "Unknown Status";
    }
  };

  return (
    <Card className={`mt-3 ${getStatusColor()}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          {getStatusIcon()}
          {getStatusText()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="text-sm">{result.message}</div>

        {result.deploymentId && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Deployment ID:</span>
            <code className="text-xs bg-secondary/50 px-1 rounded">
              {result.deploymentId}
            </code>
          </div>
        )}

        {result.estimatedTime && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Time:</span>
            <span>{result.estimatedTime}</span>
          </div>
        )}

        {result.config && (
          <div className="mt-2 p-2 bg-secondary/30 rounded text-xs">
            <div className="font-medium mb-1">Configuration:</div>
            <div className="space-y-1">
              {result.config.repoUrl && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Repository:</span>
                  <Link
                    href={result.config.repoUrl}
                    target="_blank"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    {result.config.repoUrl.replace(
                      /(https?:\/\/)?(www\.)?(github|gitlab)\.com\//,
                      ""
                    )}
                    <ExternalLink size={10} />
                  </Link>
                </div>
              )}
              {result.config.cpuUnits && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resources:</span>
                  <span>
                    {result.config.cpuUnits} CPU
                    {result.config.cpuUnits > 1 ? "s" : ""},{" "}
                    {result.config.memorySize}, {result.config.storageSize}
                  </span>
                </div>
              )}
              {result.config.provider && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span>{result.config.provider}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {(result.appUrl || result.accessUrl) && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Access URL:</span>
            <Link
              href={result.appUrl || result.accessUrl || "#"}
              target="_blank"
              className="flex items-center gap-1 text-primary hover:underline text-xs"
            >
              View Application
              <ExternalLink size={10} />
            </Link>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <Badge
            variant="outline"
            className={`text-xs ${
              result.status === "pending"
                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                : result.status === "complete"
                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                  : "bg-red-500/10 text-red-600 border-red-500/20"
            }`}
          >
            {result.status === "pending" && (
              <Loader2 size={10} className="mr-1 animate-spin" />
            )}
            {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
