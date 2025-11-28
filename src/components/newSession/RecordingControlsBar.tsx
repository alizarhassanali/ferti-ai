import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, ChevronDown, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecordingControlsBarProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  onGenerate: () => void;
}

export const RecordingControlsBar = ({
  isRecording,
  onToggleRecording,
  onGenerate,
}: RecordingControlsBarProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-background">
      {/* Timer */}
      <div className="flex items-center gap-4">
        <span className="text-lg font-mono font-semibold">{formatTime(time)}</span>
      </div>

      {/* Recording Controls */}
      <div className="flex items-center gap-3">
        {/* Recording Button with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              className={`gap-2 ${isRecording ? 'bg-destructive text-destructive-foreground' : ''}`}
            >
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isRecording ? 'bg-white' : 'bg-destructive'}`} />
                <ChevronDown className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onToggleRecording}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </DropdownMenuItem>
            <DropdownMenuItem>Recording Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Microphone Icon */}
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Mic className="h-5 w-5" />
        </Button>

        {/* Generate Button with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="default" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              Generate
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onGenerate}>Generate Note</DropdownMenuItem>
            <DropdownMenuItem>Generate with Options...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
