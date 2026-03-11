import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { specialtyOptions } from '@/data/hubTemplates';
import type { OnboardingFormState } from './NewUserOnboardingModal';

interface Props {
  form: OnboardingFormState;
  setForm: (form: OnboardingFormState) => void;
  imagePreview: string | undefined;
  setImagePreview: (url: string | undefined) => void;
  saving: boolean;
  onContinue: () => void;
}

export const OnboardingStepOne = ({ form, setForm, imagePreview, setImagePreview, saving, onContinue }: Props) => {
  const { toast } = useToast();
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

  return (
    <div className="overflow-y-auto max-h-[90vh] p-8 pb-6">
      {/* Logo + Header */}
      <div className="flex flex-col items-center mb-6">
        
        <DialogTitle className="text-2xl font-semibold text-foreground text-center">
          Tell us about yourself
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground text-center mt-1">
          Let's get your account set up.
        </DialogDescription>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <label htmlFor="onboarding-image-upload" className="relative cursor-pointer group">
          <Avatar className="h-20 w-20 transition-opacity group-hover:opacity-75">
            <AvatarImage src={imagePreview} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 shadow-md border-2 border-background transition-transform group-hover:scale-110">
            <Camera className="h-3.5 w-3.5" />
          </span>
        </label>
        <input id="onboarding-image-upload" type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" />
        <p className="text-xs text-muted-foreground mt-2">Click to upload photo</p>
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
          />
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">
            Last name <span className="text-destructive">*</span>
          </Label>
          <Input
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
      </div>

      {/* Preferred Name */}
      <div className="mb-4">
        <Label className="text-sm font-medium mb-1.5 block">Preferred name</Label>
        <Input
          value={form.preferredName}
          onChange={(e) => setForm({ ...form, preferredName: e.target.value })}
          placeholder="The name you prefer to go by"
        />
      </div>

      {/* Specialty */}
      <div className="mb-4">
        <Label className="text-sm font-medium mb-1.5 block">
          Specialty <span className="text-destructive">*</span>
        </Label>
        <Select value={form.specialty} onValueChange={(v) => setForm({ ...form, specialty: v })}>
          <SelectTrigger><SelectValue placeholder="Select speciality" /></SelectTrigger>
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
            placeholder="Enter phone number"
            className="flex-1"
          />
        </div>
      </div>

      {/* Display Language */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-1.5 block">Display language</Label>
        <Select value={form.displayLanguage} onValueChange={(v) => setForm({ ...form, displayLanguage: v })}>
          <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
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
          I agree to the{' '}
          <a href="#" className="text-[hsl(var(--link))] underline">Privacy Policy</a> and{' '}
          <a href="#" className="text-[hsl(var(--link))] underline">Terms of Use</a>
        </label>
      </div>

      {/* Continue Button */}
      <Button
        onClick={onContinue}
        disabled={!isValid || saving}
        className="w-full"
        size="lg"
      >
        {saving ? 'Setting up...' : 'Continue'}
      </Button>
    </div>
  );
};
