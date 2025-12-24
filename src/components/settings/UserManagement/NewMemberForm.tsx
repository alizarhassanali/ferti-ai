import { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateInvite } from '@/hooks/useTeamMembers';
import { TeamMemberRole } from '@/types/team';
import { toast } from 'sonner';

interface NewMemberFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const roleOptions: { value: TeamMemberRole; label: string }[] = [
  { value: 'admin', label: 'Administrator' },
  { value: 'physician', label: 'Physician' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'staff', label: 'Staff' },
];

export const NewMemberForm = ({ onBack, onSuccess }: NewMemberFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMemberRole | ''>('');
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
  }>({});

  const { createInvite, isLoading, error: apiError, setError: setApiError } = useCreateInvite();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    const result = await createInvite({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      role: role as TeamMemberRole,
    });

    if (result) {
      toast.success('Invite sent successfully');
      if (result.invite.inviteLink) {
        setInviteLink(result.invite.inviteLink);
      } else {
        onSuccess();
        onBack();
      }
    }
  };

  const handleCopyLink = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success('Invite link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDone = () => {
    onSuccess();
    onBack();
  };

  if (inviteLink) {
    return (
      <div className="space-y-6">
        <button
          onClick={handleDone}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to User Management
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-foreground">Invitation Sent</h1>
          <p className="text-sm text-muted-foreground mt-1">
            An invitation has been created for {firstName} {lastName}
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
          <p className="text-sm text-foreground">
            Share this link with the new team member to complete their registration:
          </p>
          <div className="flex items-center gap-2">
            <Input
              value={inviteLink}
              readOnly
              className="flex-1 bg-background"
            />
            <Button onClick={handleCopyLink} variant="outline" className="gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This link will expire in 7 days.
          </p>
        </div>

        <Button onClick={handleDone}>
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to User Management
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">New Member</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Invite a new team member to join your organization
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name *</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors(prev => ({ ...prev, firstName: undefined }));
              }}
              placeholder="Enter first name"
              className={errors.firstName ? 'border-destructive' : ''}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name *</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName) setErrors(prev => ({ ...prev, lastName: undefined }));
              }}
              placeholder="Enter last name"
              className={errors.lastName ? 'border-destructive' : ''}
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              if (apiError) setApiError(null);
            }}
            placeholder="Enter email address"
            className={errors.email || apiError ? 'border-destructive' : ''}
          />
          <p className="text-xs text-muted-foreground">
            This email address will receive a link to create an account.
          </p>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
          {apiError && (
            <p className="text-xs text-destructive">{apiError}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Assigned role *</Label>
          <Select
            value={role}
            onValueChange={(value) => {
              setRole(value as TeamMemberRole);
              if (errors.role) setErrors(prev => ({ ...prev, role: undefined }));
            }}
          >
            <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {roleOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-xs text-destructive">{errors.role}</p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send invitation'}
          </Button>
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
