import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="py-24 relative overflow-hidden">
      {/* Dark theme decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your <span className="gradient-text">Compute Experience?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the world's most extensive compute ecosystem — powered by decentralized infrastructure, 
            unified through the Aqua Layer, and made accessible through modular Aqua Services.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app">
            <Button size="lg" className="bg-accent hover:bg-accent/90 shadow-md shadow-accent/20 gradient-button group">
              Get Started <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            </Link>
            <Link href="https://calendly.com/anshss">
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
              Schedule a Demo
            </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-3">For Builders</h3>
                <p className="text-muted-foreground mb-4">
                  Deploy your workloads at 60% less cost without the complexity of managing infrastructure.
                </p>
                <a href="#" className="text-primary font-medium flex items-center group">
                  Learn More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-3">For Developers</h3>
                <p className="text-muted-foreground mb-4">
                  Create and monetize Aqua Services with our SDK, focusing on your application, not infrastructure.
                </p>
                <a href="#" className="text-primary font-medium flex items-center group">
                  Learn More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-3">For Enterprises</h3>
                <p className="text-muted-foreground mb-4">
                  Reduce cloud costs significantly while maintaining performance, security, and reliability.
                </p>
                <a href="#" className="text-primary font-medium flex items-center group">
                  Learn More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
