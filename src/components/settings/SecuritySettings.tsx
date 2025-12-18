import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Key, Check, X, AlertCircle } from 'lucide-react';

export const SecuritySettings = () => {
  const { changePassword, isSaving } = useSettings();
  const { toast } = useToast();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
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
    { label: 'One special character (!@#$%^&*)', met: /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword) },
    { label: 'No spaces', met: passwordData.newPassword.length > 0 && !/\s/.test(passwordData.newPassword) },
    { 
      label: 'Must not match current password', 
      met: passwordData.newPassword.length > 0 && passwordData.currentPassword.length > 0 && passwordData.newPassword !== passwordData.currentPassword 
    },
  ];

  const allRequirementsMet = requirements.every(req => req.met);
  const passwordsMatch = passwordData.newPassword === passwordData.confirmPassword && passwordData.confirmPassword.length > 0;
  const canSubmit = passwordData.currentPassword.length > 0 && allRequirementsMet && passwordsMatch;

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
        description: 'Failed to change password. Please check your current password and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setShowRequirements(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswords({ current: false, new: false, confirm: false });
  };

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Security</h3>
        <p className="text-sm text-muted-foreground">Manage your account security</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-muted rounded-lg">
            <Key className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-1">Password</h4>
            <p className="text-sm text-muted-foreground mb-4">Change your account password</p>

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
                      aria-describedby="current-password-hint"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPasswords.current ? 'Hide password' : 'Show password'}
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
                      onFocus={() => setShowRequirements(true)}
                      className="pr-10"
                      aria-describedby="password-requirements"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPasswords.new ? 'Hide password' : 'Show password'}
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements - only show when new password field has focus or has content */}
                {showRequirements && (
                  <div 
                    id="password-requirements" 
                    className="bg-muted/50 rounded-lg p-4 space-y-2"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-sm font-medium text-foreground mb-2">Password requirements:</p>
                    {requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {req.met ? (
                          <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
                        )}
                        <span 
                          className={`text-sm ${req.met ? 'text-green-600' : 'text-muted-foreground'}`}
                          aria-label={req.met ? `${req.label} - requirement met` : `${req.label} - requirement not met`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

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
                      className={`pr-10 ${passwordData.confirmPassword.length > 0 && !passwordsMatch ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      aria-describedby="confirm-password-error"
                      aria-invalid={passwordData.confirmPassword.length > 0 && !passwordsMatch}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPasswords.confirm ? 'Hide password' : 'Show password'}
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {/* Password match indicator */}
                  {passwordData.confirmPassword.length > 0 && (
                    <div 
                      id="confirm-password-error"
                      className={`flex items-center gap-2 mt-2 text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}
                      role="alert"
                      aria-live="polite"
                    >
                      {passwordsMatch ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          <span>Passwords match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          <span>Passwords do not match</span>
                        </>
                      )}
                    </div>
                  )}
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