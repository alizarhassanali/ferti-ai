import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Key, Check } from 'lucide-react';

export const SecuritySettings = () => {
  const { changePassword, isSaving } = useSettings();
  const { toast } = useToast();

  const [isExpanded, setIsExpanded] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Password requirements validation
  const requirements = [
    { label: 'At least 8 characters', met: passwordData.newPassword.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(passwordData.newPassword) },
    { label: 'One lowercase letter', met: /[a-z]/.test(passwordData.newPassword) },
    { label: 'One number', met: /[0-9]/.test(passwordData.newPassword) },
    { label: 'One special character', met: /[^a-zA-Z0-9]/.test(passwordData.newPassword) },
  ];

  const allRequirementsMet = requirements.every(req => req.met);
  const passwordsMatch = passwordData.newPassword === passwordData.confirmPassword && passwordData.confirmPassword.length > 0;
  const canSubmit = passwordData.currentPassword && allRequirementsMet && passwordsMatch;

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure both passwords are identical.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      toast({
        title: 'Password updated successfully',
        description: 'Your password has been changed.',
      });
      handleCancel();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to change password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswords({ current: false, new: false, confirm: false });
  };

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Security</h3>
        <p className="text-sm text-muted-foreground">Manage your account security settings</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-muted rounded-lg">
            <Key className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-1">Password</h4>
            <p className="text-sm text-muted-foreground mb-4">Manage your account password</p>

            {!isExpanded ? (
              <Button variant="outline" onClick={() => setIsExpanded(true)}>
                Change Password
              </Button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4 pt-4 border-t border-border">
                {/* Current Password */}
                <div>
                  <Label htmlFor="currentPassword" className="text-sm font-medium mb-2 block">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? 'text' : 'password'}
                      placeholder="Enter your current password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <Label htmlFor="newPassword" className="text-sm font-medium mb-2 block">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? 'text' : 'password'}
                      placeholder="Enter your new password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="space-y-2">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {req.met ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className={`text-sm ${req.met ? 'text-green-500' : 'text-muted-foreground'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium mb-2 block">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" disabled={!canSubmit || isSaving}>
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
