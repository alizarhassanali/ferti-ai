import { AppLayout } from '@/components/layout/AppLayout';
import { LettersList } from '@/components/letters/LettersList';
import { LetterDetail } from '@/components/letters/LetterDetail';
import { LettersProvider } from '@/contexts/LettersContext';
import { Separator } from '@/components/ui/separator';

const LettersContent = () => {
  return (
    <AppLayout hideGlobalSessionsPanel>
      <div className="flex h-screen overflow-hidden bg-background w-full">
        {/* Middle Pane - Letters List */}
        <div className="flex-shrink-0 overflow-hidden">
          <LettersList />
        </div>

        {/* Vertical Divider */}
        <Separator orientation="vertical" className="h-full" />

        {/* Right Pane - Letter Detail */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <LetterDetail />
        </div>
      </div>
    </AppLayout>
  );
};

const Letters = () => {
  return (
    <LettersProvider>
      <LettersContent />
    </LettersProvider>
  );
};

export default Letters;
