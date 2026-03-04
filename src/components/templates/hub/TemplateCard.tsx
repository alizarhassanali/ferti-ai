import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, CheckCircle } from 'lucide-react';
import { HubTemplate } from '@/data/hubTemplates';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  template: HubTemplate;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/template-hub/${template.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group flex flex-col h-full bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-[3px] transition-all duration-200 cursor-pointer"
    >
      {/* Category Badge */}
      <span className={cn(
        "inline-block self-start px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full mb-3 border",
        template.type === 'Note' && 'bg-amber-100 text-amber-700 border-amber-200',
        template.type === 'Letter' && 'bg-blue-100 text-blue-700 border-blue-200',
        template.type === 'Document' && 'bg-purple-100 text-purple-700 border-purple-200',
      )}>
        {template.type}
      </span>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground leading-snug mb-4 group-hover:text-primary transition-colors">
        {template.title}
      </h3>
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-border">
            <AvatarImage src={template.author.avatar} alt={template.author.name} />
            <AvatarFallback className="text-xs bg-muted text-foreground font-medium">
              {template.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-foreground">{template.author.name}</span>
              {template.author.verified && (
                <CheckCircle className="h-3.5 w-3.5 text-link fill-link/15" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{template.author.specialty}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{template.usageCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};