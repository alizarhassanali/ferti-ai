import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, MapPin, Stethoscope, FolderOpen, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sortOptions, locationOptions, specialtyOptions, categoryOptions } from '@/data/hubTemplates';

interface TemplateFiltersProps {
  sortBy: string;
  location: string;
  specialty: string;
  category: string;
  onSortChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const TemplateFilters = ({
  sortBy,
  location,
  specialty,
  category,
  onSortChange,
  onLocationChange,
  onSpecialtyChange,
  onCategoryChange,
}: TemplateFiltersProps) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
            <Badge variant="secondary" className="ml-1 font-normal">{sortBy}</Badge>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {sortOptions.map((option) => (
            <DropdownMenuItem key={option} onClick={() => onSortChange(option)}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <MapPin className="h-4 w-4" />
            Location
            <Badge variant="secondary" className="ml-1 font-normal">{location}</Badge>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {locationOptions.map((option) => (
            <DropdownMenuItem key={option} onClick={() => onLocationChange(option)}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Stethoscope className="h-4 w-4" />
            Specialty
            <Badge variant="secondary" className="ml-1 font-normal">{specialty}</Badge>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {specialtyOptions.map((option) => (
            <DropdownMenuItem key={option} onClick={() => onSpecialtyChange(option)}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Category
            <Badge variant="secondary" className="ml-1 font-normal">{category}</Badge>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {categoryOptions.map((option) => (
            <DropdownMenuItem key={option} onClick={() => onCategoryChange(option)}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
