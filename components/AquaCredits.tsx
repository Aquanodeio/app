"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import { useAquaCredits } from "@/hooks/api";

interface AquaCreditsProps {
  id?: string;
  credits?: number;
  threshold?: string;
  className?: string; 
}

const AquaCredits = ({
  className = "",
}: AquaCreditsProps) => {
  const { data, isLoading, error } = useAquaCredits();
  
  return (
    <Card className={`bg-secondary/30 backdrop-blur-sm p-4 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="bg-background p-3 rounded-lg">
          <LayoutGrid size={24} className="text-primary" />
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-l font-medium text-muted-foreground">Aqua Credits</h3>
          {isLoading ? (
            <p className="text-xl font-bold">Loading...</p>
          ) : error ? (
            <p className="text-xl font-bold">--</p>
          ) : (
            <p className="text-xl font-bold">{data?.credits || 0} Credits</p>
          )}
        </div>
      </div>
      
    </Card>
  );
};

export default AquaCredits; 