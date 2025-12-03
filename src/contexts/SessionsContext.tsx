import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Session } from '@/types/session';

interface SessionsContextType {
  sessions: Session[];
  addSession: (session: Session) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  deleteSession: (id: string) => void;
  getSession: (id: string) => Session | undefined;
}

const SessionsContext = createContext<SessionsContextType | undefined>(undefined);

const STORAGE_KEY = 'medical-scribe-sessions';

const defaultSessions: Session[] = [
  {
    id: "demo-1",
    title: "Untitled session",
    date: new Date("2025-11-27T22:45:00"),
    time: "10:45PM",
    language: "English",
    duration: 0,
    status: "empty",
    hasTranscript: false,
    hasNotes: false,
    mode: 'transcribe',
    contextContent: '',
    transcriptContent: '',
    dictationContent: '',
    inputLanguage: 'en',
    outputLanguage: 'en',
    notes: []
  },
  {
    id: "demo-2",
    title: "John Smith - Follow-up",
    patientName: "John Smith",
    patientDetails: "Regular patient, accountant",
    date: new Date("2025-11-27T17:36:00"),
    time: "5:36PM",
    language: "English",
    duration: 312,
    status: "complete",
    hasTranscript: true,
    hasNotes: true,
    mode: 'transcribe',
    contextContent: 'Patient: 45-year-old male\nOccupation: Accountant\nChief Complaint: Lower back pain x 3 weeks',
    transcriptContent: "Patient is a 45-year-old male presenting with complaints of persistent lower back pain for the past three weeks. Pain is described as dull and aching, rated 6 out of 10, worsening with prolonged sitting and improving with movement.",
    dictationContent: '',
    inputLanguage: 'en',
    outputLanguage: 'en',
    transcript: {
      segments: [
        { timestamp: "0:00", text: "Patient is a 45-year-old male presenting with complaints of persistent lower back pain for the past three weeks." }
      ],
      fullText: "Patient is a 45-year-old male presenting with complaints of persistent lower back pain for the past three weeks."
    },
    notes: [
      {
        id: "n1",
        type: "clinical_note",
        title: "SOAP Note",
        content: "SUBJECTIVE:\n45-year-old male presenting with persistent lower back pain for 3 weeks...",
        isClosable: true
      }
    ]
  },
  {
    id: "demo-3",
    title: "Sarah Johnson",
    patientName: "Sarah Johnson",
    patientDetails: "New patient consultation",
    date: new Date("2025-11-26T02:59:00"),
    time: "2:59AM",
    language: "English",
    duration: 422,
    status: "complete",
    hasTranscript: true,
    hasNotes: true,
    mode: 'dictate',
    contextContent: '',
    transcriptContent: '',
    dictationContent: "This patient came to see me for an initial consultation regarding chronic fatigue...",
    inputLanguage: 'en',
    outputLanguage: 'en',
    notes: [
      {
        id: "n1",
        type: "letter_to_gp",
        title: "GP Referral Letter",
        content: "Dear Doctor,\n\nRe: Sarah Johnson\n\nI am writing to refer the above patient...",
        isClosable: true
      }
    ]
  }
];

export const SessionsProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<Session[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((s: Session) => ({
          ...s,
          date: new Date(s.date)
        }));
      }
    } catch (e) {
      console.error('Failed to load sessions:', e);
    }
    return defaultSessions;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions:', e);
    }
  }, [sessions]);

  const addSession = useCallback((session: Session) => {
    setSessions(prev => [session, ...prev]);
  }, []);

  const updateSession = useCallback((id: string, updates: Partial<Session>) => {
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s
    ));
  }, []);

  const deleteSession = useCallback((id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  }, []);

  const getSession = useCallback((id: string) => {
    return sessions.find(s => s.id === id);
  }, [sessions]);

  return (
    <SessionsContext.Provider value={{ sessions, addSession, updateSession, deleteSession, getSession }}>
      {children}
    </SessionsContext.Provider>
  );
};

export const useSessions = () => {
  const context = useContext(SessionsContext);
  if (!context) {
    throw new Error('useSessions must be used within SessionsProvider');
  }
  return context;
};
