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
      className="group border border-border rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer bg-card"
    >
      <div className="flex flex-col h-full">
        {/* Category Badge */}
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
          {template.type}
        </p>
        
        {/* Title */}
        <h3 className="font-semibold text-foreground text-base leading-tight mb-4 group-hover:text-primary transition-colors">
          {template.title}
        </h3>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={template.author.avatar} alt={template.author.name} />
              <AvatarFallback className="text-xs bg-muted text-muted-foreground font-medium">
                {template.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-foreground leading-tight">{template.author.name}</span>
                {template.author.verified && (
                  <CheckCircle className="h-3.5 w-3.5 text-primary fill-primary/20" />
                )}
              </div>
              <span className="text-xs text-muted-foreground leading-tight">{template.author.specialty}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground/70">
            <Users className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{template.usageCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
