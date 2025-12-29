import { ReactNode } from 'react';
import { LeftPane } from '@/components/settings/LeftPane';
import { GlobalSessionsPanel } from './GlobalSessionsPanel';
import { AppFooter } from './AppFooter';
import { useLocation } from 'react-router-dom';
import { useSessionsPanel } from '@/contexts/SessionsPanelContext';

interface AppLayoutProps {
  children: ReactNode;
  hideGlobalSessionsPanel?: boolean;
}

// Routes where global sessions panel should NOT be shown
const ROUTES_WITHOUT_SESSIONS_PANEL = ['/settings', '/sessions', '/chart-prep'];

export const AppLayout = ({ children, hideGlobalSessionsPanel = false }: AppLayoutProps) => {
  const location = useLocation();
  const { isSessionsPanelVisible } = useSessionsPanel();
  
  // Check if we should show the global sessions panel on this route
  const shouldShowGlobalSessionsPanel = !hideGlobalSessionsPanel && 
    !ROUTES_WITHOUT_SESSIONS_PANEL.some(route => location.pathname.startsWith(route));

  const showSessionsPanel = shouldShowGlobalSessionsPanel && isSessionsPanelVisible;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <LeftPane />
      {showSessionsPanel && (
        <div className="w-80 h-full flex-shrink-0">
          <GlobalSessionsPanel />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        <AppFooter />
      </div>
    </div>
  );
};
