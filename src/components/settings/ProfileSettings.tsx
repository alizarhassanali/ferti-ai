import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/user';

interface ProfileFormState {
  title: string;
  firstName: string;
  lastName: string;
  specialty: string;
  clinicName: string;
  role: UserRole;
  phoneCountryCode: string;
  phoneNumber: string;
  useInfoForSignature: boolean;
  // Language & time
  displayLanguage: string;
  dateFormat: string;
}

export const ProfileSettings = () => {
  const { user, updateProfile, isSaving } = useSettings();
  const { toast } = useToast();
  
  const getInitialState = (): ProfileFormState => ({
    title: user.title || 'Dr.',
    firstName: user.firstName,
    lastName: user.lastName,
    specialty: user.specialty || 'Fertility Specialist',
    clinicName: user.clinicName || user.clinic || '',
    role: user.role as UserRole,
    phoneCountryCode: '+1',
    phoneNumber: '',
    useInfoForSignature: false,
    displayLanguage: 'English',
    dateFormat: 'MM/DD/YYYY',
  });

  const [formData, setFormData] = useState<ProfileFormState>(getInitialState);
  const [initialData, setInitialData] = useState<ProfileFormState>(getInitialState);
  const [imagePreview, setImagePreview] = useState<string | undefined>(user.profileImage);
  const [localSaving, setLocalSaving] = useState(false);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload an image under 5MB',
          variant: 'destructive',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLocalSaving(true);
    try {
      await updateProfile(formData);
      setInitialData(formData);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLocalSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">Profile</h3>
        <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <div className="space-y-8">
        {/* About You Section */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h4 className="text-sm font-semibold text-foreground mb-6">About you</h4>

          {/* Profile Image */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Profile image</Label>
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={imagePreview} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {getInitials(formData.firstName, formData.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a JPG or PNG image up to 5MB.
                </p>
                <label htmlFor="image-upload">
                  <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload image
                    </span>
                  </Button>
                </label>
                <input id="image-upload" type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" />
              </div>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4 mb-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium mb-2 block">Title</Label>
              <Select value={formData.title} onValueChange={value => setFormData({ ...formData, title: value })}>
                <SelectTrigger id="title">
                  <SelectValue />
                </SelectTrigger>
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
              <Label htmlFor="firstName" className="text-sm font-medium mb-2 block">First name</Label>
              <Input id="firstName" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">Last name</Label>
              <Input id="lastName" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required />
            </div>
          </div>

          {/* Specialty, Clinic Name, and Role - same row, equal sizing */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="specialty" className="text-sm font-medium mb-2 block">Specialty</Label>
              <Select value={formData.specialty} onValueChange={value => setFormData({ ...formData, specialty: value })}>
                <SelectTrigger id="specialty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fertility Specialist">Fertility Specialist</SelectItem>
                  <SelectItem value="Reproductive Endocrinologist">Reproductive Endocrinologist</SelectItem>
                  <SelectItem value="OB/GYN">OB/GYN</SelectItem>
                  <SelectItem value="Urologist">Urologist</SelectItem>
                  <SelectItem value="Embryologist">Embryologist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="clinicName" className="text-sm font-medium mb-2 block">Clinic name</Label>
              <Input id="clinicName" value={formData.clinicName} onChange={e => setFormData({ ...formData, clinicName: e.target.value })} placeholder="Enter your clinic name" />
            </div>
            <div>
              <Label htmlFor="role" className="text-sm font-medium mb-2 block">Your role</Label>
              <Select value={formData.role} onValueChange={value => setFormData({ ...formData, role: value as UserRole })}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual clinician">Individual clinician</SelectItem>
                  <SelectItem value="Physician">Physician</SelectItem>
                  <SelectItem value="Nurse">Nurse</SelectItem>
                  <SelectItem value="Specialist">Specialist</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">Phone number</Label>
            <div className="flex gap-2">
              <Select value={formData.phoneCountryCode} onValueChange={(value) => setFormData({ ...formData, phoneCountryCode: value })}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">+1</SelectItem>
                  <SelectItem value="+44">+44</SelectItem>
                  <SelectItem value="+33">+33</SelectItem>
                  <SelectItem value="+49">+49</SelectItem>
                  <SelectItem value="+61">+61</SelectItem>
                </SelectContent>
              </Select>
              <Input value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} placeholder="Enter phone number" className="flex-1" />
            </div>
          </div>

          {/* Language & Time Section - moved here */}
          <div className="pt-6 mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-1">Language & time</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Change the language used in the interface.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="displayLanguage" className="text-sm font-medium mb-2 block">Display language</Label>
                <Select value={formData.displayLanguage} onValueChange={(value) => setFormData({ ...formData, displayLanguage: value })}>
                  <SelectTrigger id="displayLanguage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateFormat" className="text-sm font-medium mb-2 block">Date format</Label>
                <Select value={formData.dateFormat} onValueChange={(value) => setFormData({ ...formData, dateFormat: value })}>
                  <SelectTrigger id="dateFormat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Save / Cancel Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button onClick={handleSave} disabled={!hasChanges || localSaving || isSaving}>
            {localSaving || isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={!hasChanges || localSaving || isSaving}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
