import { Badge } from '@/components/ui/badge';
import { Letter } from '@/types/letter';
import { CheckCircle, Clock } from 'lucide-react';

interface LetterCardProps {
  letter: Letter;
  isActive: boolean;
  onClick: () => void;
}

export const LetterCard = ({ letter, isActive, onClick }: LetterCardProps) => {
  const getStatusBadge = () => {
    switch (letter.status) {
      case 'to_be_sent':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
            <Clock className="h-3 w-3" />
            To be sent
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle className="h-3 w-3" />
            Sent
          </Badge>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-3 rounded-lg border cursor-pointer transition-all duration-200
        ${isActive
          ? 'bg-white border-primary/30 shadow-sm ring-1 ring-primary/20'
          : 'bg-white border-border hover:border-primary/20 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-foreground truncate">{letter.patientName}</h3>
        {getStatusBadge()}
      </div>
      
      <div className="space-y-1 text-sm">
        <p className="text-muted-foreground">{letter.templateType}</p>
        <p className="text-muted-foreground/80 text-xs">From: {letter.originatingDoctor}</p>
      </div>
    </div>
  );
};
