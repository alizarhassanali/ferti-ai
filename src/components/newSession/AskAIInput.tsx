import { useState } from 'react';
import { Bot, Paperclip, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AskAIInputProps {
  onSubmit: (prompt: string) => void;
}

export const AskAIInput = ({ onSubmit }: AskAIInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    onSubmit(prompt.trim());
    setPrompt('');
  };

  return (
    <div className="border-t border-border bg-background">
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 relative">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Ask NotesAI to do anything..."
              className="pr-20"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="h-8 w-8"
                onClick={handleSubmit}
                disabled={!prompt.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 bg-muted/30 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
          <span>Review your note before use to ensure it accurately represents the visit</span>
        </div>
      </div>
    </div>
  );
};
