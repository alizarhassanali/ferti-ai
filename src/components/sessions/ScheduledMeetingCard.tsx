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
        return <Video className="h-4 w-4 text-[#6264A7] stroke-[1.5]" />;
      case 'zoom':
        return <Video className="h-4 w-4 text-[#2D8CFF] stroke-[1.5]" />;
      default:
        return <MapPin className="h-4 w-4 text-foreground/60 stroke-[1.5]" />;
    }
  };

  const handleJoinMeeting = () => {
    if (meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank');
    }
  };

  const handleStartSession = () => {
    console.log('Start session for:', meeting.patientName);
  };

  return (
    <div className="bg-white border border-border rounded-xl p-3 hover:shadow-sm transition-all duration-150 relative overflow-hidden">
      {/* Accent border */}
      {meeting.meetingType === 'teams' && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6264A7]" />
      )}
      
      <div className="pl-2 space-y-2.5">
        {/* Title with icon */}
        <div className="flex items-start gap-2">
          {getMeetingIcon()}
          <h3 className="font-medium text-sm text-foreground flex-1">{meeting.title}</h3>
        </div>

        {/* Meeting details */}
        <div className="space-y-1.5 text-[13px]">
          <div className="flex items-center gap-2 text-foreground/50">
            <User className="h-3.5 w-3.5 stroke-[1.5]" />
            <span>Patient: <span className="text-foreground font-medium">{meeting.patientName}</span></span>
          </div>
          
          <div className="flex items-center gap-2 text-foreground/50">
            <Calendar className="h-3.5 w-3.5 stroke-[1.5]" />
            <span>{meeting.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-foreground/50">
            <Clock className="h-3.5 w-3.5 stroke-[1.5]" />
            <span>{meeting.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-foreground/50">
            <MapPin className="h-3.5 w-3.5 stroke-[1.5]" />
            <span>{meeting.location}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-1">
          {meeting.meetingLink && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5 h-8 text-[13px] rounded-lg border-border hover:border-primary/30"
              onClick={handleJoinMeeting}
            >
              <ExternalLink className="h-3.5 w-3.5 stroke-[1.5]" />
              Join Meeting
            </Button>
          )}
          <Button 
            size="sm" 
            className="gap-1.5 h-8 text-[13px] rounded-lg bg-brand hover:bg-brand/90 text-brand-foreground"
            onClick={handleStartSession}
          >
            Start Session
          </Button>
        </div>
      </div>
    </div>
  );
};
