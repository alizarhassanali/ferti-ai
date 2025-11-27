import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Copy, ChevronDown, Bold, Italic, Underline, List, IndentIncrease } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface DictationViewProps {
  dictation: string;
}

export const DictationView = ({ dictation }: DictationViewProps) => {
  const { toast } = useToast();
  const [smartDictation, setSmartDictation] = useState(true);
  const [noteContent, setNoteContent] = useState(dictation);

  const handleCopy = () => {
    navigator.clipboard.writeText(noteContent);
    toast({
      title: 'Copied to clipboard',
      description: 'Clinical note has been copied.',
    });
  };

  const defaultNote = `Chief Complaint:
[Patient's primary concern]

History of Present Illness:
[Detailed description of the current condition]

Assessment:
[Clinical evaluation and diagnosis]

Plan:
[Treatment plan and follow-up]`;

  return (
    <div className="h-full flex flex-col border border-border rounded-lg bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="smart-dictation"
              checked={smartDictation}
              onCheckedChange={setSmartDictation}
            />
            <Label htmlFor="smart-dictation" className="text-sm font-medium cursor-pointer">
              ⚡ Smart dictation
            </Label>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Settings
        </Button>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2 bg-muted/30">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Underline className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <IndentIncrease className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {noteContent || dictation ? (
          <Textarea
            value={noteContent || dictation}
            onChange={(e) => setNoteContent(e.target.value)}
            className="min-h-full border-none shadow-none focus-visible:ring-0 resize-none font-mono text-sm leading-relaxed"
            placeholder={defaultNote}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="text-center space-y-2 max-w-md">
              <p className="text-muted-foreground">The transcript was too short to create a note</p>
              <p className="text-sm text-muted-foreground">
                Please check your microphone settings, recording length, and speaking volume
              </p>
            </div>
            <Button variant="outline">
              Resume Recording
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
