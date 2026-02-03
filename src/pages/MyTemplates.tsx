import { AppLayout } from '@/components/layout/AppLayout';
import { TemplatesHeader } from '@/components/templates/TemplatesHeader';
import { TemplatesFilters } from '@/components/templates/TemplatesFilters';
import { TemplatesTable } from '@/components/templates/TemplatesTable';
import { CreateTemplateModal } from '@/components/templates/CreateTemplateModal';
import { useTemplates } from '@/hooks/useTemplates';

const MyTemplates = () => {
  const {
    sortedTemplates,
    searchQuery,
    currentPage,
    isCreateModalOpen,
    createModalStep,
    selectedTemplateType,
    setSearchQuery,
    setSortBy,
    setCurrentPage,
    openCreateModal,
    closeCreateModal,
    setCreateModalStep,
    setSelectedTemplateType,
    deleteTemplate,
    shareTemplate,
  } = useTemplates();

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-10 lg:px-14 py-10 max-w-7xl">
          <TemplatesHeader />
          
          <TemplatesFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreateTemplate={openCreateModal}
          />
          
          <TemplatesTable
            templates={sortedTemplates}
            onSort={setSortBy}
            onDelete={deleteTemplate}
            onShare={shareTemplate}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          <CreateTemplateModal
            isOpen={isCreateModalOpen}
            step={createModalStep}
            selectedType={selectedTemplateType}
            onClose={closeCreateModal}
            onStepChange={setCreateModalStep}
            onTypeSelect={setSelectedTemplateType}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default MyTemplates;