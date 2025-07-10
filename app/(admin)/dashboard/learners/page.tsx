'use client';

import Link from 'next/link';
import { learners } from '@/lib/data/learners';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { TablePagination } from '@/components/learners/TablePagination';
import { SearchInput } from '@/components/learners/ui/SearchInput';
import { Skeleton } from '@/components/ui/skeleton';

// Table Row Skeleton Component
function TableRowSkeleton() {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-4">
        <Skeleton className="h-4 w-8" />
      </td>
      <td className="px-4 py-4">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-4 py-4">
        <Skeleton className="h-4 w-48" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-28" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-8" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-20" />
      </td>
    </tr>
  );
}

// Mobile Card Skeleton Component
function MobileCardSkeleton() {
  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/60 p-5 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-1" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/60 rounded-xl p-3">
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="bg-white/60 rounded-xl p-3">
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
      <div className="bg-white/60 rounded-xl p-3 mb-3">
        <Skeleton className="h-3 w-12 mb-1" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export default function LearnersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [learnersData, setLearnersData] = useState<typeof learners>([]);
  const itemsPerPage = 10;

  // Simulate loading state
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLearnersData(learners);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Enhanced filter function to search through learner data and their courses
  const filteredLearners = learnersData.filter((learner) => {
    const searchLower = searchTerm.toLowerCase();

    // Search in main learner properties
    const mainPropertiesMatch =
      learner.name.toLowerCase().includes(searchLower) ||
      learner.email.toLowerCase().includes(searchLower) ||
      learner.department?.toLowerCase().includes(searchLower) ||
      learner.role?.toLowerCase().includes(searchLower) ||
      learner.title.toLowerCase().includes(searchLower);

    // Search in ongoing courses
    const ongoingCoursesMatch = learner.ongoingCourses.some(
      (course) =>
        course.title.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower)
    );

    // Search in completed courses
    const completedCoursesMatch = learner.completedCourses.some(
      (course) =>
        course.title.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.grade.toLowerCase().includes(searchLower)
    );

    return mainPropertiesMatch || ongoingCoursesMatch || completedCoursesMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredLearners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLearners = filteredLearners.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="md:py-6">
      <h1 className="text-3xl font-normal mb-8 ">Learners</h1>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative inline-block text-left">
          <button className="inline-flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Filter: Role/specialisation
            <ChevronDown className="ml-2 w-4 h-4" />
          </button>
        </div>
        <SearchInput searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 pt-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 rounded-md">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                    ID
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                    Learner's Name
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                    Email Address
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                    Department
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                    Role/Specialisation
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                    Assigned Courses
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {isLoading
                  ? // Show skeleton rows when loading
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                      <TableRowSkeleton key={index} />
                    ))
                  : currentLearners.map((learner, index) => (
                      <tr
                        key={learner.id}
                        className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                      >
                        <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {learner.id}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {learner.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {learner.email}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {learner.department || 'N/A'}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {learner.role || 'N/A'}
                        </td>
                        <td className="px-3 py-4 text-sm text-center text-gray-900 whitespace-nowrap">
                          {learner.assignedCourses}
                        </td>
                        <td className="px-3 py-4 text-sm text-orange-500 whitespace-nowrap">
                          <Link href={`/dashboard/learners/${learner.id}`} className="underline">
                            View learner
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Modern Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {isLoading
              ? // Show skeleton cards when loading
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <MobileCardSkeleton key={index} />
                ))
              : currentLearners.map((learner, index) => (
                  <div
                    key={learner.id}
                    className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/60 p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-gray-300/80 backdrop-blur-sm"
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-amber-50/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header with icon and title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                          {/* User pattern background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                          <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full" />
                          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/20 rounded-full" />

                          {/* User icon */}
                          <div className="relative z-10 w-6 h-6 text-white flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>

                          {/* Floating elements for learner theme */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300/60 rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 group-hover:text-gray-800 transition-colors duration-200 line-clamp-2">
                            {learner.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                              {learner.role || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100/80 group-hover:bg-white/80 transition-colors duration-200">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            Department
                          </div>
                          <div className="text-sm font-bold text-gray-900">
                            {learner.department || 'N/A'}
                          </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100/80 group-hover:bg-white/80 transition-colors duration-200">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            Courses
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {learner.assignedCourses}
                          </div>
                        </div>
                      </div>

                      {/* Email and Action */}
                      <div className="space-y-3">
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100/80 group-hover:bg-white/80 transition-colors duration-200">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            Email
                          </div>
                          <div className="text-xs font-semibold text-gray-700 leading-tight break-words">
                            {learner.email}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Link
                            href={`/dashboard/learners/${learner.id}`}
                            className="text-orange-500 underline text-sm font-medium hover:text-orange-600 transition-colors"
                          >
                            View learner
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Subtle corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-100/50 to-transparent rounded-2xl" />
                  </div>
                ))}
          </div>
        </div>

        {/* Centered Pagination Component */}
        <div className="flex justify-center">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredLearners.length}
            itemsPerPage={itemsPerPage}
            variant="simple"
          />
        </div>
      </div>
    </div>
  );
}
