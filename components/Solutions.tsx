import { 
  CloudCog, 
  DollarSign, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Cpu 
} from "lucide-react";

const Solutions = () => {
  return (
    <div id="solutions" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Dark theme decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            We Solve <span className="gradient-text">Compute</span> For You
          </h2>
          <p className="text-muted-foreground text-lg">
            Access to cloud compute — especially GPUs — is broken. 
            Most platforms charge extremely high rates or deliver a clunky developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cost Efficiency */}
          <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cost Efficiency</h3>
              <p className="text-muted-foreground">
                Save up to 90% on compute costs compared to traditional cloud providers. 
                We provide H100 GPUs at ~$1.50/hour vs. $13.50/hour on Azure.
              </p>
            </div>
          </div>
          
          {/* Instant Deployment */}
          <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Deployment</h3>
              <p className="text-muted-foreground">
                No frustrating delays or KYC barriers. Deploy your workloads instantly 
                with a smooth, integrated compute layer.
              </p>
            </div>
          </div>
          
          {/* Unified Infrastructure */}
          <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unified Infrastructure</h3>
              <p className="text-muted-foreground">
                We aggregate decentralized compute providers into a unified, powerful backend 
                that's easy to build on.
              </p>
            </div>
          </div>
          
          {/* Full Orchestration */}
          <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                <CloudCog className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Full Orchestration</h3>
              <p className="text-muted-foreground">
                Our orchestration layer handles deployment, scaling, and monitoring so you 
                can focus on building your applications.
              </p>
            </div>
          </div>
          
          {/* Flexible Payments */}
          <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexible Payments</h3>
              <p className="text-muted-foreground">
                Support for both crypto and fiat, converted into GPU credits that can be used 
                across any service deployed on the Aqua Layer.
              </p>
            </div>
          </div>
          
          {/* Global Resources */}
          <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative group border border-border/40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/10">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Resources</h3>
              <p className="text-muted-foreground">
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

export default Solutions;
