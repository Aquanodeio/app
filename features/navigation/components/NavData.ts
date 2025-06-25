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
} from "lucide-react";
import { NavItem } from "./types";

export const navData: Record<string, NavItem[]> = {
  navServices: [
    {
      title: "Inference API",
      url: "#",
      icon: SquareTerminal,
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
      icon: Bot,
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
      icon: BookOpen,
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
      icon: SquareTerminal,
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
      icon: Frame,
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
