import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TemplatesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TemplatesFilters = ({ searchQuery, onSearchChange }: TemplatesFiltersProps) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a template"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Date
        </Button>
        <Button variant="outline" size="sm">
          Created by
        </Button>
      </div>
    </div>
  );
};
