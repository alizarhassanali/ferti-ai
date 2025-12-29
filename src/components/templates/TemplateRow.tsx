import { useState } from 'react';
import { Edit, MoreVertical, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Template, TemplateVisibility } from '@/types/template';
import { TableCell, TableRow } from '@/components/ui/table';

interface TemplateRowProps {
  template: Template;
  onDelete: (id: string) => void;
  onShare: (id: string, visibility: TemplateVisibility) => void;
}

export const TemplateRow = ({ template, onDelete, onShare }: TemplateRowProps) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareVisibility, setShareVisibility] = useState<TemplateVisibility>(template.visibility);

  const handleSaveShare = () => {
    onShare(template.id, shareVisibility);
    setShowShareDialog(false);
  };

  return (
    <>
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
                <DropdownMenuItem 
                  className="text-[hsl(25_25%_35%)] hover:bg-[hsl(40_25%_96%)] rounded-lg cursor-pointer"
                  onClick={() => setShowShareDialog(true)}
                >
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

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-foreground">Share Template</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Choose who can access this template
            </DialogDescription>
          </DialogHeader>
          
          <DialogBody>
            <Select value={shareVisibility} onValueChange={(value) => setShareVisibility(value as TemplateVisibility)}>
              <SelectTrigger className="w-full border-border">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border">
                <SelectItem value="Just me">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Just me</span>
                    <span className="text-xs text-muted-foreground">Only you can see this template</span>
                  </div>
                </SelectItem>
                <SelectItem value="Clinic">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Clinic</span>
                    <span className="text-xs text-muted-foreground">Everyone in your clinic can see this</span>
                  </div>
                </SelectItem>
                <SelectItem value="TFP Network">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">TFP Network</span>
                    <span className="text-xs text-muted-foreground">Share with the entire TFP Network</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </DialogBody>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowShareDialog(false)} className="border-border">
              Cancel
            </Button>
            <Button onClick={handleSaveShare} className="bg-brand text-brand-foreground hover:bg-brand/90">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
