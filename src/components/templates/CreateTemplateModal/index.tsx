import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { BlankTemplateEditor } from './BlankTemplateEditor';
import { CreateModalStep, TemplateCreationType } from '@/types/template';
import { useToast } from '@/hooks/use-toast';

interface CreateTemplateModalProps {
  isOpen: boolean;
  step: CreateModalStep;
  selectedType: TemplateCreationType;
  onClose: () => void;
  onStepChange: (step: CreateModalStep) => void;
  onTypeSelect: (type: TemplateCreationType) => void;
}

export const CreateTemplateModal = ({
  isOpen,
  onClose,
}: CreateTemplateModalProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Template saved',
      description: 'Your template has been saved successfully.',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl p-0">
        <BlankTemplateEditor onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
};
