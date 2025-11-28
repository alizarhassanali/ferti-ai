import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, Mail, FileDown, Pencil, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface GeneratedNote {
  template: string;
  sections: {
    name: string;
    content: string;
  }[];
}

interface GeneratedNoteFullscreenProps {
  generatedNote: GeneratedNote | null;
  medicalContext: string;
  onBack: () => void;
}

export const GeneratedNoteFullscreen = ({ 
  generatedNote, 
  medicalContext, 
  onBack 
}: GeneratedNoteFullscreenProps) => {
  const { toast } = useToast();

  if (!generatedNote) return null;

  const handleCopyText = () => {
    const fullText = generatedNote.sections
      .map(section => `${section.name}\n${section.content}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    toast({ title: "Copied to clipboard" });
  };

  const handleSendEmail = () => {
    toast({ title: "Email feature coming soon" });
  };

  const handleSaveAsFile = () => {
    toast({ title: "Save feature coming soon" });
  };

  const handleEdit = () => {
    toast({ title: "Edit mode coming soon" });
  };

  const handleSaveAsPDF = () => {
    toast({ title: "PDF export coming soon" });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with Back Button */}
      <div className="border-b border-border bg-background px-6 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Session
          </Button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{generatedNote.template}</h2>
          </div>
        </div>
      </div>

      {/* Generated Note Content */}
      <ScrollArea className="flex-1">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {generatedNote.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {section.name}
              </h3>
              <div className="text-base text-foreground leading-relaxed whitespace-pre-wrap bg-card border border-border rounded-lg p-4">
                {section.content}
              </div>
            </div>
          ))}

          {/* Action Icons */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyText}
              className="h-9 w-9"
              title="Copy text"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSendEmail}
              className="h-9 w-9"
              title="Send as email"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveAsFile}
              className="h-9 w-9"
              title="Save as file"
            >
              <FileDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="h-9 w-9"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveAsPDF}
              className="h-9 w-9"
              title="Save as PDF"
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
