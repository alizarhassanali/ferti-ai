import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateTypeCard } from '../TemplateTypeCard';

interface TypeSelectionProps {
  onSelectType: () => void;
  onCancel: () => void;
}

export const TypeSelection = ({
  onSelectType,
  onCancel,
}: TypeSelectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          What type of template would you like to create?
        </h2>
      </div>

      <div className="flex justify-center">
        <TemplateTypeCard
          icon={FileText}
          title="Note or document"
          description="Create a freeform template using text instructions and formatting"
          isSelected={false}
          onClick={onSelectType}
        />
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
