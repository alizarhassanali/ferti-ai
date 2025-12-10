import { AppLayout } from '@/components/layout/AppLayout';
import { SessionList } from '@/components/sessions/SessionList';
import { SessionDetail } from '@/components/sessions/SessionDetail';
import { SessionsLayoutProvider, useSessionsLayout } from '@/contexts/SessionsLayoutContext';

const ViewSessionsContent = () => {
  const { isSessionsListVisible } = useSessionsLayout();

  return (
    <AppLayout hideGlobalSessionsPanel>
      <div className="flex h-screen overflow-hidden bg-background w-full">
        {/* Middle Pane - Sessions List */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 ${
            isSessionsListVisible ? 'w-96 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <SessionList />
        </div>

        {/* Right Pane - Session Detail */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <SessionDetail />
        </div>
      </div>
    </AppLayout>
  );
};

const ViewSessions = () => {
  return (
    <SessionsLayoutProvider>
      <ViewSessionsContent />
    </SessionsLayoutProvider>
  );
};

export default ViewSessions;
