import { Edit, Star, MoreVertical, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Template } from '@/types/template';
import { TableCell, TableRow } from '@/components/ui/table';

interface TemplateRowProps {
  template: Template;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TemplateRow = ({ template, onToggleFavorite, onDelete }: TemplateRowProps) => {
  return (
    <TableRow className="group border-b border-[hsl(35_20%_94%)] hover:bg-[hsl(40_30%_98%)] transition-colors">
      <TableCell className="py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-[15px] text-[hsl(25_30%_25%)]">{template.name}</span>
          <Badge 
            variant="secondary" 
            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[hsl(40_25%_93%)] text-[hsl(25_25%_45%)] border border-[hsl(35_20%_88%)]"
          >
            {template.type}
          </Badge>
        </div>
      </TableCell>
      
      <TableCell className="text-center text-sm text-[hsl(25_15%_50%)] py-3.5">{template.uses}</TableCell>
      
      <TableCell className="text-sm text-[hsl(25_15%_50%)] py-3.5">{template.lastUsed || '-'}</TableCell>
      
      <TableCell className="text-sm text-[hsl(25_15%_50%)] py-3.5">{template.creator}</TableCell>
      
      <TableCell className="py-3.5">
        <div className="flex items-center gap-1.5 text-[hsl(25_15%_55%)]">
          <User className="h-3.5 w-3.5" />
          <span className="text-sm">{template.visibility}</span>
        </div>
      </TableCell>
      
      <TableCell className="py-3.5">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-[hsl(25_20%_45%)] hover:text-[hsl(25_30%_30%)] hover:bg-[hsl(40_25%_92%)] rounded-lg"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-[hsl(40_25%_92%)] rounded-lg"
            onClick={() => onToggleFavorite(template.id)}
          >
            <Star
              className={`h-4 w-4 ${template.isFavorite ? 'fill-[hsl(35_60%_50%)] text-[hsl(35_60%_50%)]' : 'text-[hsl(25_20%_45%)]'}`}
            />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-[hsl(25_20%_45%)] hover:text-[hsl(25_30%_30%)] hover:bg-[hsl(40_25%_92%)] rounded-lg"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-[hsl(35_20%_88%)] rounded-xl shadow-lg">
              <DropdownMenuItem className="text-[hsl(25_25%_35%)] hover:bg-[hsl(40_25%_96%)] rounded-lg cursor-pointer">
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[hsl(25_25%_35%)] hover:bg-[hsl(40_25%_96%)] rounded-lg cursor-pointer">
                Share
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-[hsl(0_60%_45%)] hover:bg-[hsl(0_60%_96%)] rounded-lg cursor-pointer"
                onClick={() => onDelete(template.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};