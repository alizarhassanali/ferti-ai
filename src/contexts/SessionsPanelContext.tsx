import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SessionsPanelContextType {
  isSessionsPanelVisible: boolean;
  sessionsPaneOpen: boolean;
  toggleSessionsPanel: () => void;
  showSessionsPanel: () => void;
  hideSessionsPanel: () => void;
  isSessionsPanelAllowed: boolean;
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
  navigateToSession: (sessionId: string) => void;
}

const SessionsPanelContext = createContext<SessionsPanelContextType | undefined>(undefined);

// Routes where the sessions panel is NOT allowed
const DISALLOWED_ROUTES: string[] = [];

export const SessionsPanelProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Persist the open/closed state in localStorage
  const [sessionsPaneOpen, setSessionsPaneOpen] = useState(() => {
    const saved = localStorage.getItem('sessions-pane-open');
    return saved === 'true';
  });
  
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Check if current route allows sessions panel
  const isSessionsPanelAllowed = !DISALLOWED_ROUTES.some(route => 
    location.pathname.startsWith(route)
  );

  // The actual visibility is: pane is open AND current route allows it
  const isSessionsPanelVisible = sessionsPaneOpen && isSessionsPanelAllowed;

  const toggleSessionsPanel = useCallback(() => {
    if (!isSessionsPanelAllowed) return;
    setSessionsPaneOpen(prev => {
      const newValue = !prev;
      localStorage.setItem('sessions-pane-open', String(newValue));
      return newValue;
    });
  }, [isSessionsPanelAllowed]);

  const showSessionsPanel = useCallback(() => {
    if (!isSessionsPanelAllowed) return;
    setSessionsPaneOpen(true);
    localStorage.setItem('sessions-pane-open', 'true');
  }, [isSessionsPanelAllowed]);

  const hideSessionsPanel = useCallback(() => {
    setSessionsPaneOpen(false);
    localStorage.setItem('sessions-pane-open', 'false');
  }, []);

  // Navigate to session detail page when a session is selected
  const navigateToSession = useCallback((sessionId: string) => {
    setSelectedSessionId(sessionId);
    // Close the sessions panel and navigate to the sessions page
    setSessionsPaneOpen(false);
    localStorage.setItem('sessions-pane-open', 'false');
    navigate('/sessions');
  }, [navigate]);

  return (
    <SessionsPanelContext.Provider 
      value={{ 
        isSessionsPanelVisible,
        sessionsPaneOpen,
        toggleSessionsPanel,
        showSessionsPanel,
        hideSessionsPanel,
        isSessionsPanelAllowed,
        selectedSessionId,
        setSelectedSessionId,
        navigateToSession
      }}
    >
      {children}
    </SessionsPanelContext.Provider>
  );
};

export const useSessionsPanel = () => {
  const context = useContext(SessionsPanelContext);
  // Return default values if not within provider (e.g., onboarding pages)
  if (context === undefined) {
    return {
      isSessionsPanelVisible: false,
      sessionsPaneOpen: false,
      toggleSessionsPanel: () => {},
      showSessionsPanel: () => {},
      hideSessionsPanel: () => {},
      isSessionsPanelAllowed: false,
      selectedSessionId: null,
      setSelectedSessionId: () => {},
      navigateToSession: () => {}
    };
  }
  return context;
};
