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
    toggleFavorite,
    deleteTemplate,
  } = useTemplates();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <TemplatesHeader onCreateTemplate={openCreateModal} />
        
        <TemplatesFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <TemplatesTable
          templates={sortedTemplates}
          onSort={setSortBy}
          onToggleFavorite={toggleFavorite}
          onDelete={deleteTemplate}
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
  );
};

export default MyTemplates;
