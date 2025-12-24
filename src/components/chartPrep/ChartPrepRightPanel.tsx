import { useState, useRef } from 'react';
import { FileText, Copy, Undo, Redo, MoreHorizontal, Loader2, Bold, Italic, List, Paperclip, Mail, Printer, FileDown, Send, PenLine, Download, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { NoteTab as NoteTabType } from '@/types/session';
import { useToast } from '@/hooks/use-toast';

interface AttachedFile {
  id: string;
  name: string;
  size: number;
}

interface ChartPrepRightPanelProps {
  contextContent: string;
  onContextChange: (content: string) => void;
  noteTabs: NoteTabType[];
  activeNoteTabId: string;
  onNoteTabsChange: (tabs: NoteTabType[]) => void;
  onActiveNoteTabChange: (tabId: string) => void;
  isGenerating: boolean;
  hasContent: boolean;
  onGenerate: () => void;
  sessionId?: string;
  patientName?: string;
  sessionDate?: Date;
}

export const ChartPrepRightPanel = ({
  contextContent,
  onContextChange,
  noteTabs,
  activeNoteTabId,
  onNoteTabsChange,
  onActiveNoteTabChange,
  isGenerating,
  hasContent,
  onGenerate,
  sessionId,
  patientName,
  sessionDate,
}: ChartPrepRightPanelProps) => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<'context' | 'note'>('context');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const activeTab = noteTabs.find(t => t.id === activeNoteTabId) || noteTabs[0];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: AttachedFile[] = Array.from(files).map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const updateTabContent = (content: string) => {
    const newTabs = noteTabs.map(t =>
      t.id === activeNoteTabId ? { ...t, content } : t
    );
    onNoteTabsChange(newTabs);
  };

  const handleCopyAll = () => {
    if (activeTab?.content) {
      navigator.clipboard.writeText(activeTab.content);
      toast({
        title: "Copied to clipboard",
        description: "Chart prep content has been copied.",
      });
    } else {
      toast({
        title: "Nothing to copy",
        description: "The note is empty.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (activeTab?.content) {
      const blob = new Blob([activeTab.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${patientName || 'chart-prep'}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded", description: "Chart prep has been downloaded." });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    toast({
      title: "Email sent (stub)",
      description: "Email functionality will be available soon.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Row - Context/Note toggle */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveView('context')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all",
              activeView === 'context'
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            Context
          </button>
          <button
            onClick={() => setActiveView('note')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all",
              activeView === 'note'
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <PenLine className="h-3.5 w-3.5" />
            Note
          </button>
        </div>
      </div>

      {/* Note Tab Header - Fixed template, no switching */}
      {activeView === 'note' && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/20">
          <div className="flex items-center overflow-x-auto flex-1">
            <div className="flex items-center gap-2 px-3 py-1.5 text-sm bg-background text-foreground shadow-sm rounded-md">
              <FileText className="h-3.5 w-3.5" />
              <span>Chart Prep</span>
            </div>
          </div>
        </div>
      )}

      {/* Note Actions Row - Only in Note view */}
      {activeView === 'note' && (
        <div className="flex items-center gap-3 px-4 py-2 border-b border-border">
          {/* Fixed template indicator - no dropdown */}
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-md border border-amber-200 dark:border-amber-800">
            <span>📋</span>
            <span className="font-medium">Chart Prep Template</span>
          </div>

          {/* Generate button */}
          <Button
            variant="default"
            size="sm"
            className="gap-2 h-8"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Chart Prep
              </>
            )}
          </Button>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-popover">
              <DropdownMenuItem onClick={handleCopyAll}>
                <Copy className="h-4 w-4 mr-2" />
                Copy all text
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSendEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Send as email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FileDown className="h-4 w-4 mr-2" />
                  Export as
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-popover">
                  <DropdownMenuItem onClick={handleDownload}>
                    Text file
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Coming soon", description: "PDF export will be available soon." })}>
                    PDF
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-auto flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleCopyAll} 
              disabled={!activeTab?.content}
              title="Copy note"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Panel Content */}
      <div className="flex-1 overflow-auto">
        {activeView === 'context' ? (
          // Context Panel
          <div className="flex flex-col h-full p-4">
            {/* Toolbar */}
            <div className="flex items-center gap-1 mb-3 pb-3 border-b border-border">
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

            {/* Text Area */}
            <Textarea
              value={contextContent}
              onChange={(e) => onContextChange(e.target.value)}
              placeholder="Add any additional context for chart prep (e.g., reason for visit, specific areas to focus on)..."
              className="flex-1 min-h-[150px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base bg-white"
            />

            {/* Example hint */}
            <p className="text-sm text-muted-foreground mt-2">
              Ex: Follow-up for IVF cycle, review day 3 hormone levels
            </p>

            {/* File attachment area */}
            <div className="mt-4 pt-4 border-t border-border">
              <div
                className={cn(
                  "border-2 border-dashed border-border rounded-lg p-4 text-center",
                  "hover:border-primary/50 transition-colors cursor-pointer"
                )}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files;
                  if (files.length > 0) {
                    const newFiles: AttachedFile[] = Array.from(files).map(file => ({
                      id: crypto.randomUUID(),
                      name: file.name,
                      size: file.size,
                    }));
                    setAttachedFiles(prev => [...prev, ...newFiles]);
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                  <span className="text-sm">Drag and drop files here or click to attach</span>
                </div>
              </div>

              {/* Attached files list */}
              {attachedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {attachedFiles.map(file => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Note Panel - Chart Prep content
          <div className="flex flex-col h-full">
            {/* Loading state */}
            {isGenerating && (
              <div className="flex items-center justify-center p-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating chart prep...</span>
                </div>
              </div>
            )}

            {/* Note content */}
            {!isGenerating && (
              <div className="flex-1 p-4">
                <Textarea
                  value={activeTab?.content || ''}
                  onChange={(e) => updateTabContent(e.target.value)}
                  placeholder="Select a session and click 'Generate Chart Prep' to create a pre-visit summary..."
                  className="w-full h-full min-h-[400px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed bg-white"
                />
              </div>
            )}

            {/* Download button at bottom */}
            {activeTab?.content && !isGenerating && (
              <div className="p-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  Download Chart Prep
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
