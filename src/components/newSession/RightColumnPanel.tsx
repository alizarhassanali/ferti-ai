import { useState, useRef, useCallback } from 'react';
import { Plus, X, FileText, ChevronDown, Copy, Undo, Redo, MoreHorizontal, Loader2, AlertCircle, Bold, Italic, List, Paperclip, Printer, FileDown, Send, PenLine, CheckCircle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { NoteTab as NoteTabType } from '@/types/session';
import { useToast } from '@/hooks/use-toast';
import { availableTemplates } from '@/data/templates';
import { useLetters } from '@/contexts/LettersContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
];

interface ExtendedTabState {
  language: string;
  undoStack: string[];
  redoStack: string[];
}

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
  sessionId?: string;
  patientName?: string;
  sessionDate?: Date;
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
  sessionId,
  patientName,
  sessionDate,
}: RightColumnPanelProps) => {
  const { toast } = useToast();
  const { createLetter, getLetterBySessionId } = useLetters();
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [showNoContentWarning, setShowNoContentWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Per-tab state for language and undo/redo history
  const [tabStates, setTabStates] = useState<Record<string, ExtendedTabState>>(() => {
    const initial: Record<string, ExtendedTabState> = {};
    noteTabs.forEach(tab => {
      initial[tab.id] = {
        language: 'en',
        undoStack: [],
        redoStack: [],
      };
    });
    return initial;
  });
  
  const activeTab = noteTabs.find(t => t.id === activeNoteTabId) || noteTabs[0];
  const currentTemplateId = activeTab?.templateId || '';
  const currentTabState = tabStates[activeNoteTabId] || { language: 'en', undoStack: [], redoStack: [] };
  const selectedTemplate = availableTemplates.find(t => t.id === currentTemplateId);
  
  // Letter workflow
  const existingLetter = sessionId ? getLetterBySessionId(sessionId) : undefined;
  const hasGeneratedContent = activeTab?.content && activeTab.content.trim().length > 0;

  const handleMarkReviewed = () => {
    toast({
      title: "Note reviewed",
      description: "The note has been marked as reviewed.",
    });
  };


  const handleApproveAndSendToLetters = () => {
    if (activeTab?.content && sessionId) {
      createLetter({
        sessionId,
        patientName: patientName || 'Unknown Patient',
        sessionDate: sessionDate || new Date(),
        templateType: selectedTemplate?.name || 'Clinical Note',
        content: activeTab.content,
      });
      toast({
        title: "Approved & sent to Letters",
        description: "The note has been approved and sent to admin for dispatch.",
      });
    }
  };

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
    setShowNoContentWarning(false);
    
    // Always trigger generation - demo content will be used if no transcript/context
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

  const updateTabContent = useCallback((content: string) => {
    // Push current content to undo stack before updating
    const currentContent = activeTab?.content || '';
    if (currentContent !== content) {
      setTabStates(prev => ({
        ...prev,
        [activeNoteTabId]: {
          ...prev[activeNoteTabId],
          undoStack: [...(prev[activeNoteTabId]?.undoStack || []), currentContent],
          redoStack: [], // Clear redo stack on new edit
        },
      }));
    }
    
    const newTabs = noteTabs.map(t =>
      t.id === activeNoteTabId ? { ...t, content } : t
    );
    onNoteTabsChange(newTabs);
  }, [activeNoteTabId, activeTab?.content, noteTabs, onNoteTabsChange]);

  const handleUndo = useCallback(() => {
    const { undoStack } = currentTabState;
    if (undoStack.length === 0) return;
    
    const previousContent = undoStack[undoStack.length - 1];
    const currentContent = activeTab?.content || '';
    
    setTabStates(prev => ({
      ...prev,
      [activeNoteTabId]: {
        ...prev[activeNoteTabId],
        undoStack: undoStack.slice(0, -1),
        redoStack: [...(prev[activeNoteTabId]?.redoStack || []), currentContent],
      },
    }));
    
    const newTabs = noteTabs.map(t =>
      t.id === activeNoteTabId ? { ...t, content: previousContent } : t
    );
    onNoteTabsChange(newTabs);
  }, [activeNoteTabId, activeTab?.content, currentTabState, noteTabs, onNoteTabsChange]);

  const handleRedo = useCallback(() => {
    const { redoStack } = currentTabState;
    if (redoStack.length === 0) return;
    
    const nextContent = redoStack[redoStack.length - 1];
    const currentContent = activeTab?.content || '';
    
    setTabStates(prev => ({
      ...prev,
      [activeNoteTabId]: {
        ...prev[activeNoteTabId],
        undoStack: [...(prev[activeNoteTabId]?.undoStack || []), currentContent],
        redoStack: redoStack.slice(0, -1),
      },
    }));
    
    const newTabs = noteTabs.map(t =>
      t.id === activeNoteTabId ? { ...t, content: nextContent } : t
    );
    onNoteTabsChange(newTabs);
  }, [activeNoteTabId, activeTab?.content, currentTabState, noteTabs, onNoteTabsChange]);

  const handleLanguageChange = (langCode: string) => {
    setTabStates(prev => ({
      ...prev,
      [activeNoteTabId]: {
        ...prev[activeNoteTabId],
        language: langCode,
      },
    }));
    toast({
      title: "Language updated",
      description: `Output language set to ${languages.find(l => l.code === langCode)?.name}`,
    });
  };

  const canUndo = currentTabState.undoStack.length > 0;
  const canRedo = currentTabState.redoStack.length > 0;

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
      {/* Right Pane Header Row - Context/Note toggle only */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        {/* Context / Note Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewChange('context')}
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
            onClick={() => onViewChange('note')}
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

      {/* Template Tabs Row - Only visible when Note is active */}
      {activeView === 'note' && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/20">
          <div className="flex items-center overflow-x-auto flex-1">
            {noteTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onActiveNoteTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-sm transition-colors whitespace-nowrap rounded-md mx-0.5",
                  tab.id === activeNoteTabId
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
      )}

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

          {/* Actions Menu - Streamlined */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-popover">
              <DropdownMenuItem onClick={handleExportPDF}>
                <FileDown className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-auto flex items-center gap-1">
            {/* Language Selector */}
            <Select value={currentTabState.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-auto h-8 gap-1 border-0 bg-transparent hover:bg-muted px-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{languages.find(l => l.code === currentTabState.language)?.flag}</span>
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo"
            >
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
              className="flex-1 min-h-[150px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base bg-white"
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
              <>
                <Textarea
                  value={activeTab?.content || ''}
                  onChange={(e) => updateTabContent(e.target.value)}
                  placeholder="Select a template above to generate a note"
                  className="flex-1 min-h-[300px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed whitespace-pre-wrap"
                />
                
                {/* Letter Actions */}
                {hasGeneratedContent && (
                  <div className="mt-4 pt-4 border-t border-border">
                    {existingLetter ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {existingLetter.status === 'sent' ? 'Sent' : 'Approved & pending'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          This note has been sent to Letters
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2" onClick={handleMarkReviewed}>
                          <CheckCircle className="h-4 w-4" />
                          Reviewed
                        </Button>
                        {selectedTemplate?.type === 'Letter' && (
                          <Button size="sm" className="gap-2" onClick={handleApproveAndSendToLetters}>
                            <Send className="h-4 w-4" />
                            Send to Letters
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
