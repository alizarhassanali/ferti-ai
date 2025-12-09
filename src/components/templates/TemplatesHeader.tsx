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
          <FileText className="h-7 w-7 text-[hsl(25_30%_35%)]" />
          <h1 className="font-serif text-[32px] font-bold text-[hsl(25_30%_20%)] tracking-tight">
            My Templates
          </h1>
        </div>
        <p className="text-sm text-[hsl(25_15%_55%)] ml-10">Library</p>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="gap-2 rounded-xl border-[hsl(35_20%_85%)] bg-white text-[hsl(25_25%_35%)] hover:bg-[hsl(40_25%_96%)] hover:border-[hsl(35_20%_75%)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all"
          onClick={() => navigate('/template-hub')}
        >
          <Globe className="h-4 w-4" />
          Browse community
        </Button>
        <Button 
          onClick={onCreateTemplate} 
          className="gap-2 rounded-xl bg-[hsl(12_45%_35%)] hover:bg-[hsl(12_45%_28%)] text-white shadow-[0_2px_8px_rgba(139,69,61,0.25)] hover:shadow-[0_4px_12px_rgba(139,69,61,0.35)] transition-all"
        >
          <Plus className="h-4 w-4" />
          Create template
        </Button>
      </div>
    </div>
  );
};