import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLetters } from '@/contexts/LettersContext';
import { useToast } from '@/hooks/use-toast';
import { Copy, Calendar, User, FileText, CheckCircle, Clock, Download, Check } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { RichTextToolbar } from './RichTextToolbar';

export const LetterDetail = () => {
  const { selectedLetterId, getLetter, updateLetterContent, markAsSent } = useLetters();
  const { toast } = useToast();

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
    onUpdate: ({ editor }) => {
      if (letter) {
        updateLetterContent(letter.id, editor.getHTML());
      }
    },
  });

  // Sync editor content when letter changes
  useEffect(() => {
    if (editor && letter) {
      const currentContent = editor.getHTML();
      if (currentContent !== letter.content) {
        editor.commands.setContent(letter.content || '');
      }
      editor.setEditable(isEditable ?? false);
    }
  }, [letter?.id, letter?.content, isEditable]);

  const handleCopy = () => {
    if (letter) {
      const text = editor?.getText() || letter.content;
      navigator.clipboard.writeText(text);
      toast({ title: 'Copied', description: 'Letter content copied to clipboard.' });
    }
  };

  const handleSend = () => {
    if (letter) {
      markAsSent(letter.id);
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

  const getStatusBadge = () => {
    if (!letter) return null;
    switch (letter.status) {
      case 'to_be_sent':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1 text-xs">
            <Clock className="h-3 w-3" />
            To be sent
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1 text-xs">
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

  return (
    <div className="flex-1 h-screen overflow-hidden bg-background flex flex-col">
      {/* Top Header Bar */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: patient name + status badge */}
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground">{letter.patientName}</h2>
            {getStatusBadge()}
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
              <Button size="sm" className="gap-2 ml-2" onClick={handleSend}>
                <Check className="h-4 w-4" />
                Mark as sent
              </Button>
            )}
          </div>
        </div>

        {/* Sub-info row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(letter.sessionDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{letter.originatingDoctor}</span>
          </div>
          <span className="text-foreground font-medium">{letter.templateType}</span>
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
        <div className="max-w-3xl prose prose-sm text-foreground">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};
