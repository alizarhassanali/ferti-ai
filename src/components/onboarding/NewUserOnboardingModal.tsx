import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ottoLogo from '@/assets/otto-icon.png';
import { specialtyOptions } from '@/data/hubTemplates';

interface OnboardingFormState {
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

  const isValid = form.firstName.trim() && form.lastName.trim() && form.specialty && form.agreedToTerms;

  const getInitials = () => {
    const f = form.firstName?.[0] || '';
    const l = form.lastName?.[0] || '';
    return (f + l).toUpperCase() || '?';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload an image under 5MB.', variant: 'destructive' });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleContinue = async () => {
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

      toast({ title: 'Welcome!', description: 'Your profile has been set up successfully.' });
      navigate('/new-session');
    } catch (error) {
      console.error('Profile setup error:', error);
      toast({ title: 'Error', description: 'Failed to save your profile. Please try again.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open modal>
      <DialogContent
        className="max-w-md max-h-[90vh] p-0 gap-0 overflow-hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Scrollable inner content */}
        <div className="overflow-y-auto max-h-[90vh] p-8 pb-6">
          {/* Logo + Header */}
          <div className="flex flex-col items-center mb-6">
            <img src={ottoLogo} alt="Otto" className="h-12 w-12 mb-4" />
            <DialogTitle className="text-2xl font-semibold text-foreground text-center">
              Tell us about yourself
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-center mt-1">
              Let's get your account set up.
            </DialogDescription>
          </div>

          {/* Profile Image */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={imagePreview} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">JPG, PNG up to 5MB</p>
              <label htmlFor="onboarding-image-upload">
                <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
                  <span>
                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                    Upload
                  </span>
                </Button>
              </label>
              <input id="onboarding-image-upload" type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          {/* Title + First/Last Name */}
          <div className="grid grid-cols-[90px_1fr_1fr] gap-3 mb-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Title</Label>
              <Select value={form.title} onValueChange={(v) => setForm({ ...form, title: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                  <SelectItem value="Ms.">Ms.</SelectItem>
                  <SelectItem value="Mx.">Mx.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">
                First name <span className="text-destructive">*</span>
              </Label>
              <Input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="First name"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">
                Last name <span className="text-destructive">*</span>
              </Label>
              <Input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Preferred Name */}
          <div className="mb-4">
            <Label className="text-sm font-medium mb-1.5 block">Preferred name</Label>
            <Input
              value={form.preferredName}
              onChange={(e) => setForm({ ...form, preferredName: e.target.value })}
              placeholder="How would you like to be called?"
            />
          </div>

          {/* Specialty */}
          <div className="mb-4">
            <Label className="text-sm font-medium mb-1.5 block">
              Specialty <span className="text-destructive">*</span>
            </Label>
            <Select value={form.specialty} onValueChange={(v) => setForm({ ...form, specialty: v })}>
              <SelectTrigger><SelectValue placeholder="Select your specialty" /></SelectTrigger>
              <SelectContent>
                {specialtyOptions.filter(s => s !== 'All').map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Label className="text-sm font-medium mb-1.5 block">Phone number</Label>
            <div className="flex gap-2">
              <Select value={form.phoneCountryCode} onValueChange={(v) => setForm({ ...form, phoneCountryCode: v })}>
                <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">+1</SelectItem>
                  <SelectItem value="+44">+44</SelectItem>
                  <SelectItem value="+33">+33</SelectItem>
                  <SelectItem value="+49">+49</SelectItem>
                  <SelectItem value="+61">+61</SelectItem>
                  <SelectItem value="+92">+92</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                placeholder="Phone number"
                className="flex-1"
              />
            </div>
          </div>

          {/* Display Language */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-1.5 block">Display language</Label>
            <Select value={form.displayLanguage} onValueChange={(v) => setForm({ ...form, displayLanguage: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2.5 mb-6">
            <Checkbox
              id="terms"
              checked={form.agreedToTerms}
              onCheckedChange={(checked) => setForm({ ...form, agreedToTerms: checked === true })}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-snug cursor-pointer">
              I have read and agree to abide by the{' '}
              <a href="#" className="text-[hsl(var(--link))] underline">Usage Policy</a>,{' '}
              <a href="#" className="text-[hsl(var(--link))] underline">Privacy Policy</a> and{' '}
              <a href="#" className="text-[hsl(var(--link))] underline">Terms of Use</a>
            </label>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!isValid || saving}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {saving ? 'Setting up...' : 'Continue'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
