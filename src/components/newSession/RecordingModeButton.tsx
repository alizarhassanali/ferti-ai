import { Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="flex items-center gap-2">
      {/* Primary action button - Salmon CTA */}
      <Button
        className={cn(
          "gap-2 font-medium min-w-[110px] h-9 rounded-full text-sm",
          "bg-brand hover:bg-brand/90 text-brand-foreground",
          isRecording && "animate-pulse"
        )}
        onClick={onToggleRecording}
      >
        {isRecording ? (
          <>
            <Square className="h-3.5 w-3.5 fill-current" />
            Stop
          </>
        ) : (
          <>
            <Mic className="h-3.5 w-3.5 stroke-[1.5]" />
            {isTranscribe ? 'Transcribe' : 'Dictate'}
          </>
        )}
      </Button>

      {/* Segmented control for mode selection */}
      <div className="flex items-center rounded-full border border-border bg-white overflow-hidden h-9">
        <button
          onClick={() => onModeChange('transcribe')}
          className={cn(
            "px-3.5 h-full text-[13px] font-medium transition-colors",
            mode === 'transcribe'
              ? "bg-brand/10 text-foreground"
              : "bg-white text-foreground/60 hover:bg-muted hover:text-foreground/80"
          )}
        >
          Transcribing
        </button>
        <button
          onClick={() => onModeChange('dictate')}
          className={cn(
            "px-3.5 h-full text-[13px] font-medium transition-colors",
            mode === 'dictate'
              ? "bg-brand/10 text-foreground"
              : "bg-white text-foreground/60 hover:bg-muted hover:text-foreground/80"
          )}
        >
          Dictating
        </button>
      </div>
    </div>
  );
};
