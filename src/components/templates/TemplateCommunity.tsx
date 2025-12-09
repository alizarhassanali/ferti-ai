import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { hubTemplates } from '@/data/hubTemplates';
import { TemplateCard } from './hub/TemplateCard';
import { TemplateFilters } from './hub/TemplateFilters';

export const TemplateCommunity = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [location, setLocation] = useState('All');
  const [specialty, setSpecialty] = useState('All');
  const [category, setCategory] = useState('All');

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = hubTemplates.filter((template) => {
      const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = location === 'All' || template.author.country === location;
      
      const matchesSpecialty = specialty === 'All' || 
        template.author.specialty.toLowerCase().includes(specialty.toLowerCase());
      
      const matchesCategory = category === 'All' || template.type === category;

      return matchesSearch && matchesLocation && matchesSpecialty && matchesCategory;
    });

    // Sort
    switch (sortBy) {
      case 'Most Popular':
      case 'Most Used':
        filtered.sort((a, b) => b.usageCount - a.usageCount);
        break;
      case 'Newest':
        filtered.sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime());
        break;
      case 'A-Z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, location, specialty, category]);

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif font-medium">Template Hub</h1>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a template"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <TemplateFilters
            sortBy={sortBy}
            location={location}
            specialty={specialty}
            category={category}
            onSortChange={setSortBy}
            onLocationChange={setLocation}
            onSpecialtyChange={setSpecialty}
            onCategoryChange={setCategory}
          />
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSortedTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredAndSortedTemplates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No templates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
