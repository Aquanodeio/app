import { Terminal } from "lucide-react";
import { Heading, Text } from "@/components/ui/design-system";

export const ChatHeader = () => (
  <div className="space-element">
    <Heading level={1} className="space-tight">
      <Terminal size={32} className="inline mr-3 text-primary" />
      Agent Terminal
    </Heading>
    <Text variant="base" muted>
      Deploy apps, VMs, and AI models in seconds using our intelligent agent. 
      Powered by decentralized compute infrastructure.
    </Text>
  </div>
); 