import Image from 'next/image';
import { Learner } from '@/lib/data/learners';
import { Skeleton } from '@/components/ui/skeleton';

type OngoingCoursesProps = {
  learners: Learner[];
  isLoading?: boolean;
};

// Course Card Skeleton Component
function CourseCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="md:w-64 md:flex-shrink-0">
        <Skeleton className="w-full h-40 md:h-full" />
      </div>
      <div className="flex-1 p-6">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="flex items-center mb-4">
              <Skeleton className="w-8 h-8 rounded-full mr-3" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-10 w-24 ml-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OngoingCourses({ learners, isLoading = false }: OngoingCoursesProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-gray-50/30">
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="mb-8">
        {learners.map((learner) => (
          <div key={learner.id} className="mb-6">
            {learner.ongoingCourses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No ongoing courses.</p>
            ) : (
              <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-gray-50/30">
                {learner.ongoingCourses.map((course) => (
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
                          <p className="text-sm text-gray-600 mb-3">
                            Started on {course.startDate}
                          </p>
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
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                  className="bg-academy-orange h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {course.progress}% Complete
                              </span>
                            </div>
                            <button className="ml-4 bg-academy-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
