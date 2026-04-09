import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SessionSortProps {
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export const SessionSort = ({ sortOrder, onSortOrderChange }: SessionSortProps) => {
  return (
    <div className="flex gap-1.5">
      <Button
        variant={sortOrder === 'asc' ? 'default' : 'outline'}
        size="sm"
        className="h-7 text-xs px-3 rounded-full gap-1.5"
        onClick={() => onSortOrderChange('asc')}
      >
        <ArrowUp className="h-3 w-3" />
        Ascending
      </Button>
      <Button
        variant={sortOrder === 'desc' ? 'default' : 'outline'}
        size="sm"
        className="h-7 text-xs px-3 rounded-full gap-1.5"
        onClick={() => onSortOrderChange('desc')}
      >
        <ArrowDown className="h-3 w-3" />
        Descending
      </Button>
    </div>
  );
};
