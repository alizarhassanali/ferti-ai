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
      <div className="bg-white border border-[hsl(35_20%_88%)] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[hsl(35_20%_92%)] bg-[hsl(40_25%_98%)] hover:bg-[hsl(40_25%_98%)]">
              <TableHead className="h-12">
                <Button
                  variant="ghost"
                  className="font-medium text-[hsl(25_20%_45%)] hover:text-[hsl(25_25%_30%)] hover:bg-transparent px-0"
                  onClick={() => onSort('name')}
                >
                  Template name
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="text-center h-12">
                <Button
                  variant="ghost"
                  className="font-medium text-[hsl(25_20%_45%)] hover:text-[hsl(25_25%_30%)] hover:bg-transparent px-0"
                  onClick={() => onSort('uses')}
                >
                  Uses
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="h-12">
                <Button
                  variant="ghost"
                  className="font-medium text-[hsl(25_20%_45%)] hover:text-[hsl(25_25%_30%)] hover:bg-transparent px-0"
                  onClick={() => onSort('lastUsed')}
                >
                  Last used
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="font-medium text-[hsl(25_20%_45%)] h-12">Creator</TableHead>
              <TableHead className="font-medium text-[hsl(25_20%_45%)] h-12">Visibility</TableHead>
              <TableHead className="w-[120px] h-12"></TableHead>
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
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={`rounded-xl border-[hsl(35_20%_88%)] hover:bg-[hsl(40_25%_96%)] ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                  className={`cursor-pointer rounded-xl ${currentPage === page ? 'bg-[hsl(12_45%_35%)] text-white border-[hsl(12_45%_35%)]' : 'border-[hsl(35_20%_88%)] hover:bg-[hsl(40_25%_96%)]'}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={`rounded-xl border-[hsl(35_20%_88%)] hover:bg-[hsl(40_25%_96%)] ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};