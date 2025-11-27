import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export const TemplateTypeCard = ({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
}: TemplateTypeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-4 p-6 rounded-lg border-2 transition-all hover:border-[hsl(25,35%,25%)] hover:bg-muted/50",
        isSelected
          ? "border-[hsl(25,35%,25%)] bg-muted/30"
          : "border-border bg-background"
      )}
    >
      <div className="p-3 rounded-full bg-muted">
        <Icon className="h-8 w-8 text-foreground" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};
