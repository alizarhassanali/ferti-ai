import { ReactNode } from 'react';
import { LeftPane } from '@/components/settings/LeftPane';
import { SessionsOverlayPanel } from '@/components/layout/SessionsOverlayPanel';
import { NewSessionWorkspace } from '@/components/newSession/NewSessionWorkspace';
import { useGlobalSessionsOverlay } from '@/contexts/GlobalSessionsOverlayContext';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { 
    sessionsOverlayOpen, 
    rightPaneView, 
    workspaceSessionId 
  } = useGlobalSessionsOverlay();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <LeftPane />
      
      {/* Sessions Overlay Panel - Middle Pane */}
      {sessionsOverlayOpen && (
        <div className="w-80 h-full flex-shrink-0 border-r border-border">
          <SessionsOverlayPanel />
        </div>
      )}
      
      {/* Right Pane - Either current page or New Session workspace */}
      <div className="flex-1 overflow-hidden">
        {rightPaneView === 'newSessionWorkspace' ? (
          <NewSessionWorkspace sessionId={workspaceSessionId} />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
