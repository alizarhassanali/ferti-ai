import { ReactNode } from 'react';
import { LeftPane } from '@/components/settings/LeftPane';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <LeftPane />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
