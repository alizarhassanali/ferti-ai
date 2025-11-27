import { SettingsProvider } from '@/contexts/SettingsContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { MiddlePane } from '@/components/settings/MiddlePane';
import { RightPane } from '@/components/settings/RightPane';

const Settings = () => {
  return (
    <AppLayout>
      <SettingsProvider>
        <MiddlePane />
        <RightPane />
      </SettingsProvider>
    </AppLayout>
  );
};

export default Settings;
