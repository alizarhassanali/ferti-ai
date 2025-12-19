import { AppLayout } from '@/components/layout/AppLayout';
import { SessionList } from '@/components/sessions/SessionList';
import { SessionDetail } from '@/components/sessions/SessionDetail';
import { SessionsLayoutProvider, useSessionsLayout } from '@/contexts/SessionsLayoutContext';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const ViewSessionsContent = () => {
  const { isSessionsListVisible } = useSessionsLayout();

  return (
    <AppLayout hideGlobalSessionsPanel>
      <div className="flex h-screen overflow-hidden bg-background w-full">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Middle Pane - Sessions List */}
          {isSessionsListVisible && (
            <>
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <SessionList />
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}

          {/* Right Pane - Session Detail */}
          <ResizablePanel defaultSize={isSessionsListVisible ? 70 : 100}>
            <SessionDetail />
          </ResizablePanel>
        </ResizablePanelGroup>
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
