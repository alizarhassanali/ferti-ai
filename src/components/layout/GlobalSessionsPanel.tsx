import { SessionList } from '@/components/sessions/SessionList';
import { useSessionsPanel } from '@/contexts/SessionsPanelContext';
import { SessionsLayoutProvider } from '@/contexts/SessionsLayoutContext';

export const GlobalSessionsPanel = () => {
  const { isSessionsPanelVisible } = useSessionsPanel();

  return (
    <SessionsLayoutProvider>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 ${
          isSessionsPanelVisible ? 'w-80 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        {isSessionsPanelVisible && <SessionList />}
      </div>
    </SessionsLayoutProvider>
  );
};
