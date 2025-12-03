import { Calendar } from 'lucide-react';
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
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
      {/* Left side: Date and Language */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(sessionDate, "MMM d, yyyy h:mma")}</span>
        </div>
        <LanguageSelector
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          onInputLanguageChange={onInputLanguageChange}
          onOutputLanguageChange={onOutputLanguageChange}
        />
      </div>

      {/* Right side: Timer, Mic, Record button */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-lg font-medium tabular-nums">
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
