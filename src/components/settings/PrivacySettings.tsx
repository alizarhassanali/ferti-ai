import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PrivacySettingsState {
  consentPopupEnabled: boolean;
}

const savedSettings: PrivacySettingsState = {
  consentPopupEnabled: true,
};

export const PrivacySettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PrivacySettingsState>(savedSettings);
  const [initialData, setInitialData] = useState<PrivacySettingsState>(savedSettings);
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
        description: 'Your privacy settings have been saved successfully.',
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
        <h3 className="text-lg font-semibold text-foreground mb-1">Privacy</h3>
        <p className="text-sm text-muted-foreground">Manage your privacy preferences and consent settings</p>
      </div>

      <div className="space-y-8">
{/* Consent Settings */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="flex items-center justify-between">
            <Label htmlFor="consentPopup" className="text-sm font-medium">
              Consent popup
            </Label>
            <Switch
              id="consentPopup"
              checked={formData.consentPopupEnabled}
              onCheckedChange={(checked) => setFormData({ ...formData, consentPopupEnabled: checked })}
            />
          </div>
        </div>

        {/* Future Privacy Settings Placeholder */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h4 className="text-sm font-semibold text-foreground mb-1">Data Handling</h4>
          <p className="text-sm text-muted-foreground">
            Additional privacy settings will be available here in future updates.
          </p>
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