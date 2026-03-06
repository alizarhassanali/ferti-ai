import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationFooterProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
  itemLabel?: string;
}

const LIMIT_OPTIONS = [10, 25, 50, 100];

export const PaginationFooter = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemLabel = 'items',
}: PaginationFooterProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
      {/* Left: Showing text */}
      <span>
        Showing {startItem} to {endItem} of {totalItems} {itemLabel}
      </span>

      {/* Center: Page navigation */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {getVisiblePages().map((page, idx) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${idx}`} className="px-2">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Right: Limit selector */}
      <div className="flex items-center gap-2">
        <span>Limit:</span>
        <Select
          value={String(itemsPerPage)}
          onValueChange={(val) => onItemsPerPageChange(Number(val))}
        >
          <SelectTrigger className="w-[72px] h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LIMIT_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
