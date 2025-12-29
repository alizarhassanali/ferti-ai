import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Plus, X, Mail, FileDown, Pencil, Copy, FileText, Maximize2, Minimize2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog';

interface MedicalContextPanelProps {
  medicalContext: string;
  onMedicalContextChange: (value: string) => void;
}

export const MedicalContextPanel = ({ medicalContext, onMedicalContextChange }: MedicalContextPanelProps) => {
  const { toast } = useToast();
  const [activeTemplate, setActiveTemplate] = useState('1');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [templates, setTemplates] = useState([
    { id: '1', name: 'Untitled 1' },
    { id: '2', name: 'Untitled 2' }
  ]);

  const handleAddTemplate = () => {
    const newId = String(templates.length + 1);
    setTemplates([...templates, { id: newId, name: `Untitled ${newId}` }]);
    setActiveTemplate(newId);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(medicalContext);
    toast({ title: "Copied to clipboard" });
  };

  const handleSendEmail = () => {
    toast({ title: "Email feature coming soon" });
  };

  const handleSaveAsFile = () => {
    toast({ title: "Save feature coming soon" });
  };

  const handleEdit = () => {
    toast({ title: "Edit mode activated" });
  };

  const handleSaveAsPDF = () => {
    toast({ title: "PDF export coming soon" });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Template Tabs and Actions */}
      <div className="flex items-center border-b border-border bg-background">
        <Tabs value={activeTemplate} onValueChange={setActiveTemplate} className="flex-1">
          <TabsList className="w-full h-auto justify-start rounded-none bg-transparent border-0 p-0">
            {templates.map((template) => (
              <TabsTrigger
                key={template.id}
                value={template.id}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
              >
                {template.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 flex-shrink-0"
          onClick={() => setIsFullscreen(true)}
          title="Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 flex-shrink-0"
          onClick={handleAddTemplate}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 flex-shrink-0">
          <Paperclip className="h-4 w-4" />
          File
        </Button>
      </div>

      {/* Medical Context Input */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-2">
            Input any additional medical context you want included as part of your note.
          </p>
          <p className="text-xs text-muted-foreground">
            Ex: pt 35yoM, Hgb: 13.8, RBC: 4.5, WBC: 4,500
          </p>
        </div>
        
        <Textarea
          value={medicalContext}
          onChange={(e) => onMedicalContextChange(e.target.value)}
          placeholder="Enter patient information, vitals, lab results, etc..."
          className="w-full h-[calc(100%-140px)] resize-none"
        />
        
        {/* Action Icons */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyText}
            className="h-8 w-8"
            title="Copy text"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSendEmail}
            className="h-8 w-8"
            title="Send as email"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveAsFile}
            className="h-8 w-8"
            title="Save as file"
          >
            <FileDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEdit}
            className="h-8 w-8"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveAsPDF}
            className="h-8 w-8"
            title="Save as PDF"
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Medical Context - {templates.find(t => t.id === activeTemplate)?.name}</DialogTitle>
          </DialogHeader>
          <DialogBody className="p-0">
            <Textarea
              value={medicalContext}
              onChange={(e) => onMedicalContextChange(e.target.value)}
              placeholder="Enter patient information, vitals, lab results, etc..."
              className="w-full h-full min-h-[60vh] resize-none text-base border-0 focus-visible:ring-0"
            />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
};
