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
        <div className="mx-auto px-10 lg:px-12 py-8 max-w-[1100px]">
          {/* Back Navigation */}
          <button
            onClick={() => navigate('/template-hub')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground bg-card border border-border hover:bg-muted transition-all"
          >
            <LayoutGrid className="h-4 w-4" />
            Template Hub
          </button>

          {/* Header */}
          <div className="flex items-start justify-between mt-6 mb-4">
            <h1 className="text-[28px] font-bold text-foreground tracking-tight leading-tight">
              {template.title}
            </h1>
            <Button 
              onClick={handleAddToLibrary} 
              disabled={isAdded}
              className="gap-2 bg-brand hover:bg-brand/90 text-brand-foreground hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              <Upload className="h-4 w-4" />
              {isAdded ? 'Added ✓' : 'Add to my library'}
            </Button>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center gap-10 pb-6 mb-6 border-b border-border">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Created by</span>
              <span className="text-sm font-medium text-foreground">{template.author.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Specialty</span>
              <span className="text-sm font-medium text-foreground">{template.author.specialty}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Last edited</span>
              <span className="text-sm font-medium text-foreground">{template.lastEdited}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Uses</span>
              <span className="text-sm font-medium text-foreground">{template.usageCount.toLocaleString()} times</span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex gap-12">
            {/* Main Content - Left Column */}
            <div className="flex-1 max-w-[70%] space-y-6">
              {/* About Section */}
              <div>
                <h2 className="text-base font-semibold text-foreground mb-3">About this template</h2>
                <p className="text-sm leading-7 text-muted-foreground">{template.about}</p>
              </div>

              {/* Preview Section */}
              <div>
                <h2 className="text-base font-semibold text-foreground mb-4">Preview template</h2>
                
                {/* Pill Toggle Tabs */}
                <div className="bg-muted rounded-[10px] p-1 flex gap-1">
                  <button
                    onClick={() => setActiveTab('example')}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg text-sm transition-all cursor-pointer",
                      activeTab === 'example' 
                        ? "bg-card text-foreground font-medium shadow-sm" 
                        : "bg-transparent text-muted-foreground font-normal hover:bg-accent"
                    )}
                  >
                    <FileText className="h-4 w-4" />
                    Example note
                  </button>
                  <button
                    onClick={() => setActiveTab('structure')}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg text-sm transition-all cursor-pointer",
                      activeTab === 'structure' 
                        ? "bg-card text-foreground font-medium shadow-sm" 
                        : "bg-transparent text-muted-foreground font-normal hover:bg-accent"
                    )}
                  >
                    <Layers className="h-4 w-4" />
                    Template structure
                  </button>
                </div>

                {/* Content Card */}
                <div className="mt-4 bg-card border border-border rounded-xl shadow-sm max-h-[450px] overflow-y-auto">
                  <div className="p-6">
                    <pre className="whitespace-pre-wrap text-[13px] font-mono leading-7 text-foreground">
                      {activeTab === 'example' ? template.exampleNote : template.templateStructure}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="w-[200px] flex-shrink-0 sticky top-6 self-start">
              <h3 className="text-[13px] font-semibold text-foreground mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-muted text-foreground border border-border hover:bg-accent transition-colors cursor-pointer">
                  {template.author.specialty}
                </span>
                <span className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-muted text-foreground border border-border hover:bg-accent transition-colors cursor-pointer">
                  {template.type}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 max-w-[70%]">
            <Button 
              onClick={handleAddToLibrary} 
              disabled={isAdded}
              size="lg"
              className="w-full gap-2 py-4 text-[15px] rounded-[10px] bg-brand hover:bg-brand/90 text-brand-foreground transition-all"
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