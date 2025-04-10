import React from "react";
import Link from "next/link";

const services = [
  {
    name: "Custom Deployment",
    description:
      "Use this for deploying servers, APIs, and other backend services that handle data processing, business logic, and database interactions to support your applications.",
    url: "/app/services/custom",
  },
  {
    name: "Jupyter",
    description:
      "Jupyter Notebooks provide an interactive computing environment for creating and sharing documents containing live code, equations, visualizations, and narrative text.",
    url: "/app/services/jupyter",
  },
];

const ServicesPage = () => {
  return (
    <section className="min-h-screen bg-background text-foreground py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-0 sm:px-6">
        <h2 className="section-title text-center text-xl sm:text-2xl md:text-3xl">
          Available Aqua Services
        </h2>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12 max-w-xl mx-auto px-4 sm:px-0">
          Select Aqua service to deploy and manage
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
          {services.map((service, index) => (
            <Link key={index} href={service.url} className="block group">
              <div className="dashboard-card h-full subtle-glow">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-4 sm:mt-6 text-right">
                    <span className="text-primary font-medium group-hover:translate-x-1 inline-flex transition-transform duration-300">
                      Deploy now →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
