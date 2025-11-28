import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, Globe, Plus, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

const templates = ['SOAP Note (Standard)', 'My Dictation', 'My Consult Letter', 'Progress Note', 'H&P', 'Procedure Note', 'Custom Template...'];

interface SessionDetailsHeaderProps {
  patientDetails: string;
  onPatientDetailsChange: (value: string) => void;
  sessionDate: Date;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  onNewSession: () => void;
}

export const SessionDetailsHeader = ({
  patientDetails,
  onPatientDetailsChange,
  sessionDate,
  selectedLanguage,
  onLanguageChange,
  selectedTemplate,
  onTemplateChange,
  onNewSession
}: SessionDetailsHeaderProps) => {
  return (
    <div className="border-b border-border bg-background">
      {/* Template Selection and Patient Details Row */}
      <div className="px-6 py-3 flex items-center gap-4">
        {/* Patient Details Input - Left aligned, borderless */}
        <Input
          placeholder="Add Patient Details"
          value={patientDetails}
          onChange={(e) => onPatientDetailsChange(e.target.value)}
          className="flex-1 max-w-2xl border-0 shadow-none focus-visible:ring-0 px-0"
        />

        {/* Template Selector - Right aligned */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {selectedTemplate}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {templates.map(template => (
                <DropdownMenuItem key={template} onClick={() => onTemplateChange(template)}>
                  {template}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
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
