import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { OnboardingStepOne } from './OnboardingStepOne';
import { OnboardingStepTwo } from './OnboardingStepTwo';

export interface OnboardingFormState {
  title: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  specialty: string;
  phoneCountryCode: string;
  phoneNumber: string;
  displayLanguage: string;
  agreedToTerms: boolean;
}

export const NewUserOnboardingModal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<OnboardingFormState>({
    title: 'Dr.',
    firstName: '',
    lastName: '',
    preferredName: '',
    specialty: '',
    phoneCountryCode: '+1',
    phoneNumber: '',
    displayLanguage: 'English',
    agreedToTerms: false,
  });

  const handleStepOneContinue = async () => {
    const isValid = form.firstName.trim() && form.lastName.trim() && form.specialty && form.agreedToTerms;
    if (!isValid) return;
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const res = await supabase.functions.invoke('update-user-profile', {
          body: {
            first_name: form.firstName.trim(),
            last_name: form.lastName.trim(),
            signature_title: form.title,
            signature_preferred_name: form.preferredName.trim() || null,
            signature_specialty: form.specialty,
            phone_country_code: form.phoneCountryCode,
            phone_number: form.phoneNumber.trim() || null,
            language: form.displayLanguage,
            profile_completed: true,
          },
        });
        if (res.error) throw res.error;
      }
    } catch (error) {
      console.error('Profile setup error:', error);
    } finally {
      setSaving(false);
    }
    setStep(2);
  };

  const handleFinish = () => {
    toast({ title: 'Welcome!', description: 'Your profile has been set up successfully.' });
    navigate('/new-session');
  };

  return (
    <Dialog open modal>
      <DialogContent
        className="max-w-md max-h-[90vh] p-0 gap-0 overflow-hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {step === 1 ? (
          <OnboardingStepOne
            form={form}
            setForm={setForm}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            saving={saving}
            onContinue={handleStepOneContinue}
          />
        ) : (
          <OnboardingStepTwo
            userName={`${form.title} ${form.firstName} ${form.lastName}`.trim()}
            onBack={() => setStep(1)}
            onFinish={handleFinish}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
