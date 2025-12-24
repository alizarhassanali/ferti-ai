import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SessionCard } from '@/components/sessions/SessionCard';
import { SessionFilters } from '@/components/sessions/SessionFilters';
import { SessionSort } from '@/components/sessions/SessionSort';
import { useSessions } from '@/contexts/SessionsContext';

interface ChartPrepSessionListProps {
  selectedSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
}

export const ChartPrepSessionList = ({
  selectedSessionId,
  onSessionSelect,
}: ChartPrepSessionListProps) => {
  const { sessions } = useSessions();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
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

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    session.patientName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // For chart prep, show all sessions (can be filtered as needed)
  const groupedSessions = groupSessionsByDate(filteredSessions);

  const handleSessionClick = (id: string) => {
    onSessionSelect(id);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-border w-full">
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

      {/* Sessions List - simplified for chart prep */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start bg-transparent px-4 h-auto py-2 rounded-none gap-0.5">
          <TabsTrigger 
            value="all" 
            className="rounded-full border border-transparent bg-transparent text-muted-foreground text-xs px-3 py-1 data-[state=active]:bg-[hsl(5_85%_92%)] data-[state=active]:text-foreground data-[state=active]:border-brand/30 hover:text-foreground"
          >
            All Sessions
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming" 
            className="rounded-full border border-transparent bg-transparent text-muted-foreground text-xs px-3 py-1 data-[state=active]:bg-[hsl(5_85%_92%)] data-[state=active]:text-foreground data-[state=active]:border-brand/30 hover:text-foreground"
          >
            Upcoming
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 overflow-y-auto m-0 p-4 space-y-1">
          {Object.entries(groupedSessions).length === 0 ? (
            <div className="text-center text-foreground/60 py-8">
              No sessions available
            </div>
          ) : (
            Object.entries(groupedSessions).map(([date, sessionGroup]) => (
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
                        status: session.hasNotes ? 'complete' : 'draft',
                        patientId: session.patientId,
                        patientName: session.patientName
                      }} 
                      isSelected={false} 
                      isActive={selectedSessionId === session.id} 
                      onSelect={() => {}} 
                      onClick={() => handleSessionClick(session.id)} 
                      patientSessions={[]} 
                      onSessionClick={handleSessionClick} 
                      onDeleteAllPatientSessions={() => {}} 
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="flex-1 overflow-y-auto m-0 p-4 space-y-1">
          <div className="text-center text-foreground/60 py-8">
            <p className="font-medium">📅 Upcoming sessions</p>
            <p className="text-sm mt-2">Sessions scheduled for chart prep will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
