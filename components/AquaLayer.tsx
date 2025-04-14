import { Layers, Network, Cloud, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AquaLayer = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  return (
    <div id="aqua-layer" className="py-24 relative overflow-hidden">
      {/* Dark theme decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      <div className="absolute top-20 -right-20 w-96 h-96 bg-accent/4 rounded-full blur-[120px] animate-pulse-glow"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/4 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
      
      {/* Background code pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/code-pattern.svg')] bg-repeat"></div>
      
      {/* Animated stars */}
      <div className="star h-1 w-1" style={{ top: '15%', left: '10%', animationDelay: '0.2s' }}></div>
      <div className="star h-1.5 w-1.5" style={{ top: '25%', left: '20%', animationDelay: '0.7s' }}></div>
      <div className="star h-1 w-1" style={{ top: '35%', right: '10%', animationDelay: '1.1s' }}></div>
      <div className="star h-2 w-2" style={{ bottom: '25%', right: '15%', animationDelay: '1.4s' }}></div>
      <div className="star h-1 w-1" style={{ bottom: '35%', left: '15%', animationDelay: '1.8s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-3xl font-bold mb-6">
              The <span className="gradient-text">Aqua Layer</span> — Unified Compute from Decentralized Providers
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Our orchestration layer aggregates decentralized compute providers — including Spheron, Akash, and others — into a unified, powerful backend.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start hover-effect p-3 rounded-lg animate-float-sm" 
                style={{ animationDelay: "0.1s" }}
                onMouseEnter={() => setHoveredSection('aggregation')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className={`rounded-lg bg-primary/10 p-2 mr-4 mt-1 transition-all duration-300 ${hoveredSection === 'aggregation' ? 'bg-primary/20' : ''}`}>
                  <Layers className={`h-5 w-5 text-primary transition-transform duration-300 ${hoveredSection === 'aggregation' ? 'scale-110' : ''}`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Aggregation</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple providers combined into a single, consistent API
                  </p>
                </div>
              </div>
              
              <div className="flex items-start hover-effect p-3 rounded-lg animate-float-sm" 
                style={{ animationDelay: "0.3s" }}
                onMouseEnter={() => setHoveredSection('orchestration')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className={`rounded-lg bg-primary/10 p-2 mr-4 mt-1 transition-all duration-300 ${hoveredSection === 'orchestration' ? 'bg-primary/20' : ''}`}>
                  <Network className={`h-5 w-5 text-primary transition-transform duration-300 ${hoveredSection === 'orchestration' ? 'scale-110' : ''}`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Orchestration</h3>
                  <p className="text-sm text-muted-foreground">
                    Deployment, scaling, and monitoring made simple
                  </p>
                </div>
              </div>
              
              <div className="flex items-start hover-effect p-3 rounded-lg animate-float-sm" 
                style={{ animationDelay: "0.5s" }}
                onMouseEnter={() => setHoveredSection('payments')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className={`rounded-lg bg-primary/10 p-2 mr-4 mt-1 transition-all duration-300 ${hoveredSection === 'payments' ? 'bg-primary/20' : ''}`}>
                  <CreditCard className={`h-5 w-5 text-primary transition-transform duration-300 ${hoveredSection === 'payments' ? 'scale-110' : ''}`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Support for both crypto and fiat, converted to GPU credits
                  </p>
                </div>
              </div>
              
              <div className="flex items-start hover-effect p-3 rounded-lg animate-float-sm" 
                style={{ animationDelay: "0.7s" }}
                onMouseEnter={() => setHoveredSection('flexibility')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className={`rounded-lg bg-primary/10 p-2 mr-4 mt-1 transition-all duration-300 ${hoveredSection === 'flexibility' ? 'bg-primary/20' : ''}`}>
                  <Cloud className={`h-5 w-5 text-primary transition-transform duration-300 ${hoveredSection === 'flexibility' ? 'scale-110' : ''}`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Flexibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Use GPU credits across any service deployed on Aqua
                  </p>
                </div>
              </div>
            </div>
            
            <Button className="bg-accent hover:bg-accent/90 shadow-sm gradient-button group">
              Learn More About Aqua Layer
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="lg:w-1/2 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 to-accent/15 rounded-lg blur-sm opacity-30 animate-pulse-glow"></div>
              <div className="relative bg-background/90 rounded-lg overflow-hidden border border-border/40 shadow-md hover-effect">
                <div className="px-6 py-4 border-b border-border/30 bg-background/80">
                  <h3 className="font-medium">Aqua Layer Architecture</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-col space-y-6">
                    <div className="border border-border/40 rounded-lg p-4 bg-background/80 animate-float-sm" style={{ animationDelay: "0.2s" }}>
                      <h4 className="font-medium text-primary mb-2">User Applications</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="border border-border/30 bg-background/50 rounded p-2 text-xs text-center animate-shimmer">Jupyter Notebook</div>
                        <div className="border border-border/30 bg-background/50 rounded p-2 text-xs text-center animate-shimmer">Web Hosting</div>
                        <div className="border border-border/30 bg-background/50 rounded p-2 text-xs text-center animate-shimmer">ML Models</div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 text-primary rounded-lg p-4 relative border border-primary/20 animate-float-sm" style={{ animationDelay: "0.4s" }}>
                      <div className="absolute -right-2 -top-2 bg-primary text-white text-xs px-2 py-1 rounded-md shadow-sm animate-pulse-glow">Aqua Layer</div>
                      <h4 className="font-medium mb-2">Orchestration Layer</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-background/80 border border-primary/10 rounded p-2 text-xs animate-shimmer">
                          <span className="block font-medium mb-1">Deployment Engine</span>
                          <span className="text-muted-foreground">Container management</span>
                        </div>
                        <div className="bg-background/80 border border-primary/10 rounded p-2 text-xs animate-shimmer" style={{ animationDelay: "0.1s" }}>
                          <span className="block font-medium mb-1">Billing System</span>
                          <span className="text-muted-foreground">GPU credit conversion</span>
                        </div>
                        <div className="bg-background/80 border border-primary/10 rounded p-2 text-xs animate-shimmer" style={{ animationDelay: "0.2s" }}>
                          <span className="block font-medium mb-1">Monitoring</span>
                          <span className="text-muted-foreground">Resource tracking</span>
                        </div>
                        <div className="bg-background/80 border border-primary/10 rounded p-2 text-xs animate-shimmer" style={{ animationDelay: "0.3s" }}>
                          <span className="block font-medium mb-1">Load Balancing</span>
                          <span className="text-muted-foreground">Traffic distribution</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-border/40 rounded-lg p-4 bg-background/80 animate-float-sm" style={{ animationDelay: "0.6s" }}>
                      <h4 className="font-medium text-muted-foreground mb-2">Compute Providers</h4>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="border border-border/30 bg-background/50 rounded p-2 text-xs text-center animate-shimmer">Spheron</div>
                        <div className="border border-border/30 bg-background/50 rounded p-2 text-xs text-center animate-shimmer" style={{ animationDelay: "0.1s" }}>Akash</div>
                        <div className="border border-border/30 bg-background/50 rounded p-2 text-xs text-center animate-shimmer" style={{ animationDelay: "0.2s" }}>Aethirs</div>
                        <div className="border border-border/30 bg-background/50 rounded p-2 text-xs text-center animate-shimmer" style={{ animationDelay: "0.3s" }}>IO</div>
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

export default AquaLayer;
