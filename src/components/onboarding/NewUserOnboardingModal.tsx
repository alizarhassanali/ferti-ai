import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Upload, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ottoLogo from '@/assets/otto-icon.png';
import { specialtyOptions } from '@/data/hubTemplates';
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
      if (!session) {
        toast({ title: 'Not authenticated', description: 'Please log in first.', variant: 'destructive' });
        return;
      }

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
      setStep(2);
    } catch (error) {
      console.error('Profile setup error:', error);
      toast({ title: 'Error', description: 'Failed to save your profile. Please try again.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
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
