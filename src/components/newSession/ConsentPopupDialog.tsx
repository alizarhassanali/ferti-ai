import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConsentPopupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ConsentPopupDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: ConsentPopupDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-0">
          <DialogTitle>Verbal Consent Script</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4 text-sm text-muted-foreground">
          <p>
            Before we begin, I'd like to use a secure AI documentation tool to
            assist me. It works by listening to our conversation in real-time to
            help me draft your medical note.
          </p>
          <p>
            You would have received a disclosure document outlining this system.
            The system does not keep a permanent recording; the audio is
            processed into text and then automatically deleted once transcribed
            to text. This allows me to focus entirely on you instead of my
            computer screen or notepad.
          </p>
          <p>
            You have the right to say no, or to ask me to turn it off at any
            time, and it won't affect your care. Are you comfortable with me
            using this tool for our visit today?
          </p>
        </DialogBody>
        <DialogFooter className="flex flex-col gap-2 sm:flex-col border-0 bg-transparent">
          <Button onClick={handleConfirm} className="w-full">
            Consent provided
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full border-0"
          >
            Consent not provided
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
