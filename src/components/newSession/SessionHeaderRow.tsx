import { ChevronDown } from 'lucide-react';
import { Patient } from '@/types/session';
import { PatientSelector } from './PatientSelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SessionHeaderRowProps {
  selectedPatient: Patient | null;
  patients: Patient[];
  onSelectPatient: (patient: Patient | null) => void;
  onCreatePatient: (patient: Patient) => void;
  onUpdatePatient: (patient: Patient) => void;
  onDeletePatient: (patientId: string) => void;
  isPatientHighlighted?: boolean;
  // Partner state
  selectedPartner: string | null;
  onPartnerChange: (partner: string | null) => void;
  // Referring physician state
  selectedPhysician: string | null;
  onPhysicianChange: (physician: string | null) => void;
}

// Placeholder options - can be replaced with real data later
const partnerOptions = [
  { value: null, label: 'None' },
  { value: 'Jane Smith', label: 'Jane Smith' },
  { value: 'Partner A', label: 'Partner A' },
  { value: 'Partner B', label: 'Partner B' },
];

const physicianOptions = [
  { value: null, label: 'None' },
  { value: 'Michael Chen', label: 'Dr. Michael Chen' },
  { value: 'Smith', label: 'Dr. Smith' },
  { value: 'Johnson', label: 'Dr. Johnson' },
];

export const SessionHeaderRow = ({
  selectedPatient,
  patients,
  onSelectPatient,
  onCreatePatient,
  onUpdatePatient,
  onDeletePatient,
  isPatientHighlighted = false,
  selectedPartner,
  onPartnerChange,
  selectedPhysician,
  onPhysicianChange,
}: SessionHeaderRowProps) => {
  // Display values
  const partnerDisplay = selectedPartner || '—';
  const physicianDisplay = selectedPhysician ? `Dr. ${selectedPhysician}` : '—';

  return (
    <div className="px-6 py-4 border-b border-border flex items-center gap-3">
      <PatientSelector
        selectedPatient={selectedPatient}
        patients={patients}
        onSelectPatient={onSelectPatient}
        onCreatePatient={onCreatePatient}
        onUpdatePatient={onUpdatePatient}
        onDeletePatient={onDeletePatient}
        isHighlighted={isPatientHighlighted}
      />

      {/* Partner dropdown pill */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] bg-white hover:bg-muted/50 transition-colors cursor-pointer">
            <span className="text-muted-foreground">Partner:</span>
            <span className="text-foreground">{partnerDisplay}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-popover z-50">
          {partnerOptions.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => onPartnerChange(option.value)}
              className={selectedPartner === option.value ? 'bg-accent' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Referring Physician dropdown pill */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] bg-white hover:bg-muted/50 transition-colors cursor-pointer">
            <span className="text-muted-foreground">Referring physician:</span>
            <span className="text-foreground">{physicianDisplay}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-popover z-50">
          {physicianOptions.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => onPhysicianChange(option.value)}
              className={selectedPhysician === option.value ? 'bg-accent' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
