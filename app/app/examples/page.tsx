import React from "react";
import { examples } from "@/lib/catalog";
import Link from "next/link";
import { Container, Heading, Text, Card, Grid } from "@/components/ui/design-system";

const Examples = () => {
  return (
    <section className="min-h-screen bg-background text-foreground space-dashboard">
      <Container variant="wide">
        <div className="space-element">
          <Heading level={1} className="space-tight">
            Deployment Examples
          </Heading>
          <Text variant="base" muted className="max-w-3xl">
            Browse ready-to-use templates and launch in seconds, no setup needed.
          </Text>
        </div>
        
        <Grid variant="responsive-3" className="space-component">
          {examples.map((example, index) => (
            <Link href={example.url(example.id)} className="block group" key={index}>
              <Card variant="compact" interactive className="h-full">
                <div className="flex flex-col h-full">
                  <Heading level={5} className="space-tight transition-colors duration-300">
                    {example.name}
                  </Heading>
                  <Text variant="small" muted className="flex-grow">
                    {example.description}
                  </Text>
                  <div className="mt-3 text-right">
                    <Text 
                      as="span" 
                      variant="small" 
                      className="text-white font-medium group-hover:translate-x-1 inline-flex transition-transform duration-300"
                    >
                      Use template →
                    </Text>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Examples;
