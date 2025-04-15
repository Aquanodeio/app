import { useQuery } from "@tanstack/react-query";
import { getAquaCredits } from "@/hooks/service";

// Query key for credits
export const aquaCreditsKey = ["aquaCredits"] as const;

// Hook to fetch credits
export function useAquaCredits() {
  return useQuery({
    queryKey: aquaCreditsKey,
    queryFn: getAquaCredits,
  });
} 