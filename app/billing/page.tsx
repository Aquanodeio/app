"use client";

import React, { useState, useEffect } from "react";
import { getCurrentUser, getAquaCredits } from "@/hooks/service";
import { usePurchaseCredits, useSupportedCryptocurrencies } from "@/hooks/api";
import {
  Container,
  Heading,
  Text,
  Card,
  Grid,
  Button,
  StatsCard,
  StatusBadge,
} from "@/components/ui/design-system";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  TrendingUp,
  Clock,
  Zap,
  DollarSign,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { SupportedCryptoCurrency } from "@/lib/types";

interface CreditDetails {
  currentCredits: number;
  totalSpent: number;
  totalPurchased: number;
  usageStatistics: {
    averageDailyUsage: number;
    estimatedDaysRemaining: number | null;
    dailyUsage: Record<string, number>;
  };
  recentTransactions: Array<{
    id: string;
    type: "DEBIT" | "CREDIT" | "BUFFER";
    amount: number;
    timestamp: string;
    deploymentId?: string;
    balanceAfter: number;
    metadata?: Record<string, any>;
  }>;
  summary: {
    lifetimeSpent: number;
    lifetimePurchased: number;
    netUsage: number;
    transactionCount: number;
  };
}

const CREDIT_PACKAGES = [
  {
    credits: 1000,
    popular: false,
    description: "Perfect for getting started",
  },
  {
    credits: 5000,
    popular: true,
    description: "Most popular choice",
  },
  {
    credits: 10000,
    popular: false,
    description: "For power users",
  },
];

const CREDITS_TO_USD_RATIO = 100; // 100 credits = $1

