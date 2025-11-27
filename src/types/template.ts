export type TemplateType = 'Note' | 'Document';
export type TemplateVisibility = 'Just me' | 'My team' | 'Organization';
export type CreateModalStep = 'type' | 'prompt' | 'blank' | 'existing';
export type TemplateCreationType = 'note' | 'pdf' | null;

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  uses: number;
  lastUsed: string | null;
  creator: string;
  visibility: TemplateVisibility;
  content?: string;
  isFavorite?: boolean;
}

export interface TemplatesState {
  templates: Template[];
  searchQuery: string;
  sortBy: 'uses' | 'lastUsed' | 'name';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  isCreateModalOpen: boolean;
  createModalStep: CreateModalStep;
  selectedTemplateType: TemplateCreationType;
}
