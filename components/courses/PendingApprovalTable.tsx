'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CustomCheckbox from '@/components/ui/custom-checkbox';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPendingCoursesAPI } from '@/features/courses/services/api';
import { PendingCourse } from '@/features/courses/types';

export default function PendingApprovalTable() {
  const router = useRouter();
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPendingCoursesAPI();
        setPendingCourses(data);
      } catch (error) {
        // Optionally handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const paginatedCourses = pendingCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(pendingCourses.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCourses(paginatedCourses.map((course) => course.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, id]);
    } else {
      setSelectedCourses((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleReview = (courseId: string) => {
    router.push(`/dashboard/courses/review/${courseId}`);
  };

  return (
    <div>
      {/* Top action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Button
          variant="outline"
          className="bg-orange-500 hover:bg-orange-500 cursor-pointer text-white hover:text-white border-none rounded-[16px] w-[160px] h-[29px] py-[2px] px-[12px] text-[13px] font-medium"
        >
          New course submission
        </Button>
        <Button
          variant="outline"
          className="bg-white hover:bg-white cursor-pointer text-orange-500 hover:text-orange-500 border border-orange-500 rounded-[16px] w-[160px] h-[29px] py-[2px] px-[12px] text-[13px] font-medium"
        >
          Course update request
        </Button>
      </div>

      {/* Table with integrated pagination */}
      <div className="border rounded-md bg-white">
        <div className="w-full overflow-x-auto">
          <div className="px-6 py-2 min-w-[800px]">
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      Loading...
                    </td>
                  </tr>
                ) : paginatedCourses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      No pending courses found.
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal text-[16px] leading-[100%] tracking-normal">
                        {course.courseId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal text-[16px] leading-[100%] tracking-normal">
                        {course.title}
                        <div className="md:hidden text-xs text-gray-500 mt-1">
                          {course.category} •{' '}
                          {`${course.instructor.firstname} ${course.instructor.lastname}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal text-[16px] leading-[100%] tracking-normal hidden md:table-cell">
                        {course.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal text-[16px] leading-[100%] tracking-normal hidden lg:table-cell">
                        {new Date(course.dateOfSubmission).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-normal text-[16px] leading-[100%] tracking-normal hidden xl:table-cell">
                        {`${course.instructor.firstname} ${course.instructor.lastname}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="outline"
                          className="bg-white hover:bg-white text-orange-600 hover:text-orange-600 border border-orange-600 rounded-[16px] w-[78px] h-[24px] py-[6px] pl-[16px] pr-[14px] text-sm font-medium flex items-center gap-[4px]"
                          onClick={() => handleReview(course.courseId)}
                        >
                          Review <span className="ml-1">→</span>
                        </Button>
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
