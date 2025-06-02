import React from "react";
import Link from "next/link";
import { FileText, Server, Database, Cpu } from "lucide-react";

const services = [
  {
    name: "AI Model Endpoints",
    description:
      "Run LLaMA, Whisper, SDXL and expose an API.",
    url: "https://forms.gle/CAovZoBDG7rgMUuK6",
    comingSoon: true,
    buttonText: "Contact now →",
    icon: <Cpu className="w-6 h-6 text-foreground/80" />
  },
  {
    name: "Jupyter Notebooks",
    description:
      "Explore ideas with GPU-backed Jupyter notebooks.",
    url: "/app/services/jupyter",
    comingSoon: false,
    buttonText: "Deploy →",
    icon: <FileText className="w-6 h-6 text-foreground/80" />
  },
  {
    name: "Backend Apps",
    description:
      "Launch Node.js, Flask, or Go backends instantly.",
    url: "/app/services/hosting",
    comingSoon: false,
    buttonText: "Launch →",
    icon: <Server className="w-6 h-6 text-foreground/80" />
  },
  {
    name: "Custom VMs",
    description:
      "Book an orchestrated VM with GPU for advanced compute.",
    url: "https://forms.gle/CAovZoBDG7rgMUuK6",
    comingSoon: true,
    buttonText: "Contact now →",
    icon: <Database className="w-6 h-6 text-foreground/80" />
  },
];

const ServicesPage = () => {
  return (
    <section className="min-h-screen bg-background text-foreground py-4 sm:py-8">
      <div className="max-w-full mx-auto px-0">
        <div className="px-4 md:px-6 lg:px-8 mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Aqua Services
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-3xl">
            Deploy inference APIs, notebooks, and compute apps with zero DevOps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 md:px-6 lg:px-8">
          {services.map((service, index) => (
            <div key={index} className="block">
              <div className="dashboard-card h-full subtle-glow p-4">
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="rounded-md p-1 bg-background/20">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                        {service.name}
                      </h3>
                      {service.comingSoon && (
                        <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-md text-xs font-medium w-24 text-center self-start">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-3 sm:mt-4 text-right">
                    <Link
                      href={service.url}
                      target={service.comingSoon ? "_blank" : undefined}
                      rel={service.comingSoon ? "noopener noreferrer" : undefined}
                      className="text-white font-medium group-hover:translate-x-1 inline-flex transition-transform duration-300"
                    >
                      {service.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-10 px-4 md:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Why Choose Aqua Services?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="dashboard-card subtle-glow p-4">
              <h3 className="text-sm sm:text-base font-semibold mb-1">Zero DevOps</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Focus on your code and let us handle infrastructure, scaling, and maintenance.</p>
            </div>
            <div className="dashboard-card subtle-glow p-4">
              <h3 className="text-sm sm:text-base font-semibold mb-1">GPU-Accelerated</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Access powerful GPU resources for machine learning and compute-intensive workloads.</p>
            </div>
            <div className="dashboard-card subtle-glow p-4">
              <h3 className="text-sm sm:text-base font-semibold mb-1">Language Agnostic</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Deploy applications in Python, JavaScript, Go, or any other language.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
