"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthSession } from "@/lib/auth/hooks/useAuthSession";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar({
  onMobileMenuToggle,
}: {
  onMobileMenuToggle?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, displayName, signOut, isLoading, accessToken } =
    useAuthSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if we're in the app section to display the menu toggle
  const isAppSection = pathname?.startsWith("/app") ?? false;

  if (!mounted || isLoading) {
    return null;
  }

  return (
    <nav className="border-b border-border/20 bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="flex justify-between h-16 items-center px-6 max-w-[129rem] mx-auto">
        <div className="flex items-center gap-3">
          {isAppSection && onMobileMenuToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={onMobileMenuToggle}
            >
              <Menu size={20} />
            </Button>
          )}
          <Link
            href="/"
            className="text-xl font-bold gradient-text transition-colors duration-300"
          >
            AQUANODE
          </Link>
        </div>
        
        
        <div className="flex items-center gap-4">
          <a href="#aqua-layer" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md font-medium transition-colors duration-200">
            AQUA LAYER
          </a>
          <a href="#services" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md font-medium transition-colors duration-200">
            AQUA SERVICES
          </a>
        <div className="hidden md:flex items-center space-x-4">

        </div>
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 bg-background/60 hover:bg-primary/10 hover:text-primary hover:border-primary/30 shadow-sm"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{displayName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-secondary/80 backdrop-blur-md border-border/40 shadow-xl shadow-black/20"
                >
                  <DropdownMenuLabel className="text-foreground/90">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/20" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2 opacity-70" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/app/services">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Launch App
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="secondary"
                  className="bg-background/60 hover:bg-primary/10 hover:text-primary hover:border-primary/30 shadow-sm"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <User className="w-4 h-4 sm:hidden" />
                </Button>
              </Link>
              <Link href="/app/services">
                <Button className="bg-accent hover:bg-accent/90 hidden sm:flex">
                  Launch App
                </Button>
              </Link>
            </>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 border-t border-border/20 bg-background/95 backdrop-blur-md">
          <div className="flex flex-col space-y-3">
            <a href="#solutions" className="text-foreground/80 hover:text-primary py-2 font-medium transition-colors duration-200">
              Solutions
            </a>
            <a href="#aqua-layer" className="text-foreground/80 hover:text-primary py-2 font-medium transition-colors duration-200">
              Aqua Layer
            </a>
            <a href="#services" className="text-foreground/80 hover:text-primary py-2 font-medium transition-colors duration-200">
              Services
            </a>
            {!isAuthenticated && (
              <Link href="/app" className="pt-2">
                <Button className="bg-accent hover:bg-accent/90 w-full">
                  Launch App
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
