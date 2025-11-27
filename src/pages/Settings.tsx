import { SettingsProvider } from '@/contexts/SettingsContext';
import { LeftPane } from '@/components/settings/LeftPane';
import { MiddlePane } from '@/components/settings/MiddlePane';
import { RightPane } from '@/components/settings/RightPane';

const Settings = () => {
  return (
    <SettingsProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <LeftPane />
        <MiddlePane />
        <RightPane />
      </div>
    </SettingsProvider>
  );
};

export default Settings;
