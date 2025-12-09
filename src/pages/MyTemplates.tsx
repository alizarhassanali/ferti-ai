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
      <div className="flex-1 overflow-y-auto bg-[hsl(40_30%_97%)]">
        <div className="mx-auto px-10 lg:px-14 py-10 max-w-7xl">
          <TemplatesHeader onCreateTemplate={openCreateModal} />
          
          {/* Favorites Section */}
          {favoriteTemplates.length > 0 && (
            <div className="mb-6">
              <div className="bg-[hsl(40_25%_96%)] border border-[hsl(35_20%_88%)] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 text-[hsl(35_60%_50%)] fill-[hsl(35_60%_50%)]" />
                  <h2 className="font-serif text-lg font-semibold text-[hsl(25_30%_25%)]">Favorites</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {favoriteTemplates.slice(0, 5).map(template => (
                    <span
                      key={template.id}
                      className="px-3 py-1.5 bg-white border border-[hsl(35_20%_88%)] rounded-full text-sm font-medium text-[hsl(25_25%_35%)] hover:bg-[hsl(40_30%_95%)] transition-colors cursor-pointer"
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