import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
];

interface LanguageSelectorProps {
  inputLanguage: string;
  outputLanguage: string;
  onInputLanguageChange: (lang: string) => void;
  onOutputLanguageChange: (lang: string) => void;
}

export const LanguageSelector = ({
  inputLanguage,
  outputLanguage,
  onInputLanguageChange,
  onOutputLanguageChange,
}: LanguageSelectorProps) => {
  const getLanguageDisplay = (code: string) => {
    const lang = languages.find(l => l.code === code);
    return lang ? `${lang.flag} ${lang.name}` : code;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* Language chip - pill style */}
        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-sidebar text-foreground rounded-full text-[13px] hover:bg-sidebar/80 transition-colors">
          <Globe className="h-3.5 w-3.5 stroke-[1.5]" />
          <span>{languages.find(l => l.code === inputLanguage)?.name || 'English'}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white border border-[hsl(216_20%_90%)]" align="start">
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Language settings</h4>
          
          <div className="space-y-2">
            <Label className="text-foreground">Input language</Label>
            <p className="text-xs text-foreground/60">
              Used for transcripts, dictations and uploaded recordings.
            </p>
            <Select value={inputLanguage} onValueChange={onInputLanguageChange}>
              <SelectTrigger className="bg-white border-[hsl(216_20%_90%)]">
                <SelectValue>{getLanguageDisplay(inputLanguage)}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white">
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Output language</Label>
            <p className="text-xs text-foreground/60">
              Used for notes and documents.
            </p>
            <Select value={outputLanguage} onValueChange={onOutputLanguageChange}>
              <SelectTrigger className="bg-white border-[hsl(216_20%_90%)]">
                <SelectValue>{getLanguageDisplay(outputLanguage)}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white">
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
