import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';

export const SessionDetail = () => {
  return (
    <div className="flex-1 h-screen overflow-hidden bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Add patient details"
            className="max-w-md"
          />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Today 10:45PM</span>
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transcript" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start rounded-none border-b border-border px-4">
          <TabsTrigger value="transcript" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Transcript
          </TabsTrigger>
          <TabsTrigger value="dictation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Dictation
          </TabsTrigger>
          <TabsTrigger value="add" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            <Plus className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transcript" className="flex-1 overflow-y-auto m-0 p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center text-muted-foreground py-12">
              <p>No transcript available yet</p>
              <p className="text-sm mt-2">Start recording to generate a transcript</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dictation" className="flex-1 overflow-y-auto m-0 p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center text-muted-foreground py-12">
              <p>No dictation available yet</p>
              <p className="text-sm mt-2">Start dictating to create notes</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="add" className="flex-1 overflow-y-auto m-0 p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center text-muted-foreground py-12">
              <p>Add additional content</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Assistant Input */}
      <div className="border-t border-border p-4">
        <Input
          placeholder="Ask NotesAI to do anything..."
          className="w-full"
        />
      </div>
    </div>
  );
};
