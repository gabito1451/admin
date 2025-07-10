'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export type Column<T> = {
  header?: React.ReactNode;
  render: (item: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  data?: T[];
  endpoint?: string;
  columns?: Column<T>[];
  pageSize?: number;
  onRowClick?: (item: T) => void;
};

export function CustomTable<T extends { id: number }>({
  data: externalData,
  endpoint,
  columns,
  pageSize = 10,
  onRowClick,
}: CustomTableProps<T>) {
  const [fetchedData, setFetchedData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!externalData && endpoint) {
      const fetchData = async () => {
        try {
          const response = await axios.get(endpoint);
          const data = response.data as unknown;
          const items = Array.isArray(data)
            ? data
            : typeof data === 'object' && data !== null && ('users' in data || 'items' in data)
              ? (data as { users?: T[]; items?: T[] }).users ||
                (data as { users?: T[]; items?: T[] }).items ||
                []
              : [];

          setFetchedData(items);
        } catch (error) {}
      };

      fetchData();
    }
  }, [externalData, endpoint]);

  const rawData = externalData ?? fetchedData;
  const tableData = Array.isArray(rawData) ? rawData : [];

  useEffect(() => {
    setCurrentPage(1);
  }, [tableData]);

  if (!Array.isArray(tableData)) {
    return <div className="p-4 text-red-600">Error: Invalid data format received</div>;
  }

  const totalPages = Math.ceil(tableData.length / pageSize);
  const paginatedData = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white scrollbar-hide overflow-x-auto rounded-lg shadow-md w-full">
      <div className="block p-4 scrollbar-hide overflow-x-auto">
        <Table className="scrollbar-hide overflow-x-auto">
          <TableHeader>
            <TableRow className="whitespace-nowrap">
              {(columns ?? []).map((col, index) => (
                <TableHead className="bg-[#f0f0f1] text-neutrals-10 whitespace-nowrap" key={index}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick?.(item)}
              >
                {(columns ?? []).map((col, index) => (
                  <TableCell key={index}>{col.render(item)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 px-8 py-4 text-sm">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 text-[14px] font-semibold text-gray-600 disabled:text-gray-400"
        >
          <Image src="/assets/icons/arrow-left.svg" height={10} width={10} alt="Backward-arrow" />{' '}
          Previous
        </button>

        <div className="flex gap-2 px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-badge-orange-bg text-leadway-orange  font-medium'
                  : 'text-gray-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 text-[14px] font-semibold text-gray-600 disabled:text-gray-400"
        >
          Next{' '}
          <Image src="/assets/icons/arrow-right.svg" height={10} width={10} alt="Forward-arrow" />
        </button>
      </div>
    </div>
  );
}
