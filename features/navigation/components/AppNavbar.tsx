"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getBreadcrumb } from "./NavData";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <nav className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
      <div className="flex justify-between h-16 items-center px-4">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => {
                const isLast = index === breadcrumb.length - 1;
                return (
                  <React.Fragment key={item.url}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.url}>
                          {item.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </nav>
  );
}
