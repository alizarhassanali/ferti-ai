import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, Copy, Check, Mic, Settings, ChevronLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TranscriptPanelProps {
  transcript: string;
  onTranscriptChange: (value: string) => void;
}

export const TranscriptPanel = ({ transcript, onTranscriptChange }: TranscriptPanelProps) => {
  const [visitType, setVisitType] = useState<'virtual' | 'in-person'>('in-person');

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <h3 className="font-medium">Transcript</h3>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-success" />
          <span>Saved draft</span>
        </div>
      </div>

      {/* Visit Type Toggle */}
      <div className="px-4 py-2 border-b border-border">
        <Tabs value={visitType} onValueChange={(v) => setVisitType(v as 'virtual' | 'in-person')}>
          <TabsList className="w-full">
            <TabsTrigger value="virtual" className="flex-1">Virtual visit</TabsTrigger>
            <TabsTrigger value="in-person" className="flex-1">In person</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Transcript Content */}
      <div className="flex-1 overflow-hidden relative">
        <Textarea
          value={transcript}
          onChange={(e) => onTranscriptChange(e.target.value)}
          placeholder="Your transcript will appear here as you speak or record..."
          className="w-full h-full resize-none border-0 rounded-none focus-visible:ring-0 p-4"
        />
        
        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-4 h-8 w-8 bg-background border border-border shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
