import { useRef } from "react";
import { Paperclip, ArrowUp, Loader2 } from "lucide-react";
import { Text } from "@/components/ui/design-system";
import { useToast } from "@/components/ui/use-toast";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const ChatInput = ({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: "File Upload",
        description: "File upload functionality coming soon!",
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event as any);
    }
  };

  return (
    <div className="border-t border-border/20 p-4">
      <form onSubmit={onSubmit} className="flex items-center gap-2 bg-background border border-border/30 rounded-lg p-2 hover:border-primary/20 transition-colors max-w-4xl mx-auto">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handlePaperclipClick}
          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          disabled={isLoading}
        >
          <Paperclip size={16} />
        </button>

        <input
          value={input}
          onChange={onInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Ask me to deploy anything..."
          className="flex-1 bg-transparent text-base focus:outline-none placeholder-muted-foreground py-2 px-1"
          disabled={isLoading}
        />

        <button
          type="submit"
          className={`p-1.5 rounded-md transition-all ${
            input.trim() && !isLoading
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground bg-secondary/30 cursor-not-allowed"
          }`}
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ArrowUp size={16} />
          )}
        </button>
      </form>
      
      {/* Quick Actions */}
      <div className="flex justify-center mt-2">
        <Text variant="caption" className="text-muted-foreground">
          💡 Pro tip: Ask me to "deploy my React app from GitHub" or "set up a Jupyter notebook"
        </Text>
      </div>
    </div>
  );
}; 