import { Badge } from '@/components/ui/badge';
import { useReleaseNotes } from '@/hooks/useReleaseNotes';
import { format } from 'date-fns';
import { Sparkles, Rocket, Wrench, Zap, ChevronDown } from 'lucide-react';
import type { ReleaseNote } from '@/data/seedReleaseNotes';
import { useMemo, useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

interface ReleaseNotesListProps {
  selectedNoteId: string | null;
  onSelectNote: (note: ReleaseNote) => void;
}

const tagConfig = {
  new: { label: 'New', className: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/20', icon: Rocket },
  improvement: { label: 'Improvement', className: 'bg-blue-500/15 text-blue-700 border-blue-500/20', icon: Zap },
  fix: { label: 'Fix', className: 'bg-orange-500/15 text-orange-700 border-orange-500/20', icon: Wrench },
};

const versionDateLabels: Record<string, string> = {
  '2.3.0': 'March 2026',
  '2.2.0': 'February 2026',
  '2.1.0': 'January 2026',
};

export const ReleaseNotesList = ({ selectedNoteId, onSelectNote }: ReleaseNotesListProps) => {
  const { data: notes = [], isLoading } = useReleaseNotes();

  const groupedVersions = useMemo(() => {
    const groups: Record<string, ReleaseNote[]> = {};
    for (const note of notes) {
      const v = note.version ?? 'Unknown';
      if (!groups[v]) groups[v] = [];
      groups[v].push(note);
    }
    // Sort versions descending (newest first)
    const sorted = Object.entries(groups).sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true }));
    return sorted;
  }, [notes]);

  const [openVersions, setOpenVersions] = useState<Record<string, boolean>>(() => {
    const first = groupedVersions[0]?.[0];
    return first ? { [first]: true } : {};
  });

  const toggleVersion = (version: string) => {
    setOpenVersions(prev => ({ ...prev, [version]: !prev[version] }));
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">What's New</h1>
        </div>
        <p className="text-xs text-muted-foreground">Latest updates and improvements.</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-4 w-48 bg-muted rounded" />
                <div className="h-3 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {groupedVersions.map(([version, versionNotes]) => (
              <Collapsible
                key={version}
                open={!!openVersions[version]}
                onOpenChange={() => toggleVersion(version)}
              >
                {/* Version header */}
                <CollapsibleTrigger className="w-full sticky top-0 z-10 bg-muted/80 backdrop-blur-sm px-5 py-2 border-b border-border flex items-center justify-between cursor-pointer hover:bg-muted transition-colors">
                  <div>
                    <span className="text-xs font-semibold text-foreground">
                      v{version}
                    </span>
                    {versionDateLabels[version] && (
                      <span className="text-xs text-muted-foreground ml-2">
                        — {versionDateLabels[version]}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${openVersions[version] ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>

                {/* Notes in this version */}
                <CollapsibleContent>
                  <ul>
                    {versionNotes.map((note) => {
                      const tag = tagConfig[note.tag];
                      const TagIcon = tag.icon;
                      const isSelected = selectedNoteId === note.id;

                      return (
                        <li key={note.id}>
                          <button
                            onClick={() => onSelectNote(note)}
                            className={`w-full text-left px-5 py-3.5 transition-colors duration-150 border-l-2 ${
                              isSelected
                                ? 'bg-muted/70 border-l-primary'
                                : 'border-l-transparent hover:bg-muted/40'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] text-muted-foreground">
                                {format(new Date(note.release_date), 'MMM d, yyyy')}
                              </span>
                              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-medium ${tag.className}`}>
                                <TagIcon className="h-3 w-3 mr-0.5" />
                                {tag.label}
                              </Badge>
                            </div>
                            <div className="font-medium text-sm text-foreground leading-snug">{note.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{note.summary}</div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
