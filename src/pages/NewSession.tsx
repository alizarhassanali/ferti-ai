import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PatientSelector } from '@/components/newSession/PatientSelector';
import { SessionInfoBar } from '@/components/newSession/SessionInfoBar';
import { MainTabsContainer } from '@/components/newSession/MainTabsContainer';
import { AskAIInput } from '@/components/newSession/AskAIInput';
import { Patient, RecordingMode, MainTab, NoteTab, Session } from '@/types/session';
import { useToast } from '@/hooks/use-toast';
import { useSessions } from '@/contexts/SessionsContext';
import { usePatients } from '@/contexts/PatientsContext';
import { DEMO_NOTES, TEMPLATES } from '@/data/demoContent';
import { format } from 'date-fns';

const NewSession = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addSession, updateSession, getSession } = useSessions();
  const { patients, addPatient, updatePatient: updatePatientInContext, deletePatient: deletePatientInContext } = usePatients();
  
  // Current session ID - either from URL or newly created
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(() => {
    return searchParams.get('id');
  });
  
  // Patient state
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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

  // Create a new session when component mounts without an ID
  useEffect(() => {
    if (!currentSessionId) {
      const newId = `session-${Date.now()}`;
      const now = new Date();
      const newSession: Session = {
        id: newId,
        title: 'Untitled session',
        date: now,
        time: format(now, 'h:mma'),
        language: 'English',
        duration: 0,
        status: 'draft',
        hasTranscript: false,
        hasNotes: false,
        mode: 'transcribe',
        contextContent: '',
        transcriptContent: '',
        dictationContent: '',
        inputLanguage: 'en',
        outputLanguage: 'en',
        notes: [],
      };
      addSession(newSession);
      setCurrentSessionId(newId);
    }
  }, [currentSessionId, addSession]);

  // Load existing session data if editing
  useEffect(() => {
    if (currentSessionId) {
      const existingSession = getSession(currentSessionId);
      if (existingSession) {
        setContextContent(existingSession.contextContent || '');
        setTranscriptContent(existingSession.transcriptContent || '');
        setDictationContent(existingSession.dictationContent || '');
        setRecordingMode(existingSession.mode || 'transcribe');
        setInputLanguage(existingSession.inputLanguage || 'en');
        setOutputLanguage(existingSession.outputLanguage || 'en');
        
        if (existingSession.patientId) {
          const patient = patients.find(p => p.id === existingSession.patientId);
          if (patient) {
            setSelectedPatient(patient);
          }
        }
        
        if (existingSession.notes && existingSession.notes.length > 0) {
          setNoteTabs(existingSession.notes.map(n => ({
            id: n.id,
            title: n.title,
            templateId: n.type,
            content: n.content,
          })));
        }
      }
    }
  }, [currentSessionId, getSession, patients]);

  // Save session changes
  const saveSessionChanges = useCallback(() => {
    if (!currentSessionId) return;
    
    updateSession(currentSessionId, {
      contextContent,
      transcriptContent,
      dictationContent,
      mode: recordingMode,
      inputLanguage,
      outputLanguage,
      patientId: selectedPatient?.id,
      patientName: selectedPatient?.name,
      title: selectedPatient?.name || 'Untitled session',
      hasTranscript: transcriptContent.trim().length > 0,
      notes: noteTabs.map(t => ({
        id: t.id,
        type: t.templateId as any || 'custom',
        title: t.title,
        content: t.content,
        isClosable: true,
      })),
    });
  }, [currentSessionId, updateSession, contextContent, transcriptContent, dictationContent, recordingMode, inputLanguage, outputLanguage, selectedPatient, noteTabs]);

  // Auto-save on content changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveSessionChanges();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [saveSessionChanges]);

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

  const handleSelectPatient = (patient: Patient | null) => {
    setSelectedPatient(patient);
    if (currentSessionId && patient) {
      updateSession(currentSessionId, {
        patientId: patient.id,
        patientName: patient.name,
        title: patient.name,
      });
    } else if (currentSessionId) {
      updateSession(currentSessionId, {
        patientId: undefined,
        patientName: undefined,
        title: 'Untitled session',
      });
    }
  };

  const handleCreatePatient = (name: string) => {
    const newPatient: Patient = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addPatient(newPatient);
    handleSelectPatient(newPatient);
    toast({
      title: 'Patient created',
      description: `${name} has been added.`,
    });
  };

  const handleUpdatePatient = (patient: Patient) => {
    updatePatientInContext(patient.id, patient);
    if (selectedPatient?.id === patient.id) {
      setSelectedPatient(patient);
    }
    toast({
      title: 'Patient updated',
      description: 'Changes have been saved.',
    });
  };

  const handleDeletePatient = (patientId: string) => {
    deletePatientInContext(patientId);
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(null);
    }
    toast({
      title: 'Patient deleted',
      description: 'Patient has been removed.',
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
      
      // Update session status to complete when note is generated
      if (currentSessionId) {
        updateSession(currentSessionId, {
          status: 'complete',
          hasNotes: true,
        });
      }
      
      toast({
        title: 'Note generated',
        description: `${template?.name} has been created.`,
      });
    }, 1500);
  }, [hasContent, noteTabs, activeNoteTabId, toast, currentSessionId, updateSession]);

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background w-full">
        {/* Patient Header */}
        <div className="px-6 py-4 border-b border-border">
          <PatientSelector
            selectedPatient={selectedPatient}
            patients={patients}
            onSelectPatient={handleSelectPatient}
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
