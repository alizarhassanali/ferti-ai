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
      <TableCell className="py-4">
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-[15px] text-foreground">{template.name}</span>
          <Badge variant="secondary">
            {template.type}
          </Badge>
        </div>
      </TableCell>
      
      <TableCell className="text-center text-sm text-muted-foreground py-4">{template.uses}</TableCell>
      
      <TableCell className="text-sm text-muted-foreground py-4">{template.lastUsed || '-'}</TableCell>
      
      <TableCell className="text-sm text-muted-foreground py-4">{template.creator}</TableCell>
      
      <TableCell className="py-4">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span className="text-sm">{template.visibility}</span>
        </div>
      </TableCell>
      
      <TableCell className="py-4">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-foreground/60 hover:text-foreground hover:bg-neutral-blue-50 rounded-lg"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-neutral-blue-50 rounded-lg"
            onClick={() => onToggleFavorite(template.id)}
          >
            <Star
              className={`h-4 w-4 ${template.isFavorite ? 'fill-warning text-warning' : 'text-foreground/60'}`}
            />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-foreground/60 hover:text-foreground hover:bg-neutral-blue-50 rounded-lg"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-border rounded-2xl shadow-cnp-lg">
              <DropdownMenuItem className="text-foreground hover:bg-neutral-blue-50 rounded-lg cursor-pointer">
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-neutral-blue-50 rounded-lg cursor-pointer">
                Share
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
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
