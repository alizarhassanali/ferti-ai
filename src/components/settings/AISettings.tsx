import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AISettingsState {
  inputLanguage: string;
  outputLanguage: string;
  temperature: number;
  nucleusSampling: number;
}

const savedSettings: AISettingsState = {
  inputLanguage: 'English',
  outputLanguage: 'English',
  temperature: 0.7,
  nucleusSampling: 0.9,
};

export const AISettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AISettingsState>(savedSettings);
  const [initialData, setInitialData] = useState<AISettingsState>(savedSettings);
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setInitialData(formData);
      toast({
        title: 'Settings saved',
        description: 'Your AI settings have been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">AI Settings</h3>
        <p className="text-sm text-muted-foreground">Customize your AI preferences and language settings</p>
      </div>

      <div className="space-y-8">
        {/* Language Preferences Section */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h4 className="text-sm font-semibold text-foreground mb-1">Language Preferences</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Set your preferred input and output languages for AI processing.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inputLanguage" className="text-sm font-medium mb-2 block">
                Default input language
              </Label>
              <Select 
                value={formData.inputLanguage} 
                onValueChange={(value) => setFormData({ ...formData, inputLanguage: value })}
              >
                <SelectTrigger id="inputLanguage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="outputLanguage" className="text-sm font-medium mb-2 block">
                Default output language
              </Label>
              <Select 
                value={formData.outputLanguage} 
                onValueChange={(value) => setFormData({ ...formData, outputLanguage: value })}
              >
                <SelectTrigger id="outputLanguage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Note Preferences Section */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h4 className="text-sm font-semibold text-foreground mb-1">Note Preferences</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Configure AI model parameters for note generation.
          </p>
          
          <div className="space-y-6">
            {/* Temperature */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">Temperature</Label>
                <span className="text-sm text-muted-foreground">{formData.temperature.toFixed(1)}</span>
              </div>
              <Slider
                value={[formData.temperature]}
                onValueChange={([value]) => setFormData({ ...formData, temperature: value })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>More focused</span>
                <span>More creative</span>
              </div>
            </div>

            {/* Nucleus Sampling */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">Nucleus Sampling</Label>
                <span className="text-sm text-muted-foreground">{formData.nucleusSampling.toFixed(1)}</span>
              </div>
              <Slider
                value={[formData.nucleusSampling]}
                onValueChange={([value]) => setFormData({ ...formData, nucleusSampling: value })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0.0</span>
                <span>1.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Save / Cancel Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={!hasChanges || isSaving}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};