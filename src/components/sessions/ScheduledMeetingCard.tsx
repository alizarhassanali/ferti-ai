import { Button } from '@/components/ui/button';
import { ExternalLink, Video, Calendar, Clock, MapPin, User } from 'lucide-react';

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

interface ScheduledMeetingCardProps {
  meeting: ScheduledMeeting;
}

export const ScheduledMeetingCard = ({ meeting }: ScheduledMeetingCardProps) => {
  const getMeetingIcon = () => {
    switch (meeting.meetingType) {
      case 'teams':
        return <Video className="h-4 w-4 text-[#6264A7]" />;
      case 'zoom':
        return <Video className="h-4 w-4 text-[#2D8CFF]" />;
      default:
        return <MapPin className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleJoinMeeting = () => {
    if (meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank');
    }
  };

  const handleStartSession = () => {
    // Navigate to new session with patient pre-filled
    console.log('Start session for:', meeting.patientName);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Teams accent border */}
      {meeting.meetingType === 'teams' && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6264A7]" />
      )}
      
      <div className="pl-2 space-y-2">
        {/* Title with icon */}
        <div className="flex items-start gap-2">
          {getMeetingIcon()}
          <h3 className="font-medium text-sm flex-1 truncate">{meeting.title}</h3>
        </div>

        {/* Meeting details */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <User className="h-3 w-3" />
            <span>Patient: <span className="text-foreground font-medium">{meeting.patientName}</span></span>
          </div>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{meeting.date}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{meeting.time}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{meeting.location}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 pt-1">
          {meeting.meetingLink && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 h-7 text-xs px-2"
              onClick={handleJoinMeeting}
            >
              <ExternalLink className="h-3 w-3" />
              Join
            </Button>
          )}
          <Button 
            size="sm" 
            className="gap-1 h-7 text-xs px-2"
            onClick={handleStartSession}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};
