import { useState } from 'react';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { ArrowLeft } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import UnderlineExt from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { RichTextToolbar } from '@/components/letters/RichTextToolbar';

const SIGNATURE_STORAGE_KEY = 'medical-scribe-signature-settings';

interface Props {
  userName: string;
  onBack: () => void;
  onFinish: () => void;
}

export const OnboardingStepTwo = ({ userName, onBack, onFinish }: Props) => {
  const [enabled, setEnabled] = useState(true);
  const [appendToLetters, setAppendToLetters] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExt,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: `<p>${userName}</p>`,
  });

  const handleContinue = () => {
    const signatureState = {
      content: editor?.getHTML() || '',
      enabled,
      appendToLetters,
    };
    localStorage.setItem(SIGNATURE_STORAGE_KEY, JSON.stringify(signatureState));
    onFinish();
  };

  return (
    <div className="overflow-y-auto max-h-[90vh] p-8 pb-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <DialogTitle className="text-2xl font-semibold text-foreground text-center">
          Set up your signature
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground text-center mt-1">
          Create a signature to append to your notes and letters.
        </DialogDescription>
      </div>

      {/* Signature Editor */}
      <div className="space-y-2 mb-5">
        <Label className="text-sm font-medium text-foreground">Signature content</Label>
        {editor && (
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="border-b border-border px-2 py-1.5 bg-muted/30">
              <RichTextToolbar editor={editor} exclude={['Heading 1', 'Heading 2', 'Heading 3', 'Bullet list', 'Numbered list']} />
            </div>
            <div className="p-3 min-h-[100px] prose prose-sm max-w-none text-foreground">
              <EditorContent editor={editor} />
            </div>
          </div>
        )}
      </div>

      {/* Toggles */}
      <div className="space-y-4 mb-5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Enable signature</Label>
            <p className="text-xs text-muted-foreground">
              Include your signature at the bottom of notes.
            </p>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Append to AI-generated letters</Label>
            <p className="text-xs text-muted-foreground">
              Auto-add signature to AI-generated letters.
            </p>
          </div>
          <Switch checked={appendToLetters} onCheckedChange={setAppendToLetters} />
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        className="w-full"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );
};
