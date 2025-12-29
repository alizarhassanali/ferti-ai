import { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, ProfileFormData, SecuritySettings } from '@/types/user';

interface PrivacySettings {
  consentPopupEnabled: boolean;
}

interface SettingsContextValue {
  user: UserProfile;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isSaving: boolean;
  error: string | null;
  updateProfile: (data: Partial<ProfileFormData>) => Promise<void>;
  changePassword: (current: string, newPassword: string) => Promise<void>;
  securitySettings: SecuritySettings;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => Promise<void>;
  privacySettings: PrivacySettings;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

// Mock user data
const mockUser: UserProfile = {
  id: '1',
  name: 'Dr. Shahid Saya',
  email: 'shahid.saya@fertilitypartners.ca',
  role: 'Physician',
  clinic: 'Fertility Partners - Toronto',
  firstName: 'Shahid',
  lastName: 'Saya',
  title: 'Dr.',
  specialty: 'Fertility Specialist',
  clinicName: 'Fertility Partners',
  country: 'Canada',
};

const PRIVACY_STORAGE_KEY = 'medical-scribe-privacy-settings';

const getInitialPrivacySettings = (): PrivacySettings => {
  try {
    const saved = localStorage.getItem(PRIVACY_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load privacy settings:', e);
  }
  return { consentPopupEnabled: true };
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<UserProfile>(mockUser);
  const [selectedCategory, setSelectedCategory] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: '30 minutes',
  });
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(getInitialPrivacySettings);

  const updateProfile = async (data: Partial<ProfileFormData>) => {
    setIsSaving(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile updated:', data);
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const changePassword = async (current: string, newPassword: string) => {
    setIsSaving(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password changed');
    } catch (err) {
      setError('Failed to change password');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const updateSecuritySettings = async (settings: Partial<SecuritySettings>) => {
    setIsSaving(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSecuritySettings(prev => ({ ...prev, ...settings }));
    } catch (err) {
      setError('Failed to update security settings');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const updatePrivacySettings = async (settings: Partial<PrivacySettings>) => {
    setIsSaving(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newSettings = { ...privacySettings, ...settings };
      setPrivacySettings(newSettings);
      localStorage.setItem(PRIVACY_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (err) {
      setError('Failed to update privacy settings');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        user,
        selectedCategory,
        setSelectedCategory,
        isSaving,
        error,
        updateProfile,
        changePassword,
        securitySettings,
        updateSecuritySettings,
        privacySettings,
        updatePrivacySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
