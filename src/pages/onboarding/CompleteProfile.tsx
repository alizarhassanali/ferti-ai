import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  language: string;
  // Signature settings (for physicians)
  signatureTitle: string;
  signatureSpecialty: string;
  signaturePreferredName: string;
  signatureEmail: string;
  includeClinicName: boolean;
}

export const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get data passed from SetPassword screen
  const stateData = location.state as {
    role?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  } | null;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRole, setUserRole] = useState<string>('staff');
  const [userEmail, setUserEmail] = useState<string>('');
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: stateData?.firstName || '',
    lastName: stateData?.lastName || '',
    phoneCountryCode: '+1',
    phoneNumber: '',
    language: 'English',
    signatureTitle: '',
    signatureSpecialty: '',
    signaturePreferredName: '',
    signatureEmail: '',
    includeClinicName: false,
  });

  const isPhysician = userRole === 'physician';

  // Check auth and load existing profile data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not logged in, redirect to login
        navigate('/auth');
        return;
      }

      // Set role from state or user metadata
      const role = stateData?.role || session.user.user_metadata?.role || 'staff';
      setUserRole(role);
      setUserEmail(session.user.email || stateData?.email || '');

      // Try to load existing profile
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-user-profile`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              'Authorization': `Bearer ${session.access_token}`,
            },
          }
        );

        if (response.ok) {
          const profile = await response.json();
          setFormData(prev => ({
            ...prev,
            firstName: profile.first_name || stateData?.firstName || '',
            lastName: profile.last_name || stateData?.lastName || '',
            phoneCountryCode: profile.phone_country_code || '+1',
            phoneNumber: profile.phone_number || '',
            language: profile.language || 'English',
            signatureTitle: profile.signature_title || '',
            signatureSpecialty: profile.signature_specialty || '',
            signaturePreferredName: profile.signature_preferred_name || '',
            signatureEmail: profile.signature_email || session.user.email || '',
            includeClinicName: profile.include_clinic_name || false,
          }));
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, stateData]);

  // Generate default preferred name when first/last name changes
  useEffect(() => {
    if (isPhysician && formData.firstName && formData.lastName && !formData.signaturePreferredName) {
      setFormData(prev => ({
        ...prev,
        signaturePreferredName: `Dr. ${formData.firstName} ${formData.lastName}`,
      }));
    }
  }, [formData.firstName, formData.lastName, isPhysician]);

  // Set signature email if empty
  useEffect(() => {
    if (isPhysician && userEmail && !formData.signatureEmail) {
      setFormData(prev => ({
        ...prev,
        signatureEmail: userEmail,
      }));
    }
  }, [userEmail, isPhysician]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: 'Session expired',
          description: 'Please log in again.',
          variant: 'destructive',
        });
        navigate('/auth');
        return;
      }

      const updatePayload: Record<string, any> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_country_code: formData.phoneCountryCode,
        phone_number: formData.phoneNumber,
        language: formData.language,
        profile_completed: true,
      };

      // Add signature fields for physicians
      if (isPhysician) {
        updatePayload.signature_title = formData.signatureTitle;
        updatePayload.signature_specialty = formData.signatureSpecialty;
        updatePayload.signature_preferred_name = formData.signaturePreferredName;
        updatePayload.signature_email = formData.signatureEmail;
        updatePayload.include_clinic_name = formData.includeClinicName;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-user-profile`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(updatePayload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }

      toast({
        title: 'Profile updated',
        description: 'Your profile has been set up successfully.',
      });

      // Navigate to main app
      navigate('/new-session');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation
  const isValid = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return false;
    }
    if (isPhysician) {
      if (!formData.signatureTitle.trim() || !formData.signatureSpecialty.trim() || !formData.signaturePreferredName.trim()) {
        return false;
      }
    }
    return true;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading your profile...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Complete your profile</CardTitle>
          <CardDescription>
            This helps personalize your notes and templates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email - read only */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                disabled
                className="bg-muted"
              />
            </div>

            {/* Language preference */}
            <div className="space-y-2">
              <Label htmlFor="language">Preferred language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name <span className="text-destructive">*</span></Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name <span className="text-destructive">*</span></Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Phone number - single instance */}
            <div className="space-y-2">
              <Label>Phone number</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.phoneCountryCode}
                  onValueChange={(value) => setFormData({ ...formData, phoneCountryCode: value })}
                >
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
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Enter phone number"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Physician-specific: Signature Settings */}
            {isPhysician && (
              <div className="border border-border rounded-lg p-6 bg-card space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Signature Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure the signature that appears on your generated notes and letters.
                  </p>
                </div>

                {/* Signature email - read only */}
                <div className="space-y-2">
                  <Label htmlFor="signatureEmail">Email</Label>
                  <Input
                    id="signatureEmail"
                    type="email"
                    value={formData.signatureEmail}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {/* Title and Specialty */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signatureTitle">Title <span className="text-destructive">*</span></Label>
                    <Select
                      value={formData.signatureTitle}
                      onValueChange={(value) => setFormData({ ...formData, signatureTitle: value })}
                    >
                      <SelectTrigger id="signatureTitle">
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr.">Dr.</SelectItem>
                        <SelectItem value="MD">MD</SelectItem>
                        <SelectItem value="DO">DO</SelectItem>
                        <SelectItem value="MBBS">MBBS</SelectItem>
                        <SelectItem value="Prof.">Prof.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signatureSpecialty">Specialty <span className="text-destructive">*</span></Label>
                    <Select
                      value={formData.signatureSpecialty}
                      onValueChange={(value) => setFormData({ ...formData, signatureSpecialty: value })}
                    >
                      <SelectTrigger id="signatureSpecialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fertility Specialist">Fertility Specialist</SelectItem>
                        <SelectItem value="Reproductive Endocrinologist">Reproductive Endocrinologist</SelectItem>
                        <SelectItem value="OB/GYN">OB/GYN</SelectItem>
                        <SelectItem value="Urologist">Urologist</SelectItem>
                        <SelectItem value="Embryologist">Embryologist</SelectItem>
                        <SelectItem value="General Practitioner">General Practitioner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preferred display name */}
                <div className="space-y-2">
                  <Label htmlFor="signaturePreferredName">
                    Preferred name on generated templates <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="signaturePreferredName"
                    value={formData.signaturePreferredName}
                    onChange={(e) => setFormData({ ...formData, signaturePreferredName: e.target.value })}
                    placeholder="e.g., Dr. Shahid Saya"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the name that will appear on generated notes and letters.
                  </p>
                </div>

                {/* Include clinic name checkbox */}
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="includeClinicName"
                    checked={formData.includeClinicName}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, includeClinicName: checked as boolean })
                    }
                  />
                  <Label htmlFor="includeClinicName" className="text-sm font-medium cursor-pointer">
                    Include Clinic Name in signature
                  </Label>
                </div>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !isValid()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save and continue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;
