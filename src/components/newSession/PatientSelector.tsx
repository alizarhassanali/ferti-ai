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
}

export const PatientSelector = ({
  selectedPatient,
  patients,
  onSelectPatient,
  onCreatePatient,
  onUpdatePatient,
  onDeletePatient,
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
          <Button variant="ghost" className="h-auto p-0 text-lg font-medium hover:bg-transparent">
            {selectedPatient ? (
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {selectedPatient.name}
              </span>
            ) : (
              <span className="text-muted-foreground">+ Add patient details</span>
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create new patient
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {recentPatients.length > 0 && (
            <>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Suggested</DropdownMenuLabel>
              {recentPatients.map(patient => (
                <DropdownMenuItem
                  key={patient.id}
                  className="flex justify-between"
                  onClick={() => onSelectPatient(patient)}
                >
                  <span>{patient.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPatient(patient);
                    }}
                  >
                    Edit
                  </Button>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </>
          )}
          {filteredPatients.length > 0 && (
            <>
              <DropdownMenuLabel className="text-xs text-muted-foreground">All patients</DropdownMenuLabel>
              {filteredPatients.map(patient => (
                <DropdownMenuItem
                  key={patient.id}
                  className="flex justify-between"
                  onClick={() => onSelectPatient(patient)}
                >
                  <span>{patient.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSelectPatient(null)}>
                Clear selection
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Patient Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new patient</DialogTitle>
            <DialogDescription>
              Set up a patient profile in order to link multiple sessions together.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Patient name</Label>
              <Input
                id="patient-name"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                placeholder="Enter patient name"
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit patient profile</DialogTitle>
            <DialogDescription>
              Changes will be reflected across all of this patient's linked sessions.
            </DialogDescription>
          </DialogHeader>
          {editingPatient && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-identifier">Patient identifier</Label>
                <Input
                  id="edit-identifier"
                  value={editingPatient.identifier || ''}
                  onChange={(e) => setEditingPatient({ ...editingPatient, identifier: e.target.value })}
                  placeholder="Enter patient identifier"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-context">Additional patient context</Label>
                <Textarea
                  id="edit-context"
                  value={editingPatient.additionalContext || ''}
                  onChange={(e) => setEditingPatient({ ...editingPatient, additionalContext: e.target.value.slice(0, 1000) })}
                  placeholder="Enter additional patient context"
                  className="min-h-[120px]"
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {editingPatient.additionalContext?.length || 0}/1000 characters
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Tip:</span> This information can be referenced when generating notes or documents for this patient.
              </p>
              <p className="text-xs text-muted-foreground">
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
