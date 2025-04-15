"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Paperclip,
  ArrowUp,
  Bot,
  User,
  ExternalLink,
  Server,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { getChatHistory, sendChatMessage } from "@/hooks/service";
import { ChatMessage } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "../../../components/ui/badge";

// Updated interfaces
interface DeploymentInfo {
  repoUrl: string;
  branchName: string;
  cpuUnits: number;
  memorySize: string;
  storageSize: string;
  port?: number;
  appUrl?: string;
}

interface DeploymentError {
  error: string;
}

// Extract deployment data from special tags in the message
const extractDeploymentData = (
  content: string
): {
  status: "pending" | "complete" | "error" | null;
  data: DeploymentInfo | DeploymentError | null;
} => {
  // Check for pending deployment
  const pendingMatch = content.match(
    /<DEPLOYMENT_PENDING>([\s\S]*?)<\/DEPLOYMENT_PENDING>/
  );
  if (pendingMatch) {
    try {
      return {
        status: "pending",
        data: JSON.parse(pendingMatch[1]) as DeploymentInfo,
      };
    } catch (e) {
      console.error("Failed to parse pending deployment data:", e);
    }
  }

  // Check for completed deployment
  const completeMatch = content.match(
    /<DEPLOYMENT_COMPLETE>([\s\S]*?)<\/DEPLOYMENT_COMPLETE>/
  );
  if (completeMatch) {
    try {
      return {
        status: "complete",
        data: JSON.parse(completeMatch[1]) as DeploymentInfo,
      };
    } catch (e) {
      console.error("Failed to parse complete deployment data:", e);
    }
  }

  // Check for deployment error
  const errorMatch = content.match(
    /<DEPLOYMENT_ERROR>([\s\S]*?)<\/DEPLOYMENT_ERROR>/
  );
  if (errorMatch) {
    try {
      return {
        status: "error",
        data: JSON.parse(errorMatch[1]) as DeploymentError,
      };
    } catch (e) {
      console.error("Failed to parse deployment error data:", e);
    }
  }

  return { status: null, data: null };
};

// Remove deployment tags from message for display
const cleanMessageContent = (content: string): string => {
  return content
    .replace(/<DEPLOYMENT_PENDING>[\s\S]*?<\/DEPLOYMENT_PENDING>/g, "")
    .replace(/<DEPLOYMENT_COMPLETE>[\s\S]*?<\/DEPLOYMENT_COMPLETE>/g, "")
    .replace(/<DEPLOYMENT_ERROR>[\s\S]*?<\/DEPLOYMENT_ERROR>/g, "")
    .trim();
};

