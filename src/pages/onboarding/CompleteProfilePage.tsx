import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    signatureTitle: '',
    signatureSpecialty: '',
    signaturePreferredName: '',
  });

  const isValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.phoneNumber.trim() &&
      formData.signatureTitle &&
      formData.signatureSpecialty &&
      formData.signaturePreferredName.trim()
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) {
      return;
    }

    toast({
      title: 'Profile saved',
      description: 'Your profile has been set up successfully.',
    });

    navigate('/new-session');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Complete your profile</CardTitle>
          <CardDescription>
            This information will appear on generated notes and letters.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section A: Profile */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Profile Information</h3>
              
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

              {/* Phone number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number <span className="text-destructive">*</span></Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Section B: Signature Settings */}
            <div className="border border-border rounded-lg p-6 bg-card space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Signature Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Configure the signature that appears on your generated notes and letters.
                </p>
              </div>

              {/* Email - read only */}
              <div className="space-y-2">
                <Label htmlFor="signatureEmail">Email</Label>
                <Input
                  id="signatureEmail"
                  type="email"
                  value="invited.user@clinic.com"
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

              {/* Preferred name */}
              <div className="space-y-2">
                <Label htmlFor="signaturePreferredName">
                  Preferred name on generated templates <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="signaturePreferredName"
                  value={formData.signaturePreferredName}
                  onChange={(e) => setFormData({ ...formData, signaturePreferredName: e.target.value })}
                  placeholder="e.g., Dr. Jane Smith"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This name will appear on notes/letters.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/onboarding/create-password')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!isValid()}
              >
                Finish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfilePage;
