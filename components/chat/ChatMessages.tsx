import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { SuggestedPrompts } from "./SuggestedPrompts";

interface ChatMessagesProps {
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system' | 'data';
    content: string;
    createdAt?: Date;
    toolInvocations?: any[];
  }>;
  isLoading: boolean;
  onPromptSelect: (prompt: string) => void;
}

export const ChatMessages = ({ messages, isLoading, onPromptSelect }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.closest(".overflow-y-auto");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages]);

  const showSuggestedPrompts = messages.length === 0;

  return (
    <div className="h-[58vh] overflow-y-auto">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {showSuggestedPrompts && (
          <SuggestedPrompts 
            onPromptSelect={onPromptSelect} 
            isLoading={isLoading} 
          />
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}; 