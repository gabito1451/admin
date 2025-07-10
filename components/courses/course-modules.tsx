'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
// import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Course } from '@/types';

// interface Lesson {
//   id: string;
//   title: string;
//   duration: string;
//   type: 'video' | 'text' | 'quiz';
//   completed?: boolean;
// }

interface CourseModulesProps {
  course: Course;
}

export function CourseModules({ course }: CourseModulesProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(['module-1']);
  // const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const modules = course.modules || [];

  // const toggleLessonCompletion = (lessonId: string) => {
  //   setCompletedLessons((prev) =>
  //     prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
  //   );
  // };

  // const getIcon = (type: Lesson['type']) => {
  //   switch (type) {
  //     case 'video':
  //       return <Play className="w-4 h-4 text-gray-600" />;
  //     case 'text':
  //       return <FileText className="w-4 h-4 text-gray-600" />;
  //     case 'quiz':
  //       return <HelpCircle className="w-4 h-4 text-gray-600" />;
  //     default:
  //       return <Play className="w-4 h-4 text-gray-600" />;
  //   }
  // };

  if (modules.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Modules</h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          No modules have been created for this course yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Modules</h2>
      </div>

      <div className="space-y-2">
        {modules.map((module) => (
          <Collapsible
            key={module.id}
            open={expandedModules.includes(module.id)}
            onOpenChange={(open) => {
              if (open) {
                setExpandedModules((prev) => [...prev, module.id]);
              } else {
                setExpandedModules((prev) => prev.filter((id) => id !== module.id));
              }
            }}
          >
            <div className="border border-gray-200 rounded-lg">
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      Module {module.order}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-shrink-0 ml-2">
                    <span className="hidden sm:inline">{module.totalLessons} Lessons</span>
                    <span className="sm:hidden">{module.totalLessons}L</span>
                    <span>{module.duration}</span>
                  </div> */}
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="border-t border-gray-200 bg-gray-50">
                  <h2>Hiiiiiiii</h2>
                  {/* {module.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 last:border-b-0 hover:bg-white transition-colors cursor-pointer"
                      onClick={() => toggleLessonCompletion(lesson.id)}
                    >
                      <Checkbox
                        checked={completedLessons.includes(lesson.id)}
                        onCheckedChange={() => toggleLessonCompletion(lesson.id)}
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 flex-shrink-0"
                      />

                      <span className="text-xs sm:text-sm text-gray-500 w-3 sm:w-4 font-medium flex-shrink-0">
                        {index + 1}.
                      </span>

                      <span className="flex-1 text-xs sm:text-sm text-gray-700 truncate">
                        {lesson.title}
                      </span>

                      <div className="text-gray-600 flex-shrink-0">{getIcon(lesson.type)}</div>

                      <div className="flex items-center gap-1 text-xs text-gray-500 min-w-[40px] sm:min-w-[50px] flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        <span className="hidden sm:inline">{lesson.duration}</span>
                        <span className="sm:hidden text-[10px]">
                          {lesson.duration.replace('min', 'm')}
                        </span>
                      </div>
                    </div>
                  ))} */}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
