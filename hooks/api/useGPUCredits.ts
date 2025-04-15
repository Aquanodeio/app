import { useQuery } from "@tanstack/react-query";
import { getGPUCredits } from "@/hooks/service";

// Query key for GPU credits
export const gpuCreditsKey = ["gpuCredits"] as const;

// Hook to fetch GPU credits
export function useGPUCredits() {
  return useQuery({
    queryKey: gpuCreditsKey,
    queryFn: getGPUCredits,
  });
} 