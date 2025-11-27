import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ExistingNoteImportProps {
  onBack: () => void;
  onConvert: (content: string) => void;
}

export const ExistingNoteImport = ({ onBack, onConvert }: ExistingNoteImportProps) => {
  const [content, setContent] = useState('');

  const handleConvert = () => {
    if (content.trim()) {
      onConvert(content);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Create template &gt; From existing note
        </Button>
        
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Start from an existing note
        </h2>
        <p className="text-sm text-muted-foreground">
          CTRL + V to paste an existing note
        </p>
      </div>

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your existing note here..."
        className="min-h-[400px] resize-none font-mono text-sm"
      />

      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleConvert}
          disabled={!content.trim()}
          className="bg-[hsl(25,35%,25%)] hover:bg-[hsl(25,35%,20%)] text-white"
        >
          Convert to template
        </Button>
      </div>
    </div>
  );
};
