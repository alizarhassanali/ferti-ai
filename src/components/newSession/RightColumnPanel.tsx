import { useState, useRef } from 'react';
import { Plus, X, FileText, ChevronDown, Copy, Undo, Redo, MoreHorizontal, Loader2, AlertCircle, Bold, Italic, List, Paperclip, Mail, Printer, FileDown, Send, PenLine } from 'lucide-react';
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
import { availableTemplates } from '@/data/templates';

interface AttachedFile {
  id: string;
  name: string;
  size: number;
}

interface RightColumnPanelProps {
  activeView: 'context' | 'note';
  onViewChange: (view: 'context' | 'note') => void;
  contextContent: string;
  onContextChange: (content: string) => void;
  noteTabs: NoteTabType[];
  activeNoteTabId: string;
  onNoteTabsChange: (tabs: NoteTabType[]) => void;
  onActiveNoteTabChange: (tabId: string) => void;
  isGenerating: boolean;
  hasContent: boolean;
  onGenerate: (templateId: string) => void;
}

export const RightColumnPanel = ({
  activeView,
  onViewChange,
  contextContent,
  onContextChange,
  noteTabs,
  activeNoteTabId,
  onNoteTabsChange,
  onActiveNoteTabChange,
  isGenerating,
  hasContent,
  onGenerate,
}: RightColumnPanelProps) => {
  const { toast } = useToast();
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [showNoContentWarning, setShowNoContentWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const activeTab = noteTabs.find(t => t.id === activeNoteTabId) || noteTabs[0];
  const currentTemplateId = activeTab?.templateId || '';
  const selectedTemplate = availableTemplates.find(t => t.id === currentTemplateId);

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

  const handleTemplateSelect = (templateId: string) => {
    // Update the tab's templateId
    const template = availableTemplates.find(t => t.id === templateId);
    const newTabs = noteTabs.map(t =>
      t.id === activeNoteTabId ? { ...t, templateId, title: template?.name || t.title } : t
    );
    onNoteTabsChange(newTabs);

    if (!hasContent) {
      setShowNoContentWarning(true);
      return;
    }
    setShowNoContentWarning(false);
    // Trigger generation with this template
    onGenerate(templateId);
  };

  const addNewTab = () => {
    const newTab: NoteTabType = {
      id: crypto.randomUUID(),
      title: `Untitled ${noteTabs.length + 1}`,
      templateId: '',
      content: '',
    };
    onNoteTabsChange([...noteTabs, newTab]);
    onActiveNoteTabChange(newTab.id);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (noteTabs.length === 1) {
      toast({
        title: "Cannot close",
        description: "You must have at least one note tab.",
        variant: "destructive",
      });
      return;
    }
    const newTabs = noteTabs.filter(t => t.id !== tabId);
    onNoteTabsChange(newTabs);
    if (activeNoteTabId === tabId) {
      onActiveNoteTabChange(newTabs[0].id);
    }
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
        title: "Note copied to clipboard",
        description: "The full note content has been copied.",
      });
    } else {
      toast({
        title: "Nothing to copy",
        description: "The note is empty.",
        variant: "destructive",
      });
    }
  };

  const handleSendEmail = () => {
    toast({
      title: "Email sent (stub)",
      description: "Email functionality will be available soon.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    toast({
      title: "Exporting as PDF",
      description: "PDF export functionality will be available soon.",
    });
  };

  const handleExportWord = () => {
    toast({
      title: "Exporting as Word",
      description: "Word document export functionality will be available soon.",
    });
  };

  const handleSendToEMR = () => {
    toast({
      title: "Sent to EMR (stub)",
      description: "EMR integration will be available soon.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Right Pane Header Row - Context/Note toggle + Template tabs */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
        {/* Context / Note Toggle */}
        <div className="flex items-center gap-1 mr-3">
          <button
            onClick={() => onViewChange('context')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
              activeView === 'context'
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            Context
          </button>
          <button
            onClick={() => onViewChange('note')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
              activeView === 'note'
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <PenLine className="h-3.5 w-3.5" />
            Note
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-border" />

        {/* Template Tabs - Always visible */}
        <div className="flex items-center overflow-x-auto flex-1">
          {noteTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                onActiveNoteTabChange(tab.id);
                if (activeView !== 'note') {
                  onViewChange('note');
                }
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm transition-colors whitespace-nowrap rounded-md mx-0.5",
                tab.id === activeNoteTabId && activeView === 'note'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="max-w-[120px] truncate">{tab.title}</span>
              <button
                onClick={(e) => closeTab(tab.id, e)}
                className="ml-1 p-0.5 rounded hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </button>
            </button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 shrink-0"
            onClick={addNewTab}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Template Selection and Actions Row - Only in Note view */}
      {activeView === 'note' && (
        <div className="flex items-center gap-3 px-4 py-2 border-b border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-8" disabled={isGenerating}>
                {selectedTemplate ? (
                  <>
                    <span>{selectedTemplate.icon}</span>
                    {selectedTemplate.name}
                    <ChevronDown className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Select a template
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-popover">
              {availableTemplates.map(template => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="flex items-center gap-2"
                >
                  <span>{template.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{template.name}</span>
                    <span className="text-xs text-muted-foreground">{template.type}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                  <DropdownMenuItem onClick={handleExportPDF}>
                    PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportWord}>
                    Word document
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSendToEMR}>
                <Send className="h-4 w-4 mr-2" />
                Send to EMR
              </DropdownMenuItem>
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
              placeholder="Input any additional medical context you want included as part of your note."
              className="flex-1 min-h-[150px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base"
            />

            {/* Example hint */}
            <p className="text-sm text-muted-foreground mt-2">
              Ex: pt 35yoM, Hgb: 13.8, RBC: 4.5, WBC: 4,500
            </p>

            {/* File attachment area - inside Context panel only */}
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
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Note Panel
          <div className="flex flex-col h-full p-4">
            {/* Loading State */}
            {isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-muted-foreground">Generating note...</span>
              </div>
            )}

            {/* No Content Warning */}
            {!isGenerating && showNoContentWarning && !activeTab?.content && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
                <AlertCircle className="h-10 w-10 text-amber-500" />
                <div>
                  <p className="font-medium text-foreground">No content to generate from</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please add context or a transcript first.
                  </p>
                </div>
              </div>
            )}

            {/* Note textarea - show when not generating and either has content or no warning */}
            {!isGenerating && (!showNoContentWarning || activeTab?.content) && (
              <Textarea
                value={activeTab?.content || ''}
                onChange={(e) => updateTabContent(e.target.value)}
                placeholder="Select a template above to generate a note"
                className="flex-1 min-h-[300px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed whitespace-pre-wrap"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
