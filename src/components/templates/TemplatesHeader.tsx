import { FileText, Globe, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TemplatesHeaderProps {
  onCreateTemplate: () => void;
}

export const TemplatesHeader = ({ onCreateTemplate }: TemplatesHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-6 w-6 text-foreground" />
          <h1 className="text-3xl font-semibold text-foreground">My Templates</h1>
        </div>
        <p className="text-sm text-muted-foreground">Library</p>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" className="gap-2" onClick={() => navigate('/template-hub')}>
          <Globe className="h-4 w-4" />
          Browse community
        </Button>
        <Button onClick={onCreateTemplate} className="gap-2 bg-[hsl(25,35%,25%)] hover:bg-[hsl(25,35%,20%)] text-white">
          <Plus className="h-4 w-4" />
          Create template
        </Button>
      </div>
    </div>
  );
};
