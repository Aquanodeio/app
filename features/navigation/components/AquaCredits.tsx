"use client";
import { CreditCard, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAquaCredits } from "@/hooks/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/components/ui/sidebar";
import { paths } from "@/config/paths";

interface AquaCreditsProps {
  credits?: number;
  threshold?: string;
  className?: string;
}

const AquaCredits = ({ className = "" }: AquaCreditsProps) => {
  const { data, isLoading, error } = useAquaCredits();
  const { state } = useSidebar();
  const router = useRouter();
  const credits = data?.credits ?? 0;
  const isLowCredits = credits < 100;
  const isCollapsed = state === "collapsed";

  const handleClick = () => {
    router.push(paths.app.billing.path);
  };

  // Hide the component when sidebar is collapsed
  if (isCollapsed) {
    return null;
  }

  return (
    <div className={`${className}`}>
      {error ? (
        <div
          onClick={handleClick}
          className="p-4 rounded-lg bg-muted/20 border border-border/40 cursor-pointer hover:bg-muted/30 transition-colors"
        >
          <div className="text-center">
            <CreditCard
              size={20}
              className="mx-auto mb-2 text-muted-foreground"
            />
            <span className="text-sm text-muted-foreground">
              Unable to load credits
            </span>
            <div className="text-xs text-muted-foreground mt-1">
              Click to manage
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="p-4 rounded-lg bg-muted/20 border border-border/40 cursor-pointer hover:bg-muted/30 transition-all duration-200 hover:border-border/60 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CreditCard
                size={16}
                className="text-muted-foreground group-hover:text-foreground/80 transition-colors"
              />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Credits
              </span>
            </div>
            <Plus
              size={14}
              className="text-muted-foreground group-hover:text-foreground/80 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              {isLoading ? (
                <Skeleton className="h-7 w-20 bg-muted" />
              ) : (
                <span
                  className={`text-xl font-bold ${
                    isLowCredits ? "text-warning" : "text-violet-400"
                  }`}
                >
                  {credits.toFixed(2)}
                </span>
              )}
              {isLowCredits && !isLoading && (
                <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full border border-warning/20">
                  Low
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AquaCredits;
