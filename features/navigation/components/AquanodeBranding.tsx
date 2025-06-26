"use client";

import Link from "next/link";
import Image from "next/image";
import aquanodeLogo from "@/assets/aquanode-logo.png";
import { useSidebar } from "@/components/ui/sidebar";

export function AquanodeBranding() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex items-center gap-2 p-2 py-3">
      <Link
        href="/"
        className="text-lg font-bold text-foreground transition-colors duration-300 flex items-center gap-2"
      >
        <Image
          src={aquanodeLogo}
          alt="Aquanode"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        {!isCollapsed && (
          <span className="transition-opacity duration-200">AQUANODE</span>
        )}
      </Link>
    </div>
  );
}
