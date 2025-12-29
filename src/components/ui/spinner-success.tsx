import { Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerSuccessProps {
  isLoading: boolean;
  isComplete: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

/**
 * Animated spinner that morphs into a checkmark on completion
 */
export const SpinnerSuccess = ({
  isLoading,
  isComplete,
  size = 'md',
  className,
}: SpinnerSuccessProps) => {
  const iconSize = sizeClasses[size];

  if (isComplete) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center text-success animate-scale-in',
          className
        )}
      >
        <Check className={iconSize} strokeWidth={3} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn('inline-flex items-center justify-center text-muted-foreground', className)}
      >
        <Loader2 className={cn(iconSize, 'animate-spin')} />
      </div>
    );
  }

  return null;
};
