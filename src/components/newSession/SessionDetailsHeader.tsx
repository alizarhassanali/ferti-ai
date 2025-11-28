import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface SessionDetailsHeaderProps {
  patientDetails: string;
  onPatientDetailsChange: (value: string) => void;
  sessionDate: Date;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
}

export const SessionDetailsHeader = ({
  patientDetails,
  onPatientDetailsChange,
  sessionDate,
  selectedLanguage,
  onLanguageChange
}: SessionDetailsHeaderProps) => {
  return (
    <div className="border-b border-border bg-background">
      {/* Patient Details Row */}
      <div className="px-6 py-3">
        <Input
          placeholder="Add Patient Details"
          value={patientDetails}
          onChange={(e) => onPatientDetailsChange(e.target.value)}
          className="max-w-2xl"
        />
      </div>

      {/* Date and Language Row */}
      <div className="px-6 py-3 flex items-center gap-6 text-sm text-muted-foreground border-t border-border">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{format(sessionDate, 'MMMM d, yyyy')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="mandarin">Mandarin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
