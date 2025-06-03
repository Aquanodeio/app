"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { FileText, Server, Grid, LayoutDashboard, Lock, CreditCard, Bot } from "lucide-react";
import Link from "next/link";
import { examples } from "@/lib/catalog";
import AquaCredits from "@/components/AquaCredits";

interface SidebarProps {
  isMobileOpen?: boolean;
}

export const Sidebar = ({ isMobileOpen }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`fixed h-[calc(100vh-4rem)] w-72 bg-secondary/30 backdrop-blur-sm border-r border-border/30 flex flex-col p-4 overflow-y-auto z-40 transition-transform duration-300 md:translate-x-0 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="flex-1 flex flex-col gap-4 mt-6">
      <AquaCredits credits={1250.75} threshold="2/2" />
      <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${
            pathname?.includes("/app/deployments")
              ? "text-primary bg-primary/10"
              : "text-muted-foreground"
          } hover:text-primary hover:bg-primary/10 py-5 rounded-xl group text-base`}
          onClick={() => router.push("/app/deployments")}
        >
          <LayoutDashboard
            size={22}
            className={`${
              pathname?.includes("/app/deployments")
                ? "text-primary"
                : "text-muted-foreground"
            } group-hover:text-primary transition-colors`}
          />
          <span>Deployments</span>
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${
            pathname?.includes("/app/services")
              ? "text-primary bg-primary/10"
              : "text-muted-foreground"
          } hover:text-primary hover:bg-primary/10 py-5 rounded-xl group text-base`}
          onClick={() => router.push("/app/services")}
        >
          <Server
            size={22}
            className={`${
              pathname?.includes("/app/services")
                ? "text-primary"
                : "text-muted-foreground"
            } group-hover:text-primary transition-colors`}
          />
          <span>Services</span>
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${
            pathname?.includes("/app/templates")
              ? "text-primary bg-primary/10"
              : "text-muted-foreground"
          } hover:text-primary hover:bg-primary/10 py-5 rounded-xl group text-base`}
          onClick={() => router.push("/app/templates")}
        >
          <FileText
            size={22}
            className={`${
              pathname?.includes("/app/templates")
                ? "text-primary"
                : "text-muted-foreground"
            } group-hover:text-primary transition-colors`}
          />
          <span>Templates</span>
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${
            pathname?.includes("/app/chatbot")
              ? "text-primary bg-primary/10"
              : "text-muted-foreground"
          } hover:text-primary hover:bg-primary/10 py-5 rounded-xl group text-base`}
          onClick={() => router.push("/app/chatbot")}
        >
          <Bot
            size={22}
            className={`${
              pathname?.includes("/app/chatbot")
                ? "text-primary"
                : "text-muted-foreground"
            } group-hover:text-primary transition-colors`}
          />
          <span>Agent Terminal</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-between items-center text-muted-foreground py-5 rounded-xl group text-base"
          disabled
        >
          <div className="flex items-center gap-3">
            <CreditCard size={22} className="text-muted-foreground" />
            <span>Payments</span>
          </div>
          <Lock size={18} className="text-muted-foreground" />
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-between items-center text-muted-foreground py-5 rounded-xl group text-base"
          disabled
        >
          <div className="flex items-center gap-3">
            <Grid size={22} className="text-muted-foreground" />
            <span>Service Builder</span>
          </div>
          <Lock size={18} className="text-muted-foreground" />
        </Button>
      </nav>

      {/* Examples Section */}
      <div className="mt-5 mb-auto border-t border-border/30 pt-5">
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Examples</h3>
        <div className="space-y-3">
          {examples.map((example, index) => (
            <Link 
              key={index} 
              href={example.url(example.id)}
              className="block text-base text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded hover:bg-primary/5"
            >
              {example.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-border/30 text-muted-foreground/70 text-base flex items-center">
        <a
          href="https://github.com/Aquanodeio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:text-primary transition-colors px-3 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
