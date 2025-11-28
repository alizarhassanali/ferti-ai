import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Plus, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MedicalContextPanelProps {
  medicalContext: string;
  onMedicalContextChange: (value: string) => void;
}

export const MedicalContextPanel = ({ medicalContext, onMedicalContextChange }: MedicalContextPanelProps) => {
  const [activeTemplate, setActiveTemplate] = useState('1');
  const [templates, setTemplates] = useState([
    { id: '1', name: 'Untitled 1' },
    { id: '2', name: 'Untitled 2' }
  ]);

  const handleAddTemplate = () => {
    const newId = String(templates.length + 1);
    setTemplates([...templates, { id: newId, name: `Untitled ${newId}` }]);
    setActiveTemplate(newId);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Template Tabs and File Button */}
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
          className="w-full h-[calc(100%-80px)] resize-none"
        />
      </div>
    </div>
  );
};
