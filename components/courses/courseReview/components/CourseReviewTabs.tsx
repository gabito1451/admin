import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseDetailsTabContent } from './CourseDetailsTabContent';
import { CourseModulesTabContent } from './CourseModulesTabContent';
import { CourseAuthorTabContent } from './CourseAuthorTabContent';

export function CourseReviewTabs() {
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>({});

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="inline-flex sm:flex-row flex-col h-auto p-0 bg-transparent mb-8 gap-0 w-auto">
        <TabsTrigger
          value="details"
          className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 px-4 py-3 sm:py-5 font-medium w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0 last:mr-0 border-none rounded-none text-sm sm:text-base"
        >
          Course Details
        </TabsTrigger>
        <TabsTrigger
          value="modules"
          className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 px-4 py-3 sm:py-5 font-medium w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0 last:mr-0 border-none rounded-none text-sm sm:text-base"
        >
          Course Modules
        </TabsTrigger>
        <TabsTrigger
          value="author"
          className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 px-4 py-3 sm:py-5 font-medium w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0 last:mr-0 border-none rounded-none text-sm sm:text-base"
        >
          About Author
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-6">
        <CourseDetailsTabContent />
      </TabsContent>

      <TabsContent value="modules" className="space-y-6">
        <CourseModulesTabContent openModules={openModules} toggleModule={toggleModule} />
      </TabsContent>

      <TabsContent value="author" className="space-y-6">
        <CourseAuthorTabContent />
      </TabsContent>
    </Tabs>
  );
}
