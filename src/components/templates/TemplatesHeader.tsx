import { FileText, Globe, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TemplatesHeaderProps {
  onCreateTemplate: () => void;
}

export const TemplatesHeader = ({ onCreateTemplate }: TemplatesHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-7 w-7 text-foreground" />
          <h1 className="font-sans text-[32px] font-semibold text-foreground tracking-tight">
            My Templates
          </h1>
        </div>
        <p className="text-sm text-muted-foreground ml-10">Library</p>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => navigate('/template-hub')}
        >
          <Globe className="h-4 w-4" />
          Browse community
        </Button>
        <Button 
          onClick={onCreateTemplate} 
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create template
        </Button>
      </div>
    </div>
  );
};