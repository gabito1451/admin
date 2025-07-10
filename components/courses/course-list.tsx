'use client';

import { useEffect, useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Plus, Star, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import {
  fetchLiveCourses,
  filterCoursesByCategory,
} from '@/features/courses/services/course-service';
import { DatePickerModal } from './date-picker-modal';
import CustomCheckbox from '../ui/custom-checkbox';

interface CourseListProps {
  category?: string;
  searchQuery?: string;
}

export function CourseList({ category, searchQuery }: CourseListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'category');
  const [selectedFilter, setSelectedFilter] = useState<'category' | 'date'>('category');
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
    label: string;
  }>({
    start: null,
    end: null,
    label: 'All time',
  });

  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetchLiveCourses()
      .then((res: any) => {
        console.log(res);
        const coursesArray = Array.isArray(res.data) ? res.data : [];
        setCourses(coursesArray);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Memoize filtered courses by category
  const categoryFilteredCourses = useMemo(() => {
    if (
      selectedFilter !== 'category' ||
      selectedCategory === 'category' ||
      !selectedCategory.trim()
    ) {
      return courses;
    }
    const result = filterCoursesByCategory(selectedCategory);
    if (Array.isArray(result)) {
      return result;
    }
    return [];
  }, [courses, selectedCategory, selectedFilter]);

  // Memoize filtered courses by date
  const dateFilteredCourses = useMemo(() => {
    if (selectedFilter !== 'date' || (!dateRange.start && !dateRange.end)) {
      return categoryFilteredCourses;
    }

    return categoryFilteredCourses.filter((course) => {
      const courseDate = new Date(course.dateCreated);

      if (dateRange.start && dateRange.end) {
        return courseDate >= dateRange.start && courseDate <= dateRange.end;
      } else if (dateRange.start) {
        return courseDate >= dateRange.start;
      } else if (dateRange.end) {
        return courseDate <= dateRange.end;
      }

      return true;
    });
  }, [categoryFilteredCourses, dateRange, selectedFilter]);

  // Memoize searched courses
  const searchedCourses = useMemo(() => {
    return searchQuery
      ? dateFilteredCourses.filter((course) => {
          const title = course?.title?.toLowerCase() || '';
          const description = course?.description?.toLowerCase() || '';
          const instructorName = course?.instructor?.name?.toLowerCase() || '';
          const category = course?.category?.toLowerCase() || '';

          const query = searchQuery.toLowerCase();

          return (
            title.includes(query) ||
            description.includes(query) ||
            instructorName.includes(query) ||
            category.includes(query)
          );
        })
      : dateFilteredCourses;
  }, [dateFilteredCourses, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(searchedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = searchedCourses.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterSelect = (filter: 'category' | 'date') => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);

    if (filter === 'date') {
      setIsDatePickerOpen(true);
    } else {
      // Reset date filter when switching to category
      setDateRange({ start: null, end: null, label: 'All time' });
    }
  };

  const handleDatePickerApply = (
    startDate: Date | null,
    endDate: Date | null,
    selectedRange: string
  ) => {
    setDateRange({
      start: startDate,
      end: endDate,
      label: selectedRange,
    });
    setIsDatePickerOpen(false);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleDatePickerClose = () => {
    setIsDatePickerOpen(false);
  };

  // Checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCourses(paginatedCourses.map((course) => course.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (courseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, courseId]);
    } else {
      setSelectedCourses((prev) => prev.filter((id) => id !== courseId));
    }
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="mr-1">{rating}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const getFilterDisplayText = () => {
    if (selectedFilter === 'date' && dateRange.label !== 'All time') {
      return `Filter: Date (${dateRange.label})`;
    }
    return 'Filter: Category';
  };

  // Add category selector for when category filter is selected
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Custom Filter Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between bg-white border border-gray-300 rounded px-4 py-2 min-w-[180px] text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>{getFilterDisplayText()}</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-[180px]">
                <div className="py-1">
                  <button
                    onClick={() => handleFilterSelect('category')}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                  >
                    <span>Category</span>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {selectedFilter === 'category' && (
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => handleFilterSelect('date')}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                  >
                    <span>Date</span>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {selectedFilter === 'date' && (
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Category Selector - Only show when category filter is selected */}
          {/* {selectedFilter === 'category' && (
            <Select value={selectedCategory} onValueChange={handleCategorySelect}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category">All Categories</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="language">Language</SelectItem>
              </SelectContent>
            </Select>
          )} */}

          {/* Date Range Button - Only show when date filter is selected */}
          {/* {selectedFilter === 'date' && (
            <Button
              variant="outline"
              onClick={() => setIsDatePickerOpen(true)}
              className="w-full sm:w-auto"
            >
              Select Date Range
            </Button>
          )} */}
        </div>

        {/* Filter Status Display */}
        {selectedFilter === 'date' && dateRange.label !== 'All time' && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-700">
                Showing courses from: <strong>{dateRange.label}</strong>
                {dateRange.start && dateRange.end && (
                  <span className="ml-2">
                    (
                    {formatDate(dateRange.start ? dateRange.start.toISOString() : '', 'dd/MM/yyyy')}{' '}
                    - {formatDate(dateRange.end ? dateRange.end.toISOString() : '', 'dd/MM/yyyy')})
                  </span>
                )}
              </span>
              <button
                onClick={() => setDateRange({ start: null, end: null, label: 'All time' })}
                className="text-sm text-orange-600 hover:text-orange-800 underline"
              >
                Clear filter
              </button>
            </div>
          </div>
        )}

        {/* Category Filter Status Display */}
        {selectedFilter === 'category' &&
          selectedCategory !== 'category' &&
          selectedCategory.trim() && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  Showing courses in category: <strong>{selectedCategory}</strong>
                </span>
                <button
                  onClick={() => setSelectedCategory('category')}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filter
                </button>
              </div>
            </div>
          )}
      </div>

      {searchedCourses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No courses found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="border rounded-md bg-white">
          {/* Table with horizontal scroll */}
          <div className="w-full overflow-x-auto">
            <div className="px-6 py-2 min-w-[1000px]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] rounded-tl-md w-12">
                      <CustomCheckbox
                        id="select-all"
                        checked={
                          selectedCourses.length === paginatedCourses.length &&
                          paginatedCourses.length > 0
                        }
                        onChange={handleSelectAll}
                        label=""
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7]">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs  whitespace-nowrap font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7]">
                      Course Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] hidden md:table-cell">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] hidden lg:table-cell">
                      Date Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] hidden xl:table-cell">
                      Instructor
                    </th>
                    <th className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] hidden xl:table-cell">
                      No of Learners
                    </th>
                    <th className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] hidden xl:table-cell">
                      Date Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] rounded-tr-md">
                      Course Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {paginatedCourses.map((course, index) => (
                    <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <CustomCheckbox
                          id={`select-${course.id}`}
                          checked={selectedCourses.includes(course.id)}
                          onChange={(checked) => handleSelectCourse(course.id, checked as boolean)}
                          label=""
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal">
                        {course.courseId}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 font-normal">
                        <Link
                          href={`/dashboard/courses/${course.id}`}
                          className="hover:text-orange-500 "
                        >
                          {course.title}
                        </Link>
                        <div className="md:hidden text-xs whitespace-nowrap text-gray-500 mt-1">
                          {course.category} • {course.instructor.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal hidden md:table-cell">
                        {course.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal hidden lg:table-cell">
                        {formatDate(course.dateCreated, 'dd/MM/yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal hidden xl:table-cell">
                        {course.instructor.name ?? 'No Instructor'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal hidden xl:table-cell">
                        {course.enrollments.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal hidden xl:table-cell">
                        {formatDate(course.dateUpdated, 'dd/MM/yyyy')}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 font-normal">
                        {renderStarRating(course.rating)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="px-6">
            <div className="border-t border-gray-200"></div>
            <div className="flex items-center justify-between py-4">
              <button
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                <span>←</span>
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 text-sm rounded ${
                      currentPage === page
                        ? 'bg-orange-100 text-academy-orange'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <button
                      className={`w-8 h-8 text-sm rounded ${
                        currentPage === totalPages
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              >
                Next
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={handleDatePickerClose}
        onApply={handleDatePickerApply}
        initialStartDate={dateRange.start}
        initialEndDate={dateRange.end}
        initialRange={dateRange.label}
      />
    </div>
  );
}
