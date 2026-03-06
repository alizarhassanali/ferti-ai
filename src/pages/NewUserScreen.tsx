import NewSession from './NewSession';
import { NewUserOnboardingModal } from '@/components/onboarding/NewUserOnboardingModal';

const NewUserScreen = () => {
  return (
    <>
      <NewSession />
      <NewUserOnboardingModal />
    </>
  );
};

export default NewUserScreen;
