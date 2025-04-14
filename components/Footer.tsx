import { Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background relative border-t border-border/20 overflow-hidden">
      {/* Dark theme decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">AQUANODE</span>
            </a>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              The world's largest compute ecosystem, deploying customizable Aqua services through the Aqua layer.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://x.com/aquanodeio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://github.com/aquanodeio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/10">
          <div className="flex justify-center mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-primary/30 to-accent/30"></div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Aquanode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
