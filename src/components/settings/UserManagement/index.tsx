import { useState, useCallback } from 'react';
import { UserManagementList } from './UserManagementList';
import { NewMemberModal } from './NewMemberModal';

export const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddMember = () => {
    setIsModalOpen(true);
  };

  const handleSuccess = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <>
      <UserManagementList key={refreshKey} onAddMember={handleAddMember} />
      <NewMemberModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={handleSuccess}
      />
    </>
  );
};
