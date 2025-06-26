import {
  BookOpen,
  Bot,
  CreditCard,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Wrench,
  Zap,
  Server,
  Container,
  Home,
} from "lucide-react";
import { NavItem } from "./types";
import { paths } from "@/config/paths";

export const navData: Record<string, NavItem[]> = {
  navServices: [
    {
      title: "Inference API",
      url: "#",
      icon: Zap,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/services/inference",
        },
        {
          title: "Models Gallery",
          url: "/services/inference/models-gallery",
        },
      ],
    },
    {
      title: "Backend Apps",
      url: "#",
      icon: Server,
      items: [
        {
          title: "Overview",
          url: "/services/backend",
        },
        {
          title: "One-Click Apps",
          url: "/services/backend/one-click-apps",
        },
      ],
    },
    {
      title: "Container VMs",
      url: "#",
      icon: Container,
      items: [
        {
          title: "Overview",
          url: "/services/vm",
        },
        {
          title: "Pre-configured VMs",
          url: "/services/vm/pre-configured",
        },
      ],
    },
    {
      title: "Agent Terminal",
      url: "/chatbot",
      icon: Bot,
    },
    {
      title: "Service Composer",
      url: paths.app.serviceComposer.path,
      icon: Wrench,
    },
  ],
  home: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Deployments",
      url: "/deployments",
      icon: PieChart,
    },
  ],
  account: [
    {
      title: "Billing",
      url: paths.app.billing.path,
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
};

export function getBreadcrumb(pathname: string) {
  const allItems = Object.values(navData).flat();

  for (const item of allItems) {
    if (item.url === pathname) {
      return [item];
    }
    if (item.items) {
      for (const subItem of item.items) {
        if (subItem.url === pathname) {
          return [item, subItem];
        }
      }
    }
  }

  return [];
}
