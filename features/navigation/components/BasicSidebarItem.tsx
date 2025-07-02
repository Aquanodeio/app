import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavItem } from "./types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BasicSidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.url === pathname;
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link href={item.url}>
          {!!item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
