import { FileText, FileType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateTypeCard } from '../TemplateTypeCard';
import { TemplateCreationType } from '@/types/template';

interface TypeSelectionProps {
  selectedType: TemplateCreationType;
  onSelectType: (type: TemplateCreationType) => void;
  onContinue: () => void;
  onCancel: () => void;
}

export const TypeSelection = ({
  selectedType,
  onSelectType,
  onContinue,
  onCancel,
}: TypeSelectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          What type of template would you like to create?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TemplateTypeCard
          icon={FileText}
          title="Note or document"
          description="Create a freeform template using text instructions and formatting"
          isSelected={selectedType === 'note'}
          onClick={() => onSelectType('note')}
        />
        
        <TemplateTypeCard
          icon={FileType}
          title="Fill a PDF form"
          description="Create a template using a PDF form that auto-fills form fields"
          isSelected={selectedType === 'pdf'}
          onClick={() => onSelectType('pdf')}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onContinue}
          disabled={!selectedType}
          className="bg-[hsl(25,35%,25%)] hover:bg-[hsl(25,35%,20%)] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
