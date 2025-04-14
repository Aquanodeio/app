import { Button } from "@/components/ui/button";
import { ChevronRight, Server, Cpu, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen pt-20 overflow-hidden wave-bg">
      {/* Background stars */}
      <div className="star h-1 w-1" style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
      <div className="star h-2 w-2" style={{ top: '15%', left: '15%', animationDelay: '0.3s' }}></div>
      <div className="star h-1 w-1" style={{ top: '20%', left: '25%', animationDelay: '0.5s' }}></div>
      <div className="star h-1.5 w-1.5" style={{ top: '10%', right: '15%', animationDelay: '0.7s' }}></div>
      <div className="star h-1 w-1" style={{ top: '20%', right: '5%', animationDelay: '1s' }}></div>
      <div className="star h-2 w-2" style={{ top: '30%', right: '20%', animationDelay: '1.2s' }}></div>
      <div className="star h-1 w-1" style={{ bottom: '30%', left: '10%', animationDelay: '1.5s' }}></div>
      <div className="star h-1.5 w-1.5" style={{ bottom: '20%', left: '20%', animationDelay: '1.7s' }}></div>
      <div className="star h-1 w-1" style={{ bottom: '25%', right: '15%', animationDelay: '1.9s' }}></div>
      <div className="star h-1 w-1" style={{ bottom: '15%', right: '5%', animationDelay: '2.1s' }}></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-primary/4 rounded-full blur-[100px] animate-pulse-glow"></div>
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-accent/4 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="gradient-text">The World's Largest</span>
              <br />
              Compute Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              The world's largest compute ecosystem, deploying customizable Aqua services through the Aqua layer
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/app">
              <Button size="lg" className="bg-accent hover:bg-accent/90 shadow-sm gradient-button group">
                Get Started 
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center hover-effect rounded-lg p-2 animate-float-sm" style={{ animationDelay: "0.1s" }}>
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <p className="font-medium">60% Cost Savings</p>
              </div>
              <div className="flex items-center hover-effect rounded-lg p-2 animate-float-sm" style={{ animationDelay: "0.3s" }}>
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <Cpu className="h-5 w-5 text-primary" />
                </div>
                <p className="font-medium">Instant Deployment</p>
              </div>
              <div className="flex items-center hover-effect rounded-lg p-2 animate-float-sm" style={{ animationDelay: "0.5s" }}>
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <p className="font-medium">Global Infrastructure</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-sm opacity-20 animate-pulse-glow"></div>
              <div className="bg-background/90 border border-border/60 p-6 sm:p-8 rounded-lg relative shadow-md hover-effect"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="bg-[#0d1117] rounded-md p-4 font-mono text-sm mb-4 border border-border/40 animate-shimmer">
                  <p className="text-primary-foreground"><span className="text-accent">$</span> aquanode deploy --service jupyter</p>
                  <p className="mt-2">🚀 Deploying Jupyter Notebook service...</p>
                  <p className="mt-1">✅ Successfully deployed at: <span className="text-primary">https://jupyter.aquanode.io/y8f3a</span></p>
                  <p className="mt-1">💰 Cost: <span className="text-primary">$1.50/hour</span> (compared to $13.50 on Azure)</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`border border-border/40 bg-background/80 rounded-md p-4 transition-all duration-500 ${isHovered ? 'border-accent/30 shadow-sm shadow-accent/10' : ''}`}>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Server className="h-4 w-4 mr-2 text-primary" /> H100 GPU
                    </h3>
                    <p className="text-sm text-muted-foreground">Aquanode: <span className="text-foreground font-medium">$1.50/hr</span></p>
                    <p className="text-sm text-muted-foreground">Azure: <span className="text-foreground font-medium">$13.50/hr</span></p>
                    <div className="mt-2 h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/80 animate-shimmer" style={{ width: "89%" }}></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-muted-foreground">89% savings</p>
                  </div>
                  <div className={`border border-border/40 bg-background/80 rounded-md p-4 transition-all duration-500 ${isHovered ? 'border-primary/30 shadow-sm shadow-primary/10' : ''}`}>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Cpu className="h-4 w-4 mr-2 text-primary" /> A100 GPU
                    </h3>
                    <p className="text-sm text-muted-foreground">Aquanode: <span className="text-foreground font-medium">$0.90/hr</span></p>
                    <p className="text-sm text-muted-foreground">AWS: <span className="text-foreground font-medium">$8.10/hr</span></p>
                    <div className="mt-2 h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/80 animate-shimmer" style={{ width: "90%" }}></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-muted-foreground">90% savings</p>
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

export default Hero;
