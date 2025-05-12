import { useMutation, useQuery } from "@tanstack/react-query";
import { purchaseCredits, getSupportedCryptocurrencies } from "@/hooks/service";





// Query key for supported cryptocurrencies
export const supportedCryptocurrenciesKey = ["supportedCryptocurrencies"] as const;

// Hook to fetch supported cryptocurrencies
export function useSupportedCryptocurrencies() {
  return useQuery({
    queryKey: supportedCryptocurrenciesKey,
    queryFn: getSupportedCryptocurrencies,
  });
}

// Hook to purchase credits with cryptocurrency
export function usePurchaseCredits() {
  return useMutation({
    mutationFn: ({ amount, creditAmount, currency }: { 
      amount: number; 
      creditAmount: number; 
      currency: string 
    }) => purchaseCredits(amount, creditAmount, currency),
  });
} 