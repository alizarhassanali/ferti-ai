import { ReactNode } from 'react';
import { LeftPane } from '@/components/settings/LeftPane';
import { GlobalSessionsPanel } from './GlobalSessionsPanel';
import { AppFooter } from './AppFooter';
import { useLocation } from 'react-router-dom';
import { useSessionsPanel } from '@/contexts/SessionsPanelContext';
import { TrainingBanner } from '@/components/onboarding/TrainingBanner';

interface AppLayoutProps {
  children: ReactNode;
  hideGlobalSessionsPanel?: boolean;
}

// Routes where global sessions panel should NOT be shown
const ROUTES_WITHOUT_SESSIONS_PANEL = ['/settings', '/sessions', '/chart-prep'];

export const AppLayout = ({ children, hideGlobalSessionsPanel = false }: AppLayoutProps) => {
  const location = useLocation();
  const { isSessionsPanelVisible } = useSessionsPanel();
  const [helpOpen, setHelpOpen] = useState(false);
  
  const shouldShowGlobalSessionsPanel = !hideGlobalSessionsPanel && 
    !ROUTES_WITHOUT_SESSIONS_PANEL.some(route => location.pathname.startsWith(route));

  const showSessionsPanel = shouldShowGlobalSessionsPanel && isSessionsPanelVisible;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <LeftPane />
      <div
        className="h-full flex-shrink-0 overflow-hidden transition-all duration-200 ease-in-out"
        style={{ width: showSessionsPanel ? 320 : 0 }}
      >
        {shouldShowGlobalSessionsPanel && <GlobalSessionsPanel />}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setHelpOpen(true)}
                className="fixed bottom-16 right-6 z-50 w-12 h-12 rounded-full bg-brand text-white shadow-lg flex items-center justify-center hover:bg-brand/90 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs">Help</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AppFooter />
      </div>
      <HelpPanel open={helpOpen} onOpenChange={setHelpOpen} />
      <TrainingBanner />
    </div>
  );
};
