import { createContext, useContext, useState, ReactNode } from 'react';

interface SessionsLayoutContextType {
  isSessionsListVisible: boolean;
  toggleSessionsList: () => void;
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
}

const SessionsLayoutContext = createContext<SessionsLayoutContextType | undefined>(undefined);

export const SessionsLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isSessionsListVisible, setIsSessionsListVisible] = useState(() => {
    const saved = localStorage.getItem('sessions-list-visible');
    return saved !== 'false'; // Default to true
  });
  
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const toggleSessionsList = () => {
    setIsSessionsListVisible((prev) => {
      const newValue = !prev;
      localStorage.setItem('sessions-list-visible', String(newValue));
      return newValue;
    });
  };

  return (
    <SessionsLayoutContext.Provider 
      value={{ 
        isSessionsListVisible, 
        toggleSessionsList,
        selectedSessionId,
        setSelectedSessionId
      }}
    >
      {children}
    </SessionsLayoutContext.Provider>
  );
};

export const useSessionsLayout = () => {
  const context = useContext(SessionsLayoutContext);
  if (context === undefined) {
    throw new Error('useSessionsLayout must be used within SessionsLayoutProvider');
  }
  return context;
};
