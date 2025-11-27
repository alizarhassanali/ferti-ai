import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SessionHeader } from '@/components/session/SessionHeader';
import { RecordingControls } from '@/components/session/RecordingControls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TranscriptView } from '@/components/session/TranscriptView';
import { DictationView } from '@/components/session/DictationView';
import { AIAssistant } from '@/components/session/AIAssistant';
import { AlertTriangle } from 'lucide-react';

const NewSession = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [dictation, setDictation] = useState('');

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        {/* Session Header */}
        <SessionHeader />

        {/* Recording Controls */}
        <RecordingControls
          isRecording={isRecording}
          isPaused={isPaused}
          recordingTime={recordingTime}
          onToggleRecording={() => setIsRecording(!isRecording)}
          onTogglePause={() => setIsPaused(!isPaused)}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden p-6">
          <Tabs defaultValue="transcript" className="h-full flex flex-col">
            <TabsList className="mb-4">
              <TabsTrigger value="transcript" className="gap-2">
                🎙️ Transcript
              </TabsTrigger>
              <TabsTrigger value="dictation" className="gap-2">
                📝 Dictation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transcript" className="flex-1 overflow-hidden">
              <TranscriptView transcript={transcript} />
            </TabsContent>

            <TabsContent value="dictation" className="flex-1 overflow-hidden">
              <DictationView dictation={dictation} />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant */}
        <div className="border-t border-border p-4">
          <AIAssistant />
        </div>

        {/* Footer Warning */}
        <div className="border-t border-border bg-muted/30 px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span>Review your note before use to ensure it accurately represents the visit</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewSession;
