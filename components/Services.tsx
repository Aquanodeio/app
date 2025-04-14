import { Button } from "@/components/ui/button";
import { 
  Server, 
  Globe, 
  Code, 
  Database, 
  BarChart, 
  GitBranch, 
  Lock, 
  BookOpen 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Services = () => {
  return (
    <div id="services" className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Dark theme decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute top-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-glow"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Aqua Services</span> — Modular Compute
          </h2>
          <p className="text-muted-foreground text-lg">
            Applications and workloads built on top of the Aqua Layer, benefiting from orchestration, 
            flexible payments, and decentralized compute sourcing.
          </p>
        </div>

        <Tabs defaultValue="public" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="public">Open Source Aqua Services</TabsTrigger>
            <TabsTrigger value="private">Private Aqua Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="public">
            <div className="glass-card rounded-lg p-6 border border-border/40 shadow-xl shadow-black/20">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">Open Source Aqua Services</h3>
                  <p className="text-muted-foreground mb-6">
                    Available through the Aquanode interface. These are hosted and subsidized by Aquanode, 
                    enabling developers to monetize usage without paying infrastructure costs.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="rounded-full bg-primary/10 p-2 mr-3">
                        <Server className="h-5 w-5 text-primary" />
                      </div>
                      <p>Hosted and maintained by Aquanode</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-primary/10 p-2 mr-3">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <p>Infrastructure costs covered by Aquanode</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-primary/10 p-2 mr-3">
                        <BarChart className="h-5 w-5 text-primary" />
                      </div>
                      <p>Monetization out of the box</p>
                    </div>
                  </div>
                  
                  <Button className="bg-accent hover:bg-accent/90 shadow-md shadow-accent/20">
                    Build Public Aqua Service
                  </Button>
                </div>
                
                <div className="lg:w-1/2 bg-background/40 backdrop-blur-sm p-6 rounded-lg border border-border/30">
                  <h4 className="font-medium text-lg mb-4">Available Public Services</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-background/60 border border-border/40 rounded-lg p-4 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
                      <Globe className="h-5 w-5 text-primary mb-2" />
                      <h5 className="font-medium mb-1">Web Hosting</h5>
                      <p className="text-sm text-muted-foreground mb-3">Deploy static and dynamic websites with minimal configuration</p>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Available Now</span>
                    </div>
                    
                    <div className="bg-background/60 border border-border/40 rounded-lg p-4 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
                      <BookOpen className="h-5 w-5 text-primary mb-2" />
                      <h5 className="font-medium mb-1">Jupyter Notebooks</h5>
                      <p className="text-sm text-muted-foreground mb-3">Interactive computing environments for data science and ML</p>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Available Now</span>
                    </div>
                    
                    <div className="bg-background/60 border border-border/40 rounded-lg p-4 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
                      <Server className="h-5 w-5 text-primary mb-2" />
                      <h5 className="font-medium mb-1">Virtual Machines</h5>
                      <p className="text-sm text-muted-foreground mb-3">GPU or CPU VMs for customized workloads</p>
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">On Request</span>
                    </div>
                    
                    <div className="bg-background/60 border border-border/40 rounded-lg p-4 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
                      <Database className="h-5 w-5 text-primary mb-2" />
                      <h5 className="font-medium mb-1">ML Models</h5>
                      <p className="text-sm text-muted-foreground mb-3">Deploy pretrained models with scalable inference</p>
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">On Request</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="private">
            <div className="glass-card rounded-lg p-6 border border-border/40 shadow-xl shadow-black/20">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">Private Aqua Services</h3>
                  <p className="text-muted-foreground mb-6">
                    Deployed privately with a dedicated interface. Developers purchase GPU credits 
                    and use them to run their own workloads with full control.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="rounded-full bg-primary/10 p-2 mr-3">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <p>Complete control over your services</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-primary/10 p-2 mr-3">
                        <GitBranch className="h-5 w-5 text-primary" />
                      </div>
                      <p>Customizable infrastructure for specific needs</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-primary/10 p-2 mr-3">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <p>Build tools similar to Railway or Google Colab</p>
                    </div>
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary/90 shadow-md shadow-primary/20">
                    Deploy Private Aqua Service
                  </Button>
                </div>
                
                <div className="lg:w-1/2 bg-background/40 backdrop-blur-sm p-6 rounded-lg border border-border/30">
                  <h4 className="font-medium text-lg mb-4">Private Deployment Options</h4>
                  <div className="space-y-4">
                    <div className="bg-background/60 border border-border/40 rounded-lg p-4 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
                      <h5 className="font-medium mb-2">Dedicated Resources</h5>
                      <p className="text-sm text-muted-foreground">
                        Purchase GPU credits (with fiat or crypto) and use them to run your own workloads 
                        with complete control over your environment.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 border border-border/40 rounded-lg p-4 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
                      <h5 className="font-medium mb-2">Custom Interface</h5>
                      <p className="text-sm text-muted-foreground">
                        Build and deploy your own frontend, connected to the Aqua Layer's powerful backend. 
                        Perfect for internal tools or client-facing products.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 border border-border/40 rounded-lg p-4 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
                      <h5 className="font-medium mb-2">Enterprise Options</h5>
                      <p className="text-sm text-muted-foreground">
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

export default Services;
