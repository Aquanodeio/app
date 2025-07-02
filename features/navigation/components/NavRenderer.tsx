"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { CollapsabledSidebarItem } from "./CollapsabledSidebarItem";
import { NavItem } from "./types";
import { BasicSidebarItem } from "./BasicSidebarItem";

export function NavRenderer({
  items,
  label,
}: {
  items: NavItem[];
  label?: string;
}) {
  return (
    <SidebarGroup>
      {!!label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            <CollapsabledSidebarItem key={item.title} item={item} />
          ) : (
            <BasicSidebarItem key={item.title} item={item} />
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
