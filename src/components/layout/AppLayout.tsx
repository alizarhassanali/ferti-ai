import { ReactNode } from 'react';
import { LeftPane } from '@/components/settings/LeftPane';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LeftPane />
      {/* Main content area with CNP gradient background */}
      <div className="flex-1 relative overflow-hidden">
        {/* Subtle blush-lavender gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, hsl(11 100% 95% / 0.35) 0%, white 40%, hsl(231 41% 85% / 0.35) 100%)',
          }}
        />
        <div className="relative z-10 h-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
