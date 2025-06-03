import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { StatsCard, Grid } from "../../ui/design-system";

interface DeploymentStatsProps {
  isLoading: boolean;
  activeInstances: number;
  totalDeployments: number;
  currentCpuUsage: string;
  currentRamUsage: string;
}

const DeploymentStats: React.FC<DeploymentStatsProps> = ({
  isLoading,
  activeInstances,
  totalDeployments,
  currentCpuUsage,
  currentRamUsage,
}) => {
  if (isLoading) {
    return (
      <Grid variant="responsive-3" className="space-component">
        {[1, 2, 3].map((i) => (
          <StatsCard 
            key={i}
            title=""
            value=""
            loading={true}
          />
        ))}
      </Grid>
    );
  }

  return (
    <Grid variant="responsive-3" className="space-component">
      <StatsCard 
        title="Active Instances"
        value={activeInstances}
      />
      
      <StatsCard 
        title="Total Deployments"
        value={totalDeployments}
      />
      
      <StatsCard 
        title="Current Resource Usage"
        value={`${currentCpuUsage} CPU | ${currentRamUsage} RAM`}
      />
    </Grid>
  );
};

export default DeploymentStats;
