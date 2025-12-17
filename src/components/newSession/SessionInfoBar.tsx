import { Calendar, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { LanguageSelector } from './LanguageSelector';
import { MicrophoneSelector } from './MicrophoneSelector';
import { RecordingModeButton } from './RecordingModeButton';
import { RecordingMode } from '@/types/session';

interface SessionInfoBarProps {
  sessionDate: Date;
  inputLanguage: string;
  outputLanguage: string;
  onInputLanguageChange: (lang: string) => void;
  onOutputLanguageChange: (lang: string) => void;
  recordingDuration: number;
  selectedMicrophoneId: string;
  onMicrophoneChange: (deviceId: string) => void;
  audioLevel: number;
  recordingMode: RecordingMode;
  isRecording: boolean;
  onModeChange: (mode: RecordingMode) => void;
  onToggleRecording: () => void;
  onUploadAudio: () => void;
}

export const SessionInfoBar = ({
  sessionDate,
  inputLanguage,
  outputLanguage,
  onInputLanguageChange,
  onOutputLanguageChange,
  recordingDuration,
  selectedMicrophoneId,
  onMicrophoneChange,
  audioLevel,
  recordingMode,
  isRecording,
  onModeChange,
  onToggleRecording,
  onUploadAudio,
}: SessionInfoBarProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-background">
      {/* Left side: Date and Language chips */}
      <div className="flex items-center gap-2.5">
        {/* Date chip */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-muted text-foreground rounded-full text-[13px]">
          <Calendar className="h-3.5 w-3.5 stroke-[1.5] text-foreground/60" />
          <span>{format(sessionDate, "MMM d, yyyy h:mma")}</span>
        </div>
        
        <LanguageSelector
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          onInputLanguageChange={onInputLanguageChange}
          onOutputLanguageChange={onOutputLanguageChange}
        />
      </div>

      {/* Right side: Timer, Mic, Record button with mode selector */}
      <div className="flex items-center gap-3">
        {/* Timer */}
        <span className="font-medium text-[13px] text-foreground/60 tabular-nums">
          {formatDuration(recordingDuration)}
        </span>
        
        <MicrophoneSelector
          selectedDeviceId={selectedMicrophoneId}
          onDeviceChange={onMicrophoneChange}
          audioLevel={audioLevel}
        />
        
        <RecordingModeButton
          mode={recordingMode}
          isRecording={isRecording}
          onModeChange={onModeChange}
          onToggleRecording={onToggleRecording}
          onUploadAudio={onUploadAudio}
        />
      </div>
    </div>
  );
};
