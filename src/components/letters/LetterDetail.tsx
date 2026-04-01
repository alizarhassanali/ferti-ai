import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLetters } from '@/contexts/LettersContext';
import { useToast } from '@/hooks/use-toast';
import { Copy, Calendar, User, FileText, Download, Check, Save } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { RichTextToolbar } from './RichTextToolbar';

export const LetterDetail = () => {
  const { selectedLetterId, getLetter, updateLetterContent, markAsSent } = useLetters();
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
      {/* Header: Patient name + status badge + actions */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-start justify-between">
          {/* Left: patient name + badge + metadata */}
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

          {/* Right: action buttons */}
          <div className="flex items-center gap-1">
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
    </div>
  );
};
