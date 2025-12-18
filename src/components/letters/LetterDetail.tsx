import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLetters } from '@/contexts/LettersContext';
import { useToast } from '@/hooks/use-toast';
import { Send, RotateCcw, Copy, Calendar, User, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const LetterDetail = () => {
  const { selectedLetterId, getLetter, updateLetterContent, markAsSent, returnToDoctor } = useLetters();
  const { toast } = useToast();
  const [editedContent, setEditedContent] = useState<string | null>(null);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [returnReason, setReturnReason] = useState('');

  const letter = selectedLetterId ? getLetter(selectedLetterId) : null;

  const handleCopy = () => {
    if (letter) {
      navigator.clipboard.writeText(editedContent ?? letter.content);
      toast({
        title: 'Copied',
        description: 'Letter content copied to clipboard.',
      });
    }
  };

  const handleSave = () => {
    if (letter && editedContent !== null) {
      updateLetterContent(letter.id, editedContent);
      toast({
        title: 'Saved',
        description: 'Letter content updated.',
      });
    }
  };

  const handleSend = () => {
    if (letter) {
      if (editedContent !== null) {
        updateLetterContent(letter.id, editedContent);
      }
      markAsSent(letter.id);
      toast({
        title: 'Letter sent',
        description: `Letter for ${letter.patientName} has been marked as sent.`,
      });
    }
  };

  const handleReturn = () => {
    if (letter && returnReason.trim()) {
      returnToDoctor(letter.id, returnReason.trim());
      setShowReturnDialog(false);
      setReturnReason('');
      toast({
        title: 'Letter returned',
        description: `Letter has been returned to ${letter.originatingDoctor}.`,
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusBadge = () => {
    if (!letter) return null;
    switch (letter.status) {
      case 'to_be_sent':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
            <Clock className="h-3 w-3" />
            To be sent
          </Badge>
        );
      case 'returned':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
            <AlertCircle className="h-3 w-3" />
            Returned
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            Sent
          </Badge>
        );
    }
  };

  if (!letter) {
    return (
      <div className="flex-1 h-screen overflow-hidden bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground space-y-2">
          <FileText className="h-12 w-12 mx-auto opacity-50" />
          <p>Select a letter to view details</p>
        </div>
      </div>
    );
  }

  const isEditable = letter.status === 'to_be_sent';
  const currentContent = editedContent ?? letter.content;

  return (
    <div className="flex-1 h-screen overflow-hidden bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground">{letter.patientName}</h2>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(letter.sessionDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{letter.originatingDoctor}</span>
          </div>
          <Badge variant="secondary">{letter.templateType}</Badge>
        </div>

        {letter.status === 'returned' && letter.returnReason && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-sm text-red-700">
            <span className="font-medium">Return reason:</span> {letter.returnReason}
          </div>
        )}

        {letter.status === 'sent' && letter.sentAt && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-sm text-green-700">
            <span className="font-medium">Sent:</span> {formatDateTime(letter.sentAt)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <Textarea
            value={currentContent}
            onChange={(e) => isEditable && setEditedContent(e.target.value)}
            className="min-h-[500px] resize-none font-mono text-sm"
            readOnly={!isEditable}
            placeholder="Letter content..."
          />
        </div>
      </div>

      {/* Footer Actions */}
      {isEditable && (
        <div className="border-t border-border p-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowReturnDialog(true)}
            >
              <RotateCcw className="h-4 w-4" />
              Return to doctor
            </Button>
            <div className="flex items-center gap-2">
              {editedContent !== null && editedContent !== letter.content && (
                <Button variant="outline" onClick={handleSave}>
                  Save changes
                </Button>
              )}
              <Button className="gap-2" onClick={handleSend}>
                <Send className="h-4 w-4" />
                Send letter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Return Dialog */}
      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return to doctor</DialogTitle>
            <DialogDescription>
              Provide a reason for returning this letter to {letter.originatingDoctor}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              placeholder="Please explain why this letter needs revision..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReturnDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleReturn}
              disabled={!returnReason.trim()}
            >
              Return letter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
