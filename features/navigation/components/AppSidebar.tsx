"use client";

import * as React from "react";

import { NavUser } from "@/features/navigation/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import AquaCredits from "@/features/navigation/components/AquaCredits";
import { NavRenderer } from "./NavRenderer";
import { AquanodeBranding } from "./AquanodeBranding";
import { navData } from "./NavData";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AquanodeBranding />
        <AquaCredits />
      </SidebarHeader>

      <SidebarContent>
        <NavRenderer items={navData.home} />
        <NavRenderer label="Services" items={navData.navServices} />
        <NavRenderer label="Account" items={navData.account} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
