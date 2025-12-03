import { Plus, X, FileText, ChevronDown, Copy, Undo, Redo, MoreHorizontal } from 'lucide-react';
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

interface NoteTabProps {
  tabs: NoteTabType[];
  activeTabId: string;
  onTabsChange: (tabs: NoteTabType[]) => void;
  onActiveTabChange: (tabId: string) => void;
  selectedTemplateId: string;
  onTemplateChange: (templateId: string) => void;
  isGenerating: boolean;
}

export const NoteTab = ({
  tabs,
  activeTabId,
  onTabsChange,
  onActiveTabChange,
  selectedTemplateId,
  onTemplateChange,
  isGenerating,
}: NoteTabProps) => {
  const { toast } = useToast();
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

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

  const selectedTemplate = TEMPLATES.find(t => t.id === selectedTemplateId);

  return (
    <div className="flex flex-col h-full">
      {/* Sub-tabs */}
      <div className="flex items-center border-b border-border px-2 bg-muted/30 overflow-x-auto">
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
                  onClick={() => onTemplateChange(template.id)}
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

        {/* Note textarea */}
        <Textarea
          value={activeTab?.content || ''}
          onChange={(e) => updateTabContent(e.target.value)}
          placeholder="Select a template above, add content in Context or Transcript, then click Generate"
          className="flex-1 min-h-[300px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed"
        />
      </div>
    </div>
  );
};
