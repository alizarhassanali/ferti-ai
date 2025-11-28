import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip } from 'lucide-react';

interface MedicalContextPanelProps {
  medicalContext: string;
  onMedicalContextChange: (value: string) => void;
}

export const MedicalContextPanel = ({ medicalContext, onMedicalContextChange }: MedicalContextPanelProps) => {
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-end px-4 py-3 border-b border-border">
        <Button variant="ghost" size="sm" className="gap-2">
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
