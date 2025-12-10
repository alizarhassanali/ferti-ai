import { ReactNode } from 'react';
import { LeftPane } from '@/components/settings/LeftPane';
import { GlobalSessionsPanel } from './GlobalSessionsPanel';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: ReactNode;
  hideGlobalSessionsPanel?: boolean;
}

// Routes where global sessions panel should NOT be shown
const ROUTES_WITHOUT_SESSIONS_PANEL = ['/settings', '/sessions'];

export const AppLayout = ({ children, hideGlobalSessionsPanel = false }: AppLayoutProps) => {
  const location = useLocation();
  
  // Check if we should show the global sessions panel on this route
  const shouldShowGlobalSessionsPanel = !hideGlobalSessionsPanel && 
    !ROUTES_WITHOUT_SESSIONS_PANEL.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <LeftPane />
      {shouldShowGlobalSessionsPanel && <GlobalSessionsPanel />}
      {children}
    </div>
  );
};
