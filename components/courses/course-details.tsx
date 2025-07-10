import { Badge } from '@/components/ui/badge';
import { Course } from '@/types';

interface CourseDetailsProps {
  course: Course;
}

export function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-5 text-neutrals-10">
          Course Details
        </h3>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {course?.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="softOrange"
                className="font-inter text-[10px] font-normal text-leadway-orange"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-neutrals-8 text-sm sm:text-md font-normal w-full leading-relaxed">
          {course.longDescription || 'No description available'}
        </p>
      </div>

      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-neutrals-10">Certification</h3>
      <p className="text-neutrals-8 text-sm sm:text-md font-normal leading-relaxed">
        {course.certification || 'No certification available'}
      </p>
    </div>
  );
}
