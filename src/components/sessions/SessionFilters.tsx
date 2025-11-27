import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const SessionFilters = () => {
  const [dateFilter, setDateFilter] = useState('last7');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [patientSearch, setPatientSearch] = useState('');

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
      {/* Date Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">📅 Date</Label>
        <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="last7" id="last7" />
            <Label htmlFor="last7" className="text-sm cursor-pointer">Last 7 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="last30" id="last30" />
            <Label htmlFor="last30" className="text-sm cursor-pointer">Last 30 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="last90" id="last90" />
            <Label htmlFor="last90" className="text-sm cursor-pointer">Last 90 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom" className="text-sm cursor-pointer">Custom date range</Label>
          </div>
        </RadioGroup>

        {dateFilter === 'custom' && (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        )}
      </div>

      {/* Patient Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">👤 Patient Profile</Label>
        <Input
          value={patientSearch}
          onChange={(e) => setPatientSearch(e.target.value)}
          placeholder="Search by patient name or ID..."
          className="text-sm"
        />
      </div>
    </div>
  );
};
