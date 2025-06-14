"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { FileText, Server, Grid, LayoutDashboard, Lock, CreditCard, Bot, ChevronDown, ChevronRight, Cpu, Database, Container, Wrench } from "lucide-react";
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
  
  // State for collapsible sections
  const [isServicesExpanded, setIsServicesExpanded] = useState(true);
  const [isInferenceAPIExpanded, setIsInferenceAPIExpanded] = useState(false);
  const [isBackendAppsExpanded, setIsBackendAppsExpanded] = useState(false);
  const [isContainerVMsExpanded, setIsContainerVMsExpanded] = useState(false);

  const NavButton = ({ 
    children, 
    onClick, 
    isActive, 
    className = "", 
    disabled = false,
    indent = 0 
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    isActive?: boolean;
    className?: string;
    disabled?: boolean;
    indent?: number;
  }) => (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-2.5 ${
        isActive
          ? "text-accent bg-accent/10 border-accent/20"
          : "text-muted-foreground hover:text-foreground"
      } hover:bg-accent/10 hover:text-accent py-3 rounded-lg group text-sm transition-all duration-300 ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      style={{ paddingLeft: `${16 + (indent * 20)}px` }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );

  const CollapsibleSection = ({ 
    title, 
    icon: Icon, 
    isExpanded, 
    onToggle, 
    children,
    indent = 0,
    onClick,
    isActive
  }: {
    title: string;
    icon: any;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    indent?: number;
    onClick?: () => void;
    isActive?: boolean;
  }) => (
    <div>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2.5 ${
          isActive
            ? "text-accent bg-accent/10 border-accent/20"
            : "text-muted-foreground hover:text-foreground"
        } hover:bg-accent/10 hover:text-accent py-3 rounded-lg group text-sm transition-all duration-300`}
        style={{ paddingLeft: `${16 + (indent * 20)}px` }}
        onClick={() => {
          onToggle();
          if (onClick) {
            onClick();
          }
        }}
      >
        {isExpanded ? (
          <ChevronDown size={16} className={`${isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"} transition-colors duration-300`} />
        ) : (
          <ChevronRight size={16} className={`${isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"} transition-colors duration-300`} />
        )}
        <Icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" />
        <span>{title}</span>
      </Button>
      {isExpanded && (
        <div className="ml-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );

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
        {/* Credit Section */}
        <AquaCredits credits={1250.75} threshold="2/2" />

        {/* Services Section */}
        <div>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-2.5 ${
              pathname === "/app/services"
                ? "text-accent bg-accent/10 border-accent/20"
                : "text-muted-foreground hover:text-foreground"
            } hover:bg-accent/10 hover:text-accent py-3 rounded-lg group text-sm transition-all duration-300`}
            style={{ paddingLeft: `16px` }}
            onClick={() => router.push("/app/services")}
          >
            {/* Arrow button - separate clickable area for expand/collapse */}
            <button
              className="p-1 rounded hover:bg-accent/20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent onClick from firing
                setIsServicesExpanded(!isServicesExpanded);
              }}
            >
              {isServicesExpanded ? (
                <ChevronDown size={16} className={`${pathname === "/app/services" ? "text-accent" : "text-muted-foreground group-hover:text-accent"} transition-colors duration-300`} />
              ) : (
                <ChevronRight size={16} className={`${pathname === "/app/services" ? "text-accent" : "text-muted-foreground group-hover:text-accent"} transition-colors duration-300`} />
              )}
            </button>
            <Server size={18} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" />
            <span>Services</span>
          </Button>
          {isServicesExpanded && (
            <div className="ml-2 space-y-1">
              {/* Inference API */}
              <CollapsibleSection
                title="Inference API"
                icon={Cpu}
                isExpanded={isInferenceAPIExpanded}
                onToggle={() => setIsInferenceAPIExpanded(!isInferenceAPIExpanded)}
                onClick={() => router.push("/app/services/inference")}
                indent={1}
              >
                <NavButton
                  onClick={() => router.push("/app/services/inference")}
                  isActive={pathname?.includes("/app/services/inference")}
                  indent={2}
                >
                  <LayoutDashboard
                    size={18}
                    className={`${
                      pathname?.includes("/app/services/inference")
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-accent"
                    } transition-colors duration-300`}
                  />
                  <span>Overview</span>
                </NavButton>
                <NavButton
                  onClick={() => router.push("/app/inference/one-click-models")}
                  isActive={pathname?.includes("/app/inference/one-click-models")}
                  indent={2}
                >
                  <Grid
                    size={18}
                    className={`${
                      pathname?.includes("/app/inference/one-click-models")
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-accent"
                    } transition-colors duration-300`}
                  />
                  <span>Models Gallery</span>
                </NavButton>
              </CollapsibleSection>

              {/* Backend Apps */}
              <CollapsibleSection
                title="Backend Apps"
                icon={Database}
                isExpanded={isBackendAppsExpanded}
                onToggle={() => setIsBackendAppsExpanded(!isBackendAppsExpanded)}
                onClick={() => router.push("/app/services/backend")}
                indent={1}
              >
                <NavButton
                  onClick={() => router.push("/app/services/backend")}
                  isActive={pathname?.includes("/app/services/backend")}
                  indent={2}
                >
                  <LayoutDashboard
                    size={18}
                    className={`${
                      pathname?.includes("/app/services/backend")
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-accent"
                    } transition-colors duration-300`}
                  />
                  <span>Overview</span>
                </NavButton>
                <NavButton
                  onClick={() => router.push("/app/services/backend/inference")}
                  isActive={pathname?.includes("/app/services/backend/inference")}
                  indent={2}
                >
                  <FileText
                    size={18}
                    className={`${
                      pathname?.includes("/app/services/backend/inference")
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-accent"
                    } transition-colors duration-300`}
                  />
                  <span>One-Click Apps</span>
                </NavButton>
              </CollapsibleSection>

              {/* Container VMs */}
              <CollapsibleSection
                title="Container VMs"
                icon={Container}
                isExpanded={isContainerVMsExpanded}
                onToggle={() => setIsContainerVMsExpanded(!isContainerVMsExpanded)}
                onClick={() => router.push("/app/services/vm")}
                indent={1}
              >
                <NavButton
                  onClick={() => router.push("/app/services/vm")}
                  isActive={pathname?.includes("/app/services/vm")}
                  indent={2}
                >
                  <LayoutDashboard
                    size={18}
                    className={`${
                      pathname?.includes("/app/services/vm")
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-accent"
                    } transition-colors duration-300`}
                  />
                  <span>Overview</span>
                </NavButton>
                <NavButton
                  onClick={() => router.push("/app/containers/pre-configured")}
                  isActive={pathname?.includes("/app/containers/pre-configured")}
                  indent={2}
                >
                  <FileText
                    size={18}
                    className={`${
                      pathname?.includes("/app/containers/pre-configured")
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-accent"
                    } transition-colors duration-300`}
                  />
                  <span>Pre-Configured VMs</span>
                </NavButton>
              </CollapsibleSection>
            </div>
          )}
        </div>

        {/* Service Composer */}
        <NavButton
          onClick={() => router.push("/app/service-composer")}
          isActive={pathname?.includes("/app/service-composer")}
        >
          <Wrench
            size={18}
            className={`${
              pathname?.includes("/app/service-composer")
                ? "text-accent"
                : "text-muted-foreground group-hover:text-accent"
            } transition-colors duration-300`}
          />
          <span>Service Composer</span>
        </NavButton>
        

        {/* Agent Terminal */}
        <NavButton
          onClick={() => router.push("/app/chatbot")}
          isActive={pathname?.includes("/app/chatbot")}
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
        </NavButton>

        {/* Deployments */}
        <NavButton
          onClick={() => router.push("/app/deployments")}
          isActive={pathname?.includes("/app/deployments")}
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
        </NavButton>

        {/* Payments */}
        <NavButton
          onClick={() => router.push("/app/payments")}
          isActive={pathname?.includes("/app/payments")}
        >
          <CreditCard
            size={18}
            className="text-muted-foreground group-hover:text-accent transition-colors duration-300"
          />
          <span>Payments</span>
        </NavButton>
      </nav>

      {/* Examples Section - Sticky to bottom */}
      {/* <div className="mt-auto pt-4 border-t border-border/40">
        <h3 className="text-xs font-medium mb-3 text-muted-foreground tracking-wide">QuickStart</h3>
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
      </div> */}

      <div className="pt-4 border-t border-border/40 text-muted-foreground text-sm flex items-center">
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
