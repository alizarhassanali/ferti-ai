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
      className="border border-border rounded-lg p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer bg-card"
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">{template.type}</p>
          <h3 className="font-semibold text-foreground text-lg leading-tight">{template.title}</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={template.author.avatar} alt={template.author.name} />
              <AvatarFallback className="text-xs">
                {template.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium">{template.author.name}</span>
                {template.author.verified && (
                  <CheckCircle className="h-4 w-4 text-primary fill-primary/20" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">{template.author.specialty}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">{template.usageCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