// Deployment status card component
const DeploymentStatusCard = ({
  status,
  data,
}: {
  status: "pending" | "complete" | "error";
  data: DeploymentInfo | DeploymentError;
}) => {
  if (status === "pending") {
    const depInfo = data as DeploymentInfo;
    return (
      <Card className="mt-4 border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Loader2 size={18} className="text-primary animate-spin" />
            Deployment in Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Repository:</span>
            <Link
              href={depInfo.repoUrl}
              target="_blank"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              {depInfo.repoUrl.replace(
                /(https?:\/\/)?(www\.)?(github|gitlab)\.com\//,
                ""
              )}
              <ExternalLink size={12} />
            </Link>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Branch:</span>
            <span>{depInfo.branchName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Resources:</span>
            <span>
              {depInfo.cpuUnits} CPU{depInfo.cpuUnits > 1 ? "s" : ""},{" "}
              {depInfo.memorySize} RAM, {depInfo.storageSize} Storage
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20"
            >
              <Loader2 size={12} className="mr-1 animate-spin" />
              Processing
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === "complete") {
    const depInfo = data as DeploymentInfo;
    return (
      <Card className="mt-4 border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Server size={18} className="text-primary" />
            Deployment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Repository:</span>
            <Link
              href={depInfo.repoUrl}
              target="_blank"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              {depInfo.repoUrl.replace(
                /(https?:\/\/)?(www\.)?(github|gitlab)\.com\//,
                ""
              )}
              <ExternalLink size={12} />
            </Link>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Branch:</span>
            <span>{depInfo.branchName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Resources:</span>
            <span>
              {depInfo.cpuUnits} CPU{depInfo.cpuUnits > 1 ? "s" : ""},{" "}
              {depInfo.memorySize} RAM, {depInfo.storageSize} Storage
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20"
            >
              Completed
            </Badge>
          </div>
        </CardContent>
        {depInfo.appUrl && (
          <CardFooter className="pt-2">
            <Button
              variant="default"
              size="sm"
              className="w-full gap-1"
              asChild
            >
              <Link href={depInfo.appUrl} target="_blank">
                Open Application <ExternalLink size={12} />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  } else {
    const errorInfo = data as DeploymentError;
    return (
      <Card className="mt-4 border-red-500/20 bg-red-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-red-600">
            <Server size={18} className="text-red-600" />
            Deployment Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Error:</span>
            <span className="text-red-600">{errorInfo.error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }
};

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help you deploy your applications on Aquanode's decentralized infrastructure. Simply share a GitHub or GitLab repository URL, and I'll handle the deployment for you. What would you like to deploy today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const loadChatHistory = useCallback(async () => {
    try {
      const history = await getChatHistory();
      if (history.length > 0) {
        setMessages(history);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  }, []);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  useEffect(() => {
    // Only scroll the message container, not the entire page
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.closest('.overflow-y-auto');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const userMessage: ChatMessage = {
        role: "user",
        content: `File attached: ${files[0].name}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      // TODO: Implement file upload functionality
      toast({
        title: "File Upload",
        description: "File upload functionality coming soon!",
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendPrompt();
    }
  };

  const sendPrompt = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create a temporary assistant message that will be updated
    const tempAssistantMessage: ChatMessage = {
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    };

    // Add the assistant message to the state
    setMessages((prev) => [...prev, tempAssistantMessage]);

    try {
      // Create a local reference to track content to avoid state closure issues
      let currentContent = "";

      await sendChatMessage(
        {
          messages: [...messages, userMessage],
        },
        (chunk) => {
          // Accumulate content locally to avoid state closure issues
          currentContent += chunk;

          // Update the last message with the complete content so far
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              // Replace the content entirely instead of appending
              lastMessage.content = currentContent;
            }
            return newMessages;
          });
        }
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });

      // Remove the assistant message if there was an error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground">
      <div className="container ml-5 px-0 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 px-4 sm:px-0">
          <div>
            <h1 className="section-title text-xl sm:text-2xl md:text-3xl mb-2">
              AI Assistant
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Chat with our AI to quickly deploy your applications or get help with any questions
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-0">
          <div className="dashboard-card subtle-glow mb-6 sm:mb-8">
            <div className="space-y-4">
              {/* Chat messages area */}
              <div className="rounded-xl bg-secondary/5 border border-border/20 p-4 shadow-sm overflow-y-auto" style={{ height: "60vh", maxHeight: "calc(100vh - 300px)" }}>
                <div className="max-w-3xl mx-auto space-y-8 pb-2">
                  {messages.map((message, index) => {
                    const deploymentData =
                      message.role === "assistant"
                        ? extractDeploymentData(message.content)
                        : { status: null, data: null };

                    const displayContent =
                      message.role === "assistant"
                        ? cleanMessageContent(message.content)
                        : message.content;

                    // Determine if this message is from a different sender than the previous one
                    const isNewSender = index === 0 || messages[index - 1].role !== message.role;
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        } ${isNewSender ? "mt-6" : "mt-2"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <Bot size={16} />
                          </div>
                        )}

                        <div
                          className={`p-3 rounded-xl max-w-[80%] ${
                            message.role === "user"
                              ? "bg-primary/10 text-foreground"
                              : "bg-secondary/20 text-foreground"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">
                            {displayContent}
                          </p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {new Date(message.timestamp || "").toLocaleTimeString()}
                          </span>

                          {/* Deployment Status Card */}
                          {deploymentData.status && deploymentData.data && (
                            <DeploymentStatusCard
                              status={deploymentData.status}
                              data={deploymentData.data}
                            />
                          )}
                        </div>

                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-secondary/40 flex items-center justify-center text-foreground/80">
                            <User size={16} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} className="h-0" />
                </div>
              </div>

              {/* Input area */}
              <div className="max-w-3xl mx-auto w-full">
                <div className="border border-border/30 bg-secondary/10 rounded-xl p-1 shadow-sm backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <button
                      onClick={handlePaperclipClick}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      disabled={isLoading}
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>

                    <div className="flex-1">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="w-full bg-transparent text-foreground focus:outline-none placeholder-muted-foreground py-2 px-1 rounded-md"
                        disabled={isLoading}
                      />
                    </div>

                    <button
                      onClick={sendPrompt}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        input.trim() && !isLoading
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "text-muted-foreground bg-secondary/30 cursor-not-allowed"
                      }`}
                      disabled={!input.trim() || isLoading}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
