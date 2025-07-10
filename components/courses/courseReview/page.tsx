'use client';

import { useState } from 'react';
import { CourseReviewHeader } from './components/CourseReviewHeader';
import { CourseReviewTabs } from './components/CourseReviewTabs';
import { useParams } from 'next/navigation';

export default function CourseDetailsSection() {
  const params = useParams();
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>({});

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // In a real application, you would fetch the course details using the courseId
  const courseId = params.id as string;

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-full">
      {/* Header */}
      <CourseReviewHeader
        title="Cybersecurity And Artificial Intelligence"
        progress={50}
        status="Course is pending approval"
        creator="Segun Lawal"
        date="May 14, 2025"
      />
      <CourseReviewTabs />
    </div>
  );
}
