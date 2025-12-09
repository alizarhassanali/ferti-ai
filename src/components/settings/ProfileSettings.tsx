import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/user';
export const ProfileSettings = () => {
  const {
    user,
    updateProfile,
    isSaving
  } = useSettings();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    title: user.title || 'Dr.',
    firstName: user.firstName,
    lastName: user.lastName,
    specialty: user.specialty || 'Fertility Specialist',
    clinicName: user.clinicName || user.clinic || '',
    role: user.role as UserRole
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>(user.profileImage);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload an image under 5MB',
          variant: 'destructive'
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      });
    }
  };
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };
  return <div className="max-w-3xl">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">Personal</h3>
        <p className="text-sm text-muted-foreground">Manage your personal information and profile</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Account Info */}
        <div className="pb-6 border-b border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Account</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Clinic:</span> {user.clinic}</p>
            <p><span className="font-medium">Role:</span> {user.role}</p>
          </div>
        </div>

        {/* About You Section */}
        <div>
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
                  Upload a JPG or PNG image up to 5MB. Shows in the template community.
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
              <Select value={formData.title} onValueChange={value => setFormData({
              ...formData,
              title: value
            })}>
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
              <Input id="firstName" value={formData.firstName} onChange={e => setFormData({
              ...formData,
              firstName: e.target.value
            })} required />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">Last name</Label>
              <Input id="lastName" value={formData.lastName} onChange={e => setFormData({
              ...formData,
              lastName: e.target.value
            })} required />
            </div>
          </div>

          {/* Specialty */}
          <div className="mb-4">
            <Label htmlFor="specialty" className="text-sm font-medium mb-2 block">Specialty</Label>
            <Select value={formData.specialty} onValueChange={value => setFormData({
            ...formData,
            specialty: value
          })}>
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

          {/* Clinic Name and Role */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="clinicName" className="text-sm font-medium mb-2 block">Clinic name</Label>
              <Input id="clinicName" value={formData.clinicName} onChange={e => setFormData({
              ...formData,
              clinicName: e.target.value
            })} placeholder="Enter your clinic name" />
            </div>
            <div>
              <Label htmlFor="role" className="text-sm font-medium mb-2 block">Your role</Label>
              <Select value={formData.role} onValueChange={value => setFormData({
              ...formData,
              role: value as UserRole
            })}>
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

          {/* Country Field */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Country</Label>
              <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => toast({
              title: "Country setting",
              description: "Your country is set during registration and determines your data privacy jurisdiction. Contact support to change it."
            })}>
                Why can't I change this?
              </button>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md px-4 py-3">
              <span className="text-sm text-foreground">{user.country || 'Canada'}</span>
            </div>
            
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6">
          <Button type="submit" disabled={isSaving} className="min-w-32">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>;
};