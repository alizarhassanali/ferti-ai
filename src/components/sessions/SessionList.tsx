import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal, ArrowUpDown, RefreshCw, Plug, Trash2, CheckSquare, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SessionCard } from './SessionCard';
import { SessionFilters } from './SessionFilters';
import { SessionSort } from './SessionSort';
import { ScheduledMeetingCard } from './ScheduledMeetingCard';
import { useSessions } from '@/contexts/SessionsContext';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ScheduledMeeting {
  id: string;
  title: string;
  patientName: string;
  date: string;
  time: string;
  location: string;
  meetingType: 'teams' | 'zoom' | 'in-person';
  meetingLink?: string;
}

const demoMeetings: ScheduledMeeting[] = [{
  id: "1",
  title: "Microsoft Teams Meeting",
  patientName: "Sarah Johnson",
  date: "December 2, 2025",
  time: "10:30 AM - 11:00 AM",
  location: "Virtual - Microsoft Teams",
  meetingType: "teams",
  meetingLink: "https://teams.microsoft.com/..."
}, {
  id: "2",
  title: "Follow-up Consultation",
  patientName: "Michael Chen",
  date: "December 3, 2025",
  time: "2:00 PM - 2:30 PM",
  location: "Virtual - Microsoft Teams",
  meetingType: "teams",
  meetingLink: "https://teams.microsoft.com/..."
}];

interface SessionListProps {
  onSessionSelect?: (sessionId: string) => void;
}

