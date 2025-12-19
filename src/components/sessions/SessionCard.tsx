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
    color: 'text-foreground/60',
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
        group relative flex items-start gap-3 p-3 px-4 rounded-xl border transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'bg-[hsl(5_85%_92%)] border-brand/30' 
          : isActive 
            ? 'bg-[hsl(5_85%_92%)] border-brand/30 shadow-sm' 
            : 'bg-transparent border-transparent hover:bg-white hover:border-[hsl(216_20%_90%)] hover:shadow-md'
        }
      `}
      onClick={onClick}
    >
      {/* Checkbox */}
      <Checkbox
        checked={isSelected}
        className="mt-0.5"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <StatusIcon className={`h-4 w-4 shrink-0 stroke-[1.5] ${statusConfig[session.status].color}`} />
          <h4 className="text-base font-medium text-foreground truncate flex-1">{session.title}</h4>
          <span className="text-xs text-foreground/50 shrink-0">{session.time}</span>
        </div>
      </div>

      {/* Indicator for linked patient sessions */}
      {hasLinkedPatient && (
        <ChevronRight className="h-4 w-4 text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity stroke-[1.5]" />
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
