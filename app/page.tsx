"use client";

import React from "react";
import Link from "next/link";
import {
  Container,
  Heading,
  Text,
  Card,
  Grid,
  Button,
  StatsCard,
  StatusBadge,
} from "@/components/ui/design-system";
import {
  Server,
  Plus,
  ArrowRight,
  Cpu,
  Database,
  Activity,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { useDeployments } from "@/hooks/deployments/useDeployments";
import { useAquaCredits } from "@/hooks/api/useAquaCredits";
import { getProviderFromEnv } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { isDeploymentActive } from "@/lib/deployment";

const services = [
  {
    name: "AI Inference",
    description: "Deploy ML models",
    icon: <Cpu className="w-4 h-4" />,
    href: "/app/services/inference",
  },
  {
    name: "Backend Apps",
    description: "API & web services",
    icon: <Server className="w-4 h-4" />,
    href: "/app/services/backend",
  },
  {
    name: "Container VMs",
    description: "GPU compute instances",
    icon: <Database className="w-4 h-4" />,
    href: "/app/services/vm",
  },
];

function QuickStats({ user }: { user: any }) {
  const { data: credits, isLoading: creditsLoading } = useAquaCredits();
  const { data: deployments = [], isLoading: deploymentsLoading } =
    useDeployments(user?.id || "", undefined, getProviderFromEnv());

  const activeDeployments = deployments.filter((d) =>
    isDeploymentActive(d.created_at, d.duration)
  ).length;

  return (
    <Grid variant="responsive-4" className="space-component">
      <StatsCard
        title="Credits"
        value={
          creditsLoading ? "..." : credits?.credits?.toLocaleString() || "0"
        }
        loading={creditsLoading}
      />
      <StatsCard
        title="Active Deployments"
        value={deploymentsLoading ? "..." : activeDeployments.toString()}
        loading={deploymentsLoading}
      />
      <StatsCard
        title="Total Deployments"
        value={deploymentsLoading ? "..." : deployments.length.toString()}
        loading={deploymentsLoading}
      />
      <Link href="/app/payments" className="block">
        <Card
          variant="compact"
          interactive
          className="h-full flex items-center justify-center"
        >
          <div className="flex items-center gap-2 text-primary">
            <CreditCard className="w-4 h-4" />
            <Text variant="small" className="font-medium">
              Add Credits
            </Text>
          </div>
        </Card>
      </Link>
    </Grid>
  );
}

function ServiceGrid() {
  return (
    <div className="space-component">
      <div className="flex items-center justify-between space-element">
        <Heading level={2} className="space-tight">
          Services
        </Heading>
        <Link href="/app/services">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <Grid variant="responsive-3">
        {services.map((service, index) => (
          <Link key={index} href={service.href} className="block">
            <Card variant="compact" interactive className="h-full">
              <div className="flex items-center gap-3 space-tight">
                <div className="p-2 rounded-md bg-muted/30">{service.icon}</div>
                <div>
                  <Text variant="small" className="font-medium space-tight">
                    {service.name}
                  </Text>
                  <Text variant="caption" muted>
                    {service.description}
                  </Text>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </Grid>
    </div>
  );
}

function RecentDeployments({ user }: { user: any }) {
  const { data: deployments = [], isLoading } = useDeployments(
    user?.id || "",
    undefined,
    getProviderFromEnv()
  );

  const recentDeployments = deployments
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Unknown";
    }
  };

  const getStatusVariant = (deployment: any) => {
    if (deployment.provider === "closed") return "inactive";
    return "active";
  };

  const getDeploymentType = (type: string) => {
    switch (type?.toUpperCase()) {
      case "JUPYTER":
        return "Jupyter";
      case "BACKEND":
        return "Backend";
      case "MODELS":
        return "AI Model";
      case "VMS":
        return "VM";
      default:
        return type || "Service";
    }
  };

  if (!user) return null;

  return (
    <div className="space-component">
      <div className="flex items-center justify-between space-element">
        <Heading level={2} className="space-tight">
          Recent Deployments
        </Heading>
        <Link href="/app/deployments">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <Card variant="compact">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-md bg-background/20 animate-pulse"
              >
                <div className="w-6 h-6 bg-muted/30 rounded" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-muted/30 rounded w-1/3" />
                  <div className="h-2 bg-muted/20 rounded w-1/2" />
                </div>
                <div className="w-12 h-4 bg-muted/30 rounded" />
              </div>
            ))}
          </div>
        ) : recentDeployments.length === 0 ? (
          <div className="text-center py-6">
            <Text variant="base" muted>
              No deployments yet
            </Text>
          </div>
        ) : (
          <div className="space-y-2">
            {recentDeployments.map((deployment) => (
              <Link
                key={deployment.id}
                href={`/app/deployments/${deployment.id}`}
                className="block group"
              >
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-background/30 transition-colors">
                  <div className="p-1 rounded bg-primary/10">
                    <Server className="w-3 h-3 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Text variant="small" className="font-medium truncate">
                        {getDeploymentType(deployment.deployment_type)}
                      </Text>
                      <StatusBadge variant={getStatusVariant(deployment)}>
                        {deployment.provider === "closed"
                          ? "Stopped"
                          : "Active"}
                      </StatusBadge>
                    </div>
                    <Text variant="caption" muted>
                      {formatDate(deployment.created_at)}
                    </Text>
                  </div>

                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function HomePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container variant="wide" className="space-dashboard">
        <div className="space-element">
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-muted/30 rounded w-1/4" />
            <div className="h-4 bg-muted/20 rounded w-1/3" />
          </div>
        </div>
        <Grid variant="responsive-4" className="space-component">
          {[...Array(4)].map((_, i) => (
            <StatsCard key={i} title="Loading..." value="" loading />
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container variant="wide" className="space-dashboard">
      <div className="space-element">
        <Heading level={1} className="space-tight">
          Dashboard
        </Heading>
        <Text variant="base" muted>
          {user
            ? `Welcome back, ${user.email?.split("@")[0]}`
            : "Sign in to access your resources"}
        </Text>
      </div>

      {user ? (
        <>
          <QuickStats user={user} />
          <ServiceGrid />
          <RecentDeployments user={user} />
        </>
      ) : null}
    </Container>
  );
}
