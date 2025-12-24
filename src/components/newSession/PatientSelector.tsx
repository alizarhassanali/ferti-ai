import { useState, useEffect } from 'react';
import { ChevronDown, Plus, User, Search, X, Loader2 } from 'lucide-react';
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
import { Patient, ReferringPhysician } from '@/types/session';
import { usePhysicianSearch } from '@/hooks/usePhysicianSearch';

interface PatientSelectorProps {
  selectedPatient: Patient | null;
  patients: Patient[];
  onSelectPatient: (patient: Patient | null) => void;
  onCreatePatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => void;
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
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [partnerFirstName, setPartnerFirstName] = useState('');
  const [partnerLastName, setPartnerLastName] = useState('');
  const [selectedPhysician, setSelectedPhysician] = useState<ReferringPhysician | null>(null);
  const [physicianSearchQuery, setPhysicianSearchQuery] = useState('');
  
  // Edit form state
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPartnerFirstName, setEditPartnerFirstName] = useState('');
  const [editPartnerLastName, setEditPartnerLastName] = useState('');
  const [editSelectedPhysician, setEditSelectedPhysician] = useState<ReferringPhysician | null>(null);
  const [editPhysicianSearchQuery, setEditPhysicianSearchQuery] = useState('');
  const [editIdentifier, setEditIdentifier] = useState('');
  const [editAdditionalContext, setEditAdditionalContext] = useState('');
  
  // Physician search
  const { results: physicianResults, isLoading: physicianLoading, error: physicianError, search: searchPhysicians, clearResults } = usePhysicianSearch();
  const [showPhysicianDropdown, setShowPhysicianDropdown] = useState(false);
  const [showEditPhysicianDropdown, setShowEditPhysicianDropdown] = useState(false);

  const recentPatients = patients.slice(0, 3);
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Validation
  const isCreateValid = firstName.trim() && lastName.trim() && 
    ((partnerFirstName.trim() && partnerLastName.trim()) || (!partnerFirstName.trim() && !partnerLastName.trim()));
  
  const isEditValid = editFirstName.trim() && editLastName.trim() && 
    ((editPartnerFirstName.trim() && editPartnerLastName.trim()) || (!editPartnerFirstName.trim() && !editPartnerLastName.trim()));

  const partnerValidationError = (partnerFirstName.trim() && !partnerLastName.trim()) || (!partnerFirstName.trim() && partnerLastName.trim());
  const editPartnerValidationError = (editPartnerFirstName.trim() && !editPartnerLastName.trim()) || (!editPartnerFirstName.trim() && editPartnerLastName.trim());

  // Handle physician search
  useEffect(() => {
    if (physicianSearchQuery.length >= 2 && showPhysicianDropdown) {
      searchPhysicians(physicianSearchQuery);
    } else if (physicianSearchQuery.length >= 2 && showEditPhysicianDropdown) {
      searchPhysicians(physicianSearchQuery);
    }
  }, [physicianSearchQuery, showPhysicianDropdown, searchPhysicians]);

  useEffect(() => {
    if (editPhysicianSearchQuery.length >= 2 && showEditPhysicianDropdown) {
      searchPhysicians(editPhysicianSearchQuery);
    }
  }, [editPhysicianSearchQuery, showEditPhysicianDropdown, searchPhysicians]);

  const handleCreatePatient = () => {
    if (isCreateValid) {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      onCreatePatient({
        name: fullName,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        partnerFirstName: partnerFirstName.trim() || undefined,
        partnerLastName: partnerLastName.trim() || undefined,
        referringPhysicianId: selectedPhysician?.id,
        referringPhysicianName: selectedPhysician ? `${selectedPhysician.first_name} ${selectedPhysician.last_name}` : undefined,
        referringPhysicianClinic: selectedPhysician?.clinic_name || undefined,
      });
      resetCreateForm();
      setCreateModalOpen(false);
    }
  };

  const resetCreateForm = () => {
    setFirstName('');
    setLastName('');
    setPartnerFirstName('');
    setPartnerLastName('');
    setSelectedPhysician(null);
    setPhysicianSearchQuery('');
    clearResults();
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setEditFirstName(patient.firstName || patient.name.split(' ')[0] || '');
    setEditLastName(patient.lastName || patient.name.split(' ').slice(1).join(' ') || '');
    setEditPartnerFirstName(patient.partnerFirstName || '');
    setEditPartnerLastName(patient.partnerLastName || '');
    setEditIdentifier(patient.identifier || '');
    setEditAdditionalContext(patient.additionalContext || '');
    if (patient.referringPhysicianId && patient.referringPhysicianName) {
      const nameParts = patient.referringPhysicianName.split(' ');
      setEditSelectedPhysician({
        id: patient.referringPhysicianId,
        first_name: nameParts[0] || '',
        last_name: nameParts.slice(1).join(' ') || '',
        clinic_name: patient.referringPhysicianClinic,
      });
    } else {
      setEditSelectedPhysician(null);
    }
    setEditPhysicianSearchQuery('');
    setEditModalOpen(true);
  };

  const handleSavePatient = () => {
    if (editingPatient && isEditValid) {
      const fullName = `${editFirstName.trim()} ${editLastName.trim()}`;
      onUpdatePatient({
        ...editingPatient,
        name: fullName,
        firstName: editFirstName.trim(),
        lastName: editLastName.trim(),
        partnerFirstName: editPartnerFirstName.trim() || undefined,
        partnerLastName: editPartnerLastName.trim() || undefined,
        referringPhysicianId: editSelectedPhysician?.id,
        referringPhysicianName: editSelectedPhysician ? `${editSelectedPhysician.first_name} ${editSelectedPhysician.last_name}` : undefined,
        referringPhysicianClinic: editSelectedPhysician?.clinic_name || undefined,
        identifier: editIdentifier.trim() || undefined,
        additionalContext: editAdditionalContext.trim() || undefined,
      });
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

  const handleSelectPhysician = (physician: ReferringPhysician) => {
    setSelectedPhysician(physician);
    setPhysicianSearchQuery('');
    setShowPhysicianDropdown(false);
    clearResults();
  };

  const handleSelectEditPhysician = (physician: ReferringPhysician) => {
    setEditSelectedPhysician(physician);
    setEditPhysicianSearchQuery('');
    setShowEditPhysicianDropdown(false);
    clearResults();
  };

  const PhysicianSearchField = ({ 
    value, 
    onChange, 
    selected, 
    onClear, 
    results, 
    isLoading, 
    error, 
    onSelect, 
    showDropdown, 
    setShowDropdown 
  }: {
    value: string;
    onChange: (v: string) => void;
    selected: ReferringPhysician | null;
    onClear: () => void;
    results: ReferringPhysician[];
    isLoading: boolean;
    error: string | null;
    onSelect: (p: ReferringPhysician) => void;
    showDropdown: boolean;
    setShowDropdown: (v: boolean) => void;
  }) => (
    <div className="relative">
      {selected ? (
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md border border-border">
          <span className="flex-1 text-sm text-foreground">
            Dr. {selected.first_name} {selected.last_name}
            {selected.clinic_name && <span className="text-muted-foreground"> — {selected.clinic_name}</span>}
          </span>
          <button 
            type="button"
            onClick={onClear} 
            className="p-0.5 hover:bg-background rounded"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search physicians..."
            className="pl-9 bg-white border-border"
          />
          {isLoading && (
            <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground animate-spin" />
          )}
        </div>
      )}
      
      {showDropdown && !selected && value.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-48 overflow-auto">
          {isLoading ? (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : error ? (
            <div className="px-3 py-4 text-center text-sm text-destructive">
              {error}
            </div>
          ) : results.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            results.map((physician) => (
              <button
                key={physician.id}
                type="button"
                onClick={() => onSelect(physician)}
                className="w-full px-3 py-2 text-left hover:bg-muted transition-colors"
              >
                <div className="text-sm font-medium text-foreground">
                  Dr. {physician.first_name} {physician.last_name}
                </div>
                {(physician.clinic_name || physician.city) && (
                  <div className="text-xs text-muted-foreground">
                    {[physician.clinic_name, physician.city, physician.province].filter(Boolean).join(' • ')}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
      <Dialog open={createModalOpen} onOpenChange={(open) => {
        setCreateModalOpen(open);
        if (!open) resetCreateForm();
      }}>
        <DialogContent className="bg-white border border-[hsl(216_20%_90%)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Create new patient</DialogTitle>
            <DialogDescription className="text-foreground/60">
              Set up a patient profile to link multiple sessions together.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-4">
            {/* Primary Patient Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Primary patient</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="first-name" className="text-xs text-muted-foreground">First name *</Label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="bg-white border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="last-name" className="text-xs text-muted-foreground">Last name *</Label>
                  <Input
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="bg-white border-border"
                  />
                </div>
              </div>
            </div>

            {/* Partner Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Partner <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="partner-first-name" className="text-xs text-muted-foreground">First name</Label>
                  <Input
                    id="partner-first-name"
                    value={partnerFirstName}
                    onChange={(e) => setPartnerFirstName(e.target.value)}
                    placeholder="First name"
                    className={`bg-white ${partnerValidationError ? 'border-destructive' : 'border-border'}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="partner-last-name" className="text-xs text-muted-foreground">Last name</Label>
                  <Input
                    id="partner-last-name"
                    value={partnerLastName}
                    onChange={(e) => setPartnerLastName(e.target.value)}
                    placeholder="Last name"
                    className={`bg-white ${partnerValidationError ? 'border-destructive' : 'border-border'}`}
                  />
                </div>
              </div>
              {partnerValidationError && (
                <p className="text-xs text-destructive">Please fill in both first and last name for partner</p>
              )}
            </div>

            {/* Referring Physician Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Referring physician <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <PhysicianSearchField
                value={physicianSearchQuery}
                onChange={setPhysicianSearchQuery}
                selected={selectedPhysician}
                onClear={() => setSelectedPhysician(null)}
                results={physicianResults}
                isLoading={physicianLoading}
                error={physicianError}
                onSelect={handleSelectPhysician}
                showDropdown={showPhysicianDropdown}
                setShowDropdown={setShowPhysicianDropdown}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePatient} disabled={!isCreateValid}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md bg-white border border-[hsl(216_20%_90%)]">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit patient profile</DialogTitle>
            <DialogDescription className="text-foreground/60">
              Changes will be reflected across all linked sessions.
            </DialogDescription>
          </DialogHeader>
          {editingPatient && (
            <div className="space-y-5 py-4">
              {/* Primary Patient Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Primary patient</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="edit-first-name" className="text-xs text-muted-foreground">First name *</Label>
                    <Input
                      id="edit-first-name"
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      placeholder="First name"
                      className="bg-white border-border"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="edit-last-name" className="text-xs text-muted-foreground">Last name *</Label>
                    <Input
                      id="edit-last-name"
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      placeholder="Last name"
                      className="bg-white border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Partner Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Partner <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="edit-partner-first-name" className="text-xs text-muted-foreground">First name</Label>
                    <Input
                      id="edit-partner-first-name"
                      value={editPartnerFirstName}
                      onChange={(e) => setEditPartnerFirstName(e.target.value)}
                      placeholder="First name"
                      className={`bg-white ${editPartnerValidationError ? 'border-destructive' : 'border-border'}`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="edit-partner-last-name" className="text-xs text-muted-foreground">Last name</Label>
                    <Input
                      id="edit-partner-last-name"
                      value={editPartnerLastName}
                      onChange={(e) => setEditPartnerLastName(e.target.value)}
                      placeholder="Last name"
                      className={`bg-white ${editPartnerValidationError ? 'border-destructive' : 'border-border'}`}
                    />
                  </div>
                </div>
                {editPartnerValidationError && (
                  <p className="text-xs text-destructive">Please fill in both first and last name for partner</p>
                )}
              </div>

              {/* Referring Physician Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Referring physician <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <PhysicianSearchField
                  value={editPhysicianSearchQuery}
                  onChange={setEditPhysicianSearchQuery}
                  selected={editSelectedPhysician}
                  onClear={() => setEditSelectedPhysician(null)}
                  results={physicianResults}
                  isLoading={physicianLoading}
                  error={physicianError}
                  onSelect={handleSelectEditPhysician}
                  showDropdown={showEditPhysicianDropdown}
                  setShowDropdown={setShowEditPhysicianDropdown}
                />
              </div>

              {/* Additional Fields */}
              <div className="space-y-3">
                <Label htmlFor="edit-identifier" className="text-sm font-medium text-foreground">Patient identifier</Label>
                <Input
                  id="edit-identifier"
                  value={editIdentifier}
                  onChange={(e) => setEditIdentifier(e.target.value)}
                  placeholder="Enter patient identifier"
                  className="bg-white border-border"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="edit-context" className="text-sm font-medium text-foreground">Additional patient context</Label>
                <Textarea
                  id="edit-context"
                  value={editAdditionalContext}
                  onChange={(e) => setEditAdditionalContext(e.target.value.slice(0, 1000))}
                  placeholder="Enter additional patient context"
                  className="min-h-[80px] bg-white border-border"
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {editAdditionalContext.length}/1000 characters
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="destructive"
              onClick={handleDeletePatient}
              className="sm:mr-auto"
            >
              Delete patient
            </Button>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePatient} disabled={!isEditValid}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};