export const SessionList = ({ onSessionSelect }: SessionListProps = {}) => {
  const navigate = useNavigate();
  const {
    sessions,
    deleteSession
  } = useSessions();
  const {
    toast
  } = useToast();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const groupSessionsByDate = (sessionsList: typeof sessions) => {
    const grouped: Record<string, typeof sessions> = {};
    sessionsList.forEach(session => {
      const dateKey = new Date(session.date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(session);
    });
    return grouped;
  };

  const getSessionsForPatient = (patientId: string | undefined) => {
    if (!patientId) return [];
    return sessions.filter(s => s.patientId === patientId);
  };

  const handleDeleteAllPatientSessions = (patientId: string, patientName: string) => {
    const patientSessions = sessions.filter(s => s.patientId === patientId);
    patientSessions.forEach(s => deleteSession(s.id));
    toast({
      title: 'Sessions deleted',
      description: `All sessions for ${patientName} have been deleted.`,
      variant: 'destructive'
    });
  };

  const filteredSessions = sessions.filter(session => session.title.toLowerCase().includes(searchQuery.toLowerCase()) || session.patientName?.toLowerCase().includes(searchQuery.toLowerCase()));
  
  // Split sessions into drafts (no notes) and completed (has notes)
  const draftSessions = filteredSessions.filter(session => !session.hasNotes);
  const completedSessions = filteredSessions.filter(session => session.hasNotes);
  
  const groupedDraftSessions = groupSessionsByDate(draftSessions);
  const groupedCompletedSessions = groupSessionsByDate(completedSessions);

  const handleSelectSession = (id: string) => {
    setSelectedSessions(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
  };

  const handleSessionClick = (id: string) => {
    setSelectedSessionId(id);
    if (onSessionSelect) {
      onSessionSelect(id);
    } else {
      // Navigate to NewSession workspace with this session loaded
      navigate(`/new-session?id=${id}`);
    }
  };

  const handleCancelSelection = () => {
    setSelectedSessions([]);
  };

  const handleDeleteSelected = () => {
    selectedSessions.forEach(id => deleteSession(id));
    const count = selectedSessions.length;
    setSelectedSessions([]);
    setShowDeleteDialog(false);

    // Clear selected session if it was deleted
    if (selectedSessionId && selectedSessions.includes(selectedSessionId)) {
      setSelectedSessionId(null);
    }
    toast({
      title: 'Sessions deleted',
      description: `${count} session${count !== 1 ? 's' : ''} deleted.`
    });
  };

  const selectedCount = selectedSessions.length;

  return (
    <div className="h-full flex flex-col bg-white border-r border-border w-full relative">
      {/* Controls */}
      <div className="p-4 space-y-3">
        <TooltipProvider delayDuration={300}>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`h-6 w-6 text-foreground/70 hover:text-foreground hover:bg-sidebar ${showSearch ? 'bg-sidebar text-foreground' : ''}`}
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Search</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`h-6 w-6 text-foreground/70 hover:text-foreground hover:bg-sidebar ${showFilters ? 'bg-sidebar text-foreground' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Filter</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`h-6 w-6 text-foreground/70 hover:text-foreground hover:bg-sidebar ${showSort ? 'bg-sidebar text-foreground' : ''}`}
                  onClick={() => setShowSort(!showSort)}
                >
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Sort</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-6 w-6 text-foreground/70 hover:text-foreground hover:bg-sidebar"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Refresh</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground/60" />
            <Input 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              placeholder="Search sessions..." 
              className="pl-9 bg-white border-[hsl(216_20%_90%)] focus:border-primary" 
              autoFocus
            />
          </div>
        )}

        {showFilters && <SessionFilters />}
        {showSort && <SessionSort />}
      </div>

      {/* Tabs - Pill style when selected */}
      <Tabs defaultValue="sessions" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start bg-transparent px-4 h-auto py-2 rounded-none gap-0.5">
          <TabsTrigger 
            value="sessions" 
            className="rounded-full border border-transparent bg-transparent text-muted-foreground text-xs px-3 py-1 data-[state=active]:bg-[hsl(5_85%_92%)] data-[state=active]:text-foreground data-[state=active]:border-brand/30 hover:text-foreground"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger 
            value="drafts" 
            className="rounded-full border border-transparent bg-transparent text-muted-foreground text-xs px-3 py-1 data-[state=active]:bg-[hsl(5_85%_92%)] data-[state=active]:text-foreground data-[state=active]:border-brand/30 hover:text-foreground"
          >
            Drafts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drafts" className={`flex-1 overflow-y-auto m-0 p-4 space-y-1 ${selectedCount > 0 ? 'pb-20' : ''}`}>
          {Object.entries(groupedDraftSessions).length === 0 ? (
            <div className="text-center text-foreground/60 py-8">
              No draft sessions
            </div>
          ) : (
            Object.entries(groupedDraftSessions).map(([date, sessionGroup]) => (
              <div key={date} className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-foreground/50 px-2 font-medium">
                  <span>📅</span> <span>{date}</span>
                </div>
                <div className="space-y-1">
                  {sessionGroup.map(session => (
                    <SessionCard 
                      key={session.id} 
                      session={{
                        id: session.id,
                        title: session.title,
                        date: new Date(session.date).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric'
                        }),
                        time: session.time,
                        status: 'draft',
                        patientId: session.patientId,
                        patientName: session.patientName
                      }} 
                      isSelected={selectedSessions.includes(session.id)} 
                      isActive={selectedSessionId === session.id} 
                      onSelect={() => handleSelectSession(session.id)} 
                      onClick={() => handleSessionClick(session.id)} 
                      patientSessions={getSessionsForPatient(session.patientId)} 
                      onSessionClick={handleSessionClick} 
                      onDeleteAllPatientSessions={() => {
                        if (session.patientId && session.patientName) {
                          handleDeleteAllPatientSessions(session.patientId, session.patientName);
                        }
                      }} 
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="sessions" className={`flex-1 overflow-y-auto m-0 p-4 space-y-1 ${selectedCount > 0 ? 'pb-20' : ''}`}>
          {Object.entries(groupedCompletedSessions).length === 0 ? (
            <div className="text-center text-foreground/60 py-8">
              No completed sessions
            </div>
          ) : (
            Object.entries(groupedCompletedSessions).map(([date, sessionGroup]) => (
              <div key={date} className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-foreground/50 px-2 font-medium">
                  <span>📅</span> <span>{date}</span>
                </div>
                <div className="space-y-1">
                  {sessionGroup.map(session => (
                    <SessionCard 
                      key={session.id} 
                      session={{
                        id: session.id,
                        title: session.title,
                        date: new Date(session.date).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric'
                        }),
                        time: session.time,
                        status: 'complete',
                        patientId: session.patientId,
                        patientName: session.patientName
                      }} 
                      isSelected={selectedSessions.includes(session.id)} 
                      isActive={selectedSessionId === session.id} 
                      onSelect={() => handleSelectSession(session.id)} 
                      onClick={() => handleSessionClick(session.id)} 
                      patientSessions={getSessionsForPatient(session.patientId)} 
                      onSessionClick={handleSessionClick} 
                      onDeleteAllPatientSessions={() => {
                        if (session.patientId && session.patientName) {
                          handleDeleteAllPatientSessions(session.patientId, session.patientName);
                        }
                      }} 
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Bottom Action Bar */}
      {selectedCount > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border p-3 flex items-center justify-between shadow-lg z-10">
          <div className="flex items-center gap-2 text-sm">
            <CheckSquare className="h-4 w-4 text-primary stroke-[1.5]" />
            <span className="font-medium text-foreground">
              {selectedCount} session{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleCancelSelection} 
              className="gap-1"
            >
              <X className="h-4 w-4 stroke-[1.5]" />
              Cancel
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDeleteDialog(true)} 
              className="gap-1 bg-white text-foreground border-border hover:bg-muted"
            >
              <Trash2 className="h-4 w-4 stroke-[1.5]" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Delete Session{selectedCount !== 1 ? 's' : ''}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedCount} session{selectedCount !== 1 ? 's' : ''}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelected} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
