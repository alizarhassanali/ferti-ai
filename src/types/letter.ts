export type LetterStatus = 'to_be_sent' | 'sent';

export interface Letter {
  id: string;
  sessionId: string;
  patientName: string;
  patientId?: string;
  sessionDate: Date;
  templateType: string;
  originatingDoctor: string;
  status: LetterStatus;
  content: string;
  sentAt?: Date;
  approvedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LetterFormData {
  sessionId: string;
  patientName: string;
  patientId?: string;
  sessionDate: Date;
  templateType: string;
  content: string;
}
