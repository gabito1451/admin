'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import React, { useState, useEffect } from 'react';
import CustomCheckbox from '@/components/ui/custom-checkbox';
import { fetchRejectedCoursesAPI } from '@/features/courses/services/api';
import { PendingCourse } from '@/features/courses/types';

export default function RejectedCoursesTable() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rejectedCourses, setRejectedCourses] = useState<PendingCourse[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRejectedCoursesAPI();
        setRejectedCourses(data);
      } catch (error) {
        // Optionally handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering logic can be added here if needed
  const filteredCourses = rejectedCourses; // For now, no filter
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

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

  return (
    <div>
      {/* Filter UI */}
      <div className="flex mb-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter: Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="show_all">
              <div className="flex items-center w-full min-w-0">
                <span className="min-w-[100px]">Show all</span>
                <input
                  type="radio"
                  checked={selectedCategory === 'show_all'}
                  readOnly
                  className="form-radio h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500 ml-auto"
                />
              </div>
            </SelectItem>
            <SelectItem value="course_count">
              <div className="flex items-center w-full min-w-0">
                <span className="min-w-[100px]">Course Count</span>
                <input
                  type="radio"
                  checked={selectedCategory === 'course_count'}
                  readOnly
                  className="form-radio h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500 ml-auto"
                />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table with integrated pagination */}
      <div className="border rounded-md bg-white">
        {/* ONLY CHANGE: Added proper horizontal scroll container */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7]">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7]">
                    Course Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] hidden lg:table-cell">
                    Submitted On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] hidden xl:table-cell">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#282637] uppercase tracking-wider bg-[#F5F5F7] rounded-tr-md">
                    Reason for Rejection
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      Loading...
                    </td>
                  </tr>
                ) : paginatedCourses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      No rejected courses found.
                    </td>
                  </tr>
                ) : (
                  paginatedCourses.map((course) => (
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
                      <td className="px-6 py-4 text-sm text-gray-900 font-normal">
                        {course.title}
                        <div className="md:hidden text-xs text-gray-500 mt-1">
                          {course.category} •{' '}
                          {`${course.instructor?.firstname || ''} ${course.instructor?.lastname || ''}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal hidden md:table-cell">
                        {course.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal hidden lg:table-cell">
                        {course.dateOfSubmission
                          ? new Date(course.dateOfSubmission).toLocaleDateString()
                          : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal hidden xl:table-cell">
                        {`${course.instructor?.firstname || ''} ${course.instructor?.lastname || ''}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-normal max-w-xs">
                        <div className="truncate" title={course.rejectionReason || ''}>
                          {course.rejectionReason || ''}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="px-6">
          <div className="border-t border-gray-200"></div>
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <span>←</span>
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(0, 5)
                .map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 text-sm rounded ${
                      currentPage === page
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              {totalPages > 5 && <span className="text-gray-400">...</span>}
              {totalPages > 5 && (
                <button
                  className="w-8 h-8 text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              )}
            </div>

            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
