import { useState, useRef } from 'react';
import { Bold, Italic, List, FileText, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { NoteTab as NoteTabType } from '@/types/session';
import { RightColumnPanel } from './RightColumnPanel';

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
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Left Column - Transcript */}
      <ResizablePanel defaultSize={40} minSize={25}>
        <div className="flex flex-col h-full border-r border-border">
          {/* Transcript Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
              <span className="text-sm font-medium">Transcript</span>
            </div>
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
          
          {/* Transcript Toolbar */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-border">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Transcript Content */}
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
      
      {/* Right Column - Note Tabs + Context/Note toggle */}
      <ResizablePanel defaultSize={60} minSize={35}>
        <RightColumnPanel
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
  );
};
