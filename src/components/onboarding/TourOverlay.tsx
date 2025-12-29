import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboardingTour } from '@/contexts/OnboardingTourContext';
import { X } from 'lucide-react';

export const TourOverlay = () => {
  const { isActive, currentStep, currentStepData, totalSteps, nextStep, skipTour } = useOnboardingTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !currentStepData) return;

    const findTarget = () => {
      const target = document.querySelector(currentStepData.targetSelector);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect(rect);
        
        // Scroll target into view if needed
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setTargetRect(null);
      }
    };

    // Small delay to allow DOM to settle
    const timeoutId = setTimeout(findTarget, 100);
    window.addEventListener('resize', findTarget);
    window.addEventListener('scroll', findTarget);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', findTarget);
      window.removeEventListener('scroll', findTarget);
    };
  }, [isActive, currentStepData]);

  if (!isActive || !currentStepData) return null;

  const getTooltipPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const padding = 16;
    const tooltipWidth = 320;
    const tooltipHeight = 180;

    switch (currentStepData.position) {
      case 'right':
        return {
          top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
          left: targetRect.right + padding,
        };
      case 'left':
        return {
          top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
          left: targetRect.left - tooltipWidth - padding,
        };
      case 'bottom':
        return {
          top: targetRect.bottom + padding,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        };
      case 'top':
        return {
          top: targetRect.top - tooltipHeight - padding,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        };
      default:
        return {
          top: targetRect.bottom + padding,
          left: targetRect.left,
        };
    }
  };

  const tooltipStyle = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto">
      {/* Dimmed overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="8"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.6)"
          mask="url(#tour-mask)"
          className="animate-fade-in"
        />
      </svg>

      {/* Highlight ring around target */}
      {targetRect && (
        <div
          className="absolute border-2 border-brand rounded-lg pointer-events-none animate-pulse"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: '0 0 0 4px rgba(255, 136, 124, 0.3)',
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bg-white rounded-2xl shadow-xl border border-border p-5 w-80 animate-scale-in"
        style={{
          top: tooltipStyle.top,
          left: tooltipStyle.left,
          zIndex: 101,
        }}
      >
        <button
          onClick={skipTour}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentStepData.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={skipTour}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip
            </Button>
            <Button
              size="sm"
              onClick={nextStep}
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentStep ? 'bg-brand' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
