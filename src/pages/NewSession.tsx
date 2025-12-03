import { useState, useEffect, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PatientSelector } from '@/components/newSession/PatientSelector';
import { SessionInfoBar } from '@/components/newSession/SessionInfoBar';
import { MainTabsContainer } from '@/components/newSession/MainTabsContainer';
import { AskAIInput } from '@/components/newSession/AskAIInput';
import { Patient, RecordingMode, MainTab, NoteTab } from '@/types/session';
import { useToast } from '@/hooks/use-toast';
import { DEMO_NOTES, TEMPLATES } from '@/data/demoContent';

const NewSession = () => {
  const { toast } = useToast();
  
  // Patient state
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([
    { id: '1', name: 'John Smith', identifier: 'JS-001', additionalContext: 'Type 2 Diabetes, Hypertension', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Sarah Johnson', identifier: 'SJ-002', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Michael Chen', identifier: 'MC-003', additionalContext: 'Asthma, Allergies to penicillin', createdAt: new Date(), updatedAt: new Date() },
  ]);

  // Recording state
  const [recordingMode, setRecordingMode] = useState<RecordingMode>('transcribe');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);

  // Language state
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('en');

  // Tab state
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('context');

  // Content state
  const [contextContent, setContextContent] = useState('');
  const [transcriptContent, setTranscriptContent] = useState('');
  const [dictationContent, setDictationContent] = useState('');
  const [smartDictation, setSmartDictation] = useState(true);

  // Note tabs state
  const [noteTabs, setNoteTabs] = useState<NoteTab[]>([
    { id: '1', title: 'Untitled 1', templateId: '', content: '' },
  ]);
  const [activeNoteTabId, setActiveNoteTabId] = useState('1');
  const [isGenerating, setIsGenerating] = useState(false);

  const [sessionDate] = useState(new Date());

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Simulated audio level animation when recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggleRecording = useCallback(() => {
    if (!isRecording) {
      setRecordingDuration(0);
      // Switch to appropriate tab when starting recording
      if (recordingMode === 'transcribe') {
        setActiveMainTab('transcript');
      } else {
        setActiveMainTab('dictation');
      }
    }
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? 'Recording stopped' : 'Recording started',
      description: isRecording 
        ? 'Your recording has been saved.' 
        : `${recordingMode === 'transcribe' ? 'Transcribing' : 'Dictating'}...`,
    });
  }, [isRecording, recordingMode, toast]);

  const handleModeChange = (mode: RecordingMode) => {
    setRecordingMode(mode);
    // Switch to appropriate tab
    if (mode === 'transcribe') {
      if (activeMainTab === 'dictation') setActiveMainTab('transcript');
    } else {
      if (activeMainTab === 'transcript') setActiveMainTab('dictation');
    }
  };

  const handleUploadAudio = () => {
    toast({
      title: 'Upload audio',
      description: 'Audio upload feature coming soon.',
    });
  };

  const handleCreatePatient = (name: string) => {
    const newPatient: Patient = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatient(newPatient);
    toast({
      title: 'Patient created',
      description: `${name} has been added.`,
    });
  };

  const handleUpdatePatient = (patient: Patient) => {
    setPatients(prev => prev.map(p => p.id === patient.id ? { ...patient, updatedAt: new Date() } : p));
    if (selectedPatient?.id === patient.id) {
      setSelectedPatient(patient);
    }
    toast({
      title: 'Patient updated',
      description: 'Changes have been saved.',
    });
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    toast({
      title: 'Patient deleted',
      description: 'Patient and linked sessions have been removed.',
      variant: 'destructive',
    });
  };

  const handleAISubmit = (prompt: string) => {
    toast({
      title: 'Processing...',
      description: `AI is working on: "${prompt}"`,
    });
  };

  // Generation logic
  const hasContent = contextContent.trim().length > 0 || 
    transcriptContent.trim().length > 0 || 
    dictationContent.trim().length > 0;

  const handleGenerate = useCallback((templateId: string) => {
    if (!templateId || !hasContent) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const template = TEMPLATES.find(t => t.id === templateId);
      const generatedContent = DEMO_NOTES[templateId] || 'Generated note content will appear here...';
      
      const newTabs = noteTabs.map(t =>
        t.id === activeNoteTabId
          ? { ...t, templateId, title: template?.name || t.title, content: generatedContent }
          : t
      );
      setNoteTabs(newTabs);
      setIsGenerating(false);
      setActiveMainTab('note');
      
      toast({
        title: 'Note generated',
        description: `${template?.name} has been created.`,
      });
    }, 1500);
  }, [hasContent, noteTabs, activeNoteTabId, toast]);

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background w-full">
        {/* Patient Header */}
        <div className="px-6 py-4 border-b border-border">
          <PatientSelector
            selectedPatient={selectedPatient}
            patients={patients}
            onSelectPatient={setSelectedPatient}
            onCreatePatient={handleCreatePatient}
            onUpdatePatient={handleUpdatePatient}
            onDeletePatient={handleDeletePatient}
          />
        </div>

        {/* Session Info Bar */}
        <SessionInfoBar
          sessionDate={sessionDate}
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          onInputLanguageChange={setInputLanguage}
          onOutputLanguageChange={setOutputLanguage}
          recordingDuration={recordingDuration}
          selectedMicrophoneId={selectedMicrophoneId}
          onMicrophoneChange={setSelectedMicrophoneId}
          audioLevel={audioLevel}
          recordingMode={recordingMode}
          isRecording={isRecording}
          onModeChange={handleModeChange}
          onToggleRecording={handleToggleRecording}
          onUploadAudio={handleUploadAudio}
        />

        {/* Main Tabs Content */}
        <div className="flex-1 overflow-hidden">
          <MainTabsContainer
            recordingMode={recordingMode}
            activeTab={activeMainTab}
            onTabChange={setActiveMainTab}
            contextContent={contextContent}
            onContextChange={setContextContent}
            transcriptContent={transcriptContent}
            onTranscriptChange={setTranscriptContent}
            dictationContent={dictationContent}
            onDictationChange={setDictationContent}
            isRecording={isRecording}
            smartDictation={smartDictation}
            onSmartDictationChange={setSmartDictation}
            noteTabs={noteTabs}
            activeNoteTabId={activeNoteTabId}
            onNoteTabsChange={setNoteTabs}
            onActiveNoteTabChange={setActiveNoteTabId}
            isGenerating={isGenerating}
            hasContent={hasContent}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Ask AI Input */}
        <AskAIInput onSubmit={handleAISubmit} />
      </div>
    </AppLayout>
  );
};

export default NewSession;
