'use client';

import { CourseList } from '@/components/courses/course-list';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PendingApprovalTable from '@/components/courses/PendingApprovalTable';
import RejectedCoursesTable from '@/components/courses/RejectedCoursesTable';

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('live');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['live', 'pending', 'rejected'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="space-y-4 sm:space-y-6 py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-normal tracking-tight">Courses</h1>
        <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Assign Course
        </Button>
      </div>
      <Tabs defaultValue="live" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-white-2 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center pb-4 sm:pb-0">
          <div className="w-full sm:w-auto overflow-x-auto scrollbar-hide sm:overflow-x-visible">
            <TabsList className="bg-transparent border-b-0 w-max sm:w-auto gap-5 flex-nowrap">
              <TabsTrigger
                variant="underline"
                value="live"
                className="flex-none data-[state=active]:border-b-2 data-[state=active]:border-academy-orange data-[state=active]:text-academy-orange data-[state=inactive]:text-neutrals-8 rounded-none whitespace-nowrap px-0 text-[16px] font-medium min-w-fit"
              >
                Live Courses
              </TabsTrigger>
              <TabsTrigger
                variant="underline"
                value="pending"
                className="flex-none data-[state=active]:border-b-2 data-[state=active]:border-academy-orange data-[state=active]:text-academy-orange data-[state=inactive]:text-neutrals-8 rounded-none whitespace-nowrap px-0 text-[16px] font-medium min-w-fit"
              >
                Pending Approval
              </TabsTrigger>
              <TabsTrigger
                variant="underline"
                value="rejected"
                className="flex-none data-[state=active]:border-b-2 data-[state=active]:border-academy-orange data-[state=active]:text-academy-orange data-[state=inactive]:text-neutrals-8 rounded-none whitespace-nowrap px-0 text-[16px] font-medium min-w-fit"
              >
                Rejected Courses
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-md mb-2.5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
          </div>
        </div>

        <TabsContent value="live" className="mt-6">
          <CourseList searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <PendingApprovalTable />
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <RejectedCoursesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
