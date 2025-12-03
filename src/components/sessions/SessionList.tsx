import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, ArrowUpDown, RefreshCw, Plug } from 'lucide-react';
import { SessionCard } from './SessionCard';
import { SessionFilters } from './SessionFilters';
import { SessionSort } from './SessionSort';
import { ScheduledMeetingCard } from './ScheduledMeetingCard';
import { useSessionsLayout } from '@/contexts/SessionsLayoutContext';
import { useSessions } from '@/contexts/SessionsContext';

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

const demoMeetings: ScheduledMeeting[] = [
  {
    id: "1",
    title: "Microsoft Teams Meeting",
    patientName: "Sarah Johnson",
    date: "December 2, 2025",
    time: "10:30 AM - 11:00 AM",
    location: "Virtual - Microsoft Teams",
    meetingType: "teams",
    meetingLink: "https://teams.microsoft.com/..."
  },
  {
    id: "2",
    title: "Follow-up Consultation",
    patientName: "Michael Chen",
    date: "December 3, 2025",
    time: "2:00 PM - 2:30 PM",
    location: "Virtual - Microsoft Teams",
    meetingType: "teams",
    meetingLink: "https://teams.microsoft.com/..."
  }
];

export const SessionList = () => {
  const { selectedSessionId, setSelectedSessionId } = useSessionsLayout();
  const { sessions } = useSessions();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  const groupSessionsByDate = (sessionsList: typeof sessions) => {
    const grouped: Record<string, typeof sessions> = {};
    sessionsList.forEach((session) => {
      const dateKey = new Date(session.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(session);
    });
    return grouped;
  };

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.patientName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedSessions = groupSessionsByDate(filteredSessions);

  const handleSelectSession = (id: string) => {
    setSelectedSessions((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSessionClick = (id: string) => {
    setSelectedSessionId(id);
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border w-96">
      {/* Search & Controls */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sessions..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowSort(!showSort)}
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && <SessionFilters />}
        {showSort && <SessionSort />}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="past" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start rounded-none border-b border-border px-4">
          <TabsTrigger value="schedule" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="past" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="flex-1 overflow-y-auto m-0 p-4 space-y-4">
          {demoMeetings.map((meeting) => (
            <ScheduledMeetingCard key={meeting.id} meeting={meeting} />
          ))}
          
          <div className="text-center space-y-4 max-w-sm mx-auto mt-8 p-6 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">📅 Show upcoming sessions</p>
            <p className="text-sm text-muted-foreground">
              Integrate with your practice software to automatically link to upcoming sessions.
            </p>
            <Button variant="outline" className="gap-2">
              <Plug className="h-4 w-4" />
              Set up integration
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="past" className="flex-1 overflow-y-auto m-0 p-4 space-y-6">
          {Object.entries(groupedSessions).length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No sessions found
            </div>
          ) : (
            Object.entries(groupedSessions).map(([date, sessionGroup]) => (
              <div key={date} className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground px-2">
                  📅 {date}
                </div>
                <div className="space-y-2">
                  {sessionGroup.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={{
                        id: session.id,
                        title: session.title,
                        date: new Date(session.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
                        time: session.time,
                        status: session.status === 'complete' ? 'complete' : session.status === 'error' ? 'review' : 'draft'
                      }}
                      isSelected={selectedSessions.includes(session.id)}
                      isActive={selectedSessionId === session.id}
                      onSelect={() => handleSelectSession(session.id)}
                      onClick={() => handleSessionClick(session.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Tidy Up Button */}
      {selectedSessions.length > 0 && (
        <div className="border-t border-border p-4">
          <Button variant="outline" className="w-full gap-2">
            🧹 Tidy up ({selectedSessions.length} selected)
          </Button>
        </div>
      )}
    </div>
  );
};
