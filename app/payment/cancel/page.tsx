"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCancelPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="auth-container">
      <div className="auth-card text-center">
        <div className="space-element">
          <XCircle className="h-16 w-16 text-destructive mb-4 mx-auto" />
        </div>

        <h1 className="auth-title">Payment Cancelled</h1>
        <p className="auth-subtitle space-element">
          Your payment process was cancelled. No charges have been made to your
          account.
        </p>

        {orderNumber && (
          <p className="body-small text-muted-foreground space-element">
            Order Reference: {orderNumber}
          </p>
        )}

        <div className="space-y-3 w-full mt-6">
          <Button
            onClick={() => router.push("/pricing")}
            className="btn-primary btn-md w-full"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.push("/deployments")}
            variant="outline"
            className="btn-secondary btn-md w-full"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
