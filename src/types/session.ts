export interface Session {
  id: string;
  title: string;
  patientName?: string;
  patientDetails?: string;
  date: Date;
  time: string;
  language: string;
  duration: number; // in seconds
  status: 'empty' | 'recording' | 'processing' | 'complete' | 'error';
  hasTranscript: boolean;
  hasNotes: boolean;
  transcript?: TranscriptData;
  dictation?: string;
  notes?: NoteData[];
}

export interface Patient {
  id: string;
  name: string;
  identifier?: string;
  additionalContext?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteTab {
  id: string;
  title: string;
  templateId: string;
  content: string;
}

export type RecordingMode = 'transcribe' | 'dictate';
export type MainTab = 'context' | 'transcript' | 'dictation' | 'note';

export interface TranscriptData {
  segments: {
    timestamp: string;
    text: string;
  }[];
  fullText: string;
}

export interface NoteData {
  id: string;
  type: 'clinical_note' | 'letter_to_gp' | 'soap_note' | 'custom';
  title: string;
  content: string;
  isClosable: boolean;
}

export const demoSessions: Session[] = [
  {
    id: "1",
    title: "Untitled session",
    date: new Date("2025-11-27T22:45:00"),
    time: "10:45PM",
    language: "English",
    duration: 0,
    status: "empty",
    hasTranscript: false,
    hasNotes: false
  },
  {
    id: "2",
    title: "Unknown Session",
    date: new Date("2025-11-27T17:36:00"),
    time: "5:36PM",
    language: "English",
    duration: 11,
    status: "complete",
    hasTranscript: true,
    hasNotes: true,
    transcript: {
      segments: [
        { timestamp: "0:00", text: "And as you can see, like it doesn't really tell you the dictation or anything like that, right? But when I stop it," }
      ],
      fullText: "And as you can see, like it doesn't really tell you the dictation or anything like that, right? But when I stop it,"
    },
    dictation: "As you can see, it doesn't really tell you the dictation or anything like that. But when I stop it...",
    notes: [
      {
        id: "n1",
        type: "clinical_note",
        title: "Clinical Note",
        content: "As you can see, it doesn't really tell you the dictation or anything like that. But when I stop it..",
        isClosable: true
      },
      {
        id: "n2",
        type: "custom",
        title: "Infection Risks.",
        content: "...",
        isClosable: true
      }
    ]
  },
  {
    id: "3",
    title: "Test Patient",
    patientName: "Test Patient",
    patientDetails: "Fertility Care Perspective",
    date: new Date("2025-11-26T02:59:00"),
    time: "2:59AM",
    language: "English",
    duration: 22,
    status: "complete",
    hasTranscript: true,
    hasNotes: true,
    transcript: {
      segments: [
        { timestamp: "", text: "Within this patient came to me to see uh um me from a fertility care perspective uh not a good diagnosis. They were rude to me. I was not good to them. blah. Let's see how well you did on the dictation." }
      ],
      fullText: "Within this patient came to me to see uh um me from a fertility care perspective uh not a good diagnosis. They were rude to me. I was not good to them. blah. Let's see how well you did on the dictation."
    },
    dictation: "This patient came to see me from a fertility care perspective. Not a good diagnosis. They were rude to me. I was not good to them.",
    notes: [
      {
        id: "n1",
        type: "letter_to_gp",
        title: "Letter to GP",
        content: "GP Address\n\nDear Doctor\n\nRe: Test Patient, DOB: [DOB]\n\nThis patient presented to me from a fertility care perspective.\n\nThe patient presented for fertility care and received a poor diagnosis.\n\nOn examination,\n\nDuring the consultation, we discussed the diagnosis.",
        isClosable: true
      }
    ]
  },
  {
    id: "4",
    title: "Dsflkdsh;lfd",
    date: new Date("2025-11-27T17:34:00"),
    time: "5:34PM",
    language: "English",
    duration: 0,
    status: "empty",
    hasTranscript: false,
    hasNotes: false
  }
];
