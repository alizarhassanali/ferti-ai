import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { NoteTab as NoteTabType } from '@/types/session';
import { RightColumnPanel } from './RightColumnPanel';

type ViewMode = 'transcript' | 'context' | 'note';

interface TwoColumnLayoutProps {
  // Transcript
  transcriptContent: string;
  onTranscriptChange: (content: string) => void;
  isRecording: boolean;
  
  // Context
  contextContent: string;
  onContextChange: (content: string) => void;
  
  // Note tabs
  noteTabs: NoteTabType[];
  activeNoteTabId: string;
  onNoteTabsChange: (tabs: NoteTabType[]) => void;
  onActiveNoteTabChange: (tabId: string) => void;
  
  // Generation
  isGenerating: boolean;
  hasContent: boolean;
  onGenerate: (templateId: string) => void;
}

export const TwoColumnLayout = ({
  transcriptContent,
  onTranscriptChange,
  isRecording,
  contextContent,
  onContextChange,
  noteTabs,
  activeNoteTabId,
  onNoteTabsChange,
  onActiveNoteTabChange,
  isGenerating,
  hasContent,
  onGenerate,
}: TwoColumnLayoutProps) => {
  const [leftView] = useState<'transcript'>('transcript');
  const [rightView, setRightView] = useState<'context' | 'note'>('context');

  return (
    <div className="flex flex-col h-full">
      {/* View Mode Buttons Row */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
        {/* Left column control */}
        <button
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            leftView === 'transcript'
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          Transcript
        </button>
        
        <div className="w-px h-5 bg-border mx-1" />
        
        {/* Right column controls */}
        <button
          onClick={() => setRightView('context')}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            rightView === 'context'
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          Context
        </button>
        <button
          onClick={() => setRightView('note')}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            rightView === 'note'
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          Note
        </button>
        
        {isRecording && (
          <div className="ml-auto flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm text-muted-foreground">Recording...</span>
          </div>
        )}
      </div>

      {/* Two Column Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Column - Transcript */}
          <ResizablePanel defaultSize={40} minSize={25}>
            <div className="flex flex-col h-full border-r border-border">
              {/* Transcript Content - Plain text, no toolbar */}
              <div className="flex-1 overflow-auto p-4">
                <Textarea
                  value={transcriptContent}
                  onChange={(e) => onTranscriptChange(e.target.value)}
                  placeholder="Your transcript will appear here as you speak or record..."
                  className="w-full h-full min-h-[300px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed"
                />
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Column - Context/Note */}
          <ResizablePanel defaultSize={60} minSize={35}>
            <RightColumnPanel
              activeView={rightView}
              onViewChange={setRightView}
              contextContent={contextContent}
              onContextChange={onContextChange}
              noteTabs={noteTabs}
              activeNoteTabId={activeNoteTabId}
              onNoteTabsChange={onNoteTabsChange}
              onActiveNoteTabChange={onActiveNoteTabChange}
              isGenerating={isGenerating}
              hasContent={hasContent}
              onGenerate={onGenerate}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
