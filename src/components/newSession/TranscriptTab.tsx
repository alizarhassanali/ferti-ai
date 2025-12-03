import { Bold, Italic, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TranscriptTabProps {
  content: string;
  onContentChange: (content: string) => void;
  isRecording: boolean;
}

export const TranscriptTab = ({ content, onContentChange, isRecording }: TranscriptTabProps) => {
  return (
    <div className="flex flex-col h-full p-4">
      {/* Toolbar */}
      <div className="flex items-center gap-1 mb-3 pb-3 border-b border-border">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        {isRecording && (
          <div className="ml-auto flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm text-muted-foreground">Recording...</span>
          </div>
        )}
      </div>

      {/* Text Area */}
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Your transcript will appear here as you speak or record..."
        className="flex-1 min-h-[300px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed"
      />
    </div>
  );
};
