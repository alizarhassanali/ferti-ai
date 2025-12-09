import { ArrowUpDown, MapPin, Stethoscope, FolderOpen, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sortOptions, locationOptions, specialtyOptions, categoryOptions } from '@/data/hubTemplates';
import { cn } from '@/lib/utils';

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

interface FilterPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  isActive?: boolean;
}

const FilterPill = ({ icon, label, value, options, onChange, isActive }: FilterPillProps) => {
  const hasActiveFilter = value !== 'All' && value !== 'Most Popular';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
            "border shadow-cnp-sm hover:shadow-cnp-md",
            hasActiveFilter
              ? "bg-primary text-primary-foreground border-primary hover:brightness-95"
              : "bg-white text-foreground border-border hover:bg-neutral-blue-50 hover:border-foreground/20"
          )}
        >
          {icon}
          <span>{label}</span>
          <span className={cn(
            "text-xs px-1.5 py-0.5 rounded-md",
            hasActiveFilter
              ? "bg-white/20 text-primary-foreground"
              : "bg-neutral-blue-100 text-foreground"
          )}>
            {value}
          </span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="min-w-[160px] bg-white border border-border shadow-cnp-lg rounded-2xl p-1.5 z-50"
      >
        {options.map((option) => (
          <DropdownMenuItem 
            key={option} 
            onClick={() => onChange(option)}
            className={cn(
              "px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
              value === option 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-foreground hover:bg-neutral-blue-50"
            )}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
    <div className="flex items-center gap-3 flex-wrap justify-center">
      <FilterPill
        icon={<ArrowUpDown className="h-4 w-4" />}
        label="Sort"
        value={sortBy}
        options={sortOptions}
        onChange={onSortChange}
      />
      <FilterPill
        icon={<MapPin className="h-4 w-4" />}
        label="Location"
        value={location}
        options={locationOptions}
        onChange={onLocationChange}
      />
      <FilterPill
        icon={<Stethoscope className="h-4 w-4" />}
        label="Specialty"
        value={specialty}
        options={specialtyOptions}
        onChange={onSpecialtyChange}
      />
      <FilterPill
        icon={<FolderOpen className="h-4 w-4" />}
        label="Category"
        value={category}
        options={categoryOptions}
        onChange={onCategoryChange}
      />
    </div>
  );
};
