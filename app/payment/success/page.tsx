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
    <div className="auth-container">
      <div className="auth-card text-center">
        <div className="space-element">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4 mx-auto" />
        </div>
        
        <h1 className="auth-title">Payment Successful!</h1>
        <p className="auth-subtitle space-element">
          Your payment has been processed successfully. Your Aqua Credits will be added to your account shortly.
        </p>
        
        {orderNumber && (
          <p className="body-small text-muted-foreground space-element">
            Order Reference: {orderNumber}
          </p>
        )}
        
        <div className="mt-6">
          <Button 
            onClick={() => router.push('/app/deployments')}
            className="btn-primary btn-md w-full"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 