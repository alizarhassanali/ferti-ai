import { useSettings } from '@/contexts/SettingsContext';
import { ProfileSettings } from './ProfileSettings';
import { SecuritySettings } from './SecuritySettings';
import { UsageSettings } from './UsageSettings';
import { MemoryAISettings } from './MemoryAISettings';

export const RightPane = () => {
  const { selectedCategory } = useSettings();

  const renderContent = () => {
    switch (selectedCategory) {
      case 'profile':
        return <ProfileSettings />;
      case 'usage':
        return <UsageSettings />;
      case 'memory-ai':
        return <MemoryAISettings />;
      case 'security':
        return <SecuritySettings />;
      case 'integrations':
        return (
          <div>
            <h3 className="text-lg font-semibold">Integrations</h3>
            <p className="text-muted-foreground mt-2">Coming soon...</p>
          </div>
        );
      case 'data-settings':
        return (
          <div>
            <h3 className="text-lg font-semibold">Data Settings</h3>
            <p className="text-muted-foreground mt-2">Coming soon...</p>
          </div>
        );
      case 'preferences':
        return (
          <div>
            <h3 className="text-lg font-semibold">Preferences</h3>
            <p className="text-muted-foreground mt-2">Coming soon...</p>
          </div>
        );
      case 'groups':
        return (
          <div>
            <h3 className="text-lg font-semibold">Groups</h3>
            <p className="text-muted-foreground mt-2">Coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-background">
      <div className="p-8">
        {renderContent()}
      </div>
    </div>
  );
};
