export type UserRole = 'Individual clinician' | 'Physician' | 'Nurse' | 'Specialist' | 'Administrator' | 'Other' | 'Admin' | 'General Admin' | 'Super Admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  clinic: string;
  title?: string;
  firstName: string;
  lastName: string;
  specialty?: string;
  clinicName?: string;
  country?: string;
}

export interface ProfileFormData {
  profileImage?: File | null;
  title: string;
  firstName: string;
  lastName: string;
  specialty: string;
  clinicName: string;
  role: UserRole;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: string;
}

export interface MemoryAISettings {
  displayLanguage: 'English' | 'French';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  detailLevel: 'Concise' | 'Default' | 'Detailed';
  voice: '1st Person' | 'Default' | '3rd Person';
  format: 'Bullet Point' | 'Default' | 'Narrative';
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
