import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Rocket, Wrench, Zap, Sparkles } from 'lucide-react';
import type { ReleaseNote } from '@/data/seedReleaseNotes';

interface ReleaseNoteDetailProps {
  note: ReleaseNote | null;
}

const tagConfig = {
  new: { label: 'New', className: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/20', icon: Rocket },
  improvement: { label: 'Improvement', className: 'bg-blue-500/15 text-blue-700 border-blue-500/20', icon: Zap },
  fix: { label: 'Fix', className: 'bg-orange-500/15 text-orange-700 border-orange-500/20', icon: Wrench },
};

export const ReleaseNoteDetail = ({ note }: ReleaseNoteDetailProps) => {
  if (!note) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-background">
        <Sparkles className="h-10 w-10 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">Select a release note to view details</p>
      </div>
    );
  }

  const tag = tagConfig[note.tag];
  const TagIcon = tag.icon;

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-2xl mx-auto px-8 py-8">
        {/* Date & Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-muted-foreground">
            {format(new Date(note.release_date), 'MMMM d, yyyy')}
          </span>
          <Badge variant="outline" className={`text-xs px-2 py-0.5 font-medium ${tag.className}`}>
            <TagIcon className="h-3.5 w-3.5 mr-1" />
            {tag.label}
          </Badge>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-3">{note.title}</h2>

        {/* Summary */}
        <p className="text-base text-muted-foreground mb-6 leading-relaxed">{note.summary}</p>

        {/* Image */}
        {note.image_url && (
          <div className="mb-6 rounded-xl overflow-hidden border border-border">
            <img src={note.image_url} alt={note.title} className="w-full object-cover" />
          </div>
        )}

        {/* Description */}
        {note.description && (
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {note.description}
          </div>
        )}
      </div>
    </div>
  );
};
