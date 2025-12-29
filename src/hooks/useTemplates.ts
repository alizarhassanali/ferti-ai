import { useState } from 'react';
import { Template, TemplatesState, CreateModalStep, TemplateCreationType, TemplateVisibility } from '@/types/template';

const mockTemplates: Template[] = [
  { id: '1', name: "Letter to GP", type: "Document", uses: 2, lastUsed: "1 day ago", creator: "Community", visibility: "Just me" },
  { id: '2', name: "Patient Explainer Letter", type: "Note", uses: 0, lastUsed: null, creator: "FertiAI", visibility: "Just me" },
  { id: '3', name: "Follow-Up", type: "Note", uses: 0, lastUsed: null, creator: "FertiAI", visibility: "Just me" },
  { id: '4', name: "Generic Referral Letter", type: "Document", uses: 1, lastUsed: "1 day ago", creator: "FertiAI", visibility: "Just me" },
  { id: '5', name: "H & P", type: "Note", uses: 0, lastUsed: null, creator: "FertiAI", visibility: "Just me" },
  { id: '6', name: "H & P (Including Issues)", type: "Note", uses: 0, lastUsed: null, creator: "FertiAI", visibility: "Just me" },
  { id: '7', name: "Initial Assessment", type: "Note", uses: 0, lastUsed: null, creator: "FertiAI", visibility: "Just me" },
  { id: '8', name: "Issues List", type: "Note", uses: 0, lastUsed: null, creator: "FertiAI", visibility: "Just me" },
  { id: '9', name: "Nurse's Note", type: "Note", uses: 0, lastUsed: null, creator: "FertiAI", visibility: "Just me" },
  { id: '10', name: "Nursing Handover", type: "Note", uses: 0, lastUsed: null, creator: "FertiAI", visibility: "Just me" },
];

export const useTemplates = () => {
  const [state, setState] = useState<TemplatesState>({
    templates: mockTemplates,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
    currentPage: 1,
    isCreateModalOpen: false,
    createModalStep: 'type',
    selectedTemplateType: null,
  });

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const setSortBy = (sortBy: 'uses' | 'lastUsed' | 'name') => {
    setState(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const setCurrentPage = (page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  };

  const openCreateModal = () => {
    setState(prev => ({ 
      ...prev, 
      isCreateModalOpen: true, 
      createModalStep: 'blank',
      selectedTemplateType: null 
    }));
  };

  const closeCreateModal = () => {
    setState(prev => ({ 
      ...prev, 
      isCreateModalOpen: false,
      createModalStep: 'type',
      selectedTemplateType: null
    }));
  };

  const setCreateModalStep = (step: CreateModalStep) => {
    setState(prev => ({ ...prev, createModalStep: step }));
  };

  const setSelectedTemplateType = (type: TemplateCreationType) => {
    setState(prev => ({ ...prev, selectedTemplateType: type }));
  };

  const toggleFavorite = (id: string) => {
    setState(prev => ({
      ...prev,
      templates: prev.templates.map(t =>
        t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
      ),
    }));
  };

  const deleteTemplate = (id: string) => {
    setState(prev => ({
      ...prev,
      templates: prev.templates.filter(t => t.id !== id),
    }));
  };

  const shareTemplate = (id: string, visibility: TemplateVisibility) => {
    setState(prev => ({
      ...prev,
      templates: prev.templates.map(t =>
        t.id === id ? { ...t, visibility } : t
      ),
    }));
  };

  const filteredTemplates = state.templates.filter(template =>
    template.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    const order = state.sortOrder === 'asc' ? 1 : -1;
    
    if (state.sortBy === 'uses') {
      return (a.uses - b.uses) * order;
    }
    if (state.sortBy === 'lastUsed') {
      if (!a.lastUsed && !b.lastUsed) return 0;
      if (!a.lastUsed) return order;
      if (!b.lastUsed) return -order;
      return a.lastUsed.localeCompare(b.lastUsed) * order;
    }
    return a.name.localeCompare(b.name) * order;
  });

  return {
    ...state,
    sortedTemplates,
    setSearchQuery,
    setSortBy,
    setCurrentPage,
    openCreateModal,
    closeCreateModal,
    setCreateModalStep,
    setSelectedTemplateType,
    toggleFavorite,
    deleteTemplate,
    shareTemplate,
  };
};
