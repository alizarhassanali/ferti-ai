import { useState, useEffect } from 'react';
import NewSession from './NewSession';
import { NewUserOnboardingModal } from '@/components/onboarding/NewUserOnboardingModal';
import { supabase } from '@/integrations/supabase/client';

const NewUserScreen = () => {
  const [demoMode, setDemoMode] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setDemoMode(!session);
    });
  }, []);

  if (demoMode === null) return null;

  return (
    <>
      <NewSession />
      <NewUserOnboardingModal demoMode={demoMode} />
    </>
  );
};

export default NewUserScreen;
