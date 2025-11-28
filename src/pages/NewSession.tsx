import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { NewSessionHeader } from '@/components/newSession/NewSessionHeader';
import { SessionDetailsHeader } from '@/components/newSession/SessionDetailsHeader';
import { TranscriptPanel } from '@/components/newSession/TranscriptPanel';
import { MedicalContextPanel } from '@/components/newSession/MedicalContextPanel';
import { RecordingControlsBar } from '@/components/newSession/RecordingControlsBar';
import { GeneratedNotePanel } from '@/components/newSession/GeneratedNotePanel';
import { AIAssistant } from '@/components/session/AIAssistant';
import { AlertTriangle } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface GeneratedNote {
  template: string;
  sections: {
    name: string;
    content: string;
  }[];
}

const NewSession = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [medicalContext, setMedicalContext] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('SOAP Note (Standard)');
  const [generatedNote, setGeneratedNote] = useState<GeneratedNote | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [patientDetails, setPatientDetails] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [sessionDate] = useState(new Date());

  const handleNewSession = () => {
    setTranscript('');
    setMedicalContext('');
    setGeneratedNote(null);
    setShowResults(false);
    setIsRecording(false);
  };

  const handleGenerate = () => {
    // Mock generation - in real app, this would call AI service
    const mockNote: GeneratedNote = {
      template: selectedTemplate,
      sections: [
        {
          name: 'Subjective',
          content: 'Patient presents with complaints of headaches for the past week, described as right-sided, behind the eye, rated 6-7/10. Reports photophobia during episodes. Associated with work stress and poor sleep.'
        },
        {
          name: 'Objective',
          content: 'Vitals: BP 128/82, HR 76, Temp 98.6F\nGeneral: Alert and oriented, appears uncomfortable\nNeuro: CN II-XII intact, no focal deficits'
        },
        {
          name: 'Assessment',
          content: '1. Tension-type headache with migrainous features\n2. Work-related stress\n3. Insomnia'
        },
        {
          name: 'Plan',
          content: '1. Start Sumatriptan 50mg PRN for acute episodes\n2. Lifestyle modifications discussed\n3. Follow-up in 2 weeks'
        }
      ]
    };
    setGeneratedNote(mockNote);
    setShowResults(true);
  };

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background w-full">
        {/* Header */}
        <NewSessionHeader
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
          onNewSession={handleNewSession}
        />

        <SessionDetailsHeader
          patientDetails={patientDetails}
          onPatientDetailsChange={setPatientDetails}
          sessionDate={sessionDate}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        {/* Two Column Resizable Layout */}
        <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden w-full">
          {/* Left: Transcript */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <TranscriptPanel
              transcript={transcript}
              onTranscriptChange={setTranscript}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right: Medical Context or Results */}
          <ResizablePanel defaultSize={40} minSize={25}>
            {showResults ? (
              <GeneratedNotePanel generatedNote={generatedNote} />
            ) : (
              <MedicalContextPanel
                medicalContext={medicalContext}
                onMedicalContextChange={setMedicalContext}
              />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Recording Controls Bar */}
        <RecordingControlsBar
          isRecording={isRecording}
          onToggleRecording={() => setIsRecording(!isRecording)}
          onGenerate={handleGenerate}
        />

        {/* AI Assistant Input */}
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
