import { FileText, AudioWaveform, Mic, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecordingMode, MainTab, NoteTab as NoteTabType } from '@/types/session';
import { ContextTab } from './ContextTab';
import { TranscriptTab } from './TranscriptTab';
import { DictationTab } from './DictationTab';
import { NoteTab } from './NoteTab';

interface MainTabsContainerProps {
  recordingMode: RecordingMode;
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  contextContent: string;
  onContextChange: (content: string) => void;
  transcriptContent: string;
  onTranscriptChange: (content: string) => void;
  dictationContent: string;
  onDictationChange: (content: string) => void;
  isRecording: boolean;
  smartDictation: boolean;
  onSmartDictationChange: (enabled: boolean) => void;
  noteTabs: NoteTabType[];
  activeNoteTabId: string;
  onNoteTabsChange: (tabs: NoteTabType[]) => void;
  onActiveNoteTabChange: (tabId: string) => void;
  onLoadDemoContext?: () => void;
  selectedTemplateId: string;
  onTemplateChange: (templateId: string) => void;
  isGenerating: boolean;
  hasContent: boolean;
  onGenerate: () => void;
}

export const MainTabsContainer = ({
  recordingMode,
  activeTab,
  onTabChange,
  contextContent,
  onContextChange,
  transcriptContent,
  onTranscriptChange,
  dictationContent,
  onDictationChange,
  isRecording,
  smartDictation,
  onSmartDictationChange,
  noteTabs,
  activeNoteTabId,
  onNoteTabsChange,
  onActiveNoteTabChange,
  onLoadDemoContext,
  selectedTemplateId,
  onTemplateChange,
  isGenerating,
  hasContent,
  onGenerate,
}: MainTabsContainerProps) => {
  const isTranscribe = recordingMode === 'transcribe';
  const accentColor = isTranscribe ? 'text-emerald-600' : 'text-violet-600';
  const activeAccent = isTranscribe ? 'border-emerald-600' : 'border-violet-600';

  const tabs = [
    { id: 'context' as MainTab, label: 'Context', icon: FileText },
    isTranscribe
      ? { id: 'transcript' as MainTab, label: 'Transcript', icon: AudioWaveform }
      : { id: 'dictation' as MainTab, label: 'Dictation', icon: Mic },
    { id: 'note' as MainTab, label: 'Note', icon: PenLine },
  ];

  // Ensure activeTab is valid for current mode
  const currentActiveTab = 
    (isTranscribe && activeTab === 'dictation') ? 'transcript' :
    (!isTranscribe && activeTab === 'transcript') ? 'dictation' :
    activeTab;

  return (
    <div className="flex flex-col h-full">
      {/* Tab headers */}
      <div className="flex items-center border-b border-border px-4">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentActiveTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                isActive
                  ? `${activeAccent} ${accentColor}`
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {currentActiveTab === 'context' && (
          <ContextTab
            content={contextContent}
            onContentChange={onContextChange}
            onLoadDemo={onLoadDemoContext}
          />
        )}
        {currentActiveTab === 'transcript' && isTranscribe && (
          <TranscriptTab
            content={transcriptContent}
            onContentChange={onTranscriptChange}
            isRecording={isRecording}
          />
        )}
        {currentActiveTab === 'dictation' && !isTranscribe && (
          <DictationTab
            content={dictationContent}
            onContentChange={onDictationChange}
            isRecording={isRecording}
            smartDictation={smartDictation}
            onSmartDictationChange={onSmartDictationChange}
          />
        )}
        {currentActiveTab === 'note' && (
          <NoteTab
            tabs={noteTabs}
            activeTabId={activeNoteTabId}
            onTabsChange={onNoteTabsChange}
            onActiveTabChange={onActiveNoteTabChange}
            selectedTemplateId={selectedTemplateId}
            onTemplateChange={onTemplateChange}
            isGenerating={isGenerating}
            hasContent={hasContent}
            onGenerate={onGenerate}
          />
        )}
      </div>
    </div>
  );
};
