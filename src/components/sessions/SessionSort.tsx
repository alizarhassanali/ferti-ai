import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';

export const SessionSort = () => {
  const [sortBy, setSortBy] = useState('dateCreated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
      {/* Sort By */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Sort By</Label>
        <RadioGroup value={sortBy} onValueChange={setSortBy}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dateCreated" id="dateCreated" />
            <Label htmlFor="dateCreated" className="text-sm cursor-pointer">Date created</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dateUpdated" id="dateUpdated" />
            <Label htmlFor="dateUpdated" className="text-sm cursor-pointer">Date updated</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="name" id="name" />
            <Label htmlFor="name" className="text-sm cursor-pointer">Name</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="status" id="status" />
            <Label htmlFor="status" className="text-sm cursor-pointer">Status</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Sort Order */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Order</Label>
        <div className="flex gap-2">
          <Button
            variant={sortOrder === 'asc' ? 'default' : 'outline'}
            size="sm"
            className="flex-1 gap-2"
            onClick={() => setSortOrder('asc')}
          >
            <ArrowUp className="h-4 w-4" />
            Ascending
          </Button>
          <Button
            variant={sortOrder === 'desc' ? 'default' : 'outline'}
            size="sm"
            className="flex-1 gap-2"
            onClick={() => setSortOrder('desc')}
          >
            <ArrowDown className="h-4 w-4" />
            Descending
          </Button>
        </div>
      </div>
    </div>
  );
};
