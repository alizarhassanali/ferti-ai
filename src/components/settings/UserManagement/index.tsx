import { useState, useCallback } from 'react';
import { UserManagementList } from './UserManagementList';
import { NewMemberForm } from './NewMemberForm';

type View = 'list' | 'new-member';

export const UserManagement = () => {
  const [view, setView] = useState<View>('list');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddMember = () => {
    setView('new-member');
  };

  const handleBack = () => {
    setView('list');
  };

  const handleSuccess = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div key={refreshKey}>
      {view === 'list' ? (
        <UserManagementList onAddMember={handleAddMember} />
      ) : (
        <NewMemberForm onBack={handleBack} onSuccess={handleSuccess} />
      )}
    </div>
  );
};
