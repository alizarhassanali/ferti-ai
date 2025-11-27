export type UserRole = 'Physician' | 'Nurse' | 'Admin' | 'General Admin' | 'Super Admin';

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
  organisation?: string;
  companySize?: string;
}

export interface ProfileFormData {
  profileImage?: File | null;
  title: string;
  firstName: string;
  lastName: string;
  specialty: string;
  organisation: string;
  companySize: string;
  role: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
