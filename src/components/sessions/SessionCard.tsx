import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, AlertCircle, FileText, Plus, Minus, Trash2 } from 'lucide-react';
import { Session } from '@/types/session';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format, isToday, isYesterday } from 'date-fns';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const StatusIcon = statusConfig[session.status].icon;
  const hasLinkedPatient = session.patientId && patientSessions.length >= 2;

  const formatSessionDate = (date: Date) => {
    if (isToday(date)) {
      return `Today ${format(date, 'h:mma')}`;
    }
    if (isYesterday(date)) {
      return `Yesterday ${format(date, 'h:mma')}`;
    }
    return format(date, 'MM/dd/yyyy h:mma');
  };

  const sortedSessions = [...patientSessions]
    .filter(s => s.id !== session.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handlePastSessionClick = (sessionId: string) => {
    if (onSessionClick) {
      onSessionClick(sessionId);
    }
    setIsExpanded(false);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (onDeleteAllPatientSessions) {
      onDeleteAllPatientSessions();
    }
    setShowDeleteDialog(false);
    setIsExpanded(false);
  };

  return (
    <div className="relative">
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
            <h4 className="text-base font-medium text-foreground truncate flex-1">{session.title}</h4>
            {/* Expand button for linked patient sessions - next to name */}
            {hasLinkedPatient && (
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleExpandClick}
                      className="p-0.5 rounded hover:bg-foreground/10 transition-colors"
                    >
                      {isExpanded ? (
                        <Minus className="h-3.5 w-3.5 text-foreground/50 stroke-[2]" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 text-foreground/50 stroke-[2]" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    View past sessions
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <span className="text-xs text-foreground/50 shrink-0">{session.time}</span>
          </div>
        </div>
      </div>

      {/* Expanded past sessions */}
      {hasLinkedPatient && isExpanded && (
        <div className="mt-1 mb-2 bg-white border border-[hsl(216_20%_90%)] rounded-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-[hsl(216_20%_90%)] bg-sidebar/50">
            <span className="text-xs font-medium text-foreground/60">Past sessions</span>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {sortedSessions.map((pastSession) => (
              <button
                key={pastSession.id}
                onClick={() => handlePastSessionClick(pastSession.id)}
                className="w-full text-left px-3 py-2 hover:bg-sidebar transition-colors border-b border-[hsl(216_20%_90%)] last:border-b-0"
              >
                <div className="text-xs text-foreground/50">
                  {formatSessionDate(new Date(pastSession.date))}
                </div>
                <div className="text-sm font-medium text-foreground truncate mt-0.5">
                  {pastSession.title !== session.patientName ? pastSession.title : 'Session'}
                </div>
              </button>
            ))}
          </div>
          <div className="px-2 py-1.5 border-t border-[hsl(216_20%_90%)]">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 h-8 text-xs"
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete patient sessions
            </Button>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete all sessions?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all sessions for {session.patientName}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};