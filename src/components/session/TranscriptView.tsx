import { Button } from '@/components/ui/button';
import { Copy, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TranscriptViewProps {
  transcript: string;
}

export const TranscriptView = ({ transcript }: TranscriptViewProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    toast({
      title: 'Copied to clipboard',
      description: 'Transcript has been copied.',
    });
  };

  return (
    <div className="h-full flex flex-col border border-border rounded-lg bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Transcript</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {transcript ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-sm text-muted-foreground font-mono">0:11</span>
              <p className="flex-1 text-sm leading-relaxed">{transcript}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">Start recording to see transcript</p>
              <p className="text-sm text-muted-foreground">
                Your speech will be transcribed in real-time
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
