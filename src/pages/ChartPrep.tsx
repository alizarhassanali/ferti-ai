import { useState, useCallback, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SessionHeaderRow } from "@/components/newSession/SessionHeaderRow";
import { SessionInfoBar } from "@/components/newSession/SessionInfoBar";
import { ChartPrepSessionList } from "@/components/chartPrep/ChartPrepSessionList";
import { ChartPrepRightPanel } from "@/components/chartPrep/ChartPrepRightPanel";
import { Patient, NoteTab, Session, RecordingMode } from "@/types/session";
import { useToast } from "@/hooks/use-toast";
import { useSessions } from "@/contexts/SessionsContext";
import { usePatients } from "@/contexts/PatientsContext";
import { useChartPrepLayout } from "@/contexts/ChartPrepLayoutContext";
import { format } from "date-fns";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ChartPrep = () => {
  const { toast } = useToast();
  const { sessions, getSession } = useSessions();
  const { isSessionsListVisible } = useChartPrepLayout();
  const {
    patients,
    addPatient,
    updatePatient: updatePatientInContext,
    deletePatient: deletePatientInContext
  } = usePatients();

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientRequired, setPatientRequired] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [selectedPhysician, setSelectedPhysician] = useState<string | null>(null);
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const [contextContent, setContextContent] = useState("");
  const [transcriptContent, setTranscriptContent] = useState("");
  
  // Recording state - same as NewSession
  const [recordingMode, setRecordingMode] = useState<RecordingMode>("transcribe");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  
  const [noteTabs, setNoteTabs] = useState<NoteTab[]>([{
    id: "1",
    title: "Chart Prep",
    templateId: "chart-prep",
    content: ""
  }]);
  const [activeNoteTabId, setActiveNoteTabId] = useState("1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionDate] = useState(new Date());

  // Recording timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setRecordingDuration(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Audio level simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setAudioLevel(Math.random() * 100), 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Load session data when a session is selected
  const handleSessionSelect = useCallback((sessionId: string) => {
    setSelectedSessionId(sessionId);
    const session = getSession(sessionId);
    if (session) {
      setContextContent(session.contextContent || "");
      setTranscriptContent(session.transcriptContent || "");
      // Find and set patient if session has one
      if (session.patientId) {
        const patient = patients.find(p => p.id === session.patientId);
        if (patient) setSelectedPatient(patient);
      }
      // Reset note content for new chart prep
      setNoteTabs([{
        id: "1",
        title: "Chart Prep",
        templateId: "chart-prep",
        content: ""
      }]);
    }
  }, [getSession, patients]);

  const handleToggleRecording = useCallback(() => {
    if (!isRecording && !selectedPatient) {
      setPatientRequired(true);
      toast({
        title: "Patient required",
        description: "Please add patient details before starting transcription.",
        variant: "destructive"
      });
      return;
    }
    if (!isRecording) setRecordingDuration(0);
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording ? "Your recording has been saved." : `${recordingMode === "transcribe" ? "Transcribing" : "Dictating"}...`
    });
  }, [isRecording, recordingMode, toast, selectedPatient]);

  const handleModeChange = (mode: RecordingMode) => setRecordingMode(mode);
  
  const handleUploadAudio = () => toast({
    title: "Upload audio",
    description: "Audio upload feature coming soon."
  });

  const handleSelectPatient = (patient: Patient | null) => {
    setSelectedPatient(patient);
    if (patient) setPatientRequired(false);
  };

  const handleCreatePatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    addPatient(newPatient);
    handleSelectPatient(newPatient);
    toast({
      title: "Patient created",
      description: `${patientData.name} has been added.`
    });
  };

  const handleUpdatePatient = (patient: Patient) => {
    updatePatientInContext(patient.id, patient);
    if (selectedPatient?.id === patient.id) setSelectedPatient(patient);
    toast({
      title: "Patient updated",
      description: "Changes have been saved."
    });
  };

  const handleDeletePatient = (patientId: string) => {
    deletePatientInContext(patientId);
    if (selectedPatient?.id === patientId) setSelectedPatient(null);
    toast({
      title: "Patient deleted",
      description: "Patient has been removed.",
      variant: "destructive"
    });
  };

  const hasContent = contextContent.trim().length > 0 || transcriptContent.trim().length > 0;

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    // Get selected session data for chart prep generation
    const session = selectedSessionId ? getSession(selectedSessionId) : null;
    
    setTimeout(() => {
      // Generate chart prep content based on session data and context
      const generatedContent = generateChartPrepContent(session, contextContent, transcriptContent, selectedPatient);
      
      setNoteTabs(prevTabs => {
        return prevTabs.map(t => t.id === activeNoteTabId ? {
          ...t,
          content: generatedContent
        } : t);
      });
      setIsGenerating(false);
      toast({
        title: "Chart prep generated",
        description: "Pre-visit summary has been created."
      });
    }, 800);
  }, [activeNoteTabId, toast, selectedSessionId, getSession, contextContent, transcriptContent, selectedPatient]);

  return (
    <AppLayout hideGlobalSessionsPanel>
      <div className="flex h-screen overflow-hidden bg-background w-full">
        {/* Middle Pane - Sessions List (always visible in Chart Prep) */}
        {isSessionsListVisible && (
          <div className="w-80 h-full flex-shrink-0 flex flex-col">
            <ChartPrepSessionList 
              selectedSessionId={selectedSessionId}
              onSessionSelect={handleSessionSelect}
            />
          </div>
        )}

        {/* Right Pane - Main workspace */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header Row - shared with New Session */}
          <SessionHeaderRow
            selectedPatient={selectedPatient}
            patients={patients}
            onSelectPatient={handleSelectPatient}
            onCreatePatient={handleCreatePatient}
            onUpdatePatient={handleUpdatePatient}
            onDeletePatient={handleDeletePatient}
            isPatientHighlighted={patientRequired}
            selectedPartner={selectedPartner}
            onPartnerChange={setSelectedPartner}
            selectedPhysician={selectedPhysician}
            onPhysicianChange={setSelectedPhysician}
          />

          {/* Secondary Header Row - Same as New Session with recording controls */}
          <SessionInfoBar 
            sessionDate={sessionDate}
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

          {/* Two column layout with transcript and context/note */}
          <div className="flex-1 overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Left Column - Transcript/Dictation */}
              <ResizablePanel defaultSize={40} minSize={25}>
                <div className="flex flex-col h-full border-r border-border">
                  {/* Left Pane Header - dynamic based on recording mode */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                    <div className={cn(
                      "flex items-center gap-2 px-3 py-1 rounded-full",
                      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    )}>
                      <span className="text-sm font-medium">
                        {recordingMode === "transcribe" ? "Transcript" : "Dictation"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Transcript/Dictation Content */}
                  <div className="flex-1 overflow-auto p-4">
                    <Textarea
                      value={transcriptContent}
                      onChange={(e) => setTranscriptContent(e.target.value)}
                      placeholder={recordingMode === "transcribe" 
                        ? "Paste or view transcript from previous sessions here..." 
                        : "Start dictating or paste your notes here..."}
                      className="w-full h-full min-h-[300px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed bg-white"
                    />
                  </div>
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Right Column - Context/Note */}
              <ResizablePanel defaultSize={60} minSize={35}>
                <ChartPrepRightPanel
                  contextContent={contextContent}
                  onContextChange={setContextContent}
                  noteTabs={noteTabs}
                  activeNoteTabId={activeNoteTabId}
                  onNoteTabsChange={setNoteTabs}
                  onActiveNoteTabChange={setActiveNoteTabId}
                  isGenerating={isGenerating}
                  hasContent={hasContent}
                  onGenerate={handleGenerate}
                  sessionId={selectedSessionId || undefined}
                  patientName={selectedPatient?.name}
                  sessionDate={sessionDate}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* Helper text - Review note warning */}
          <div className="px-4 py-2 bg-muted/30 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-amber-500">⚠</span>
              <span>Review your note before use to ensure it accurately represents the visit</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// Helper function to generate chart prep content
