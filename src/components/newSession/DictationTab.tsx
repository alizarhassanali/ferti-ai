import { Bold, Italic, List, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DictationTabProps {
  content: string;
  onContentChange: (content: string) => void;
  isRecording: boolean;
  smartDictation: boolean;
  onSmartDictationChange: (enabled: boolean) => void;
}

export const DictationTab = ({
  content,
  onContentChange,
  isRecording,
  smartDictation,
  onSmartDictationChange,
}: DictationTabProps) => {
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
        
        <div className="ml-auto flex items-center gap-4">
          {/* Smart Dictation Toggle */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-500" />
            <Label htmlFor="smart-dictation" className="text-sm cursor-pointer">
              Smart dictation
            </Label>
            <Switch
              id="smart-dictation"
              checked={smartDictation}
              onCheckedChange={onSmartDictationChange}
            />
          </div>

          {isRecording && (
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-sm text-muted-foreground">Dictating...</span>
            </div>
          )}
        </div>
      </div>

      {/* Text Area */}
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Your dictation will appear here..."
        className="flex-1 min-h-[300px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed"
      />

      {smartDictation && (
        <p className="text-xs text-muted-foreground mt-2">
          Smart dictation enabled - AI will format and structure your dictation automatically
        </p>
      )}
    </div>
  );
};
