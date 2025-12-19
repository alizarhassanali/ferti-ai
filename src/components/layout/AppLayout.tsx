import { ReactNode } from 'react';
import { LeftPane } from '@/components/settings/LeftPane';
import { GlobalSessionsPanel } from './GlobalSessionsPanel';
import { useLocation } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useSessionsPanel } from '@/contexts/SessionsPanelContext';

interface AppLayoutProps {
  children: ReactNode;
  hideGlobalSessionsPanel?: boolean;
}

// Routes where global sessions panel should NOT be shown
const ROUTES_WITHOUT_SESSIONS_PANEL = ['/settings', '/sessions'];

export const AppLayout = ({ children, hideGlobalSessionsPanel = false }: AppLayoutProps) => {
  const location = useLocation();
  const { isSessionsPanelVisible } = useSessionsPanel();
  
  // Check if we should show the global sessions panel on this route
  const shouldShowGlobalSessionsPanel = !hideGlobalSessionsPanel && 
    !ROUTES_WITHOUT_SESSIONS_PANEL.some(route => location.pathname.startsWith(route));

  const showResizablePanel = shouldShowGlobalSessionsPanel && isSessionsPanelVisible;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <LeftPane />
      {showResizablePanel ? (
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
            <GlobalSessionsPanel />
          </ResizablePanel>
          <ResizableHandle withHandle className="[&>div]:!top-[calc(50%+60px)]" />
          <ResizablePanel defaultSize={75}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};
