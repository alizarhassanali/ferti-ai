import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionsProvider } from "./contexts/SessionsContext";
import { PatientsProvider } from "./contexts/PatientsContext";
import { SessionsPanelProvider } from "./contexts/SessionsPanelContext";
import { LettersProvider } from "./contexts/LettersContext";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import MyTemplates from "./pages/MyTemplates";
import TemplateHub from "./pages/TemplateHub";
import TemplateDetail from "./pages/TemplateDetail";
import NewSession from "./pages/NewSession";
import ViewSessions from "./pages/ViewSessions";
import ChartPrep from "./pages/ChartPrep";
import AIAssistant from "./pages/AIAssistant";
import Letters from "./pages/Letters";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionsProvider>
      <PatientsProvider>
        <LettersProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SessionsPanelProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/new-session" element={<NewSession />} />
                  <Route path="/sessions" element={<ViewSessions />} />
                  <Route path="/chart-prep" element={<ChartPrep />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/my-templates" element={<MyTemplates />} />
                  <Route path="/template-hub" element={<TemplateHub />} />
                  <Route path="/template-hub/:templateId" element={<TemplateDetail />} />
                  <Route path="/letters" element={<Letters />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SessionsPanelProvider>
            </BrowserRouter>
          </TooltipProvider>
        </LettersProvider>
      </PatientsProvider>
    </SessionsProvider>
  </QueryClientProvider>
);

export default App;
