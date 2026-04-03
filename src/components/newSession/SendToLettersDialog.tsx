import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Send } from 'lucide-react';

interface SendToLettersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  templateType: string;
  onConfirm: (doctorNote?: string) => void;
}

export const SendToLettersDialog = ({
  open,
  onOpenChange,
  patientName,
  templateType,
  onConfirm,
}: SendToLettersDialogProps) => {
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    onConfirm(note.trim() || undefined);
    setNote('');
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setNote('');
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Send to Letters</DialogTitle>
          <DialogDescription>
            Sending <span className="font-medium text-foreground">{templateType}</span> for{' '}
            <span className="font-medium text-foreground">{patientName}</span> to the Letters section for dispatch.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <label className="text-sm font-medium text-foreground">
            Add a note for the reviewer (optional)
          </label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="E.g. Please verify the GP address before sending..."
            className="min-h-[100px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            This note will be visible to the nurse or care coordinator reviewing the letter.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button className="gap-2" onClick={handleConfirm}>
            <Send className="h-4 w-4" />
            Send to Letters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
