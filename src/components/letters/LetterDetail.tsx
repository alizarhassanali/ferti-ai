import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLetters } from '@/contexts/LettersContext';
import { useToast } from '@/hooks/use-toast';
import { Copy, Calendar, User, FileText, Download, Check, Save, Trash2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { RichTextToolbar } from './RichTextToolbar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const LetterDetail = () => {
  const { selectedLetterId, getLetter, updateLetterContent, markAsSent, deleteLetter } = useLetters();
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const letter = selectedLetterId ? getLetter(selectedLetterId) : null;
  const isEditable = letter?.status === 'to_be_sent';

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: letter?.content || '',
    editable: isEditable,
    onUpdate: () => {
      setHasUnsavedChanges(true);
    },
  });

  useEffect(() => {
    if (editor && letter) {
      const currentContent = editor.getHTML();
      if (currentContent !== letter.content) {
        editor.commands.setContent(letter.content || '');
        setHasUnsavedChanges(false);
      }
      editor.setEditable(isEditable ?? false);
    }
  }, [letter?.id, letter?.content, isEditable]);

  const handleSave = useCallback(() => {
    if (letter && editor) {
      updateLetterContent(letter.id, editor.getHTML());
      setHasUnsavedChanges(false);
      toast({ title: 'Saved', description: 'Letter content updated.' });
    }
  }, [letter, editor, updateLetterContent, toast]);

  const handleCopy = () => {
    if (letter) {
      const text = editor?.getText() || letter.content;
      navigator.clipboard.writeText(text);
      toast({ title: 'Copied', description: 'Letter content copied to clipboard.' });
    }
  };

  const handleSend = () => {
    if (letter) {
      if (editor) updateLetterContent(letter.id, editor.getHTML());
      markAsSent(letter.id);
      setHasUnsavedChanges(false);
      toast({
        title: 'Letter marked as sent',
        description: `Letter for ${letter.patientName} has been marked as sent.`,
      });
    }
  };

  const handleDelete = () => {
    if (letter) {
      // TODO: In production, gate behind has_role() check for doctor/admin roles
      deleteLetter(letter.id);
      setShowDeleteDialog(false);
      toast({
        title: 'Letter deleted',
        description: `Letter for ${letter.patientName} has been deleted.`,
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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

  return (
    <div className="flex-1 h-screen overflow-hidden bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-semibold text-foreground">{letter.patientName}</h1>
              <Badge
                variant="outline"
                className={
                  letter.status === 'to_be_sent'
                    ? 'bg-[hsl(30_100%_95%)] text-[hsl(25_95%_53%)] border-[hsl(25_95%_53%/0.3)] text-xs'
                    : 'bg-[hsl(142_76%_95%)] text-[hsl(142_71%_35%)] border-[hsl(142_71%_35%/0.3)] text-xs'
                }
              >
                {letter.status === 'to_be_sent' ? 'To be sent' : 'Sent'}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(letter.sessionDate)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{letter.originatingDoctor}</span>
              </div>
              <span className="font-medium text-foreground">{letter.templateType}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {/* Delete — only for to_be_sent letters; TODO: gate behind doctor/admin role */}
            {isEditable && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => window.print()}>
              <Download className="h-4 w-4" />
              PDF
            </Button>
            {isEditable && (
              <>
                <Button variant="outline" size="sm" className="gap-2 ml-2" onClick={handleSave} disabled={!hasUnsavedChanges}>
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" className="gap-2" onClick={handleSend}>
                  <Check className="h-4 w-4" />
                  Mark as sent
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Doctor's Note Callout */}
      {letter.doctorNote && (
        <div className="border-b border-border px-6 py-3">
          <div className="flex items-start gap-3 rounded-lg bg-accent/50 border border-border px-4 py-3">
            <MessageSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-primary mb-1">Doctor's Note</p>
              <p className="text-sm text-foreground leading-relaxed">{letter.doctorNote}</p>
            </div>
          </div>
        </div>
      )}

      {/* Rich Text Toolbar */}
      {isEditable && editor && (
        <div className="border-b border-border px-6 py-2">
          <RichTextToolbar editor={editor} />
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="prose prose-sm max-w-none text-foreground">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this letter?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The letter for {letter.patientName} will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
