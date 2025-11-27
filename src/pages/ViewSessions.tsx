import { AppLayout } from '@/components/layout/AppLayout';
import { SessionList } from '@/components/sessions/SessionList';

const ViewSessions = () => {
  return (
    <AppLayout>
      <div className="flex-1 h-screen overflow-hidden bg-background">
        <SessionList />
      </div>
    </AppLayout>
  );
};

export default ViewSessions;
