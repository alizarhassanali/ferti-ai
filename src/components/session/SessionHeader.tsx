import { useState } from 'react';
import { Calendar, Globe, Zap, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export const SessionHeader = () => {
  const [patientDetails, setPatientDetails] = useState('');
  const currentTime = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Patient Details Input */}
        <div className="flex items-center gap-2 flex-1 min-w-[250px]">
          <User className="h-5 w-5 text-muted-foreground" />
          <Input
            value={patientDetails}
            onChange={(e) => setPatientDetails(e.target.value)}
            placeholder="Add patient details..."
            className="border-none shadow-none focus-visible:ring-0 text-base"
          />
        </div>

        {/* Date/Time */}
        <Button variant="ghost" className="gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          Today {currentTime}
        </Button>

        {/* Language Selector */}
        <Select defaultValue="english">
          <SelectTrigger className="w-[130px] gap-2">
            <Globe className="h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="mandarin">Mandarin</SelectItem>
          </SelectContent>
        </Select>

        {/* Trial Badge */}
        <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
          <Zap className="h-3.5 w-3.5 fill-primary text-primary" />
          13 days
        </Badge>
      </div>
    </div>
  );
};
