import { SettingsProvider } from '@/contexts/SettingsContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { MiddlePane } from '@/components/settings/MiddlePane';
import { RightPane } from '@/components/settings/RightPane';

const Settings = () => {
  return (
    <AppLayout>
      <SettingsProvider>
        <div className="flex flex-1 min-w-0">
          <MiddlePane />
          <RightPane />
        </div>
      </SettingsProvider>
    </AppLayout>
  );
};

export default Settings;
