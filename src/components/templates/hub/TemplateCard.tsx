import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, CheckCircle } from 'lucide-react';
import { HubTemplate } from '@/data/hubTemplates';
import { useNavigate } from 'react-router-dom';

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
      className="group flex flex-col h-full bg-white border border-border rounded-2xl p-6 shadow-cnp-md hover:shadow-cnp-lg hover:-translate-y-[3px] transition-all duration-200 cursor-pointer"
    >
      {/* Category Badge */}
      <span className="inline-block self-start text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
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
            <AvatarFallback className="text-xs bg-neutral-blue-100 text-foreground font-medium">
              {template.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-foreground">{template.author.name}</span>
              {template.author.verified && (
                <CheckCircle className="h-3.5 w-3.5 text-primary fill-primary/15" />
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
