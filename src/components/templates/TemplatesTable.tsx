import { ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TemplateRow } from './TemplateRow';
import { Template, TemplateVisibility } from '@/types/template';
import { PaginationFooter } from '@/components/ui/pagination-footer';

interface TemplatesTableProps {
  templates: Template[];
  onSort: (column: 'uses' | 'lastUsed' | 'name') => void;
  onDelete: (id: string) => void;
  onShare: (id: string, visibility: TemplateVisibility) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (limit: number) => void;
}

export const TemplatesTable = ({
  templates,
  onSort,
  onDelete,
  onShare,
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: TemplatesTableProps) => {
  const totalPages = Math.ceil(templates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTemplates = templates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[hsl(216_20%_90%)] bg-muted hover:bg-muted">
              <TableHead className="h-12">
                <Button
                  variant="ghost"
                  className="font-medium text-foreground hover:text-foreground hover:bg-transparent px-0"
                  onClick={() => onSort('name')}
                >
                  Template name
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="text-center h-12">
                <Button
                  variant="ghost"
                  className="font-medium text-foreground hover:text-foreground hover:bg-transparent px-0"
                  onClick={() => onSort('uses')}
                >
                  Uses
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="h-12">
                <Button
                  variant="ghost"
                  className="font-medium text-foreground hover:text-foreground hover:bg-transparent px-0"
                  onClick={() => onSort('lastUsed')}
                >
                  Last used
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="font-medium text-foreground h-12">Creator</TableHead>
              <TableHead className="font-medium text-foreground h-12">Visibility</TableHead>
              <TableHead className="w-[120px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTemplates.map((template) => (
              <TemplateRow
                key={template.id}
                template={template}
                onDelete={onDelete}
                onShare={onShare}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {templates.length > 0 && (
        <PaginationFooter
          totalItems={templates.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={(limit) => { onItemsPerPageChange(limit); onPageChange(1); }}
          itemLabel="templates"
        />
      )}
    </div>
  );
};