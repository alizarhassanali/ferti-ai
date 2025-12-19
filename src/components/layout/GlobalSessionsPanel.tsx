import { SessionList } from '@/components/sessions/SessionList';
import { useSessionsPanel } from '@/contexts/SessionsPanelContext';
import { SessionsLayoutProvider } from '@/contexts/SessionsLayoutContext';

export const GlobalSessionsPanel = () => {
  const { isSessionsPanelVisible } = useSessionsPanel();

  if (!isSessionsPanelVisible) return null;

  return (
    <SessionsLayoutProvider>
      <div className="h-full w-full overflow-hidden">
        <SessionList />
      </div>
    </SessionsLayoutProvider>
  );
};
