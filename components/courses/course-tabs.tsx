'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Course } from '@/types';
import { CourseDetails } from './course-details';
import { LearningObjectives } from './learning-objectives';
import { CourseModules } from './course-modules';
import { AboutAuthor } from './about-author';
import { ChangeLog } from './change-log';
import { AssignedLearners } from './assigned-learners';

interface CourseTabsProps {
  course: Course;
  changeLog?: any;
}

export function CourseTabs({ course, changeLog }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <Tabs
      defaultValue="details"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-8 sm:mt-12 lg:mt-16"
    >
      <TabsList className="mb-6 sm:mb-8 mt-2 w-full justify-start overflow-x-auto scrollbar-hide flex-nowrap h-auto">
        <TabsTrigger
          value="details"
          className="rounded-none flex items-center justify-center px-2 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm "
        >
          Course Details
        </TabsTrigger>
        <TabsTrigger
          value="objectives"
          className="rounded-none px-2 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm"
        >
          Learning Objectives
        </TabsTrigger>
        <TabsTrigger
          value="modules"
          className="rounded-none px-2 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm"
        >
          Course Modules
        </TabsTrigger>
        <TabsTrigger
          value="author"
          className="rounded-none px-2 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm"
        >
          About Author
        </TabsTrigger>
        <TabsTrigger
          value="changelog"
          className="rounded-none px-2 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm"
        >
          Change Log
        </TabsTrigger>
        <TabsTrigger
          value="assigned"
          className="rounded-none px-2 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm"
        >
          Assigned Learners
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <CourseDetails course={course} />
      </TabsContent>

      <TabsContent value="objectives">
        <LearningObjectives course={course} />
      </TabsContent>

      <TabsContent value="modules">
        <CourseModules course={course} />
      </TabsContent>

      <TabsContent value="author">
        <AboutAuthor instructor={course.instructor} />
      </TabsContent>

      <TabsContent value="changelog">
        <ChangeLog changeLog={changeLog} />
      </TabsContent>

      <TabsContent value="assigned">
        <AssignedLearners courseId={course.id} />
      </TabsContent>
    </Tabs>
  );
}
