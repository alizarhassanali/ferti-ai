import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Upload, FileText, Layers } from 'lucide-react';
import { hubTemplates } from '@/data/hubTemplates';
import { useToast } from '@/hooks/use-toast';

const TemplateDetail = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const template = hubTemplates.find((t) => t.id === templateId);

  if (!template) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Template not found</p>
        </div>
      </AppLayout>
    );
  }

  const handleAddToLibrary = () => {
    setIsAdded(true);
    toast({
      title: "Template added to your library",
      description: `"${template.title}" is now available in My Templates.`,
    });
  };

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          {/* Back Navigation */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/template-hub')}
            className="mb-6 gap-2"
          >
            <Building2 className="h-4 w-4" />
            Template Hub
          </Button>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-medium mb-4">{template.title}</h1>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div>
                  <span className="block text-xs uppercase tracking-wide mb-1">Created by</span>
                  <span className="text-foreground font-medium">{template.author.name}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wide mb-1">Specialty</span>
                  <span className="text-foreground font-medium">{template.author.specialty}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wide mb-1">Last edited</span>
                  <span className="text-foreground font-medium">{template.lastEdited}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wide mb-1">Uses</span>
                  <span className="text-foreground font-medium">{template.usageCount.toLocaleString()} times</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleAddToLibrary} 
              disabled={isAdded}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {isAdded ? 'Added ✓' : 'Add to my library'}
            </Button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* About Section */}
            <div className="col-span-2">
              <h2 className="text-lg font-semibold mb-3">About this template</h2>
              <p className="text-muted-foreground leading-relaxed">{template.about}</p>
            </div>

            {/* Tags Section */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Tags</h2>
              <div className="flex flex-col gap-2">
                <Badge variant="secondary" className="w-fit px-3 py-1.5 text-sm">
                  {template.author.specialty}
                </Badge>
                <Badge variant="outline" className="w-fit px-3 py-1.5 text-sm">
                  {template.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-10">
            <Tabs defaultValue="example" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="example" 
                  className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  <FileText className="h-4 w-4" />
                  Example note
                </TabsTrigger>
                <TabsTrigger 
                  value="structure"
                  className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  <Layers className="h-4 w-4" />
                  Template structure
                </TabsTrigger>
              </TabsList>
              <TabsContent value="example" className="mt-6">
                <div className="bg-muted/50 rounded-lg p-6 border">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed text-foreground">
                    {template.exampleNote}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="structure" className="mt-6">
                <div className="bg-muted/50 rounded-lg p-6 border">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed text-muted-foreground">
                    {template.templateStructure}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10">
            <Button 
              onClick={handleAddToLibrary} 
              disabled={isAdded}
              size="lg"
              className="w-full gap-2"
            >
              <Upload className="h-5 w-5" />
              {isAdded ? 'Added to your library ✓' : 'Add to my library'}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TemplateDetail;
