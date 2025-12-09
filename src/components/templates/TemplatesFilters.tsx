import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TemplatesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TemplatesFilters = ({ searchQuery, onSearchChange }: TemplatesFiltersProps) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(25_15%_55%)]" />
        <Input
          type="text"
          placeholder="Search for a template..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 pr-4 py-2.5 h-11 rounded-xl border-[hsl(35_20%_88%)] bg-white placeholder:text-[hsl(25_15%_65%)] text-[hsl(25_25%_30%)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.03)] focus:border-[hsl(35_30%_70%)] focus:ring-[hsl(35_30%_85%)] transition-all"
        />
      </div>
      
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[hsl(40_25%_95%)] border border-[hsl(35_20%_88%)] text-sm font-medium text-[hsl(25_25%_40%)] hover:bg-[hsl(40_25%_90%)] hover:border-[hsl(35_20%_80%)] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          Date
          <ChevronDown className="h-3.5 w-3.5 text-[hsl(25_15%_55%)]" />
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[hsl(40_25%_95%)] border border-[hsl(35_20%_88%)] text-sm font-medium text-[hsl(25_25%_40%)] hover:bg-[hsl(40_25%_90%)] hover:border-[hsl(35_20%_80%)] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          Created by
          <ChevronDown className="h-3.5 w-3.5 text-[hsl(25_15%_55%)]" />
        </button>
      </div>
    </div>
  );
};