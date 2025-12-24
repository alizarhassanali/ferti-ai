import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type SessionsTab = 'sessions' | 'scheduled' | 'drafts';
type RightPaneView = 'currentPage' | 'newSessionWorkspace';

interface GlobalSessionsOverlayContextType {
  // Overlay state
  sessionsOverlayOpen: boolean;
  openSessionsOverlay: () => void;
  closeSessionsOverlay: () => void;
  toggleSessionsOverlay: () => void;
  
  // Tab state
  sessionsTab: SessionsTab;
  setSessionsTab: (tab: SessionsTab) => void;
  
  // Selected session
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
  
  // Right pane control
  rightPaneView: RightPaneView;
  workspaceSessionId: string | null;
  loadSessionIntoWorkspace: (sessionId: string) => void;
  clearWorkspaceSession: () => void;
}

const GlobalSessionsOverlayContext = createContext<GlobalSessionsOverlayContextType | null>(null);

export const GlobalSessionsOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize from URL params
  const [sessionsOverlayOpen, setSessionsOverlayOpen] = useState(() => {
    return searchParams.get('sessionsPane') === '1';
  });
  const [sessionsTab, setSessionsTab] = useState<SessionsTab>('sessions');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(() => {
    return searchParams.get('sessionId');
  });
  const [rightPaneView, setRightPaneView] = useState<RightPaneView>(() => {
    return searchParams.get('sessionId') ? 'newSessionWorkspace' : 'currentPage';
  });
  const [workspaceSessionId, setWorkspaceSessionId] = useState<string | null>(() => {
    return searchParams.get('sessionId');
  });

  // Sync state to URL
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    if (sessionsOverlayOpen) {
      newParams.set('sessionsPane', '1');
    } else {
      newParams.delete('sessionsPane');
    }
    
    if (workspaceSessionId) {
      newParams.set('sessionId', workspaceSessionId);
    } else {
      newParams.delete('sessionId');
    }
    
    setSearchParams(newParams, { replace: true });
  }, [sessionsOverlayOpen, workspaceSessionId, setSearchParams]);

  const openSessionsOverlay = () => setSessionsOverlayOpen(true);
  const closeSessionsOverlay = () => setSessionsOverlayOpen(false);
  const toggleSessionsOverlay = () => setSessionsOverlayOpen(prev => !prev);

  const loadSessionIntoWorkspace = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setRightPaneView('newSessionWorkspace');
    setWorkspaceSessionId(sessionId);
    // Do NOT close the overlay - keep it open for rapid switching
  };

  const clearWorkspaceSession = () => {
    setSelectedSessionId(null);
    setRightPaneView('currentPage');
    setWorkspaceSessionId(null);
  };

  return (
    <GlobalSessionsOverlayContext.Provider
      value={{
        sessionsOverlayOpen,
        openSessionsOverlay,
        closeSessionsOverlay,
        toggleSessionsOverlay,
        sessionsTab,
        setSessionsTab,
        selectedSessionId,
        setSelectedSessionId,
        rightPaneView,
        workspaceSessionId,
        loadSessionIntoWorkspace,
        clearWorkspaceSession,
      }}
    >
      {children}
    </GlobalSessionsOverlayContext.Provider>
  );
};

export const useGlobalSessionsOverlay = () => {
  const context = useContext(GlobalSessionsOverlayContext);
  if (!context) {
    throw new Error('useGlobalSessionsOverlay must be used within GlobalSessionsOverlayProvider');
  }
  return context;
};
