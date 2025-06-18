import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingResult } from "./types";

interface PricingCardProps {
  pricing: PricingResult;
}

export const PricingCard = ({ pricing }: PricingCardProps) => (
  <Card className="mt-3 border-primary/20 bg-primary/5">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-sm">
        <DollarSign size={16} className="text-primary" />
        Pricing for {pricing.provider} ({pricing.duration})
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 text-xs">
      {Object.entries(pricing.pricing).map(([config, price]) => (
        <div key={config} className="flex justify-between">
          <span className="text-muted-foreground">{config}:</span>
          <span className="font-medium">{price}</span>
        </div>
      ))}
    </CardContent>
  </Card>
); 