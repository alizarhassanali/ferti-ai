import { FileText } from 'lucide-react';

interface GeneratedNote {
  template: string;
  sections: {
    name: string;
    content: string;
  }[];
}

interface GeneratedNotePanelProps {
  generatedNote: GeneratedNote | null;
}

export const GeneratedNotePanel = ({ generatedNote }: GeneratedNotePanelProps) => {
  if (!generatedNote) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No note generated yet</h3>
        <p className="text-sm text-muted-foreground">
          Click "Generate" to create a structured clinical note from your transcript
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Note Header */}
      <div className="sticky top-0 bg-background border-b border-border px-6 py-4 z-10">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Generate a {generatedNote.template}</h3>
        </div>
      </div>

      {/* Note Content */}
      <div className="px-6 py-6 space-y-6">
        {generatedNote.sections.map((section, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-lg font-semibold">{section.name}</h4>
            <div className="w-full h-px bg-border mb-3" />
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
