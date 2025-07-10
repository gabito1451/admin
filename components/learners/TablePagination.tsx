import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  variant?: 'default' | 'simple'; // Add variant prop for different styles
}

export const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  variant = 'default',
}: PaginateProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 2, '...', currentPage, '...', totalPages - 1, totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Simple variant with proper layout: Previous (left), Numbers (center), Next (right)
  if (variant === 'simple') {
    return (
      <div className="relative flex items-center w-full mt-4 px-4 text-sm">
        {/* Previous Button - Extreme Left */}
        <div className="absolute left-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 text-[14px] font-semibold text-gray-600 disabled:text-gray-400"
          >
            <Image src="/assets/icons/arrow-left.svg" height={10} width={10} alt="Backward-arrow" />
            Previous
          </button>
        </div>

        {/* Page Numbers - Center */}
        <div className="flex justify-center w-full">
          <div className="flex gap-2 px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-2 py-1 rounded ${
                  currentPage === page
                    ? 'bg-badge-orange-bg text-academy-orange font-semibold'
                    : 'text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button - Extreme Right */}
        <div className="absolute right-4">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 text-[14px] font-semibold text-gray-600 disabled:text-gray-400"
          >
            Next
            <Image src="/assets/icons/arrow-right.svg" height={10} width={10} alt="Forward-arrow" />
          </button>
        </div>
      </div>
    );
  }

  // Default variant with proper layout: Previous (left), Numbers (center), Next (right)
  return (
    <div className="relative flex items-center w-full py-4 px-4">
      {/* Previous Button - Extreme Left */}
      <div className="absolute left-4">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Previous</span>
        </button>
      </div>

      {/* Page Numbers - Center */}
      <div className="flex justify-center w-full">
        <div className="flex items-center space-x-2">
          {getPageNumbers().map((page, idx) => (
            <div key={idx}>
              {page === '...' ? (
                <span className="px-2 py-1 text-gray-400 text-sm">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded transition-colors ${
                    currentPage === page
                      ? 'bg-orange-100 text-orange-600 border border-orange-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Button - Extreme Right */}
      <div className="absolute right-4">
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="text-sm font-medium">Next</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
