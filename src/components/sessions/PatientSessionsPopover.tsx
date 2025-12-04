import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Session } from '@/types/session';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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

interface PatientSessionsPopoverProps {
  sessions: Session[];
  patientName: string;
  currentSessionId: string;
  onSessionClick: (sessionId: string) => void;
  onDeleteAll: () => void;
  children: React.ReactNode;
}

export const PatientSessionsPopover = ({
  sessions,
  patientName,
  currentSessionId,
  onSessionClick,
  onDeleteAll,
  children,
}: PatientSessionsPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const formatSessionDate = (date: Date) => {
    if (isToday(date)) {
      return `Today ${format(date, 'hh:mma')}`;
    }
    if (isYesterday(date)) {
      return `Yesterday ${format(date, 'hh:mma')}`;
    }
    return format(date, 'MM/dd/yyyy hh:mma');
  };

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleSessionClick = (sessionId: string) => {
    onSessionClick(sessionId);
    setIsOpen(false);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDeleteAll();
    setShowDeleteDialog(false);
    setIsOpen(false);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent 
          className="w-72 p-0" 
          align="end" 
          side="right"
          sideOffset={8}
        >
          <div className="p-3 border-b border-border">
            <h4 className="font-medium text-sm text-muted-foreground">Past sessions</h4>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {sortedSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => handleSessionClick(session.id)}
                className={`w-full text-left p-3 hover:bg-accent transition-colors border-b border-border last:border-b-0 ${
                  session.id === currentSessionId ? 'bg-accent/50' : ''
                }`}
              >
                <div className="text-xs text-muted-foreground">
                  {formatSessionDate(new Date(session.date))}
                </div>
                <div className="text-sm font-medium truncate mt-0.5">
                  {session.title !== patientName ? session.title : 'Session'}
                </div>
              </button>
            ))}
          </div>
          <div className="p-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
              Delete all patient sessions
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete all sessions?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all sessions for {patientName}? This action cannot be undone.
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
    </>
  );
};
