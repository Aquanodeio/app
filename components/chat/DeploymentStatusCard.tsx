import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface DeploymentStatusResult {
  error?: string;
  deploymentId?: string;
  status?: string;
  uptime?: string;
  url?: string;
  resources?: {
    cpu: string;
    memory: string;
    storage: string;
  };
}

interface DeploymentStatusCardProps {
  result: DeploymentStatusResult;
}

export const DeploymentStatusCard = ({ result }: DeploymentStatusCardProps) => {
  if (result.error) {
    return (
      <Card className="mt-3 border-red-500/20 bg-red-500/5">
        <CardContent className="p-3 text-sm text-red-600">
          {result.error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-3 border-green-500/20 bg-green-500/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Deployment Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Status:</span>
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            {result.status}
          </Badge>
        </div>
        {result.uptime && (
          <div className="flex justify-between">
            <span>Uptime:</span>
            <span>{result.uptime}</span>
          </div>
        )}
        {result.url && (
          <div className="flex justify-between">
            <span>URL:</span>
            <Link href={result.url} target="_blank" className="flex items-center gap-1 text-primary hover:underline">
              {result.url}
              <ExternalLink size={10} />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 