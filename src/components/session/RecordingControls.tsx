import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Play, Pause, Volume2, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  onToggleRecording: () => void;
  onTogglePause: () => void;
}

export const RecordingControls = ({
  isRecording,
  isPaused,
  recordingTime,
  onToggleRecording,
  onTogglePause,
}: RecordingControlsProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="border-b border-border bg-card px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            size="default"
            className="gap-2"
            disabled={time < 5}
            onClick={onToggleRecording}
          >
            <Sparkles className="h-4 w-4" />
            Create
          </Button>

          <Button variant="outline" size="default" className="gap-2" onClick={onTogglePause}>
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </div>

        {/* Recording Timer & Audio Controls */}
        <div className="flex items-center gap-4">
          <div
            className={`text-2xl font-mono font-semibold ${
              isRecording && !isPaused ? 'text-destructive' : 'text-foreground'
            }`}
          >
            ⏱️ {formatTime(time)}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="gap-1">
                <Volume2 className="h-4 w-4" />
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Select Microphone</DropdownMenuItem>
              <DropdownMenuItem>Audio Quality: High</DropdownMenuItem>
              <DropdownMenuItem>Volume: 85%</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
