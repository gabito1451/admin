import { useParams } from 'next/navigation';
import { useLearnerStore } from '@/features/learners/store/learnerStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { learners } from '@/lib/data/learners';
import { icons } from '@/public/assets/icon';
import { useEffect } from 'react';

type Assessment = {
  title?: string;
  description?: string;
  score?: string | number;
  [key: string]: any;
};

export default function Assessment() {
  const params = useParams();
  const learnerId = params.id as string;

  const { getLearnerById, isLoading, error, fetchLearners, learners } = useLearnerStore();

  useEffect(() => {
    if (learners.length === 0) {
      fetchLearners();
    }
  }, [fetchLearners, learners.length]);

  const learner = getLearnerById(learnerId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!learner) {
    return (
      <Alert>
        <AlertDescription>Learner not found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {learner.assessments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No assessments available for this learner.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 pt-4">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 rounded-md">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                      Course Title
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                      Points
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                      Grade
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-600 whitespace-nowrap">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {learner.assessments.slice(0, 7).map((assessment, index) => (
                    <tr
                      key={assessment.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                    >
                      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                            {icons.check}
                          </div>
                          <span className="font-medium text-gray-900">{assessment.title}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {assessment.points}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {assessment.grade}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {assessment.status}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {assessment.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Modern Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {learner.assessments.slice(0, 7).map((assessment, index) => (
                <div
                  key={assessment.id}
                  className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/60 p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-gray-300/80 backdrop-blur-sm"
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-amber-50/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header with icon and title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        {/* Quiz pattern background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full" />
                        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/20 rounded-full" />

                        {/* Quiz icon */}
                        <div className="relative z-10 w-6 h-6 text-white flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        {/* Floating elements for quiz theme */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300/60 rounded-full animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 group-hover:text-gray-800 transition-colors duration-200 line-clamp-2">
                          {assessment.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                            {assessment.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100/80 group-hover:bg-white/80 transition-colors duration-200">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Points
                        </div>
                        <div className="text-lg font-bold text-gray-900">{assessment.points}</div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100/80 group-hover:bg-white/80 transition-colors duration-200">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Grade
                        </div>
                        <div className="text-lg font-bold text-gray-900">{assessment.grade}</div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-100/80 group-hover:bg-white/80 transition-colors duration-200">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Date
                        </div>
                        <div className="text-xs font-semibold text-gray-700 leading-tight">
                          {assessment.date}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-500">Status</span>
                        <span className="text-xs font-bold text-gray-700">{assessment.status}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500 ease-out group-hover:from-orange-500 group-hover:to-orange-600"
                          style={{ width: assessment.grade }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-100/50 to-transparent rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
