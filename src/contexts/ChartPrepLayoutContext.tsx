import { createContext, useContext, useState, ReactNode } from 'react';

interface ChartPrepLayoutContextType {
  isSessionsListVisible: boolean;
  toggleSessionsList: () => void;
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
}

const ChartPrepLayoutContext = createContext<ChartPrepLayoutContextType | undefined>(undefined);

export const ChartPrepLayoutProvider = ({ children }: { children: ReactNode }) => {
  // Sessions list is always visible - no collapsible behavior
  const [isSessionsListVisible] = useState(true);
  
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const toggleSessionsList = () => {
    // No-op - sessions list is always visible
  };

  return (
    <ChartPrepLayoutContext.Provider 
      value={{ 
        isSessionsListVisible, 
        toggleSessionsList,
        selectedSessionId,
        setSelectedSessionId
      }}
    >
      {children}
    </ChartPrepLayoutContext.Provider>
  );
};

export const useChartPrepLayout = () => {
  const context = useContext(ChartPrepLayoutContext);
  // Return default values if not within provider
  if (context === undefined) {
    return {
      isSessionsListVisible: true,
      toggleSessionsList: () => {},
      selectedSessionId: null,
      setSelectedSessionId: () => {}
    };
  }
  return context;
};