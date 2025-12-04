import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { Session } from '@/types/session';
import { PatientSessionsPopover } from './PatientSessionsPopover';

interface SessionCardProps {
  session: {
    id: string;
    title: string;
    date: string;
    time: string;
    status: 'complete' | 'draft' | 'review';
    patientId?: string;
    patientName?: string;
  };
  isSelected: boolean;
  isActive?: boolean;
  onSelect: () => void;
  onClick?: () => void;
  patientSessions?: Session[];
  onSessionClick?: (sessionId: string) => void;
  onDeleteAllPatientSessions?: () => void;
}

const statusConfig = {
  complete: {
    icon: CheckCircle2,
    color: 'text-success',
    label: 'Complete',
  },
  draft: {
    icon: FileText,
    color: 'text-muted-foreground',
    label: 'Draft',
  },
  review: {
    icon: AlertCircle,
    color: 'text-destructive',
    label: 'Review',
  },
};

export const SessionCard = ({ 
  session, 
  isSelected, 
  isActive, 
  onSelect, 
  onClick,
  patientSessions = [],
  onSessionClick,
  onDeleteAllPatientSessions,
}: SessionCardProps) => {
  const StatusIcon = statusConfig[session.status].icon;
  const hasLinkedPatient = session.patientId && patientSessions.length >= 2;

  const cardContent = (
    <div
      className={`
        group relative flex items-start gap-3 p-3 rounded-lg border border-border
        hover:bg-accent cursor-pointer transition-colors
        ${isActive ? 'bg-accent border-primary' : 'bg-card'}
      `}
      onClick={onClick}
    >
      {/* Checkbox */}
      <Checkbox
        checked={isSelected}
        onCheckedChange={onSelect}
        className="mt-0.5"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <StatusIcon className={`h-4 w-4 mt-0.5 shrink-0 ${statusConfig[session.status].color}`} />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium truncate">{session.title}</h4>
            <p className="text-xs text-muted-foreground">{session.time}</p>
          </div>
        </div>
        
        {session.status !== 'complete' && (
          <Badge variant="secondary" className="mt-2 text-xs">
            {statusConfig[session.status].label}
          </Badge>
        )}
      </div>

      {/* Indicator for linked patient sessions */}
      {hasLinkedPatient && (
        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );

  if (hasLinkedPatient && onSessionClick && onDeleteAllPatientSessions) {
    return (
      <PatientSessionsPopover
        sessions={patientSessions}
        patientName={session.patientName || 'Patient'}
        currentSessionId={session.id}
        onSessionClick={onSessionClick}
        onDeleteAll={onDeleteAllPatientSessions}
      >
        {cardContent}
      </PatientSessionsPopover>
    );
  }

  return cardContent;
};
