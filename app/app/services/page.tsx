import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "Deployments",
    description:
      "Deploy and manage high-performance servers for your web applications with scalable infrastructure and reliable uptime.",
    url: "/app/services/hosting",
    comingSoon: false,
  },
  {
    name: "Jupyter",
    description:
      "Jupyter Notebooks provide an interactive computing environment for creating and sharing documents containing live code, equations, visualizations, and narrative text.",
    url: "/app/services/jupyter",
    comingSoon: false,
  },
  {
    name: "Virtual Machines (GPU or CPU)",
    description:
      "Access high-performance computing resources with configurable GPU or CPU virtual machines optimized for AI training, rendering, and compute-intensive workloads.",
    url: "https://forms.gle/CAovZoBDG7rgMUuK6",
    comingSoon: true,
  },
  {
    name: "Pre-trained ML Models",
    description:
      "Deploy ready-to-use machine learning models for computer vision, NLP, and predictive analytics with simple API integration and minimal setup time.",
    url: "https://forms.gle/CAovZoBDG7rgMUuK6",
    comingSoon: true,
  },
  {
    name: "Blockchain Node Infrastructure",
    description:
      "Run secure, reliable blockchain nodes with automated maintenance, scaling capabilities, and dedicated resources for validators and developers.",
    url: "https://forms.gle/CAovZoBDG7rgMUuK6",
    comingSoon: true,
  },
  {
    name: "Custom Services (Taylored for your needs)",
    description:
      "Design and deploy specialized infrastructure solutions optimized for your unique requirements with expert guidance and ongoing support.",
    url: "https://forms.gle/CAovZoBDG7rgMUuK6",
    comingSoon: false,
  },
];

const ServicesPage = () => {
  return (
    <section className="min-h-screen bg-background text-foreground py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-0 sm:px-6">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
          Native Aqua Services
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12 max-w-3xl">
          Deploy and manage services across the Aqua Layer
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
          {services.map((service, index) => (
            <div key={index} className="block">
              <div className="dashboard-card h-full subtle-glow">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                      {service.name}
                    </h3>
                    {service.comingSoon && (
                      <span className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-md text-xs font-medium w-24 text-center self-start">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-4 sm:mt-6 text-right">
                    {!service.comingSoon && service.name !== "Custom Services (Taylored for your needs)" ? (
                      <Link href={service.url} className="text-primary font-medium group-hover:translate-x-1 inline-flex transition-transform duration-300">
                        Deploy now →
                      </Link>
                    ) : (
                      <Link href={service.url} target="_blank" rel="noopener noreferrer" className="text-amber-500 font-medium group-hover:translate-x-1 inline-flex transition-transform duration-300">
                        Contact now →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;

