import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CategoryNav } from '@/components/resourceCenter/CategoryNav';
import { ArticleDetail } from '@/components/resourceCenter/ArticleDetail';
import { ResourceTopic } from '@/data/resourceCenter';

const ResourceCenter = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('getting-started');
  const [selectedTopic, setSelectedTopic] = useState<ResourceTopic | null>(null);

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryId(id);
    setSelectedTopic(null);
  };

  return (
    <AppLayout hideGlobalSessionsPanel>
      <div className="flex h-full">
        <CategoryNav
          selectedCategoryId={selectedCategoryId}
          selectedTopicId={selectedTopic?.id ?? null}
          onSelectCategory={handleSelectCategory}
          onSelectTopic={setSelectedTopic}
        />
        <div className="flex-1 h-full overflow-hidden">
          <ArticleDetail topic={selectedTopic} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ResourceCenter;
