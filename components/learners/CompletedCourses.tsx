import Image from 'next/image';
import { Learner } from '@/lib/data/learners';
import { icons } from '@/public/assets/icon';
import { Skeleton } from '@/components/ui/skeleton';

type CompletedCoursesProps = {
  learners: Learner[];
  isLoading?: boolean;
};

// Course Card Skeleton Component
function CompletedCourseCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="md:w-64 md:flex-shrink-0">
        <Skeleton className="w-full h-40 md:h-full" />
      </div>
      <div className="flex-1 p-6">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex items-center mb-3">
              <Skeleton className="h-4 w-20 mr-2" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex items-center mb-4">
              <Skeleton className="w-8 h-8 rounded-full mr-3" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex items-center">
              <Skeleton className="w-4 h-4 mr-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompletedCourses({ learners, isLoading = false }: CompletedCoursesProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-gray-50/30">
          <CompletedCourseCardSkeleton />
          <CompletedCourseCardSkeleton />
          <CompletedCourseCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <section>
        {learners.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No learners found.</p>
        ) : (
          learners.map((learner) => (
            <div key={learner.id} className="mb-6">
              {learner.completedCourses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No completed courses.</p>
              ) : (
                <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-gray-50/30">
                  {learner.completedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="md:w-64 md:flex-shrink-0">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          width={256}
                          height={160}
                          className="w-full h-40 md:h-full object-cover"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                              {course.title}
                            </h3>
                            <div className="flex items-center mb-3">
                              <span className="text-sm font-medium text-gray-600 mr-2">
                                Course Score:
                              </span>
                              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {course.grade}
                              </span>
                            </div>
                            <div className="flex items-center mb-4">
                              <Image
                                src={course.instructorImage}
                                alt={course.instructor}
                                width={32}
                                height={32}
                                className="rounded-full mr-3"
                                style={{ width: 'auto', height: 'auto' }}
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {course.instructor}
                              </span>
                            </div>
                          </div>
                          <div className="mt-auto">
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="text-green-500 mr-2">{icons.check}</span>
                              <span>Completed on {course.completeDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}
