import { createContext, useContext, useState, ReactNode } from 'react';
import { Letter, LetterStatus, LetterFormData } from '@/types/letter';

interface LettersContextType {
  letters: Letter[];
  selectedLetterId: string | null;
  setSelectedLetterId: (id: string | null) => void;
  getLettersByStatus: (status: LetterStatus) => Letter[];
  getLetter: (id: string) => Letter | undefined;
  createLetter: (data: LetterFormData) => Letter;
  updateLetterContent: (id: string, content: string) => void;
  markAsSent: (id: string) => void;
  returnToDoctor: (id: string, reason: string) => void;
  resubmitLetter: (id: string, content: string) => void;
  getLetterBySessionId: (sessionId: string) => Letter | undefined;
}

const LettersContext = createContext<LettersContextType | undefined>(undefined);

// Demo data
const demoLetters: Letter[] = [
  {
    id: 'letter-1',
    sessionId: 'session-1',
    patientName: 'Sarah Johnson',
    patientId: 'patient-1',
    sessionDate: new Date('2024-12-15'),
    templateType: 'Letter to GP',
    originatingDoctor: 'Dr. Shahid Saya',
    status: 'to_be_sent',
    content: `Dear Dr. Smith,

Re: Sarah Johnson (DOB: 15/03/1985)

I am writing to inform you about the recent consultation with your patient, Sarah Johnson, who attended our fertility clinic on 15th December 2024.

**Chief Complaint:**
The patient presented for a follow-up consultation regarding fertility treatment options.

**Assessment:**
- Hormone levels within normal range
- Ultrasound showed normal ovarian reserve
- AMH levels satisfactory

**Plan:**
We have discussed the option of IVF treatment. The patient has elected to proceed with the first cycle in January 2025.

Please do not hesitate to contact me if you require any further information.

Yours sincerely,
Dr. Shahid Saya
Consultant in Reproductive Medicine`,
    approvedAt: new Date('2024-12-15T14:30:00'),
    createdAt: new Date('2024-12-15T14:30:00'),
    updatedAt: new Date('2024-12-15T14:30:00'),
  },
  {
    id: 'letter-2',
    sessionId: 'session-2',
    patientName: 'Michael Chen',
    patientId: 'patient-2',
    sessionDate: new Date('2024-12-14'),
    templateType: 'Consult Letter',
    originatingDoctor: 'Dr. Sarah Johnson',
    status: 'returned',
    content: `Dear Colleague,

Re: Michael Chen - Initial Consultation

This letter confirms that Mr. Chen attended our clinic on 14th December 2024 for an initial fertility assessment.

**History:**
Trying to conceive for 18 months without success.

**Investigations Requested:**
- Semen analysis
- Hormone profile

**Follow-up:**
Patient to return in 4 weeks with results.

Kind regards,
Dr. Sarah Johnson`,
    returnReason: 'Please add the patient date of birth and NHS number.',
    approvedAt: new Date('2024-12-14T10:00:00'),
    createdAt: new Date('2024-12-14T10:00:00'),
    updatedAt: new Date('2024-12-16T09:00:00'),
  },
  {
    id: 'letter-3',
    sessionId: 'session-3',
    patientName: 'Emily Watson',
    patientId: 'patient-3',
    sessionDate: new Date('2024-12-10'),
    templateType: 'Letter to GP',
    originatingDoctor: 'Dr. Shahid Saya',
    status: 'sent',
    content: `Dear Dr. Thompson,

Re: Emily Watson

Follow-up letter regarding ongoing treatment...`,
    sentAt: new Date('2024-12-11T11:00:00'),
    approvedAt: new Date('2024-12-10T16:00:00'),
    createdAt: new Date('2024-12-10T16:00:00'),
    updatedAt: new Date('2024-12-11T11:00:00'),
  },
  {
    id: 'letter-4',
    sessionId: 'session-4',
    patientName: 'James Williams',
    patientId: 'patient-4',
    sessionDate: new Date('2024-12-12'),
    templateType: 'Letter to GP',
    originatingDoctor: 'Dr. Michael Chen',
    status: 'sent',
    content: `Dear Dr. Richards,

Re: James Williams

Treatment summary letter...`,
    sentAt: new Date('2024-12-13T09:30:00'),
    approvedAt: new Date('2024-12-12T15:00:00'),
    createdAt: new Date('2024-12-12T15:00:00'),
    updatedAt: new Date('2024-12-13T09:30:00'),
  },
];

export const LettersProvider = ({ children }: { children: ReactNode }) => {
  const [letters, setLetters] = useState<Letter[]>(demoLetters);
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);

  const getLettersByStatus = (status: LetterStatus) => {
    return letters.filter(letter => letter.status === status);
  };

  const getLetter = (id: string) => {
    return letters.find(letter => letter.id === id);
  };

  const getLetterBySessionId = (sessionId: string) => {
    return letters.find(letter => letter.sessionId === sessionId);
  };

  const createLetter = (data: LetterFormData): Letter => {
    const newLetter: Letter = {
      id: `letter-${Date.now()}`,
      sessionId: data.sessionId,
      patientName: data.patientName,
      patientId: data.patientId,
      sessionDate: data.sessionDate,
      templateType: data.templateType,
      originatingDoctor: 'Dr. Shahid Saya', // Current user
      status: 'to_be_sent',
      content: data.content,
      approvedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLetters(prev => [newLetter, ...prev]);
    return newLetter;
  };

  const updateLetterContent = (id: string, content: string) => {
    setLetters(prev => prev.map(letter => 
      letter.id === id 
        ? { ...letter, content, updatedAt: new Date() }
        : letter
    ));
  };

  const markAsSent = (id: string) => {
    setLetters(prev => prev.map(letter =>
      letter.id === id
        ? { ...letter, status: 'sent' as LetterStatus, sentAt: new Date(), updatedAt: new Date() }
        : letter
    ));
  };

  const returnToDoctor = (id: string, reason: string) => {
    setLetters(prev => prev.map(letter =>
      letter.id === id
        ? { ...letter, status: 'returned' as LetterStatus, returnReason: reason, updatedAt: new Date() }
        : letter
    ));
  };

  const resubmitLetter = (id: string, content: string) => {
    setLetters(prev => prev.map(letter =>
      letter.id === id
        ? { 
            ...letter, 
            status: 'to_be_sent' as LetterStatus, 
            content, 
            returnReason: undefined,
            updatedAt: new Date() 
          }
        : letter
    ));
  };

  return (
    <LettersContext.Provider value={{
      letters,
      selectedLetterId,
      setSelectedLetterId,
      getLettersByStatus,
      getLetter,
      createLetter,
      updateLetterContent,
      markAsSent,
      returnToDoctor,
      resubmitLetter,
      getLetterBySessionId,
    }}>
      {children}
    </LettersContext.Provider>
  );
};

export const useLetters = () => {
  const context = useContext(LettersContext);
  if (!context) {
    throw new Error('useLetters must be used within a LettersProvider');
  }
  return context;
};
