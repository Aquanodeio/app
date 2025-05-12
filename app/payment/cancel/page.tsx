"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentCancelPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-blue-50 p-4">
      <div className="max-w-md w-full p-8 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <XCircle className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-blue-200 mb-6">
            Your payment process was cancelled. No charges have been made to your account.
          </p>
          {orderNumber && (
            <p className="text-sm text-blue-300 mb-6">
              Order Reference: {orderNumber}
            </p>
          )}
          <div className="space-y-3 w-full">
            <Button 
              onClick={() => router.push('/pricing')}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => router.push('/app/dashboard')}
              variant="outline"
              className="w-full"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage; 