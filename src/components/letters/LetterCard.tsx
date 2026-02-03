import { Letter } from '@/types/letter';
import { format } from 'date-fns';

interface LetterCardProps {
  letter: Letter;
  isActive: boolean;
  onClick: () => void;
}

export const LetterCard = ({ letter, isActive, onClick }: LetterCardProps) => {
  const formatTime = (date: Date) => {
    return format(new Date(date), 'h:mma').toLowerCase();
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-3 px-4 rounded-xl border cursor-pointer transition-all duration-200
        ${isActive
          ? 'bg-[hsl(5_85%_92%)] border-brand/30 shadow-sm'
          : 'bg-transparent border-transparent hover:bg-white hover:border-[hsl(216_20%_90%)] hover:shadow-md'
        }
      `}
    >
      <div className="flex items-center gap-1">
        <h4 className="text-sm font-medium text-foreground truncate flex-1">{letter.patientName}</h4>
        <span className="text-xs text-foreground/50 shrink-0">{formatTime(letter.sessionDate)}</span>
      </div>
      <p className="text-xs text-foreground/60 mt-0.5">{letter.originatingDoctor}</p>
    </div>
  );
};
