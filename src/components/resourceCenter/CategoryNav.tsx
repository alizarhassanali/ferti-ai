import { categories, topics, ResourceCategory, ResourceTopic } from '@/data/resourceCenter';
import { TopicCard } from './TopicCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryNavProps {
  selectedCategoryId: string;
  selectedTopicId: string | null;
  onSelectCategory: (id: string) => void;
  onSelectTopic: (topic: ResourceTopic) => void;
}

export const CategoryNav = ({
  selectedCategoryId,
  selectedTopicId,
  onSelectCategory,
  onSelectTopic,
}: CategoryNavProps) => {
  const filteredTopics = topics.filter(t => t.categoryId === selectedCategoryId);

  return (
    <div className="w-80 h-full flex flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h2 className="text-lg font-semibold text-foreground">Help Center</h2>
        <p className="text-xs text-muted-foreground mt-1">Guides, FAQs, and support</p>
      </div>

      {/* Category Tabs */}
      <div className="px-4 pb-3 flex flex-col gap-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`
              text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedCategoryId === cat.id
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="h-px bg-border mx-4" />

      {/* Topic Cards */}
      <ScrollArea className="flex-1 px-4 py-3">
        <div className="flex flex-col gap-2">
          {filteredTopics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isSelected={selectedTopicId === topic.id}
              onClick={() => onSelectTopic(topic)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
