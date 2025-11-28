import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TemplatesHeader } from '@/components/templates/TemplatesHeader';
import { TemplatesFilters } from '@/components/templates/TemplatesFilters';
import { TemplatesTable } from '@/components/templates/TemplatesTable';
import { CreateTemplateModal } from '@/components/templates/CreateTemplateModal';
import { TemplateCommunity } from '@/components/templates/TemplateCommunity';
import { useTemplates } from '@/hooks/useTemplates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MyTemplates = () => {
  const [activeTab, setActiveTab] = useState('my-templates');
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

  const handleBrowseCommunity = () => {
    setActiveTab('template-hub');
  };

  return (
    <AppLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <TabsList className="h-12 bg-transparent border-0 rounded-none p-0">
              <TabsTrigger 
                value="my-templates"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 h-12"
              >
                My Templates
              </TabsTrigger>
              <TabsTrigger 
                value="template-hub"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 h-12"
              >
                Template Hub
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="my-templates" className="flex-1 overflow-y-auto m-0">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            <TemplatesHeader onCreateTemplate={openCreateModal} onBrowseCommunity={handleBrowseCommunity} />
            
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
        </TabsContent>

        <TabsContent value="template-hub" className="flex-1 overflow-y-auto m-0">
          <TemplateCommunity />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MyTemplates;
