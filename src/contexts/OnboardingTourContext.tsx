import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    id: 'view-sessions',
    title: 'View Sessions',
    description: 'Access all your past and upcoming sessions here.',
    targetSelector: '[data-tour="view-sessions"]',
    position: 'right',
  },
  {
    id: 'new-session',
    title: 'New Session',
    description: 'Start a new patient session with transcription and notes.',
    targetSelector: '[data-tour="new-session"]',
    position: 'right',
  },
  {
    id: 'transcribe',
    title: 'Transcribe',
    description: 'Record and transcribe your conversations in real-time.',
    targetSelector: '[data-tour="transcribe"]',
    position: 'bottom',
  },
  {
    id: 'context-note-tabs',
    title: 'Context & Notes',
    description: 'Switch between context information and generated notes.',
    targetSelector: '[data-tour="context-tabs"]',
    position: 'top',
  },
  {
    id: 'letters',
    title: 'Letters',
    description: 'Generate and manage referral letters here.',
    targetSelector: '[data-tour="letters"]',
    position: 'right',
  },
];

interface OnboardingTourContextType {
  isActive: boolean;
  currentStep: number;
  currentStepData: TourStep | null;
  totalSteps: number;
  startTour: () => void;
  nextStep: () => void;
  skipTour: () => void;
  completeTour: () => void;
  hasCompletedTour: boolean;
}

const OnboardingTourContext = createContext<OnboardingTourContextType | undefined>(undefined);

const TOUR_COMPLETED_KEY = 'fertiai_onboarding_completed';

export const OnboardingTourProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedTour, setHasCompletedTour] = useState(true);

  useEffect(() => {
    const completed = localStorage.getItem(TOUR_COMPLETED_KEY);
    setHasCompletedTour(completed === 'true');
  }, []);

  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };

  const skipTour = () => {
    completeTour();
  };

  const completeTour = () => {
    setIsActive(false);
    setCurrentStep(0);
    setHasCompletedTour(true);
    localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
  };

  const currentStepData = isActive ? tourSteps[currentStep] : null;

  return (
    <OnboardingTourContext.Provider
      value={{
        isActive,
        currentStep,
        currentStepData,
        totalSteps: tourSteps.length,
        startTour,
        nextStep,
        skipTour,
        completeTour,
        hasCompletedTour,
      }}
    >
      {children}
    </OnboardingTourContext.Provider>
  );
};

export const useOnboardingTour = () => {
  const context = useContext(OnboardingTourContext);
  if (!context) {
    throw new Error('useOnboardingTour must be used within OnboardingTourProvider');
  }
  return context;
};
