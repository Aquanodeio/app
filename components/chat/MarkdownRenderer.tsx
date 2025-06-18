interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const renderMarkdown = (text: string) => {
    // Split text by markdown patterns while preserving the delimiters
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|```[\s\S]*?```|\n)/g);
    
    return parts.map((part, index) => {
      // Bold text: **text**
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      
      // Italic text: *text*
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return (
          <em key={index} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      
      // Code blocks: ```code```
      if (part.startsWith('```') && part.endsWith('```')) {
        return (
          <pre key={index} className="bg-secondary/40 rounded p-2 my-2 overflow-x-auto">
            <code className="text-sm font-mono">
              {part.slice(3, -3).trim()}
            </code>
          </pre>
        );
      }
      
      // Inline code: `code`
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-secondary/40 px-1 py-0.5 rounded text-sm font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      
      // Line breaks
      if (part === '\n') {
        return <br key={index} />;
      }
      
      // Regular text
      return <span key={index}>{part}</span>;
    });
  };

  return <div className="leading-relaxed">{renderMarkdown(content)}</div>;
}; 