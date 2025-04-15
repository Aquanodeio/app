"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import { useGPUCredits } from "@/hooks/queries";

interface GPUCreditsProps {
  id?: string;
  credits?: number;
  threshold?: string;
  className?: string;
}

const GPUCredits = ({
  className = "",
}: GPUCreditsProps) => {
  const { data, isLoading, error } = useGPUCredits();
  
  return (
    <Card className={`bg-secondary/30 backdrop-blur-sm p-4 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="bg-background p-3 rounded-lg">
          <LayoutGrid size={24} className="text-primary" />
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-l font-medium text-muted-foreground">GPU Credits</h3>
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

export default GPUCredits; 