"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Server, Zap, X } from "lucide-react";

interface GPUOption {
  name: string;
  memory: string;
  type: string;
  price: string;
  azure?: string;
  performance?: string;
}

const gpuOptions: GPUOption[] = [
  {
    name: 'H100',
    memory: '80GB',
    type: 'SXM',
    price: '1.4',
    azure: '12.29',
    performance: 'Highest'
  },
  {
    name: 'A100',
    memory: '80GB',
    type: 'SXM',
    price: '0.76',
    azure: '0.96',
    performance: 'Very High'
  },
  {
    name: 'V100',
    memory: '32GB',
    type: 'SXM',
    price: '0.20',
    azure: '3.06',
    performance: 'High'
  },
  {
    name: 'RTX 4090',
    memory: '24GB',
    type: 'PCIe',
    price: '0.38',
    performance: 'High'
  },
  {
    name: 'RTX A6000',
    memory: '48GB',
    type: 'PCIe',
    price: '0.33',
    performance: 'High'
  },
  {
    name: 'RTX 3090',
    memory: '24GB',
    type: 'PCIe',
    price: '0.24',
    performance: 'Medium'
  },
  {
    name: 'RTX 3070',
    memory: '8GB',
    type: 'PCIe',
    price: '0.19',
    performance: 'Medium'
  },
  {
    name: 'T4',
    memory: '16GB',
    type: 'PCIe',
    price: '0.13',
    azure: '0.34',
    performance: 'Entry'
  }
];

// GPU Card Component for consistency
const GPUCard: React.FC<{ gpu: GPUOption; onClick: () => void }> = ({ gpu, onClick }) => (
  <div className="bg-secondary/20 border border-border/40 rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/30 group h-full flex flex-col">
    <div className="flex-none">
      <div className="bg-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-105">
        <Server className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="heading-4 text-foreground">{gpu.name}</h3>
        <span className="status-badge bg-primary/20 text-primary border-primary/20">{gpu.type}</span>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="body-small text-muted-foreground">Memory</span>
          <span className="body-small text-foreground font-medium">{gpu.memory}</span>
        </div>
        {gpu.performance && (
          <div className="flex justify-between">
            <span className="body-small text-muted-foreground">Performance</span>
            <span className="body-small text-foreground font-medium">{gpu.performance}</span>
          </div>
        )}
      </div>
    </div>
    <div className="flex-grow flex flex-col justify-end">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-2xl font-bold text-foreground">
          ${gpu.price}/hr
        </p>
        {gpu.azure && (
          <span className="status-badge status-active">
            Save {((Number(gpu.azure) / Number(gpu.price))).toFixed(1)}x
          </span>
        )}
      </div>
      <p className="caption mb-4 min-h-[1.25rem]">
        {gpu.azure ? `vs. $${gpu.azure}/hr on Azure` : ''}
      </p>
      <Button className="w-full btn-primary btn-md" onClick={onClick}>
        <Zap className="h-4 w-4 mr-2" />
        Deploy Now
      </Button>
    </div>
  </div>
);

const PricingComponent: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-20 bg-background relative overflow-hidden" id="pricing">
      <div className="container-content relative z-10">
        <div className="text-center max-w-3xl mx-auto space-component">
          <h2 className="heading-1 space-element text-foreground">
            <span className="text-primary">GPU Pricing</span>
          </h2>
          <p className="body-large text-muted-foreground">
            Access high-performance GPUs at a fraction of the cost of traditional cloud providers.
            No hidden fees, no long-term commitments.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full space-component">
          <div className="flex justify-center">
            <TabsList className="bg-secondary/30 border border-border">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All GPUs</TabsTrigger>
              <TabsTrigger value="high-end" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">High-End</TabsTrigger>
              <TabsTrigger value="mid-range" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Mid-Range</TabsTrigger>
              <TabsTrigger value="budget" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Budget</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-8">
            <div className="grid-responsive-4">
              {gpuOptions.map((gpu, index) => (
                <GPUCard key={`all-${index}`} gpu={gpu} onClick={openModal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="high-end" className="mt-8">
            <div className="grid-responsive-3">
              {gpuOptions.filter(gpu => ['H100', 'A100', 'RTX 4090'].includes(gpu.name)).map((gpu, index) => (
                <GPUCard key={`high-${index}`} gpu={gpu} onClick={openModal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mid-range" className="mt-8">
            <div className="grid-responsive-3">
              {gpuOptions.filter(gpu => ['RTX A6000', 'RTX 3090', 'V100'].includes(gpu.name)).map((gpu, index) => (
                <GPUCard key={`mid-${index}`} gpu={gpu} onClick={openModal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budget" className="mt-8">
            <div className="grid-responsive-3">
              {gpuOptions.filter(gpu => ['RTX 3070', 'T4'].includes(gpu.name)).map((gpu, index) => (
                <GPUCard key={`budget-${index}`} gpu={gpu} onClick={openModal} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <div className="bg-secondary/20 border border-border/40 rounded-xl p-6 inline-block">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-primary mr-2" />
              <h3 className="heading-4 text-foreground">Volume Discounts Available</h3>
            </div>
            <p className="body-base text-muted-foreground mb-6">
              Need a large number of GPUs or long-term reservations? Contact us for custom pricing.
            </p>
            <Button className="btn-primary btn-md" onClick={openModal}>
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-secondary/90 border border-border rounded-xl p-8 max-w-sm w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="heading-4 text-foreground mb-4">Contact Us</h3>
            <p className="body-base text-muted-foreground mb-6">
              To deploy or inquire about volume discounts, please reach out to us at:
            </p>
            <a
              href="mailto:contact@aquanode.io"
              className="block text-center btn-primary btn-md w-full transition-colors"
            >
              Email: contact@aquanode.io
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingComponent;