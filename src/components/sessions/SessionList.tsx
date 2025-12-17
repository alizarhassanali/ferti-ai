import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, ArrowUpDown, RefreshCw, Plug, Trash2, CheckSquare, X } from 'lucide-react';
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

export const SessionList = () => {
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
  const groupedSessions = groupSessionsByDate(filteredSessions);

  const handleSelectSession = (id: string) => {
    setSelectedSessions(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
  };

  const handleSessionClick = (id: string) => {
    setSelectedSessionId(id);
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
    <div className="h-full flex flex-col bg-content border-r border-border w-96 relative">
      {/* Search & Controls */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
          <Input 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            placeholder="Search sessions..." 
            className="pl-9 bg-white border-[hsl(216_20%_90%)] focus:border-primary" 
          />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-white border-primary/20 text-foreground hover:bg-sidebar hover:border-primary/30 font-medium text-sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 stroke-[1.5]" />
            Filter
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-white border-primary/20 text-foreground hover:bg-sidebar hover:border-primary/30 font-medium text-sm" 
            onClick={() => setShowSort(!showSort)}
          >
            <ArrowUpDown className="h-4 w-4 stroke-[1.5]" />
            Sort
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:bg-sidebar"
          >
            <RefreshCw className="h-4 w-4 stroke-[1.5]" />
          </Button>
        </div>

        {showFilters && <SessionFilters />}
        {showSort && <SessionSort />}
      </div>

      {/* Tabs - Underline style */}
      <Tabs defaultValue="past" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start bg-transparent border-b border-border px-4 h-auto py-0 rounded-none">
          <TabsTrigger 
            value="schedule" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent text-foreground/60 data-[state=active]:text-foreground text-sm px-3 py-2 hover:text-foreground/80 hover:border-sidebar"
          >
            Scheduled
          </TabsTrigger>
          <TabsTrigger 
            value="past" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent text-foreground/60 data-[state=active]:text-foreground text-sm px-3 py-2 hover:text-foreground/80 hover:border-sidebar"
          >
            Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="flex-1 overflow-y-auto m-0 p-4 space-y-4">
          {demoMeetings.map(meeting => <ScheduledMeetingCard key={meeting.id} meeting={meeting} />)}
          
          <div className="text-center space-y-4 max-w-sm mx-auto mt-8 p-6 bg-white border border-[hsl(216_20%_90%)] rounded-xl">
            <p className="text-foreground font-medium">📅 Show upcoming sessions</p>
            <p className="text-sm text-foreground/60">
              Integrate with your practice software to automatically link to upcoming sessions.
            </p>
            <Button 
              variant="outline" 
              className="gap-2 bg-white border-primary/20 text-foreground hover:bg-sidebar"
            >
              <Plug className="h-4 w-4 stroke-[1.5]" />
              Set up integration
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="past" className={`flex-1 overflow-y-auto m-0 p-4 space-y-6 ${selectedCount > 0 ? 'pb-20' : ''}`}>
          {Object.entries(groupedSessions).length === 0 ? (
            <div className="text-center text-foreground/60 py-8">
              No sessions found
            </div>
          ) : (
            Object.entries(groupedSessions).map(([date, sessionGroup]) => (
              <div key={date} className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground/60 px-2 font-medium">
                  📅 {date}
                </div>
                <div className="space-y-2">
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
                        status: session.status === 'complete' ? 'complete' : session.status === 'error' ? 'review' : 'draft',
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
              variant="ghost" 
              size="sm" 
              onClick={handleCancelSelection} 
              className="gap-1 text-foreground"
            >
              <X className="h-4 w-4 stroke-[1.5]" />
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setShowDeleteDialog(true)} 
              className="gap-1"
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
