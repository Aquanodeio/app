import { Bot, User } from "lucide-react";
import { Text } from "@/components/ui/design-system";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ToolResultRenderer } from "./ToolResultRenderer";

interface ChatMessageProps {
  message: {
    id: string;
    role: "user" | "assistant" | "system" | "data";
    content: string;
    createdAt?: Date;
    toolInvocations?: any[];
  };
}

export const ChatMessage = ({ message }: ChatMessageProps) => (
  <div
    className={`flex items-start gap-3 ${
      message.role === "user" ? "justify-end" : "justify-start"
    }`}
  >
    {message.role === "assistant" && (
      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
        <Bot size={14} />
      </div>
    )}

    <div
      className={`rounded-lg px-3 py-2 max-w-[80%] ${
        message.role === "user"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/40 text-foreground"
      }`}
    >
      {/* Markdown-rendered content */}
      <div className="text-base">
        <MarkdownRenderer content={message.content} />
      </div>

      {/* Tool Results */}
      {message.toolInvocations?.map((toolInvocation) => (
        <ToolResultRenderer
          key={toolInvocation.toolCallId}
          toolInvocation={toolInvocation}
        />
      ))}

      <Text variant="caption" className="opacity-60 space-tight mt-2" as="div">
        {new Date(message.createdAt || new Date()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </div>

    {message.role === "user" && (
      <div className="w-7 h-7 rounded-full bg-secondary/40 flex items-center justify-center text-foreground/80 flex-shrink-0">
        <User size={14} />
      </div>
    )}
  </div>
);
