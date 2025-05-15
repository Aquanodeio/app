"use client";

import React, { useState, useEffect } from 'react';
import { usePurchaseCredits, useSupportedCryptocurrencies } from '@/hooks/api';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { SupportedCryptoCurrency } from '@/lib/types';

interface PurchaseCreditsProps {
  onSuccess?: () => void;
}

const CREDITS_TO_USD_RATIO = 100; // 100 credits = $1

const PurchaseCredits: React.FC<PurchaseCreditsProps> = ({ onSuccess }) => {
  const [credits, setCredits] = useState(100);
  const [cost, setCost] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [cryptoAmount, setCryptoAmount] = useState<string | null>(null);
  
  const { data: currencies, isLoading: isLoadingCurrencies } = useSupportedCryptocurrencies();
  const { mutate: purchaseCredits, isPending } = usePurchaseCredits();

  // Update cost when credits change
  useEffect(() => {
    const calculatedCost = credits / CREDITS_TO_USD_RATIO;
    setCost(parseFloat(calculatedCost.toFixed(2)));
  }, [credits]);

  // Calculate crypto amount when cost or selected currency changes
  useEffect(() => {
    if (!currencies || !cost) {
      setCryptoAmount(null);
      return;
    }

    const selectedCryptoInfo = currencies.find(
      (crypto: SupportedCryptoCurrency) => crypto.currency === selectedCurrency
    );

    if (selectedCryptoInfo && selectedCryptoInfo.price_usd) {
      const rateUsd = parseFloat(selectedCryptoInfo.price_usd);
      if (rateUsd > 0) {
        const amount = cost / rateUsd;
        // Use the currency's precision for formatting
        const precision = selectedCryptoInfo.output_precision || 8;
        setCryptoAmount(amount.toFixed(precision));
      } else {
        setCryptoAmount(null);
      }
    } else {
      setCryptoAmount(null);
    }
  }, [cost, selectedCurrency, currencies]);

  const handleCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCredits(value);
  };

  const handlePurchase = () => {
    if (credits <= 0) {
      toast.error('Please enter a valid credit amount');
      return;
    }

    purchaseCredits(
      {
        amount: cost,
        creditAmount: credits,
        currency: selectedCurrency
      },
      {
        onSuccess: (data) => {
          // Open the invoice URL in a new tab
          console.log("data", data, data.data?.invoice_url);
          if (data?.data?.invoice_url) {
            window.open(data.data.invoice_url, '_blank');
            toast.success('Payment invoice created! Complete your payment to receive credits.');
            if (onSuccess) onSuccess();
          } else {
            toast.error('Failed to create payment invoice');
          }
        },
        onError: (error: any) => {
          toast.error(error.message || 'Failed to create payment invoice');
        }
      }
    );
  };
  
  return (
    <div className="space-y-6 p-4 bg-secondary/20 rounded-lg">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Purchase Aqua Credits</h3>
        <p className="text-muted-foreground">Enter the amount of credits you want to purchase</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="credits">Credits Amount</Label>
          <div className="relative">
            <Input
              id="credits"
              type="number"
              min="1"
              value={credits}
              onChange={handleCreditsChange}
              className="pr-20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              = ${cost}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">1 USD = 100 Credits</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="currency">Payment Currency</Label>
          <Select 
            value={selectedCurrency} 
            onValueChange={setSelectedCurrency}
            disabled={isLoadingCurrencies || !currencies}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingCurrencies ? (
                <SelectItem value="loading" disabled>Loading currencies...</SelectItem>
              ) : currencies ? (
                currencies.map((currency: SupportedCryptoCurrency) => (
                  <SelectItem key={currency.currency} value={currency.currency}>
                    {currency.name} ({currency.currency})
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
              )}
            </SelectContent>
          </Select>
          
          {cryptoAmount && (
            <p className="text-sm mt-2">
              <span className="font-medium">≈ {cryptoAmount} {selectedCurrency}</span>
              <span className="text-xs text-muted-foreground ml-1">
                (approximate value)
              </span>
            </p>
          )}
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={handlePurchase} 
            disabled={isPending || credits <= 0}
            className="w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Purchase {credits} Credits
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCredits; 