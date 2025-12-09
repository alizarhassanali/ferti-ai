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
      className="group flex flex-col h-full bg-white border border-[hsl(220_15%_90%)] rounded-[14px] p-6 shadow-card hover:shadow-card-hover hover:-translate-y-[3px] transition-all duration-200 cursor-pointer"
    >
      {/* Category Badge */}
      <span className="inline-block self-start text-[11px] font-semibold uppercase tracking-wider text-[hsl(220_10%_55%)] mb-3">
        {template.type}
      </span>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-[hsl(220_25%_12%)] leading-snug mb-4 group-hover:text-primary transition-colors">
        {template.title}
      </h3>
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[hsl(220_15%_93%)]">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-[hsl(220_15%_93%)]">
            <AvatarImage src={template.author.avatar} alt={template.author.name} />
            <AvatarFallback className="text-xs bg-[hsl(220_20%_96%)] text-[hsl(220_15%_40%)] font-medium">
              {template.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-[hsl(220_20%_20%)]">{template.author.name}</span>
              {template.author.verified && (
                <CheckCircle className="h-3.5 w-3.5 text-[hsl(217_91%_60%)] fill-[hsl(217_91%_60%)/15%]" />
              )}
            </div>
            <span className="text-xs text-[hsl(220_10%_55%)]">{template.author.specialty}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-[hsl(220_10%_65%)]">
          <Users className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{template.usageCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
