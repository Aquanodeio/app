import React from "react";
import { Card, Heading, Text } from "@/components/ui/design-system";
import { Book } from "lucide-react";    
import { SectionProps } from "@/lib/serviceConfig";

export function NotebookEnvironmentSection({ deployment }: SectionProps) {
  return (
    <Card variant="primary">
      <div className="flex items-center gap-2 space-tight">
        <Book className="w-5 h-5 text-orange-500" />
        <Heading level={4}>Notebook Environment</Heading>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Text variant="small">Jupyter Version</Text>
          <Text variant="small" className="font-mono">6.4.12</Text>
        </div>
        <div className="flex justify-between items-center">
          <Text variant="small">Python Version</Text>
          <Text variant="small" className="font-mono">3.11.5</Text>
        </div>
        <div className="flex justify-between items-center">
          <Text variant="small">Available Kernels</Text>
          <Text variant="small">Python 3, R</Text>
        </div>
      </div>
    </Card>
  );
} 