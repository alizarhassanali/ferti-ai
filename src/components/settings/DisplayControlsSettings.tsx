import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { ExternalLink } from 'lucide-react';

export const DisplayControlsSettings = () => {
  const [showConsentPopup, setShowConsentPopup] = useState(false);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Display Controls</h3>
        <p className="text-sm text-muted-foreground">Manage display settings for your sessions</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-2">Show consent pop-up</h4>
            <p className="text-sm text-muted-foreground mb-4">
              When this is on, you'll see a pop-up at the beginning of each session reminding you to ask the patient for their consent to record the session.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Learn more about patient consent
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <Switch
            checked={showConsentPopup}
            onCheckedChange={setShowConsentPopup}
          />
        </div>
      </div>
    </div>
  );
};
