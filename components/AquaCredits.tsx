"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { LayoutGrid, Plus } from "lucide-react";
import { useAquaCredits } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import PurchaseCredits from "./PurchaseCredits";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface AquaCreditsProps {
  id?: string;
  credits?: number;
  threshold?: string;
  className?: string;
}

const AquaCredits = ({ className = "" }: AquaCreditsProps) => {
  const { data, isLoading, error } = useAquaCredits();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <>
      <Card className={`card-compact ${className}`}>
        {/* Header with icon and title */}
        <div className="flex items-center mb-2">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <LayoutGrid size={14} className="text-primary" />
          </div>
          <h3 className="text-xs font-medium uppercase tracking-wide">Aqua Credits</h3>
        </div>

        {/* Credits amount */}
        <div className="mb-2">
          {isLoading ? (
            <p className="text-base font-bold animate-pulse">Loading...</p>
          ) : error ? (
            <p className="text-base font-bold text-muted-foreground">--</p>
          ) : (
            <p className="text-base font-bold">{data?.credits || 0} Credits</p>
          )}
        </div>

        <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full text-xs h-8">
              <Plus size={12} className="mr-1" />
              Add Credits
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Purchase Credits</DialogTitle>
            </DialogHeader>

            <PurchaseCredits onSuccess={() => setIsPurchaseModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};

export default AquaCredits;
