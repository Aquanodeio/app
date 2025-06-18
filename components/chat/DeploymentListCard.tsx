import { List, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DeploymentList } from "./types";

interface DeploymentListCardProps {
  list: DeploymentList;
}

export const DeploymentListCard = ({ list }: DeploymentListCardProps) => (
  <Card className="mt-3 border-primary/20 bg-primary/5">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-sm">
        <List size={16} className="text-primary" />
        Your Deployments ({list.total})
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 text-xs">
      {list.deployments.map((deployment) => (
        <div key={deployment.id} className="p-2 bg-secondary/30 rounded">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{deployment.name}</div>
              <div className="text-muted-foreground">{deployment.serviceType}</div>
            </div>
            <Badge 
              variant="outline" 
              className={`text-xs ${
                deployment.status === 'running' 
                  ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                  : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
              }`}
            >
              {deployment.status}
            </Badge>
          </div>
          {deployment.url && (
            <Link
              href={deployment.url}
              target="_blank"
              className="flex items-center gap-1 text-primary hover:underline text-xs mt-1"
            >
              {deployment.url}
              <ExternalLink size={10} />
            </Link>
          )}
        </div>
      ))}
    </CardContent>
  </Card>
); 