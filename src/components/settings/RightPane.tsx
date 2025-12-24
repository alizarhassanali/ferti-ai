import { useSettings } from '@/contexts/SettingsContext';
import { ProfileSettings } from './ProfileSettings';
import { SecuritySettings } from './SecuritySettings';
import { AISettings } from './AISettings';
import { PrivacySettings } from './PrivacySettings';
import { UserManagement } from './UserManagement';

export const RightPane = () => {
  const { selectedCategory } = useSettings();

  const renderContent = () => {
    switch (selectedCategory) {
      case 'profile':
        return <ProfileSettings />;
      case 'ai-settings':
        return <AISettings />;
      case 'user-management':
        return <UserManagement />;
      case 'privacy':
        return <PrivacySettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-background">
      <div className="w-full max-w-[1100px] mx-auto px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};
