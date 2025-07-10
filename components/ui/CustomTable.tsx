'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { icons } from '@/public/assets/icon';

export type Column<T> = {
  header?: React.ReactNode;
  key: string;
  render?: (item: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  showPagination?: boolean;
  isDashboard?: boolean;
};

export default function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  showPagination = true,
  isDashboard = false,
}: CustomTableProps<T>) {
  // Limit data to 7 rows for dashboard, 10 rows for instructor page
  const displayData = isDashboard ? data.slice(0, 7) : data.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 pt-4">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead
                    className="bg-[#f0f0f1] text-neutrals-10 text-sm font-medium px-3 py-2"
                    key={index}
                  >
                    <div className="truncate max-w-[150px]">{col.header}</div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col, index) => (
                    <TableCell key={index} className="px-3 py-2">
                      <div className="truncate max-w-[150px]">
                        {col.render ? col.render(item) : item[col.key]}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Enhanced Modern Mobile Card View for Instructors */}
        <div className="lg:hidden space-y-4">
          {displayData.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/60 p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-gray-300/80 backdrop-blur-sm cursor-pointer"
              onClick={() => onRowClick?.(item)}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-academy-orange/10 to-orange-50/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Header with modern instructor icon and title */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Modern Instructor Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-academy-orange via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full" />
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/20 rounded-full" />

                    {/* Modern Instructor Icon - Academic/Teaching Symbol */}
                    <div className="relative z-10 w-6 h-6 text-white flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                      </svg>
                    </div>

                    {/* Status indicator for active instructors */}
                    {(columns.find((col) => col.key === 'status')?.render
                      ? columns.find((col) => col.key === 'status')?.render!(item)
                      : item.status) === 'Active' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 group-hover:text-gray-800 transition-colors duration-200 line-clamp-2">
                      {/* Skip checkbox column (index 0) and show name (index 1) */}
                      {columns[1]?.render
                        ? columns[1].render(item)
                        : item[columns[1]?.key] || 'N/A'}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 17.06 7H16c-.8 0-1.54.37-2.01.99L12 10.5 10.01 7.99A2.996 2.996 0 0 0 8.06 7H6.94c-1.4 0-2.59.93-2.96 2.37L1.5 16H4v6h2v-6h2.5l1.5-4.5L12 14.5l2-3 1.5 4.5H18v6h2z" />
                        </svg>
                        Instructor
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid - Skip checkbox column */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {columns.slice(2, 4).map((column, colIndex) => (
                    <div
                      key={colIndex}
                      className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100/80 group-hover:bg-white/80 transition-colors duration-200"
                    >
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        {column.header}
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {column.render ? column.render(item) : item[column.key] || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status and Email Section */}
                <div className="space-y-3">
                  {/* Status */}
                  {columns.length > 4 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">Status:</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            (columns[4]?.render
                              ? columns[4].render(item)
                              : item[columns[4]?.key]) === 'Active'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}
                        >
                          {columns[4]?.render
                            ? columns[4].render(item)
                            : item[columns[4]?.key] || 'N/A'}
                        </span>
                      </div>

                      {/* Experience indicator */}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Expert
                      </div>
                    </div>
                  )}

                  {/* Email Address */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span className="text-gray-600 truncate">
                      {/* Find email column and render it */}
                      {columns.find((col) => col.key === 'email')?.render
                        ? columns.find((col) => col.key === 'email')?.render!(item)
                        : item.email || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-academy-orange/20 to-transparent rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}