import { Mic, ChevronDown, Check, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RecordingMode } from '@/types/session';
import { cn } from '@/lib/utils';

interface RecordingModeButtonProps {
  mode: RecordingMode;
  isRecording: boolean;
  onModeChange: (mode: RecordingMode) => void;
  onToggleRecording: () => void;
  onUploadAudio: () => void;
}

export const RecordingModeButton = ({
  mode,
  isRecording,
  onModeChange,
  onToggleRecording,
  onUploadAudio,
}: RecordingModeButtonProps) => {
  const isTranscribe = mode === 'transcribe';
  
  const buttonStyles = cn(
    "gap-2 font-medium min-w-[140px]",
    isRecording && "animate-pulse",
    isTranscribe 
      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
      : "bg-violet-600 hover:bg-violet-700 text-white"
  );

  const dropdownButtonStyles = cn(
    "px-2 border-l",
    isTranscribe 
      ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500" 
      : "bg-violet-600 hover:bg-violet-700 text-white border-violet-500"
  );

  return (
    <div className="flex">
      <Button
        className={buttonStyles}
        onClick={onToggleRecording}
      >
        {isRecording ? (
          <>
            <Square className="h-4 w-4 fill-current" />
            Stop
          </>
        ) : (
          <>
            <Mic className="h-4 w-4" />
            {isTranscribe ? 'Transcribe' : 'Dictate'}
          </>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={dropdownButtonStyles}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover">
          <DropdownMenuItem onClick={() => onModeChange('transcribe')}>
            <Check className={cn("mr-2 h-4 w-4", mode !== 'transcribe' && "opacity-0")} />
            Transcribing
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onModeChange('dictate')}>
            <Check className={cn("mr-2 h-4 w-4", mode !== 'dictate' && "opacity-0")} />
            Dictating
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
