'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CourseTabs } from '@/components/courses/course-tabs';
import { Button } from '@/components/ui/button';
import { AssignCourseModal } from '@/components/courses/assign-course-modal';
import CourseOverview from './course-overview';
import { ArrowLeft } from 'lucide-react';
import { useCourseDetailsStore } from '@/features/courses/store/courseDetailsStore';
interface CourseDetailsClientProps {
  courseId: string;
}

export function CourseDetailsClient({ courseId }: CourseDetailsClientProps) {
  const {
    course,
    stats: courseStats,
    changeLog,
    isLoading,
    error,
    fetchCourseData,
    totalEnrolled,
    totalCompleted,
    totalHours,
    totalLessons,
    level,
  } = useCourseDetailsStore();

  // The state for the modal is local to this component, so it stays.
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    fetchCourseData(courseId);
  }, [courseId, fetchCourseData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="text-center px-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Loading...</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Please wait while we load the course details.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="text-center px-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-600">An Error Occurred</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">{error}</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="text-center px-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Course not found</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            The course you are looking for does not exist or has been removed.
          </p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-4 py-2 sm:py-4">
      <div className="flex items-center text-sm text-neutrals-9 mb-4">
        <Link href="/dashboard/courses" className="hover:text-neutrals-9 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>
      </div>

      <CourseOverview
        course={course}
        totalEnrolled={totalEnrolled}
        totalCompleted={totalCompleted}
        totalHours={totalHours}
        totalLessons={totalLessons}
        level={level}
        onAssignCourse={() => setShowAssignModal(true)}
      />

      <CourseTabs course={course} changeLog={changeLog} />

      <AssignCourseModal open={showAssignModal} onOpenChange={setShowAssignModal} course={course} />
    </div>
  );
}
