import { FileText, Mail, FileCode, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateTypeCard } from '../TemplateTypeCard';
import { TemplateType } from '@/types/template';

interface TypeSelectionProps {
  onSelectType: (type: TemplateType) => void;
  onCancel: () => void;
}

const templateTypes: { type: TemplateType; icon: typeof FileText; title: string; description: string }[] = [
  {
    type: 'Note',
    icon: FileText,
    title: 'Note',
    description: 'Clinical notes, SOAP notes, progress notes',
  },
  {
    type: 'Document',
    icon: ClipboardList,
    title: 'Document',
    description: 'General medical documents and forms',
  },
  {
    type: 'Letter',
    icon: Mail,
    title: 'Letter',
    description: 'Referral letters, GP letters, correspondence',
  },
  {
    type: 'Chart Prep',
    icon: FileCode,
    title: 'Chart Prep',
    description: 'Pre-visit preparation templates',
  },
];

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

      <div className="grid grid-cols-2 gap-4">
        {templateTypes.map(({ type, icon, title, description }) => (
          <TemplateTypeCard
            key={type}
            icon={icon}
            title={title}
            description={description}
            isSelected={false}
            onClick={() => onSelectType(type)}
          />
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
