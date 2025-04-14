"use client";
import Footer from "@/components/Footer";   
import { Button } from "@/components/ui/button";
import { ChevronRight, Server, Cpu, Zap, CloudCog, DollarSign, Clock, Layers, Network, Cloud, CreditCard, Globe, Code, Database, BarChart, GitBranch, Lock, BookOpen, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-blue-50">
      <Hero />
      <Solutions />
      <AquaLayer />
      <Services />
      <CTA />
      <Footer />
    </div>
  );
}

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-[#050814]">
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-3/5 lg:pr-12 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">The World's Largest</span>
              <br />
              Compute Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/80 mb-8 leading-relaxed max-w-3xl">
              The world's largest compute ecosystem, deploying customizable Aqua services through the Aqua layer
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/app/services">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-900/50 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Get Started 
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-2/5 mt-12 lg:mt-0 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-blue-400/30 rounded-lg blur-sm opacity-30 animate-pulse-glow"></div>
              <div className="bg-[#0a1022]/90 border border-blue-500/20 p-6 sm:p-8 rounded-lg relative shadow-lg hover-effect"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="bg-gradient-to-b from-[#0d1424] to-[#0a1022] rounded-md p-4 font-mono text-sm mb-4 border border-blue-500/20 animate-shimmer">
                  <p className="text-blue-100"><span className="text-blue-400">$</span> aquanode deploy --service jupyter</p>
                  <p className="mt-2 text-blue-200">🚀 Deploying Jupyter Notebook service...</p>
                  <p className="mt-1 text-blue-200">✅ Successfully deployed at: <span className="text-blue-400">https://jupyter.aquanode.io/y8f3a</span></p>
                  <p className="mt-1 text-blue-200">💰 Cost: <span className="text-blue-400">$1.50/hour</span> (compared to $13.50 on Azure)</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`border border-blue-500/20 bg-gradient-to-b from-[#0d1424] to-[#0a1022] rounded-md p-4 transition-all duration-500 ${isHovered ? 'border-blue-400/40 shadow-lg shadow-blue-400/10' : ''}`}>
                    <h3 className="font-semibold mb-2 flex items-center text-blue-100">
                      <Server className="h-4 w-4 mr-2 text-blue-400" /> H100 GPU
                    </h3>
                    <p className="text-sm text-blue-200/80">Aquanode: <span className="text-blue-100 font-medium">$1.50/hr</span></p>
                    <p className="text-sm text-blue-200/80">Azure: <span className="text-blue-100 font-medium">$13.50/hr</span></p>
                    <div className="mt-2 h-2 bg-blue-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400/80 animate-shimmer" style={{ width: "89%" }}></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-blue-300/80">89% savings</p>
                  </div>
                  <div className={`border border-blue-500/20 bg-gradient-to-b from-[#0d1424] to-[#0a1022] rounded-md p-4 transition-all duration-500 ${isHovered ? 'border-blue-500/40 shadow-lg shadow-blue-500/10' : ''}`}>
                    <h3 className="font-semibold mb-2 flex items-center text-blue-100">
                      <Cpu className="h-4 w-4 mr-2 text-blue-400" /> A100 GPU
                    </h3>
                    <p className="text-sm text-blue-200/80">Aquanode: <span className="text-blue-100 font-medium">$0.90/hr</span></p>
                    <p className="text-sm text-blue-200/80">AWS: <span className="text-blue-100 font-medium">$8.10/hr</span></p>
                    <div className="mt-2 h-2 bg-blue-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500/80 animate-shimmer" style={{ width: "90%" }}></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-blue-300/80">90% savings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature cards centered at bottom */}
        <div className="mt-20 max-w-4xl mx-auto fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center justify-center rounded-lg p-4 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10" style={{ animationDelay: "0.1s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full animate-shine"></div>
              <div className="rounded-full bg-blue-900/40 p-2 mr-3 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <p className="font-medium text-blue-100">3-10x Cost Savings</p>
            </div>
            <div className="flex items-center justify-center rounded-lg p-4 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10" style={{ animationDelay: "0.3s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full animate-shine"></div>
              <div className="rounded-full bg-blue-900/40 p-2 mr-3 backdrop-blur-sm">
                <Cpu className="h-5 w-5 text-blue-400" />
              </div>
              <p className="font-medium text-blue-100">Instant Deployment</p>
            </div>
            <div className="flex items-center justify-center rounded-lg p-4 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10" style={{ animationDelay: "0.5s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full animate-shine"></div>
              <div className="rounded-full bg-blue-900/40 p-2 mr-3 backdrop-blur-sm">
                <Server className="h-5 w-5 text-blue-400" />
              </div>
              <p className="font-medium text-blue-100">Global Providers</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave SVG at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 sm:h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 C150,80 350,0 500,80 C650,160 750,40 900,20 C1050,0 1150,80 1200,120 L1200,120 L0,120 Z" 
                fill="#080f1e" opacity="0.8"></path>
          <path d="M0,120 C200,100 400,40 600,100 C800,160 1000,60 1200,120 L1200,120 L0,120 Z" 
                fill="#080f1e" opacity="0.6"></path>
          <path d="M0,120 C250,60 450,100 650,60 C850,20 1050,80 1200,120 L1200,120 L0,120 Z" 
                fill="#080f1e" opacity="0.4"></path>
        </svg>
      </div>
    </div>
  );
};

const Solutions = () => {
  return (
    <div className="py-24 bg-[#080f1e] relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-blue-50">
            We Solve <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Compute</span> For You
          </h2>
          <p className="text-blue-200/80 text-lg">
            Access to cloud compute — especially GPUs — is broken. 
            Most platforms charge extremely high rates or deliver a clunky developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cost Efficiency */}
          <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                <DollarSign className="h-7 w-7 text-white/90" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-50 group-hover:text-white transition-colors duration-300">Cost Efficiency</h3>
              <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300">
                Save up to 90% on compute costs compared to traditional cloud providers. 
                We provide H100 GPUs at ~$1.50/hour vs. $13.50/hour on Azure.
              </p>
            </div>
          </div>
          
          {/* Instant Deployment */}
          <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                <Clock className="h-7 w-7 text-white/90" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-50 group-hover:text-white transition-colors duration-300">Instant Deployment</h3>
              <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300">
                No frustrating delays or KYC barriers. Deploy your workloads instantly 
                with a smooth, integrated compute layer.
              </p>
            </div>
          </div>
          
          {/* Unified Infrastructure */}
          <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                <Layers className="h-7 w-7 text-white/90" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-50 group-hover:text-white transition-colors duration-300">Unified Infrastructure</h3>
              <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300">
                We aggregate decentralized compute providers into a unified, powerful backend 
                that's easy to build on.
              </p>
            </div>
          </div>
          
          {/* Full Orchestration */}
          <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                <CloudCog className="h-7 w-7 text-white/90" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-50 group-hover:text-white transition-colors duration-300">Full Orchestration</h3>
              <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300">
                Our orchestration layer handles deployment, scaling, and monitoring so you 
                can focus on building your applications.
              </p>
            </div>
          </div>
          
          {/* Flexible Payments */}
          <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                <ShieldCheck className="h-7 w-7 text-white/90" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-50 group-hover:text-white transition-colors duration-300">Flexible Payments</h3>
              <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300">
                Support for both crypto and fiat, converted into GPU credits that can be used 
                across any service deployed on the Aqua Layer.
              </p>
            </div>
          </div>
          
          {/* Global Resources */}
          <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                <Cpu className="h-7 w-7 text-white/90" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-50 group-hover:text-white transition-colors duration-300">Global Resources</h3>
              <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300">
                Access compute resources from around the world, with decentralized infrastructure 
                that's resilient and always available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AquaLayer = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  return (
    <div id="aqua-layer" className="py-24 relative overflow-hidden bg-[#050814]">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-3xl font-bold mb-6 text-blue-50">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Aqua Layer</span> — Unified Compute from Decentralized Providers
            </h2>
            <p className="text-blue-200/80 text-lg mb-6">
              Our orchestration layer aggregates decentralized compute providers — including Spheron, Akash, and others — into a unified, powerful backend.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start hover-effect p-3 rounded-lg animate-float-sm" 
                style={{ animationDelay: "0.1s" }}
                onMouseEnter={() => setHoveredSection('aggregation')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className={`rounded-lg bg-blue-800/20 p-2 mr-4 mt-1 transition-all duration-300 ${hoveredSection === 'aggregation' ? 'bg-blue-700/30' : ''}`}>
                  <Layers className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${hoveredSection === 'aggregation' ? 'scale-110' : ''}`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-blue-100">Aggregation</h3>
                  <p className="text-sm text-blue-200/80">
                    Multiple providers combined into a single, consistent API
                  </p>
                </div>
              </div>
              
              <div className="flex items-start hover-effect p-3 rounded-lg animate-float-sm" 
                style={{ animationDelay: "0.3s" }}
                onMouseEnter={() => setHoveredSection('orchestration')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className={`rounded-lg bg-blue-800/20 p-2 mr-4 mt-1 transition-all duration-300 ${hoveredSection === 'orchestration' ? 'bg-blue-700/30' : ''}`}>
                  <Network className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${hoveredSection === 'orchestration' ? 'scale-110' : ''}`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-blue-100">Orchestration</h3>
                  <p className="text-sm text-blue-200/80">
                    Deployment, scaling, and monitoring made simple
                  </p>
                </div>
              </div>
              
              <div className="flex items-start hover-effect p-3 rounded-lg animate-float-sm" 
                style={{ animationDelay: "0.5s" }}
                onMouseEnter={() => setHoveredSection('payments')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className={`rounded-lg bg-blue-800/20 p-2 mr-4 mt-1 transition-all duration-300 ${hoveredSection === 'payments' ? 'bg-blue-700/30' : ''}`}>
                  <CreditCard className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${hoveredSection === 'payments' ? 'scale-110' : ''}`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-blue-100">Payments</h3>
                  <p className="text-sm text-blue-200/80">
                    Support for both crypto and fiat, converted to GPU credits
                  </p>
                </div>
              </div>
              
              <div className="flex items-start hover-effect p-3 rounded-lg animate-float-sm" 
                style={{ animationDelay: "0.7s" }}
                onMouseEnter={() => setHoveredSection('flexibility')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className={`rounded-lg bg-blue-800/20 p-2 mr-4 mt-1 transition-all duration-300 ${hoveredSection === 'flexibility' ? 'bg-blue-700/30' : ''}`}>
                  <Cloud className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${hoveredSection === 'flexibility' ? 'scale-110' : ''}`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-blue-100">Flexibility</h3>
                  <p className="text-sm text-blue-200/80">
                    Use GPU credits across any service deployed on Aqua
                  </p>
                </div>
              </div>
            </div>
{/*             
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-900/30 group">
              Learn More About Aqua Layer
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button> */}
          </div>
          
          <div className="lg:w-1/2 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/15 to-blue-400/15 rounded-lg blur-sm opacity-30 animate-pulse-glow"></div>
              <div className="relative bg-gradient-to-b from-[#0d1424] to-[#091020] rounded-lg overflow-hidden border border-blue-500/20 shadow-md hover-effect">
                <div className="px-6 py-4 border-b border-blue-900/30 bg-[#0d1424]/80">
                  <h3 className="font-medium text-blue-100">Aqua Layer Architecture</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-col space-y-6">
                    <div className="border border-blue-800/40 rounded-lg p-4 bg-gradient-to-br from-[#0d1424] to-[#0a1022] animate-float-sm" style={{ animationDelay: "0.2s" }}>
                      <h4 className="font-medium text-blue-400 mb-2">User Applications</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="border border-blue-800/30 bg-[#111a2c]/80 rounded p-2 text-xs text-center text-blue-300 animate-shimmer">Jupyter Notebook</div>
                        <div className="border border-blue-800/30 bg-[#111a2c]/80 rounded p-2 text-xs text-center text-blue-300 animate-shimmer">Web Hosting</div>
                        <div className="border border-blue-800/30 bg-[#111a2c]/80 rounded p-2 text-xs text-center text-blue-300 animate-shimmer">ML Models</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/20 text-blue-400 rounded-lg p-4 relative border border-blue-700/20 animate-float-sm" style={{ animationDelay: "0.4s" }}>
                      <div className="absolute -right-2 -top-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md shadow-sm animate-pulse-glow">Aqua Layer</div>
                      <h4 className="font-medium mb-2 text-blue-300">Orchestration Layer</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-[#0d1424] to-[#0a1022] border border-blue-700/20 rounded p-2 text-xs animate-shimmer">
                          <span className="block font-medium mb-1 text-blue-300">Deployment Engine</span>
                          <span className="text-blue-400/80">Container management</span>
                        </div>
                        <div className="bg-gradient-to-br from-[#0d1424] to-[#0a1022] border border-blue-700/20 rounded p-2 text-xs animate-shimmer" style={{ animationDelay: "0.1s" }}>
                          <span className="block font-medium mb-1 text-blue-300">Billing System</span>
                          <span className="text-blue-400/80">GPU credit conversion</span>
                        </div>
                        <div className="bg-gradient-to-br from-[#0d1424] to-[#0a1022] border border-blue-700/20 rounded p-2 text-xs animate-shimmer" style={{ animationDelay: "0.2s" }}>
                          <span className="block font-medium mb-1 text-blue-300">Monitoring</span>
                          <span className="text-blue-400/80">Resource tracking</span>
                        </div>
                        <div className="bg-gradient-to-br from-[#0d1424] to-[#0a1022] border border-blue-700/20 rounded p-2 text-xs animate-shimmer" style={{ animationDelay: "0.3s" }}>
                          <span className="block font-medium mb-1 text-blue-300">Load Balancing</span>
                          <span className="text-blue-400/80">Traffic distribution</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-blue-800/40 rounded-lg p-4 bg-gradient-to-br from-[#0d1424] to-[#0a1022] animate-float-sm" style={{ animationDelay: "0.6s" }}>
                      <h4 className="font-medium text-blue-300 mb-2">Compute Providers</h4>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="border border-blue-800/30 bg-[#111a2c]/80 rounded p-2 text-xs text-center text-blue-300 animate-shimmer">Spheron</div>
                        <div className="border border-blue-800/30 bg-[#111a2c]/80 rounded p-2 text-xs text-center text-blue-300 animate-shimmer" style={{ animationDelay: "0.1s" }}>Akash</div>
                        <div className="border border-blue-800/30 bg-[#111a2c]/80 rounded p-2 text-xs text-center text-blue-300 animate-shimmer" style={{ animationDelay: "0.2s" }}>Aethirs</div>
                        <div className="border border-blue-800/30 bg-[#111a2c]/80 rounded p-2 text-xs text-center text-blue-300 animate-shimmer" style={{ animationDelay: "0.3s" }}>IO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div id="services" className="py-24 bg-[#080f1e] relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-blue-50">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Aqua Services</span> — Modular Compute
          </h2>
          <p className="text-blue-200/80 text-lg">
            Applications and workloads built on top of the Aqua Layer, benefiting from orchestration, 
            flexible payments, and decentralized compute sourcing.
          </p>
        </div>

        <Tabs defaultValue="public" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12 bg-[#0a1022]/50 border border-blue-700/10 rounded-md overflow-hidden text-blue-300">
            <TabsTrigger 
              value="public" 
              className="py-3 transition-all data-[state=active]:bg-[#111a2c]/40 data-[state=active]:text-blue-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500/40"
            >
              Open Source Aqua Services
            </TabsTrigger>
            <TabsTrigger 
              value="private" 
              className="py-3 transition-all data-[state=active]:bg-[#111a2c]/40 data-[state=active]:text-blue-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500/40"
            >
              Private Aqua Services
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="public">
            <div className="rounded-lg p-6 border border-blue-800/20 bg-gradient-to-b from-[#0d1424]/90 to-[#091020]/90">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-blue-100">Open Source Aqua Services</h3>
                  <p className="text-blue-200/80 mb-6">
                    Available through the Aquanode interface. These are hosted and subsidized by Aquanode, 
                    enabling developers to monetize usage without paying infrastructure costs.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-800/30 p-2 mr-3">
                        <Server className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-blue-200">Hosted and maintained by Aquanode</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-800/30 p-2 mr-3">
                        <Database className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-blue-200">Infrastructure costs covered by Aquanode</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-800/30 p-2 mr-3">
                        <BarChart className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-blue-200">Monetization out of the box</p>
                    </div>
                  </div>
                  
                  {/* <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-900/30">
                    Build Public Aqua Service
                  </Button> */}
                </div>
                
                <div className="lg:w-1/2 bg-gradient-to-b from-[#0d1424]/70 to-[#091020]/70 backdrop-blur-sm p-6 rounded-lg border border-blue-800/30">
                  <h4 className="font-medium text-lg mb-4 text-blue-100">Available Public Services</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-900/10 backdrop-blur-md border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 opacity-0 group-hover:opacity-80 transition-opacity"></div>
                      <Globe className="h-5 w-5 text-blue-400 mb-2" />
                      <h5 className="font-medium mb-1 text-blue-100">Web Hosting</h5>
                      <p className="text-sm text-blue-200/80 mb-3">Deploy static and dynamic websites with minimal configuration</p>
                      <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full">Available Now</span>
                    </div>
                    
                    <div className="bg-blue-900/10 backdrop-blur-md border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 opacity-0 group-hover:opacity-80 transition-opacity"></div>
                      <BookOpen className="h-5 w-5 text-blue-400 mb-2" />
                      <h5 className="font-medium mb-1 text-blue-100">Jupyter Notebooks</h5>
                      <p className="text-sm text-blue-200/80 mb-3">Interactive computing environments for data science and ML</p>
                      <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full">Available Now</span>
                    </div>
                    
                    <div className="bg-blue-900/10 backdrop-blur-md border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 opacity-0 group-hover:opacity-80 transition-opacity"></div>
                      <Server className="h-5 w-5 text-blue-400 mb-2" />
                      <h5 className="font-medium mb-1 text-blue-100">Virtual Machines</h5>
                      <p className="text-sm text-blue-200/80 mb-3">GPU or CPU VMs for customized workloads</p>
                      <span className="text-xs px-2 py-1 bg-blue-400/20 text-blue-300 rounded-full">On Request</span>
                    </div>
                    
                    <div className="bg-blue-900/10 backdrop-blur-md border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 opacity-0 group-hover:opacity-80 transition-opacity"></div>
                      <Database className="h-5 w-5 text-blue-400 mb-2" />
                      <h5 className="font-medium mb-1 text-blue-100">ML Models</h5>
                      <p className="text-sm text-blue-200/80 mb-3">Deploy pretrained models with scalable inference</p>
                      <span className="text-xs px-2 py-1 bg-blue-400/20 text-blue-300 rounded-full">On Request</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="private">
            <div className="rounded-lg p-6 border border-blue-800/20 bg-gradient-to-b from-[#0d1424]/90 to-[#091020]/90">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-blue-100">Private Aqua Services</h3>
                  <p className="text-blue-200/80 mb-6">
                    Deployed privately with a dedicated interface. Developers purchase GPU credits 
                    and use them to run their own workloads with full control.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-800/30 p-2 mr-3">
                        <Lock className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-blue-200">Complete control over your services</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-800/30 p-2 mr-3">
                        <GitBranch className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-blue-200">Customizable infrastructure for specific needs</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-800/30 p-2 mr-3">
                        <Code className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-blue-200">Build tools similar to Railway or Google Colab</p>
                    </div>
                  </div>
                  
                </div>
                
                <div className="lg:w-1/2 bg-gradient-to-b from-[#0d1424]/70 to-[#091020]/70 backdrop-blur-sm p-6 rounded-lg border border-blue-800/30">
                  <h4 className="font-medium text-lg mb-4 text-blue-100">Private Deployment Options</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-900/10 backdrop-blur-md border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 opacity-0 group-hover:opacity-80 transition-opacity"></div>
                      <h5 className="font-medium mb-2 text-blue-100">Dedicated Resources</h5>
                      <p className="text-sm text-blue-200/80">
                        Purchase GPU credits (with fiat or crypto) and use them to run your own workloads 
                        with complete control over your environment.
                      </p>
                    </div>
                    
                    <div className="bg-blue-900/10 backdrop-blur-md border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 opacity-0 group-hover:opacity-80 transition-opacity"></div>
                      <h5 className="font-medium mb-2 text-blue-100">Custom Interface</h5>
                      <p className="text-sm text-blue-200/80">
                        Build and deploy your own frontend, connected to the Aqua Layer's powerful backend. 
                        Perfect for internal tools or client-facing products.
                      </p>
                    </div>
                    
                    <div className="bg-blue-900/10 backdrop-blur-md border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 opacity-0 group-hover:opacity-80 transition-opacity"></div>
                      <h5 className="font-medium mb-2 text-blue-100">Enterprise Options</h5>
                      <p className="text-sm text-blue-200/80">
                        For teams who need enhanced security, dedicated support, and custom SLAs. 
                        Contact us for enterprise-grade private Aqua deployments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const CTA = () => {
  return (
    <div className="py-24 relative overflow-hidden bg-[#050814]">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-50">
            Ready to Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Compute Experience?</span>
          </h2>
          <p className="text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto">
            Join the world's most extensive compute ecosystem — powered by decentralized infrastructure, 
            unified through the Aqua Layer, and made accessible through modular Aqua Services.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app/services">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-900/30 group">
              Get Started <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            </Link>
            <Link href="https://calendly.com/anshss">
            <Button size="lg" variant="outline" className="border-blue-500/20 hover:bg-blue-900/20 text-blue-100">
              Schedule a Demo
            </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="p-8 text-center relative z-10">
                <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                  <Server className="h-8 w-8 text-white/90" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-blue-50 group-hover:text-white transition-colors duration-300">For Builders</h3>
                <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300 mb-6">
                  Deploy your workloads at 60% less cost without the complexity of managing infrastructure.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="p-8 text-center relative z-10">
                <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                  <Code className="h-8 w-8 text-white/90" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-blue-50 group-hover:text-white transition-colors duration-300">For Developers</h3>
                <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300 mb-6">
                  Create and monetize Aqua Services with our SDK, focusing on your application, not infrastructure.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg p-6 bg-blue-900/15 border border-blue-500/30 backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="p-8 text-center relative z-10">
                <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30 transform transition-all duration-300 group-hover:scale-110">
                  <BarChart className="h-8 w-8 text-white/90" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-blue-50 group-hover:text-white transition-colors duration-300">For Enterprises</h3>
                <p className="text-blue-200/90 group-hover:text-blue-100 transition-colors duration-300 mb-6">
                  Reduce cloud costs significantly while maintaining performance, security, and reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
