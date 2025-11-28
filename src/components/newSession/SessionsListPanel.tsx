import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Settings, ExternalLink, Eye, List, Edit, Copy, Trash2, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Session {
  id: string;
  createdAt: Date;
  status: 'draft' | 'complete';
  summary?: string;
  selected?: boolean;
}

const demoSessions: Session[] = [
  {
    id: "1",
    createdAt: new Date("2025-11-28T17:48:00"),
    status: "draft",
    selected: true
  },
  {
    id: "2",
    createdAt: new Date("2025-11-28T17:37:00"),
    status: "complete",
    summary: "SOAP note requested; no patient information or clinical details provided..."
  },
  {
    id: "3",
    createdAt: new Date("2025-11-27T22:46:00"),
    status: "complete"
  },
  {
    id: "4",
    createdAt: new Date("2025-11-27T07:35:00"),
    status: "complete",
    summary: "Standardized physician consult note template generated..."
  }
];

export const SessionsListPanel = () => {
  const [sessions] = useState<Session[]>(demoSessions);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
  };

  const formatTime = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
    }
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Search Bar */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Sessions</span>
          <span>›</span>
          <span>All</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            onMouseEnter={() => setHoveredSession(session.id)}
            onMouseLeave={() => setHoveredSession(null)}
            className={`border-b border-border px-3 py-3 cursor-pointer transition-colors ${
              session.selected ? 'bg-primary-light' : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <input type="checkbox" className="mt-1" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">
                      {new Date(session.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}, {formatDate(session.createdAt)}
                    </span>
                  </div>
                  {session.status === 'draft' && (
                    <Badge variant="secondary" className="w-fit mt-1 bg-primary/10 text-primary">
                      Draft
                    </Badge>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(session.createdAt)}
              </span>
            </div>

            {session.summary && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2 ml-6">
                {session.summary}
              </p>
            )}

            {(hoveredSession === session.id || session.selected) && (
              <div className="flex items-center gap-1 ml-6">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Trash2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
