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

  const getDeploymentIcon = (type: string) => {
    switch (type?.toUpperCase()) {
      case "JUPYTER":
        return <Activity className="w-4 h-4" />;
      case "BACKEND":
        return <Server className="w-4 h-4" />;
      case "MODELS":
        return <Cpu className="w-4 h-4" />;
      case "VMS":
        return <Database className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
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

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} variant="compact" className="animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted/30 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted/30 rounded w-1/3" />
                  <div className="h-3 bg-muted/20 rounded w-1/2" />
                </div>
                <div className="w-16 h-5 bg-muted/30 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : recentDeployments.length === 0 ? (
        <Card variant="compact" className="text-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
              <Server className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <Text variant="base" className="font-medium mb-1">
                No deployments yet
              </Text>
              <Text variant="small" muted>
                Deploy your first service to get started
              </Text>
            </div>
            <Link href="/app/services" className="mt-2">
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Create Deployment
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {recentDeployments.map((deployment) => (
            <Link
              key={deployment.id}
              href={`/app/deployments/${deployment.id}`}
              className="block group"
            >
              <Card
                variant="compact"
                interactive
                className="transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/20">
                    <span className="text-accent">
                      {getDeploymentIcon(deployment.deployment_type)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Text variant="base" className="font-semibold truncate">
                        {getDeploymentType(deployment.deployment_type)}
                      </Text>
                      <StatusBadge variant={getStatusVariant(deployment)}>
                        {deployment.provider === "closed"
                          ? "Stopped"
                          : "Active"}
                      </StatusBadge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Text variant="small" muted>
                        {formatDate(deployment.created_at)}
                      </Text>
                      <span className="w-1 h-1 bg-muted-foreground/40 rounded-full" />
                      <Text variant="small" muted className="truncate">
                        {/* ID: {deployment?.id?.slice(0, 8)}... */}
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
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
