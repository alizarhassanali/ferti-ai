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
    <TableRow className="group">
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{template.name}</span>
          <Badge variant="secondary" className="text-xs">
            {template.type}
          </Badge>
        </div>
      </TableCell>
      
      <TableCell className="text-center">{template.uses}</TableCell>
      
      <TableCell>{template.lastUsed || '-'}</TableCell>
      
      <TableCell>{template.creator}</TableCell>
      
      <TableCell>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span className="text-sm">{template.visibility}</span>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onToggleFavorite(template.id)}
          >
            <Star
              className={`h-4 w-4 ${template.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
            />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
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
