import { Text, Grid } from "@/components/ui/design-system";
import { SUGGESTED_PROMPTS } from "./constants";

interface SuggestedPromptsProps {
  onPromptSelect: (prompt: string) => void;
  isLoading: boolean;
}

export const SuggestedPrompts = ({ onPromptSelect, isLoading }: SuggestedPromptsProps) => (
  <div className="flex flex-col items-center space-y-4 py-8">
    <div className="text-center space-y-2">
      <Text variant="large" className="font-semibold">
        Welcome to Aquanode Agent Terminal
      </Text>
      <Text variant="base" muted>
        Try these suggestions to get started:
      </Text>
    </div>
    
    <Grid variant="responsive-3" className="w-full max-w-5xl">
      {SUGGESTED_PROMPTS.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <button
            key={index}
            onClick={() => onPromptSelect(suggestion.prompt)}
            className="flex items-center gap-3 p-4 rounded-lg border border-border/30 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/30 transition-all duration-200 text-left group"
            disabled={isLoading}
          >
            <Icon
              size={20}
              className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform"
            />
            <div>
              <Text variant="small" className="font-medium text-foreground">
                {suggestion.text}
              </Text>
              <Text variant="caption" className="text-muted-foreground">
                {suggestion.category}
              </Text>
            </div>
          </button>
        );
      })}
    </Grid>
  </div>
); 