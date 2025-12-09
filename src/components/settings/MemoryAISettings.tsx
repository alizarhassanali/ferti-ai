import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useToast } from '@/hooks/use-toast';

export const MemoryAISettings = () => {
  const { toast } = useToast();
  const [displayLanguage, setDisplayLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [detailLevel, setDetailLevel] = useState('Default');
  const [voice, setVoice] = useState('Default');
  const [format, setFormat] = useState('Default');

  const handleChange = (setting: string, value: string) => {
    toast({
      title: 'Setting updated',
      description: `${setting} changed to ${value}`,
    });
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">Memory & AI Settings</h3>
        <p className="text-sm text-muted-foreground">Customize your AI preferences and display settings</p>
      </div>

      <div className="space-y-8">
        {/* Language & Time Section */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h4 className="text-sm font-semibold text-foreground mb-1">Language & time</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Change the language used in the FertiAI interface.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="displayLanguage" className="text-sm font-medium mb-2 block">
                Display language
              </Label>
              <Select 
                value={displayLanguage} 
                onValueChange={(value) => {
                  setDisplayLanguage(value);
                  handleChange('Display language', value);
                }}
              >
                <SelectTrigger id="displayLanguage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateFormat" className="text-sm font-medium mb-2 block">
                Date format
              </Label>
              <Select 
                value={dateFormat} 
                onValueChange={(value) => {
                  setDateFormat(value);
                  handleChange('Date format', value);
                }}
              >
                <SelectTrigger id="dateFormat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Note Preferences Section */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h4 className="text-sm font-semibold text-foreground mb-1">Note Preferences</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Customize the way FertiAI writes your notes. These settings may override instructions present in a custom template.
          </p>
          
          <div className="space-y-6">
            {/* Detail Level */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Detail Level</Label>
              <ToggleGroup 
                type="single" 
                value={detailLevel}
                onValueChange={(value) => {
                  if (value) {
                    setDetailLevel(value);
                    handleChange('Detail Level', value);
                  }
                }}
                className="justify-start bg-muted p-1 rounded-lg"
              >
                <ToggleGroupItem 
                  value="Concise" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  Concise
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="Default" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  Default
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="Detailed" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  Detailed
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Voice */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Voice</Label>
              <ToggleGroup 
                type="single" 
                value={voice}
                onValueChange={(value) => {
                  if (value) {
                    setVoice(value);
                    handleChange('Voice', value);
                  }
                }}
                className="justify-start bg-muted p-1 rounded-lg"
              >
                <ToggleGroupItem 
                  value="1st Person" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  1st Person
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="Default" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  Default
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="3rd Person" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  3rd Person
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Format */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Format</Label>
              <ToggleGroup 
                type="single" 
                value={format}
                onValueChange={(value) => {
                  if (value) {
                    setFormat(value);
                    handleChange('Format', value);
                  }
                }}
                className="justify-start bg-muted p-1 rounded-lg"
              >
                <ToggleGroupItem 
                  value="Bullet Point" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  Bullet Point
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="Default" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  Default
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="Narrative" 
                  className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-sm px-6"
                >
                  Narrative
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
