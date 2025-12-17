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
          "gap-2 font-medium min-w-[120px] rounded-full",
          "bg-brand hover:bg-[hsl(5_85%_68%)] text-brand-foreground",
          isRecording && "animate-pulse"
        )}
        onClick={onToggleRecording}
      >
        {isRecording ? (
          <>
            <Square className="h-4 w-4 fill-current" />
            Stop
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 stroke-[1.5]" />
            {isTranscribe ? 'Transcribe' : 'Dictate'}
          </>
        )}
      </Button>

      {/* Segmented control for mode selection */}
      <div className="flex items-center rounded-full border border-[hsl(216_20%_90%)] bg-white overflow-hidden">
        <button
          onClick={() => onModeChange('transcribe')}
          className={cn(
            "px-4 py-2 text-[13px] font-medium transition-colors",
            mode === 'transcribe'
              ? "bg-[hsl(5_85%_92%)] text-foreground"
              : "bg-white text-foreground/70 hover:bg-sidebar"
          )}
        >
          Transcribing
        </button>
        <button
          onClick={() => onModeChange('dictate')}
          className={cn(
            "px-4 py-2 text-[13px] font-medium transition-colors",
            mode === 'dictate'
              ? "bg-[hsl(5_85%_92%)] text-foreground"
              : "bg-white text-foreground/70 hover:bg-sidebar"
          )}
        >
          Dictating
        </button>
      </div>
    </div>
  );
};
