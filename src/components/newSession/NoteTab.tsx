import { Plus, X, FileText, ChevronDown, Copy, Undo, Redo, MoreHorizontal, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { NoteTab as NoteTabType } from '@/types/session';
import { useToast } from '@/hooks/use-toast';
import { TEMPLATES } from '@/data/demoContent';
import { useState } from 'react';

interface NoteTabProps {
  tabs: NoteTabType[];
  activeTabId: string;
  onTabsChange: (tabs: NoteTabType[]) => void;
  onActiveTabChange: (tabId: string) => void;
  isGenerating: boolean;
  hasContent: boolean;
  onGenerate: (templateId: string) => void;
}

export const NoteTab = ({
  tabs,
  activeTabId,
  onTabsChange,
  onActiveTabChange,
  isGenerating,
  hasContent,
  onGenerate,
}: NoteTabProps) => {
  const { toast } = useToast();
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const [showNoContentWarning, setShowNoContentWarning] = useState(false);

  // Get the current tab's template ID
  const currentTemplateId = activeTab?.templateId || '';

  const handleTemplateSelect = (templateId: string) => {
    // Update the tab's templateId
    const newTabs = tabs.map(t =>
      t.id === activeTabId ? { ...t, templateId } : t
    );
    onTabsChange(newTabs);

    if (!hasContent) {
      setShowNoContentWarning(true);
      return;
    }
    setShowNoContentWarning(false);
    // Trigger generation with this template
    setTimeout(() => onGenerate(templateId), 100);
  };

  const addNewTab = () => {
    const newTab: NoteTabType = {
      id: crypto.randomUUID(),
      title: `Untitled ${tabs.length + 1}`,
      templateId: '',
      content: '',
    };
    onTabsChange([...tabs, newTab]);
    onActiveTabChange(newTab.id);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      toast({
        title: "Cannot close",
        description: "You must have at least one note tab.",
        variant: "destructive",
      });
      return;
    }
    const newTabs = tabs.filter(t => t.id !== tabId);
    onTabsChange(newTabs);
    if (activeTabId === tabId) {
      onActiveTabChange(newTabs[0].id);
    }
  };

  const updateTabContent = (content: string) => {
    const newTabs = tabs.map(t =>
      t.id === activeTabId ? { ...t, content } : t
    );
    onTabsChange(newTabs);
  };

  const handleCopy = () => {
    if (activeTab?.content) {
      navigator.clipboard.writeText(activeTab.content);
      toast({
        title: "Copied",
        description: "Note content copied to clipboard.",
      });
    }
  };

  const selectedTemplate = TEMPLATES.find(t => t.id === currentTemplateId);

  return (
    <div className="flex flex-col h-full">
      {/* Sub-tabs */}
      <div className="flex items-center border-b border-border px-2 bg-muted/30">
        <div className="flex items-center overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onActiveTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm border-b-2 transition-colors whitespace-nowrap",
                tab.id === activeTabId
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{tab.title}</span>
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
            className="h-8 w-8 p-0 shrink-0"
            onClick={addNewTab}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Note content area */}
      <div className="flex-1 flex flex-col p-4">
        {/* Template selection toolbar */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2" disabled={isGenerating}>
                {selectedTemplate ? (
                  <>
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
            <DropdownMenuContent className="w-64">
              {TEMPLATES.map(template => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="flex flex-col items-start"
                >
                  <span className="font-medium">{template.name}</span>
                  <span className="text-xs text-muted-foreground">{template.description}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Send via email</DropdownMenuItem>
              <DropdownMenuItem>Save to EHR</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleCopy} disabled={!activeTab?.content}>
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
                Please add patient information in the Context tab or record a transcript first.
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
            className="flex-1 min-h-[300px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed"
          />
        )}
      </div>
    </div>
  );
};
