import { Course } from '@/types';
import { Check, Dot } from 'lucide-react';

interface LearningObjectivesProps {
  course: Course;
}

export function LearningObjectives({ course }: LearningObjectivesProps) {
  const objectives = course.learningObjectives || [];

  // If no learning objectives, show appropriate message
  if (objectives.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl font-semibold">Learning Objectives</h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          No learning objectives have been defined for this course yet.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <h3 className="text-lg sm:text-xl font-bold text-neutrals-10 mb-1">
        Key Learning Objectives
      </h3>

      <div className="w-full">
        <p className="text-neutrals-8 font-normal text-sm sm:text-md leading-6 mb-1">
          By the end of this course, participants will be able to:
        </p>
        {objectives.map((objective, index) => (
          <div
            key={index}
            className="flex items-start pl-2 text-neutrals-8 font-normal gap-2 text-sm sm:text-md leading-6"
          >
            <Dot className="h-4 w-4 mt-1 flex-shrink-0" />
            <span className="flex-1">{objective}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
