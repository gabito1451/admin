import { useState, useEffect, useRef } from 'react';
import { useLearnerStore } from '@/features/learners/store/learnerStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs as UITabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import OngoingCourses from './OngoingCourses';
import CompletedCourses from './CompletedCourses';
import Assessment from './Assessment';

function Tabs() {
  const [activeTab, setActiveTab] = useState<string>('ongoingCourses');
  const { filteredLearners, isLoading, error, fetchLearners, clearError } = useLearnerStore();
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    fetchLearners();
  }, [fetchLearners]);

  // Update underline position when active tab changes
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, filteredLearners]);

  // Calculate counts from store data
  const ongoingCount = filteredLearners.reduce(
    (sum, learner) => sum + learner.ongoingCourses.length,
    0
  );
  const completedCount = filteredLearners.reduce(
    (sum, learner) => sum + learner.completedCourses.length,
    0
  );
  const assessmentCount = filteredLearners.reduce(
    (sum, learner) => sum + learner.assessments.length,
    0
  );

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="flex items-center justify-between">
          {error}
          <Button variant="outline" size="sm" onClick={clearError}>
            Dismiss
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Skeleton loading for tabs
  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        {/* Tab skeleton */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
          <Skeleton className="h-12 w-full sm:w-32 rounded-lg" />
          <Skeleton className="h-12 w-full sm:w-32 rounded-lg" />
          <Skeleton className="h-12 w-full sm:w-32 rounded-lg" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <UITabs defaultValue="ongoingCourses" value={activeTab} onValueChange={setActiveTab}>
        {/* Mobile: Vertical Stack */}
        <div className="block sm:hidden space-y-2 mb-6">
          <button
            onClick={() => setActiveTab('ongoingCourses')}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              activeTab === 'ongoingCourses'
                ? 'bg-academy-orange text-white border-academy-orange'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-medium">Ongoing Courses ({ongoingCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('completedCourses')}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              activeTab === 'completedCourses'
                ? 'bg-academy-orange text-white border-academy-orange'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-medium">Completed Courses ({completedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('assessment')}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              activeTab === 'assessment'
                ? 'bg-academy-orange text-white border-academy-orange'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-medium">Assessments</span>
          </button>
        </div>

        {/* Desktop: Horizontal Tabs with Dynamic Underline */}
        <TabsList className="hidden sm:flex bg-transparent border-b border-gray-200 gap-8 mb-4 w-full justify-start relative p-0 h-auto">
          <TabsTrigger
            ref={(el) => {
              tabRefs.current['ongoingCourses'] = el;
            }}
            value="ongoingCourses"
            className="text-base font-medium text-gray-600 border-transparent px-0 py-3 border-b-0 relative bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-academy-orange data-[state=active]:shadow-none hover:text-gray-800"
          >
            Ongoing Courses ({ongoingCount})
          </TabsTrigger>

          <TabsTrigger
            ref={(el) => {
              tabRefs.current['completedCourses'] = el;
            }}
            value="completedCourses"
            className="text-base font-medium text-gray-600 border-transparent px-0 py-3 border-b-0 relative bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-academy-orange data-[state=active]:shadow-none hover:text-gray-800"
          >
            Completed Courses ({completedCount})
          </TabsTrigger>

          <TabsTrigger
            ref={(el) => {
              tabRefs.current['assessment'] = el;
            }}
            value="assessment"
            className="text-base font-medium text-gray-600 border-transparent px-0 py-3 border-b-0 relative bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-academy-orange data-[state=active]:shadow-none hover:text-gray-800"
          >
            Assessments
          </TabsTrigger>

          {/* Full width underline */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

          {/* Dynamic active tab underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-academy-orange transition-all duration-300"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
            }}
          ></div>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="ongoingCourses" className="mt-6 w-full">
          <OngoingCourses learners={filteredLearners} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="completedCourses" className="mt-6">
          <CompletedCourses learners={filteredLearners} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="assessment" className="mt-6">
          <Assessment />
        </TabsContent>
      </UITabs>
    </div>
  );
}

export default Tabs;
