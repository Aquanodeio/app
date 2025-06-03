import React from "react";
import Link from "next/link";
import { FileText, Server, Database, Cpu } from "lucide-react";
import { Container, Heading, Text, Card, Grid, StatusBadge } from "@/components/ui/design-system";

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
    url: "/app/services/backend",
    comingSoon: false,
    buttonText: "Launch →",
    icon: <Server className="w-6 h-6 text-foreground/80" />
  },
  {
    name: "Container VMs",
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
    <section className="min-h-screen bg-background text-foreground space-dashboard">
      <Container variant="wide">
        <div className="space-element">
          <Heading level={1} className="space-tight">
            Aqua Services
          </Heading>
          <Text variant="base" muted className="max-w-3xl">
            Deploy inference APIs, notebooks, and compute apps with zero DevOps.
          </Text>
        </div>
        
        <Grid variant="responsive-2" className="space-component">
          {services.map((service, index) => (
            <Card key={index} variant="compact" interactive className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-3 space-tight">
                  <div className="rounded-md p-1 bg-background/20">
                    {service.icon}
                  </div>
                  <div>
                    <Heading level={5} className="space-tight">
                      {service.name}
                    </Heading>
                    {service.comingSoon && (
                      <StatusBadge variant="pending">
                        Coming Soon
                      </StatusBadge>
                    )}
                  </div>
                </div>
                <Text variant="small" muted className="flex-grow">
                  {service.description}
                </Text>
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
            </Card>
          ))}
        </Grid>

        {/* Features Section */}
        <div className="space-component">
          <Heading level={2} className="space-element">
            Why Choose Aqua Services?
          </Heading>
          <Grid variant="responsive-3">
            <Card variant="compact">
              <Heading level={6} className="space-tight">
                Zero DevOps
              </Heading>
              <Text variant="small" muted>
                Focus on your code and let us handle infrastructure, scaling, and maintenance.
              </Text>
            </Card>
            <Card variant="compact">
              <Heading level={6} className="space-tight">
                GPU-Accelerated
              </Heading>
              <Text variant="small" muted>
                Access powerful GPU resources for machine learning and compute-intensive workloads.
              </Text>
            </Card>
            <Card variant="compact">
              <Heading level={6} className="space-tight">
                Language Agnostic
              </Heading>
              <Text variant="small" muted>
                Deploy applications in Python, JavaScript, Go, or any other language.
              </Text>
            </Card>
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default ServicesPage;
