import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useReleaseNotes } from '@/hooks/useReleaseNotes';
import { markReleasesSeen } from '@/hooks/useUnseenReleases';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { Sparkles, Rocket, Wrench, Zap } from 'lucide-react';

interface ReleaseNotesPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tagConfig = {
  new: { label: 'New', className: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/20', icon: Rocket },
  improvement: { label: 'Improvement', className: 'bg-blue-500/15 text-blue-700 border-blue-500/20', icon: Zap },
  fix: { label: 'Fix', className: 'bg-orange-500/15 text-orange-700 border-orange-500/20', icon: Wrench },
};

export const ReleaseNotesPanel = ({ open, onOpenChange }: ReleaseNotesPanelProps) => {
  const { data: notes = [], isLoading } = useReleaseNotes();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) {
      markReleasesSeen().then(() => {
        queryClient.invalidateQueries({ queryKey: ['unseen-releases'] });
      });
    }
  }, [open, queryClient]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-card border-border overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <SheetTitle className="text-lg font-semibold">What's New</SheetTitle>
          </div>
          <SheetDescription className="text-sm text-muted-foreground">
            Latest updates and improvements to Otto Notes.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-3 w-24 bg-muted rounded" />
                  <div className="h-4 w-48 bg-muted rounded" />
                  <div className="h-3 w-full bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-1">
              {notes.map((note) => {
                const tag = tagConfig[note.tag];
                const TagIcon = tag.icon;
                return (
                  <AccordionItem key={note.id} value={note.id} className="border-b border-border last:border-0">
                    <AccordionTrigger className="py-3 hover:no-underline hover:bg-muted/50 -mx-2 px-2 rounded-lg">
                      <div className="flex flex-col items-start gap-1.5 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(note.release_date), 'MMM d, yyyy')}
                          </span>
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-medium ${tag.className}`}>
                            <TagIcon className="h-3 w-3 mr-0.5" />
                            {tag.label}
                          </Badge>
                        </div>
                        <span className="font-semibold text-sm text-foreground">{note.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-2">{note.summary}</span>
                      </div>
                    </AccordionTrigger>
                    {note.description && (
                      <AccordionContent className="pt-1 pb-3 px-2 text-sm text-muted-foreground leading-relaxed">
                        {note.description}
                      </AccordionContent>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
