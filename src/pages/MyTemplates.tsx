import { AppLayout } from '@/components/layout/AppLayout';
import { TemplatesHeader } from '@/components/templates/TemplatesHeader';
import { TemplatesFilters } from '@/components/templates/TemplatesFilters';
import { TemplatesTable } from '@/components/templates/TemplatesTable';
import { CreateTemplateModal } from '@/components/templates/CreateTemplateModal';
import { useTemplates } from '@/hooks/useTemplates';
import { Star } from 'lucide-react';

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

  const favoriteTemplates = sortedTemplates.filter(t => t.isFavorite);

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-10 lg:px-14 py-10 max-w-7xl">
          <TemplatesHeader onCreateTemplate={openCreateModal} />
          
          {/* Favorites Section */}
          {favoriteTemplates.length > 0 && (
            <div className="mb-6">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-cnp-md">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 text-warning fill-warning" />
                  <h2 className="font-serif text-lg font-semibold text-foreground">Favorites</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {favoriteTemplates.slice(0, 5).map(template => (
                    <span
                      key={template.id}
                      className="px-3 py-1.5 bg-white border border-border rounded-full text-sm font-medium text-foreground hover:bg-neutral-blue-50 transition-colors cursor-pointer"
                    >
                      {template.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
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
    </AppLayout>
  );
};

export default MyTemplates;
