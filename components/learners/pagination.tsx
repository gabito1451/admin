import Image from 'next/image';

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const generateFixedRangePages = (total: number): (number | string)[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  return [1, 2, 3, '...', total - 2, total - 1, total];
};

export default function Pagination({ currentPage, totalPages, onChange }: Props) {
  const pages = generateFixedRangePages(totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 mt-6 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onChange(currentPage - 1)}
        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-black"
      >
        <Image src="/assets/icons/arrow-left.svg" alt="Previous" width={16} height={16} />
        <span>Previous</span>
      </button>

      {/* Page numbers */}
      <div className="flex space-x-1 flex-wrap justify-center">
        {pages.map((item, index) =>
          item === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onChange(Number(item))}
              className={`w-8 h-8 rounded-md text-sm font-medium ${
                item === currentPage
                  ? 'bg-leadway-orange-light text-academy-orange'
                  : 'text-gray-700 hover:bg-leadway-orange-light'
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onChange(currentPage + 1)}
        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-black"
      >
        <span>Next</span>
        <Image src="/assets/icons/arrow-right.svg" alt="Next" width={16} height={16} />
      </button>
    </div>
  );
}
