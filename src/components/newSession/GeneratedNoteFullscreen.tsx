import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, FileText, ClipboardList } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  if (!generatedNote) return null;

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

      {/* Tabs for Generated Note and Medical Context */}
      <Tabs defaultValue="generated" className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border bg-background px-6">
          <TabsList className="h-12 bg-transparent border-0 rounded-none p-0">
            <TabsTrigger 
              value="generated"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 h-12 gap-2"
            >
              <FileText className="h-4 w-4" />
              Generated Note
            </TabsTrigger>
            <TabsTrigger 
              value="context"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 h-12 gap-2"
            >
              <ClipboardList className="h-4 w-4" />
              Medical Context
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="generated" className="flex-1 m-0 overflow-hidden">
          <ScrollArea className="h-full">
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
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="context" className="flex-1 m-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="container mx-auto px-6 py-8 max-w-4xl">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Medical Context Used for Generation
                </h3>
                <div className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
                  {medicalContext || 'No medical context was provided for this generation.'}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
