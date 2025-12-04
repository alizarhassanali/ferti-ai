import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Patient } from '@/types/session';

interface PatientsContextType {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  getPatient: (id: string) => Patient | undefined;
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined);

const STORAGE_KEY = 'medical-scribe-patients';

const defaultPatients: Patient[] = [
  { id: 'p1', name: 'John Smith', identifier: 'JS-001', additionalContext: 'Type 2 Diabetes, Hypertension', createdAt: new Date(), updatedAt: new Date() },
  { id: 'p2', name: 'Sarah Johnson', identifier: 'SJ-002', createdAt: new Date(), updatedAt: new Date() },
  { id: 'p3', name: 'Michael Chen', identifier: 'MC-003', additionalContext: 'Asthma, Allergies to penicillin', createdAt: new Date(), updatedAt: new Date() },
];

export const PatientsProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((p: Patient) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt)
        }));
      }
    } catch (e) {
      console.error('Failed to load patients:', e);
    }
    return defaultPatients;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch (e) {
      console.error('Failed to save patients:', e);
    }
  }, [patients]);

  const addPatient = useCallback((patient: Patient) => {
    setPatients(prev => [patient, ...prev]);
  }, []);

  const updatePatient = useCallback((id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
    ));
  }, []);

  const deletePatient = useCallback((id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  }, []);

  const getPatient = useCallback((id: string) => {
    return patients.find(p => p.id === id);
  }, [patients]);

  return (
    <PatientsContext.Provider value={{ patients, addPatient, updatePatient, deletePatient, getPatient }}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error('usePatients must be used within PatientsProvider');
  }
  return context;
};
