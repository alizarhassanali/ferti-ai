import { useState } from 'react';
import { Calendar, ChevronDown, Users, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';
import { LanguageSelector } from './LanguageSelector';
import { MicrophoneSelector } from './MicrophoneSelector';
import { RecordingModeButton } from './RecordingModeButton';
import { RecordingMode } from '@/types/session';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

const partnerOptions = ['Partner A', 'Partner B', 'Partner C', 'None'];
const referringPhysicianOptions = ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee', 'None'];

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
  onUploadAudio
}: SessionInfoBarProps) => {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [selectedReferringPhysician, setSelectedReferringPhysician] = useState<string | null>(null);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePartnerSelect = (value: string) => {
    setSelectedPartner(value === 'None' ? null : value);
  };

  const handleReferringPhysicianSelect = (value: string) => {
    setSelectedReferringPhysician(value === 'None' ? null : value);
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
      {/* Left side: Date, Language, Partner, Referring Physician chips */}
      <div className="flex items-center gap-3">
        {/* Date chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 text-foreground rounded-full text-[13px] bg-white">
          <Calendar className="h-3.5 w-3.5 stroke-[1.5]" />
          <span>{format(sessionDate, "MMM d, yyyy h:mma")}</span>
        </div>
        
        <LanguageSelector 
          inputLanguage={inputLanguage} 
          outputLanguage={outputLanguage} 
          onInputLanguageChange={onInputLanguageChange} 
          onOutputLanguageChange={onOutputLanguageChange} 
        />

        {/* Partner dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[hsl(216_20%_90%)] rounded-full text-[13px] transition-colors hover:border-primary/30">
              <Users className="h-3.5 w-3.5 text-foreground stroke-[1.5]" />
              <span className="text-foreground">
                Partner: {selectedPartner || '—'}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-foreground stroke-[1.5]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-white border border-[hsl(216_20%_90%)]">
            {partnerOptions.map(option => (
              <DropdownMenuItem
                key={option}
                onClick={() => handlePartnerSelect(option)}
                className="text-foreground hover:bg-sidebar cursor-pointer"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Referring Physician dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[hsl(216_20%_90%)] rounded-full text-[13px] transition-colors hover:border-primary/30">
              <Stethoscope className="h-3.5 w-3.5 text-foreground stroke-[1.5]" />
              <span className="text-foreground">
                Referring physician: {selectedReferringPhysician || '—'}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-foreground stroke-[1.5]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-white border border-[hsl(216_20%_90%)]">
            {referringPhysicianOptions.map(option => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleReferringPhysicianSelect(option)}
                className="text-foreground hover:bg-sidebar cursor-pointer"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right side: Timer, Mic, Record button with mode selector */}
      <div className="flex items-center gap-4">
        {/* Timer */}
        <span className="font-medium text-[13px] text-foreground/80 tabular-nums">
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