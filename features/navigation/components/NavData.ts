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
          url: "/app/services/inference",
        },
        {
          title: "Models Gallery",
          url: "/app/services/inference/models-gallery",
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
          url: "/app/services/backend",
        },
        {
          title: "One-Click Apps",
          url: "/app/services/backend/one-click-apps",
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
          url: "/app/services/container-vms",
        },
        {
          title: "Pre-configured VMs",
          url: "/app/services/pre-configured",
        },
      ],
    },
    {
      title: "Agent Terminal",
      url: "/app/chatbot",
      icon: Bot,
    },
    {
      title: "Service Composer",
      url: "/app/service-composer",
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
      url: "/app/deployments",
      icon: PieChart,
    },
  ],
  account: [
    {
      title: "Billing",
      url: "/app/payments",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/app/settings",
      icon: Settings2,
    },
  ],
};

export function getBreadcrumb(pathname: string) {
  const allItems = Object.values(navData).flat();

  console.log(allItems, pathname);

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
