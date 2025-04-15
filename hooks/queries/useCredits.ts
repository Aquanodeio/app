import { useQuery } from '@tanstack/react-query';
import { getUserCredits } from '@/services/credits';

export function useCredits() {
  return useQuery({
    queryKey: ['credits'],
    queryFn: getUserCredits,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // Refetch every minute
  });
} 