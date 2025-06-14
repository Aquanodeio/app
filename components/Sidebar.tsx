"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { FileText, Server, Grid, LayoutDashboard, Lock, CreditCard, Bot } from "lucide-react";
import Link from "next/link";
import { examples } from "@/lib/catalog";
import AquaCredits from "@/components/AquaCredits";
import Image from "next/image";
import aquanodeLogo from "@/assets/aquanode-logo.png";

interface SidebarProps {
  isMobileOpen?: boolean;
}

export const Sidebar = ({ isMobileOpen }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-72 bg-card/90 backdrop-blur-lg border-r border-border/60 flex flex-col p-3 overflow-y-auto z-[60] transition-transform duration-300 md:translate-x-0 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-2 p-4 border-b border-border/40 mb-4">
        <Link
          href="/"
          className="text-xl font-bold text-foreground transition-colors duration-300 flex items-center gap-2 hover:text-accent"
        >
          <Image src={aquanodeLogo} alt="Aquanode" width={32} height={32} />
          AQUANODE
        </Link>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <AquaCredits credits={1250.75} threshold="2/2" />
        <Button
          variant="ghost"
          className={`w-full justify-start gap-2.5 ${
            pathname?.includes("/app/deployments")
              ? "text-accent bg-accent/10 border-accent/20"
              : "text-muted-foreground hover:text-foreground"
          } hover:bg-accent/10 hover:text-accent py-3 rounded-lg group text-sm transition-all duration-300`}
          onClick={() => router.push("/app/deployments")}
        >
          <LayoutDashboard
            size={18}
            className={`${
              pathname?.includes("/app/deployments")
                ? "text-accent"
                : "text-muted-foreground group-hover:text-accent"
            } transition-colors duration-300`}
          />
          <span>Deployments</span>
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start gap-2.5 ${
            pathname?.includes("/app/services")
              ? "text-accent bg-accent/10 border-accent/20"
              : "text-muted-foreground hover:text-foreground"
          } hover:bg-accent/10 hover:text-accent py-3 rounded-lg group text-sm transition-all duration-300`}
          onClick={() => router.push("/app/services")}
        >
          <Server
            size={18}
            className={`${
              pathname?.includes("/app/services")
                ? "text-accent"
                : "text-muted-foreground group-hover:text-accent"
            } transition-colors duration-300`}
          />
          <span>Services</span>
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start gap-2.5 ${
            pathname?.includes("/app/templates")
              ? "text-accent bg-accent/10 border-accent/20"
              : "text-muted-foreground hover:text-foreground"
          } hover:bg-accent/10 hover:text-accent py-3 rounded-lg group text-sm transition-all duration-300`}
          onClick={() => router.push("/app/templates")}
        >
          <FileText
            size={18}
            className={`${
              pathname?.includes("/app/templates")
                ? "text-accent"
                : "text-muted-foreground group-hover:text-accent"
            } transition-colors duration-300`}
          />
          <span>Templates</span>
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start gap-2.5 ${
            pathname?.includes("/app/chatbot")
              ? "text-accent bg-accent/10 border-accent/20"
              : "text-muted-foreground hover:text-foreground"
          } hover:bg-accent/10 hover:text-accent py-3 rounded-lg group text-sm transition-all duration-300`}
          onClick={() => router.push("/app/chatbot")}
        >
          <Bot
            size={18}
            className={`${
              pathname?.includes("/app/chatbot")
                ? "text-accent"
                : "text-muted-foreground group-hover:text-accent"
            } transition-colors duration-300`}
          />
          <span>Agent Terminal</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-between items-center text-muted-foreground hover:text-foreground hover:bg-accent/10 py-3 rounded-lg group text-sm transition-all duration-300"
          onClick={() => router.push("/app/payments")}
        >
          <div className="flex items-center gap-2.5">
            <CreditCard size={18} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" />
            <span>Payments</span>
          </div>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-between items-center text-muted-foreground opacity-60 py-3 rounded-lg group text-sm cursor-not-allowed"
          disabled
        >
          <div className="flex items-center gap-2.5">
            <Grid size={18} className="text-muted-foreground" />
            <span>Service Builder</span>
          </div>
          <Lock size={16} className="text-muted-foreground" />
        </Button>
      </nav>

      {/* Examples Section */}
      <div className="mt-4 mb-auto border-t border-border/40 pt-4">
        <h3 className="text-xs font-medium mb-3 text-muted-foreground uppercase tracking-wide">Examples</h3>
        <div className="space-y-1">
          {examples.map((example, index) => (
            <Link 
              key={index} 
              href={example.url(example.id)}
              className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-300 py-2 px-2.5 rounded-md hover:bg-accent/5"
            >
              {example.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-border/40 text-muted-foreground text-sm flex items-center">
        <a
          href="https://github.com/Aquanodeio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 hover:text-accent transition-colors duration-300 px-2.5 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-github"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
};
