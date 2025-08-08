import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({ currentPage, totalResults, onPageChange, isLoading }: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / 10);
  
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {currentPage > 3 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={isLoading}
            >
              1
            </Button>
            {currentPage > 4 && <span className="px-2 text-muted-foreground">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            className={page === currentPage ? "bg-primary text-primary-foreground" : ""}
          >
            {page}
          </Button>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="px-2 text-muted-foreground">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={isLoading}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};