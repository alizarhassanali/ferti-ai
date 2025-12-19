import { useState } from 'react';
import { ChevronDown, Plus, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Patient } from '@/types/session';

interface PatientSelectorProps {
  selectedPatient: Patient | null;
  patients: Patient[];
  onSelectPatient: (patient: Patient | null) => void;
  onCreatePatient: (name: string) => void;
  onUpdatePatient: (patient: Patient) => void;
  onDeletePatient: (patientId: string) => void;
  isHighlighted?: boolean;
}

export const PatientSelector = ({
  selectedPatient,
  patients,
  onSelectPatient,
  onCreatePatient,
  onUpdatePatient,
  onDeletePatient,
  isHighlighted = false,
}: PatientSelectorProps) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const recentPatients = patients.slice(0, 3);
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePatient = () => {
    if (newPatientName.trim()) {
      onCreatePatient(newPatientName.trim());
      setNewPatientName('');
      setCreateModalOpen(false);
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient({ ...patient });
    setEditModalOpen(true);
  };

  const handleSavePatient = () => {
    if (editingPatient) {
      onUpdatePatient(editingPatient);
      setEditModalOpen(false);
      setEditingPatient(null);
    }
  };

  const handleDeletePatient = () => {
    if (editingPatient) {
      onDeletePatient(editingPatient.id);
      setEditModalOpen(false);
      setEditingPatient(null);
      if (selectedPatient?.id === editingPatient.id) {
        onSelectPatient(null);
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Patient selector styled as dropdown with border */}
          <button className={`inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-xl text-sm transition-colors ${
            isHighlighted 
              ? 'border-destructive ring-2 ring-destructive/20 animate-pulse' 
              : 'border-[hsl(216_20%_90%)] hover:border-primary/30'
          }`}>
            {selectedPatient ? (
              <>
                <User className="h-4 w-4 text-foreground stroke-[1.5]" />
                <span className="font-medium text-foreground">{selectedPatient.name}</span>
              </>
            ) : (
              <span className={isHighlighted ? "text-destructive font-medium" : "text-foreground/80"}>+ Add patient details</span>
            )}
            <ChevronDown className={`h-4 w-4 stroke-[1.5] ${isHighlighted ? 'text-destructive' : 'text-foreground'}`} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72 bg-white border border-[hsl(216_20%_90%)]">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-foreground/60 stroke-[1.5]" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-white border-[hsl(216_20%_90%)]"
              />
            </div>
          </div>
          <DropdownMenuSeparator className="bg-[hsl(216_20%_90%)]" />
          <DropdownMenuItem 
            onClick={() => setCreateModalOpen(true)}
            className="text-foreground hover:bg-sidebar"
          >
            <Plus className="mr-2 h-4 w-4 stroke-[1.5]" />
            Create new patient
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[hsl(216_20%_90%)]" />
          {recentPatients.length > 0 && (
            <>
              <DropdownMenuLabel className="text-xs text-foreground/60">Suggested</DropdownMenuLabel>
              {recentPatients.map(patient => (
                <DropdownMenuItem
                  key={patient.id}
                  className="flex justify-between text-foreground hover:bg-sidebar"
                  onClick={() => onSelectPatient(patient)}
                >
                  <span>{patient.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-foreground/80 hover:text-foreground hover:bg-sidebar"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPatient(patient);
                    }}
                  >
                    Edit
                  </Button>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-[hsl(216_20%_90%)]" />
            </>
          )}
          {filteredPatients.length > 0 && (
            <>
              <DropdownMenuLabel className="text-xs text-foreground/60">All patients</DropdownMenuLabel>
              {filteredPatients.map(patient => (
                <DropdownMenuItem
                  key={patient.id}
                  className="flex justify-between text-foreground hover:bg-sidebar"
                  onClick={() => onSelectPatient(patient)}
                >
                  <span>{patient.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-foreground/80 hover:text-foreground hover:bg-sidebar"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPatient(patient);
                    }}
                  >
                    Edit
                  </Button>
                </DropdownMenuItem>
              ))}
            </>
          )}
          {selectedPatient && (
            <>
              <DropdownMenuSeparator className="bg-[hsl(216_20%_90%)]" />
              <DropdownMenuItem 
                onClick={() => onSelectPatient(null)}
                className="text-foreground hover:bg-sidebar"
              >
                Clear selection
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Patient Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="bg-white border border-[hsl(216_20%_90%)]">
          <DialogHeader>
            <DialogTitle className="text-foreground">Create new patient</DialogTitle>
            <DialogDescription className="text-foreground/60">
              Set up a patient profile in order to link multiple sessions together.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name" className="text-foreground">Patient name</Label>
              <Input
                id="patient-name"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                placeholder="Enter patient name"
                className="bg-white border-[hsl(216_20%_90%)]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePatient}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md bg-white border border-[hsl(216_20%_90%)]">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit patient profile</DialogTitle>
            <DialogDescription className="text-foreground/60">
              Changes will be reflected across all of this patient's linked sessions.
            </DialogDescription>
          </DialogHeader>
          {editingPatient && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-identifier" className="text-foreground">Patient identifier</Label>
                <Input
                  id="edit-identifier"
                  value={editingPatient.identifier || ''}
                  onChange={(e) => setEditingPatient({ ...editingPatient, identifier: e.target.value })}
                  placeholder="Enter patient identifier"
                  className="bg-white border-[hsl(216_20%_90%)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-context" className="text-foreground">Additional patient context</Label>
                <Textarea
                  id="edit-context"
                  value={editingPatient.additionalContext || ''}
                  onChange={(e) => setEditingPatient({ ...editingPatient, additionalContext: e.target.value.slice(0, 1000) })}
                  placeholder="Enter additional patient context"
                  className="min-h-[120px] bg-white border-[hsl(216_20%_90%)]"
                  maxLength={1000}
                />
                <p className="text-xs text-foreground/60">
                  {editingPatient.additionalContext?.length || 0}/1000 characters
                </p>
              </div>
              <p className="text-sm text-foreground/60">
                <span className="font-medium">Tip:</span> This information can be referenced when generating notes or documents for this patient.
              </p>
              <p className="text-xs text-foreground/60">
                This information will not be shared with the patient and is for your reference only.
              </p>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="destructive"
              onClick={handleDeletePatient}
              className="sm:mr-auto"
            >
              Delete patient and all linked sessions
            </Button>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePatient}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
