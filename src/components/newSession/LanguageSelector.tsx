import { Languages } from 'lucide-react';
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
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <Languages className="h-4 w-4" />
          <span className="text-sm">文A {languages.find(l => l.code === inputLanguage)?.name || 'English'}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <h4 className="font-medium">Language settings</h4>
          
          <div className="space-y-2">
            <Label>Input language</Label>
            <p className="text-xs text-muted-foreground">
              Used for transcripts, dictations and uploaded recordings.
            </p>
            <Select value={inputLanguage} onValueChange={onInputLanguageChange}>
              <SelectTrigger>
                <SelectValue>{getLanguageDisplay(inputLanguage)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Output language</Label>
            <p className="text-xs text-muted-foreground">
              Used for notes and documents.
            </p>
            <Select value={outputLanguage} onValueChange={onOutputLanguageChange}>
              <SelectTrigger>
                <SelectValue>{getLanguageDisplay(outputLanguage)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
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