function generateChartPrepContent(
  session: Session | null | undefined, 
  context: string, 
  transcript: string,
  patient: Patient | null
): string {
  const patientInfo = patient ? `
**Patient Information:**
- Name: ${patient.name}
${patient.partnerFirstName ? `- Partner: ${patient.partnerFirstName} ${patient.partnerLastName}` : ''}
${patient.referringPhysicianName ? `- Referring Physician: Dr. ${patient.referringPhysicianName}` : ''}
` : '';

  const sessionInfo = session ? `
**Previous Session Summary:**
- Date: ${format(new Date(session.date), "MMMM d, yyyy")}
- Notes: ${session.notes?.map(n => n.content).join('\n') || 'No notes available'}
` : '';

  const transcriptInfo = transcript ? `
**Previous Transcript:**
${transcript}
` : '';

  const contextInfo = context ? `
**Additional Context:**
${context}
` : '';

  return `# Pre-Visit Chart Preparation

${patientInfo}
${sessionInfo}
${transcriptInfo}
${contextInfo}

**Preparation Checklist:**
- [ ] Review patient history
- [ ] Check recent lab results
- [ ] Review previous visit notes
- [ ] Prepare discussion points
- [ ] Note any pending referrals

**Key Points for Today's Visit:**
- Follow up on previous concerns
- Review treatment progress
- Address any new symptoms or concerns
- Update care plan as needed
`.trim();
}

export default ChartPrep;