import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionsProvider } from "./contexts/SessionsContext";
import { PatientsProvider } from "./contexts/PatientsContext";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import MyTemplates from "./pages/MyTemplates";
import TemplateHub from "./pages/TemplateHub";
import TemplateDetail from "./pages/TemplateDetail";
import NewSession from "./pages/NewSession";
import ViewSessions from "./pages/ViewSessions";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionsProvider>
      <PatientsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/new-session" element={<NewSession />} />
              <Route path="/sessions" element={<ViewSessions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/my-templates" element={<MyTemplates />} />
              <Route path="/template-hub" element={<TemplateHub />} />
              <Route path="/template-hub/:templateId" element={<TemplateDetail />} />
              <Route path="/team" element={<Team />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PatientsProvider>
    </SessionsProvider>
  </QueryClientProvider>
);

export default App;
