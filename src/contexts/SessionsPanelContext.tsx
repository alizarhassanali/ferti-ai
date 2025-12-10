import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SessionsPanelContextType {
  isSessionsPanelVisible: boolean;
  toggleSessionsPanel: () => void;
  showSessionsPanel: () => void;
  hideSessionsPanel: () => void;
  isSessionsPanelAllowed: boolean;
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
}

const SessionsPanelContext = createContext<SessionsPanelContextType | undefined>(undefined);

// Routes where the sessions panel is NOT allowed
const DISALLOWED_ROUTES = ['/settings'];

export const SessionsPanelProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isSessionsPanelVisible, setIsSessionsPanelVisible] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [previousPath, setPreviousPath] = useState<string>(location.pathname);

  // Check if current route allows sessions panel
  const isSessionsPanelAllowed = !DISALLOWED_ROUTES.some(route => 
    location.pathname.startsWith(route)
  );

  // Collapse sessions panel when navigating to a new allowed section
  useEffect(() => {
    if (previousPath !== location.pathname) {
      // If navigating to a new page, collapse the sessions panel
      if (isSessionsPanelVisible) {
        setIsSessionsPanelVisible(false);
      }
      setPreviousPath(location.pathname);
    }
  }, [location.pathname, previousPath, isSessionsPanelVisible]);

  const toggleSessionsPanel = useCallback(() => {
    if (!isSessionsPanelAllowed) return;
    setIsSessionsPanelVisible(prev => !prev);
  }, [isSessionsPanelAllowed]);

  const showSessionsPanel = useCallback(() => {
    if (!isSessionsPanelAllowed) return;
    setIsSessionsPanelVisible(true);
  }, [isSessionsPanelAllowed]);

  const hideSessionsPanel = useCallback(() => {
    setIsSessionsPanelVisible(false);
  }, []);

  return (
    <SessionsPanelContext.Provider 
      value={{ 
        isSessionsPanelVisible: isSessionsPanelAllowed && isSessionsPanelVisible,
        toggleSessionsPanel,
        showSessionsPanel,
        hideSessionsPanel,
        isSessionsPanelAllowed,
        selectedSessionId,
        setSelectedSessionId
      }}
    >
      {children}
    </SessionsPanelContext.Provider>
  );
};

export const useSessionsPanel = () => {
  const context = useContext(SessionsPanelContext);
  if (context === undefined) {
    throw new Error('useSessionsPanel must be used within SessionsPanelProvider');
  }
  return context;
};
