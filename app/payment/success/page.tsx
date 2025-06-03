"use client";

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { aquaCreditsKey } from '@/hooks/api/useAquaCredits';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const orderNumber = searchParams.get('order');

  useEffect(() => {
    // Invalidate credits query to refresh the balance
    queryClient.invalidateQueries({ queryKey: aquaCreditsKey });
  }, [queryClient]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-blue-50 p-4">
      <div className="max-w-md w-full p-8 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-blue-200 mb-6">
            Your payment has been processed successfully. Your Aqua Credits will be added to your account shortly.
          </p>
          {orderNumber && (
            <p className="text-sm text-blue-300 mb-6">
              Order Reference: {orderNumber}
            </p>
          )}
          <Button 
            onClick={() => router.push('/app/deployments')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 