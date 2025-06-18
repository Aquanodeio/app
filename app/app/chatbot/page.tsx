"use client";

import { useChat } from '@ai-sdk/react';
import { Container, Card as DSCard } from "@/components/ui/design-system";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { authService } from '@/hooks/service';

const ChatInterface = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    headers: {
      Authorization: `Bearer ${authService.getAccessToken()}`,
    },
  });

  const handleSuggestedPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any);
  };

  return (
    <div className="bg-background text-foreground ">
      <Container variant="wide" className="space-dashboard">
        <ChatHeader />

        {/* Chat Container */}
        <DSCard variant="primary" className="space-component">
          <ChatMessages 
            messages={messages}
            isLoading={isLoading}
            onPromptSelect={handleSuggestedPrompt}
          />

          <ChatInput 
            input={input}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </DSCard>
      </Container>
    </div>
  );
};

export default ChatInterface;
