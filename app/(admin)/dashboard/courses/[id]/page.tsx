import { CourseDetailsClient } from '@/components/courses/course-details-client';

// Server Component - handles generateStaticParams
export const generateStaticParams = async () => {
  try {
    const mockDataModule = await import('@/utils/mockData');
    const mockCourses = mockDataModule.mockCourses || [];

    if (!mockCourses || !Array.isArray(mockCourses)) {
      console.warn('mockCourses not found or is not an array, returning empty array');
      return [];
    }

    return mockCourses.map((course) => ({
      id: course.id.toString(),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
};

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params Promise to access its properties
  const { id } = await params;
  return <CourseDetailsClient courseId={id} />;
}
