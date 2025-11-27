import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TypeSelection } from './TypeSelection';
import { TemplatePrompt } from './TemplatePrompt';
import { BlankTemplateEditor } from './BlankTemplateEditor';
import { ExistingNoteImport } from './ExistingNoteImport';
import { CreateModalStep, TemplateCreationType } from '@/types/template';
import { Button } from '@/components/ui/button';
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
  step,
  selectedType,
  onClose,
  onStepChange,
  onTypeSelect,
}: CreateTemplateModalProps) => {
  const { toast } = useToast();

  const handleContinue = () => {
    if (selectedType === 'note') {
      onStepChange('prompt');
    } else {
      toast({
        title: 'Coming soon',
        description: 'PDF form templates will be available in a future update.',
      });
    }
  };

  const handleSave = () => {
    toast({
      title: 'Template saved',
      description: 'Your template has been saved successfully.',
    });
    onClose();
  };

  const handleConvert = (content: string) => {
    console.log('Converting note:', content);
    toast({
      title: 'Template created',
      description: 'Your note has been converted to a template.',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={step === 'blank' ? 'max-w-7xl' : 'max-w-3xl'}>
        {step !== 'blank' && (
          <DialogHeader>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
        )}

        {step === 'type' && (
          <TypeSelection
            selectedType={selectedType}
            onSelectType={onTypeSelect}
            onContinue={handleContinue}
            onCancel={onClose}
          />
        )}

        {step === 'prompt' && (
          <TemplatePrompt
            onBack={() => onStepChange('type')}
            onBlankTemplate={() => onStepChange('blank')}
            onExistingNote={() => onStepChange('existing')}
          />
        )}

        {step === 'blank' && (
          <BlankTemplateEditor
            onBack={() => onStepChange('prompt')}
            onSave={handleSave}
          />
        )}

        {step === 'existing' && (
          <ExistingNoteImport
            onBack={() => onStepChange('prompt')}
            onConvert={handleConvert}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
