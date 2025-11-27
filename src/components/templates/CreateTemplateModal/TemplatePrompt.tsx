import { ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface TemplatePromptProps {
  onBack: () => void;
  onBlankTemplate: () => void;
  onExistingNote: () => void;
}

export const TemplatePrompt = ({
  onBack,
  onBlankTemplate,
  onExistingNote,
}: TemplatePromptProps) => {
  const [prompt, setPrompt] = useState('');

  const placeholderExamples = `Create an issues list with ICD-10 codes.
Express in paragraph form.
Include a Past Medical History and Medications list taken from the Context tab (yesterday's note).`;

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to template type
        </Button>
        
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Create a template
        </h2>
        <p className="text-sm text-muted-foreground">
          Specify details about the content, structure, and rules you'd like applied to your notes and documents.
        </p>
      </div>

      <div className="relative">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholderExamples}
          className="min-h-[200px] resize-none pr-12"
        />
        <Button
          size="icon"
          className="absolute bottom-3 right-3 rounded-full bg-[hsl(25,35%,25%)] hover:bg-[hsl(25,35%,20%)] text-white"
          disabled={!prompt.trim()}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">or start from</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={onExistingNote}
          className="h-auto py-3 bg-[hsl(40,60%,95%)] hover:bg-[hsl(40,60%,90%)] border-[hsl(40,40%,80%)]"
        >
          Existing note
        </Button>
        <Button
          onClick={onBlankTemplate}
          className="h-auto py-3 bg-[hsl(25,35%,25%)] hover:bg-[hsl(25,35%,20%)] text-white"
        >
          Blank template
        </Button>
      </div>
    </div>
  );
};
