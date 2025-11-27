import { AppLayout } from '@/components/layout/AppLayout';
import { SessionList } from '@/components/sessions/SessionList';
import { SessionDetail } from '@/components/sessions/SessionDetail';
import { SessionsLayoutProvider, useSessionsLayout } from '@/contexts/SessionsLayoutContext';

const ViewSessionsContent = () => {
  const { isSessionsListVisible } = useSessionsLayout();

  return (
    <AppLayout>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Middle Pane - Sessions List */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isSessionsListVisible ? 'w-96 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <SessionList />
        </div>

        {/* Right Pane - Session Detail */}
        <SessionDetail />
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
