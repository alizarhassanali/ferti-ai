import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send } from 'lucide-react';

export const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    if (!prompt.trim()) return;
    // Handle AI prompt submission
    console.log('AI Prompt:', prompt);
    setPrompt('');
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="🤖 Ask NotesAI to do anything..."
          className="pr-10"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
      </div>
      <Button
        size="icon"
        onClick={handleSend}
        disabled={!prompt.trim()}
        className="shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
