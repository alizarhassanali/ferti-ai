import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export const UsageSettings = () => {
  const [minutesUntilReset, setMinutesUntilReset] = useState(58);
  const [usagePercent] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutesUntilReset(prev => (prev > 0 ? prev - 1 : 60));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">Usage</h3>
        <p className="text-sm text-muted-foreground">Monitor your usage and limits</p>
      </div>

      <div className="space-y-6">
        {/* Current Session Usage */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-foreground">Current session</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Resets in {minutesUntilReset} min
          </p>
          <div className="flex items-center gap-4">
            <Progress value={usagePercent} className="flex-1 h-2" />
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {usagePercent}% used
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
