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

const PricingComponent: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="py-24 bg-[#080f1e] relative overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-blue-50">
            Transparent <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">GPU Pricing</span>
          </h2>
          <p className="text-blue-200/80 text-lg">
            Access high-performance GPUs at a fraction of the cost of traditional cloud providers.
            No hidden fees, no long-term commitments.
          </p>
        </div>
        <Tabs defaultValue="all" className="w-full mb-8">
          <div className="flex justify-center">
            <TabsList className="bg-blue-800/30 border border-blue-200/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-1000">All GPUs</TabsTrigger>
              <TabsTrigger value="high-end" className="data-[state=active]:bg-blue-1000">High-End</TabsTrigger>
              <TabsTrigger value="mid-range" className="data-[state=active]:bg-blue-1000">Mid-Range</TabsTrigger>
              <TabsTrigger value="budget" className="data-[state=active]:bg-blue-1000">Budget</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {gpuOptions.map((gpu, index) => (
                <div
                  key={index}
                  className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                      <Server className="h-6 w-6 text-white/90" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-blue-50 group-hover:text-white transition-colors duration-300">{gpu.name}</h3>
                      <span className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">{gpu.type}</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-blue-300/80">Memory</span>
                        <span className="text-blue-100 font-medium">{gpu.memory}</span>
                      </div>
                      {gpu.performance && (
                        <div className="flex justify-between">
                          <span className="text-blue-300/80">Performance</span>
                          <span className="text-blue-100 font-medium">{gpu.performance}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between mb-2">
                        <p className="text-2xl font-bold text-blue-50">
                          ${gpu.price}/hr
                        </p>
                        {gpu.azure && (
                          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                            Save {((Number(gpu.azure) / Number(gpu.price))).toFixed(2)}x
                          </span>
                        )}
                      </div>
                      {(
                        <p className="text-sm text-blue-300/70 mb-4">
                          {gpu.azure ? `vs. $${gpu.azure}/hr on Azure` : '\u00A0'}
                        </p>
                      )}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2 group-hover:bg-blue-500" onClick={openModal}>
                        <Zap className="h-4 w-4 mr-2" />
                        Deploy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="high-end" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gpuOptions.filter(gpu => ['H100', 'A100', 'RTX 4090'].includes(gpu.name)).map((gpu, index) => (
                <div
                  key={index}
                  className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                      <Server className="h-6 w-6 text-white/90" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-blue-50 group-hover:text-white transition-colors duration-300">{gpu.name}</h3>
                      <span className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">{gpu.type}</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-blue-300/80">Memory</span>
                        <span className="text-blue-100 font-medium">{gpu.memory}</span>
                      </div>
                      {gpu.performance && (
                        <div className="flex justify-between">
                          <span className="text-blue-300/80">Performance</span>
                          <span className="text-blue-100 font-medium">{gpu.performance}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between mb-2">
                        <p className="text-2xl font-bold text-blue-50">
                          ${gpu.price}/hr
                        </p>
                        {gpu.azure && (
                          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                            Save {((Number(gpu.azure) / Number(gpu.price))).toFixed(2)}x
                          </span>
                        )}
                      </div>
                      {gpu.azure && (
                        <p className="text-sm text-blue-300/70 mb-4">
                          vs. ${gpu.azure}/hr on Azure
                        </p>
                      )}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2 group-hover:bg-blue-500" onClick={openModal}>
                        <Zap className="h-4 w-4 mr-2" />
                        Deploy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mid-range" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gpuOptions.filter(gpu => ['RTX A6000', 'RTX 3090', 'V100'].includes(gpu.name)).map((gpu, index) => (
                <div
                  key={index}
                  className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                      <Server className="h-6 w-6 text-white/90" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-blue-50 group-hover:text-white transition-colors duration-300">{gpu.name}</h3>
                      <span className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">{gpu.type}</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-blue-300/80">Memory</span>
                        <span className="text-blue-100 font-medium">{gpu.memory}</span>
                      </div>
                      {gpu.performance && (
                        <div className="flex justify-between">
                          <span className="text-blue-300/80">Performance</span>
                          <span className="text-blue-100 font-medium">{gpu.performance}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between mb-2">
                        <p className="text-2xl font-bold text-blue-50">
                          ${gpu.price}/hr
                        </p>
                        {gpu.azure && (
                          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                            Save {((Number(gpu.azure) / Number(gpu.price))).toFixed(2)}x
                          </span>
                        )}
                      </div>
                      {gpu.azure && (
                        <p className="text-sm text-blue-300/70 mb-4">
                          vs. ${gpu.azure}/hr on Azure
                        </p>
                      )}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2 group-hover:bg-blue-500" onClick={openModal}>
                        <Zap className="h-4 w-4 mr-2" />
                        Deploy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budget" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gpuOptions.filter(gpu => ['RTX 3070', 'T4'].includes(gpu.name)).map((gpu, index) => (
                <div
                  key={index}
                  className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                      <Server className="h-6 w-6 text-white/90" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-blue-50 group-hover:text-white transition-colors duration-300">{gpu.name}</h3>
                      <span className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">{gpu.type}</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-blue-300/80">Memory</span>
                        <span className="text-blue-100 font-medium">{gpu.memory}</span>
                      </div>
                      {gpu.performance && (
                        <div className="flex justify-between">
                          <span className="text-blue-300/80">Performance</span>
                          <span className="text-blue-100 font-medium">{gpu.performance}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between mb-2">
                        <p className="text-2xl font-bold text-blue-50">
                          ${gpu.price}/hr
                        </p>
                        {gpu.azure && (
                          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                            Save {((Number(gpu.azure) / Number(gpu.price))).toFixed(2)}x
                          </span>
                        )}
                      </div>
                      {gpu.azure && (
                        <p className="text-sm text-blue-300/70 mb-4">
                          vs. ${gpu.azure}/hr on Azure
                        </p>
                      )}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2 group-hover:bg-blue-500" onClick={openModal}>
                        <Zap className="h-4 w-4 mr-2" />
                        Deploy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-lg bg-blue-900/20 border border-blue-500/30 backdrop-blur-md">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold text-blue-50">Volume Discounts Available</h3>
            </div>
            <p className="text-blue-200/80 mb-6">
              Need a large number of GPUs or long-term reservations? Contact us for custom pricing.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={openModal}>
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-blue-900 border border-blue-500/50 rounded-2xl p-8 max-w-sm w-full relative shadow-xl shadow-blue-500/20">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-blue-300 hover:text-blue-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold text-blue-50 mb-4">Contact Us</h3>
            <p className="text-blue-200 mb-6">
              To deploy or inquire about volume discounts, please reach out to us at:
            </p>
            <a
              href="mailto:contact@aquanode.io"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
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