export default function CreditsPage() {
  const [user, setUser] = useState<any>(null);
  const [creditDetails, setCreditDetails] = useState<CreditDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Purchase Credits State
  const [credits, setCredits] = useState(1000);
  const [cost, setCost] = useState(10);
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [cryptoAmount, setCryptoAmount] = useState<string | null>(null);

  const { data: currencies, isLoading: isLoadingCurrencies } =
    useSupportedCryptocurrencies();
  const { mutate: purchaseCredits, isPending } = usePurchaseCredits();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          fetchCreditDetails();
        }
      } catch (err) {
        setError("Failed to load user");
        setLoading(false);
      }
    };

    loadUser();
  }, []);

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
        const precision = selectedCryptoInfo.output_precision || 8;
        setCryptoAmount(amount.toFixed(precision));
      } else {
        setCryptoAmount(null);
      }
    } else {
      setCryptoAmount(null);
    }
  }, [cost, selectedCurrency, currencies]);

  const fetchCreditDetails = async () => {
    try {
      setLoading(true);
      const creditsResponse = await getAquaCredits();

      const mockDetails: CreditDetails = {
        currentCredits: creditsResponse.credits,
        totalSpent: 0,
        totalPurchased: creditsResponse.credits,
        usageStatistics: {
          averageDailyUsage: 0,
          estimatedDaysRemaining: null,
          dailyUsage: {},
        },
        recentTransactions: [],
        summary: {
          lifetimeSpent: 0,
          lifetimePurchased: creditsResponse.credits,
          netUsage: creditsResponse.credits,
          transactionCount: 0,
        },
      };

      setCreditDetails(mockDetails);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load credit details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCredits(value);
  };

  const handlePackageSelect = (packageCredits: number) => {
    setCredits(packageCredits);
  };

  useEffect(() => {
    if (currencies && currencies.length > 0) {
      setSelectedCurrency(currencies[0].currency);
    }
  }, [currencies]);

  const handlePurchase = () => {
    if (credits <= 0) {
      toast.error("Please enter a valid credit amount");
      return;
    }

    purchaseCredits(
      {
        amount: cost,
        creditAmount: credits,
        currency: "SOL",
      },
      {
        onSuccess: (data) => {
          if (data?.data?.invoice_url) {
            window.open(data.data.invoice_url, "_blank");
            toast.success(
              "Redirecting to invoice! Complete your payment to receive credits."
            );
            // Refresh credit details after purchase initiation
            setTimeout(() => {
              fetchCreditDetails();
            }, 1000);
          } else {
            toast.error("Failed to create payment invoice");
          }
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to create payment invoice");
        },
      }
    );
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const formatCredits = (amount: number) => {
    return amount.toLocaleString();
  };

  if (loading) {
    return (
      <Container variant="wide" className="space-dashboard">
        <div className="space-element">
          <Heading level={1} className="space-tight">
            Credits
          </Heading>
          <Text variant="base" muted>
            Manage your Aqua credits and usage
          </Text>
        </div>

        <Grid variant="responsive-4" className="space-component">
          {[...Array(4)].map((_, i) => (
            <StatsCard key={i} title="Loading..." value="" loading />
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container variant="wide" className="space-dashboard">
        <div className="space-element">
          <Heading level={1} className="space-tight">
            Credits
          </Heading>
          <Text variant="base" muted>
            Manage your Aqua credits and usage
          </Text>
        </div>

        <Card variant="primary" className="text-center space-component">
          <Text variant="base" className="text-destructive">
            {error}
          </Text>
          <Button
            variant="primary"
            size="sm"
            onClick={fetchCreditDetails}
            className="mt-4"
          >
            Try Again
          </Button>
        </Card>
      </Container>
    );
  }

  if (!creditDetails) return null;

  const displayedTransactions = showAllTransactions
    ? creditDetails.recentTransactions
    : creditDetails.recentTransactions.slice(0, 5);

  return (
    <Container variant="wide" className="space-dashboard">
      {/* Header */}
      <div className="space-element">
        <Heading level={1} className="space-tight">
          Credits
        </Heading>
        <Text variant="base" muted className="max-w-3xl">
          Manage your Aqua credits, monitor usage, and purchase additional
          credits for your deployments.
        </Text>
      </div>

      {/* Stats Overview */}
      <Grid variant="responsive-4" className="space-component">
        <StatsCard
          title="Current Balance"
          value={formatCredits(creditDetails.currentCredits)}
          subtitle="Available credits"
        />
        <StatsCard
          title="Daily Usage"
          value={creditDetails.usageStatistics.averageDailyUsage.toFixed(1)}
          subtitle="Average per day"
        />
        <StatsCard
          title="Days Remaining"
          value={
            creditDetails.usageStatistics.estimatedDaysRemaining?.toString() ||
            "∞"
          }
          subtitle="At current usage"
        />
        <StatsCard
          title="Total Spent"
          value={formatCredits(creditDetails.summary.lifetimeSpent)}
          subtitle="All time"
        />
      </Grid>

      {/* Purchase Credits Section */}
      <div className="space-component">
        <div className="space-element">
          <Heading level={2} className="space-tight">
            Purchase Credits
          </Heading>
          <Text variant="base" muted>
            Choose an amount or select a package to power your deployments
          </Text>
        </div>

        <Grid variant="responsive-2">
          {/* Credit Input Section */}
          <Card variant="primary">
            <div className="space-element">
              <Heading level={4} className="space-tight">
                Custom Amount
              </Heading>
              <Text variant="small" muted>
                Enter the exact amount of credits you need
              </Text>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="credits" className="body-small font-medium">
                  Credits Amount
                </Label>
                <div className="relative">
                  <Input
                    id="credits"
                    type="number"
                    min="1"
                    value={credits}
                    onChange={handleCreditsChange}
                    className="input-base input-focus pr-20"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground body-small">
                    = ${cost}
                  </div>
                </div>
                <Text variant="caption" className="mt-1">
                  1 USD = 100 Credits
                </Text>
              </div>

              <div>
                <Label htmlFor="currency" className="body-small font-medium">
                  Payment Currency
                </Label>
                <Select
                  value={selectedCurrency}
                  onValueChange={setSelectedCurrency}
                  disabled={isLoadingCurrencies || !currencies}
                >
                  <SelectTrigger id="currency" className="input-base">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingCurrencies ? (
                      <SelectItem value="loading" disabled>
                        Loading currencies...
                      </SelectItem>
                    ) : currencies ? (
                      currencies.map((currency: SupportedCryptoCurrency) => (
                        <SelectItem
                          key={currency.currency}
                          value={currency.currency}
                        >
                          {currency.name} ({currency.currency})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    )}
                  </SelectContent>
                </Select>

                {cryptoAmount && (
                  <Text variant="small" className="mt-2">
                    <span className="font-medium">
                      ≈ {cryptoAmount} {selectedCurrency}
                    </span>
                    <span className="caption ml-1 text-muted-foreground">
                      (approximate value)
                    </span>
                  </Text>
                )}
              </div>

              <Button
                onClick={handlePurchase}
                disabled={isPending || credits <= 0}
                className="btn-primary btn-md w-full"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Purchase {formatCredits(credits)} Credits
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Package Options */}
          <Card variant="compact">
            <div className="space-element">
              <Heading level={4} className="space-tight">
                Quick Packages
              </Heading>
              <Text variant="small" muted>
                Click to select popular credit amounts
              </Text>
            </div>

            <div className="space-y-3">
              {CREDIT_PACKAGES.map((pkg, index) => (
                <div
                  key={index}
                  onClick={() => handlePackageSelect(pkg.credits)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    credits === pkg.credits
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-background/20"
                  } ${pkg.popular ? "ring-1 ring-primary/20" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Text variant="small" className="font-medium">
                          {formatCredits(pkg.credits)} Credits
                        </Text>
                        {pkg.popular && (
                          <StatusBadge variant="active">Popular</StatusBadge>
                        )}
                      </div>
                      <Text variant="caption" muted>
                        {pkg.description}
                      </Text>
                      {/* {pkg.highlight && (
                        <Text variant="caption" className="text-primary">
                          {pkg.highlight}
                        </Text>
                      )} */}
                    </div>
                    <div className="text-right">
                      <Text variant="small" className="font-medium">
                        ${(pkg.credits / CREDITS_TO_USD_RATIO).toFixed(0)}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Grid>
      </div>

      {/* Usage Statistics */}
      <div className="space-component">
        <div className="space-element">
          <Heading level={2} className="space-tight">
            Usage Overview
          </Heading>
          <Text variant="base" muted>
            Track your credit consumption patterns
          </Text>
        </div>

        <Grid variant="responsive-2">
          <Card variant="compact">
            <div className="flex items-center gap-3 space-tight">
              <div className="p-2 rounded-md bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <Heading level={4}>Usage Summary</Heading>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text variant="small" muted className="space-tight">
                  Lifetime Purchased
                </Text>
                <Text variant="base" className="font-medium">
                  {formatCredits(creditDetails.summary.lifetimePurchased)}
                </Text>
              </div>
              <div>
                <Text variant="small" muted className="space-tight">
                  Lifetime Spent
                </Text>
                <Text variant="base" className="font-medium">
                  {formatCredits(creditDetails.summary.lifetimeSpent)}
                </Text>
              </div>
              <div>
                <Text variant="small" muted className="space-tight">
                  Net Balance
                </Text>
                <Text variant="base" className="font-medium">
                  {formatCredits(creditDetails.summary.netUsage)}
                </Text>
              </div>
              <div>
                <Text variant="small" muted className="space-tight">
                  Transactions
                </Text>
                <Text variant="base" className="font-medium">
                  {creditDetails.summary.transactionCount}
                </Text>
              </div>
            </div>
          </Card>

          <Card variant="compact">
            <div className="flex items-center gap-3 space-tight">
              <div className="p-2 rounded-md bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <Heading level={4}>Daily Usage (Last 7 Days)</Heading>
            </div>

            <div className="space-y-2">
              {Object.entries(creditDetails.usageStatistics.dailyUsage)
                .slice(0, 7)
                .map(([date, usage]) => (
                  <div key={date} className="flex justify-between items-center">
                    <Text variant="small" muted>
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                    <Text variant="small" className="font-medium">
                      {usage.toFixed(1)} credits
                    </Text>
                  </div>
                ))}
            </div>
          </Card>
        </Grid>
      </div>

      {/* Recent Transactions */}
      <div className="space-component">
        <div className="flex items-center justify-between space-element">
          <div>
            <Heading level={2} className="space-tight">
              Recent Transactions
            </Heading>
            <Text variant="base" muted>
              Your latest credit activity
            </Text>
          </div>

          {creditDetails.recentTransactions.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTransactions(!showAllTransactions)}
            >
              {showAllTransactions ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Show All
                </>
              )}
            </Button>
          )}
        </div>

        <Card variant="compact">
          {displayedTransactions.length === 0 ? (
            <div className="text-center py-8">
              <Text variant="base" muted>
                No transactions yet
              </Text>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-md bg-background/20 hover:bg-background/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-full ${
                        transaction.type === "CREDIT"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      {transaction.type === "CREDIT" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <Text variant="small" className="font-medium space-tight">
                        {transaction.type === "CREDIT"
                          ? "Credit Purchase"
                          : "Deployment Usage"}
                      </Text>
                      <Text variant="caption" muted>
                        {formatDate(transaction.timestamp)}
                        {transaction.deploymentId && (
                          <span className="ml-2 font-mono">
                            {transaction.deploymentId.slice(0, 8)}...
                          </span>
                        )}
                      </Text>
                    </div>
                  </div>

                  <div className="text-right">
                    <Text
                      variant="small"
                      className={`font-medium ${
                        transaction.type === "CREDIT"
                          ? "text-green-400"
                          : "text-orange-400"
                      }`}
                    >
                      {transaction.type === "CREDIT" ? "+" : "-"}
                      {formatCredits(transaction.amount)}
                    </Text>
                    <Text variant="caption" muted>
                      Balance: {formatCredits(transaction.balanceAfter)}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Container>
  );
}
