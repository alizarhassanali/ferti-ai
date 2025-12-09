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
import { Template } from '@/types/template';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface TemplatesTableProps {
  templates: Template[];
  onSort: (column: 'uses' | 'lastUsed' | 'name') => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const TemplatesTable = ({
  templates,
  onSort,
  onToggleFavorite,
  onDelete,
  currentPage,
  onPageChange,
}: TemplatesTableProps) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(templates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTemplates = templates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-neutral-blue-100">
            <TableHead>
              <Button
                variant="ghost"
                className="font-semibold text-foreground hover:text-foreground hover:bg-transparent px-0"
                onClick={() => onSort('name')}
              >
                Template name
                <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                className="font-semibold text-foreground hover:text-foreground hover:bg-transparent px-0"
                onClick={() => onSort('uses')}
              >
                Uses
                <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="font-semibold text-foreground hover:text-foreground hover:bg-transparent px-0"
                onClick={() => onSort('lastUsed')}
              >
                Last used
                <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
              </Button>
            </TableHead>
            <TableHead className="font-semibold text-foreground">Creator</TableHead>
            <TableHead className="font-semibold text-foreground">Visibility</TableHead>
            <TableHead className="w-[120px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTemplates.map((template) => (
            <TemplateRow
              key={template.id}
              template={template}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={`rounded-full border-border hover:bg-neutral-blue-50 ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                  className={`cursor-pointer rounded-full ${currentPage === page ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-neutral-blue-50'}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={`rounded-full border-border hover:bg-neutral-blue-50 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
