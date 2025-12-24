import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { LanguageSelector } from '@/components/newSession/LanguageSelector';

interface ChartPrepInfoBarProps {
  sessionDate: Date;
  inputLanguage: string;
  outputLanguage: string;
  onInputLanguageChange: (lang: string) => void;
  onOutputLanguageChange: (lang: string) => void;
}

export const ChartPrepInfoBar = ({
  sessionDate,
  inputLanguage,
  outputLanguage,
  onInputLanguageChange,
  onOutputLanguageChange,
}: ChartPrepInfoBarProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
      {/* Left side: Date, Language chips */}
      <div className="flex items-center gap-3">
        {/* Date chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 text-foreground rounded-full text-[13px] bg-white">
          <Calendar className="h-3.5 w-3.5 stroke-[1.5]" />
          <span>{format(sessionDate, "MMM d, yyyy h:mma")}</span>
        </div>
        
        <LanguageSelector 
          inputLanguage={inputLanguage} 
          outputLanguage={outputLanguage} 
          onInputLanguageChange={onInputLanguageChange} 
          onOutputLanguageChange={onOutputLanguageChange} 
        />
      </div>

      {/* Right side: Empty - no recording controls for chart prep */}
      <div className="flex items-center gap-4">
        {/* Chart Prep mode indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
          <span className="font-medium">Chart Prep Mode</span>
        </div>
      </div>
    </div>
  );
};
