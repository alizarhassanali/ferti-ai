import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TemplatesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TemplatesFilters = ({ searchQuery, onSearchChange }: TemplatesFiltersProps) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
        <Input
          type="text"
          placeholder="Search for a template..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 pr-4 py-2.5 h-11 rounded-xl"
        />
      </div>
    </div>
  );
};