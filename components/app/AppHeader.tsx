"use client";

import { useCredits } from "@/hooks/queries/useCredits";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/lib/auth/hooks/useAuthSession";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader() {
  const router = useRouter();
  const { displayName, signOut } = useAuthSession();
  const { data: credits, isLoading: creditsLoading } = useCredits();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="border-b border-border/20 bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="flex justify-between h-16 items-center px-6 max-w-[129rem] mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold gradient-text">Aquanode</span>
        </div>

        <div className="flex items-center gap-4">
          {!creditsLoading && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary">
              <Coins className="w-4 h-4" />
              <span className="font-medium">{credits} credits</span>
            </div>
          )}

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
        </div>
      </div>
    </header>
  );
} 