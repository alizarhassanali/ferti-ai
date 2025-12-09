import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Upload, FileText, Layers } from 'lucide-react';
import { hubTemplates } from '@/data/hubTemplates';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const TemplateDetail = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'example' | 'structure'>('example');

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
        <div className="mx-auto px-8 lg:px-12 py-8 max-w-6xl">
          {/* Back Navigation */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/template-hub')}
            className="mb-8 gap-2 bg-card hover:bg-muted border-border text-foreground font-medium"
          >
            <LayoutGrid className="h-4 w-4" />
            Template Hub
          </Button>

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">{template.title}</h1>
            <Button 
              onClick={handleAddToLibrary} 
              disabled={isAdded}
              className="gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Upload className="h-4 w-4" />
              {isAdded ? 'Added ✓' : 'Add to my library'}
            </Button>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center gap-12 pb-6 mb-8 border-b border-border">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Created by</span>
              <span className="text-sm font-medium text-foreground">{template.author.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Specialty</span>
              <span className="text-sm font-medium text-foreground">{template.author.specialty}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Last edited</span>
              <span className="text-sm font-medium text-foreground">{template.lastEdited}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Uses</span>
              <span className="text-sm font-medium text-foreground">{template.usageCount.toLocaleString()} times</span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
            {/* Main Content - Left Column */}
            <div className="space-y-8">
              {/* About Section */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">About this template</h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{template.about}</p>
              </div>

              {/* Preview Section */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Preview template</h2>
                
                {/* Pill Toggle Tabs */}
                <div className="bg-muted/60 rounded-xl p-1.5 flex gap-1">
                  <button
                    onClick={() => setActiveTab('example')}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all",
                      activeTab === 'example' 
                        ? "bg-card text-foreground shadow-sm" 
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <FileText className="h-4 w-4" />
                    Example note
                  </button>
                  <button
                    onClick={() => setActiveTab('structure')}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all",
                      activeTab === 'structure' 
                        ? "bg-card text-foreground shadow-sm" 
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Layers className="h-4 w-4" />
                    Template structure
                  </button>
                </div>

                {/* Content Card */}
                <div className="mt-4 bg-card border border-border rounded-xl shadow-sm max-h-[500px] overflow-y-auto">
                  <div className="p-6">
                    <pre className={cn(
                      "whitespace-pre-wrap text-sm font-mono leading-7",
                      activeTab === 'example' ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {activeTab === 'example' ? template.exampleNote : template.templateStructure}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors cursor-pointer">
                  {template.author.specialty}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 transition-colors cursor-pointer">
                  {template.type}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12">
            <Button 
              onClick={handleAddToLibrary} 
              disabled={isAdded}
              size="lg"
              className="w-full gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
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
