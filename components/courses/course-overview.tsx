import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { CircularProgress } from './circularprogresschart';
import { StarRating } from '@/components/courses/star-ratings';
import Image from 'next/image';
import { Course } from '../../types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials } from '@/lib/utils';

interface CourseOverviewProps {
  course: Course;
  totalEnrolled: number;
  totalCompleted: number;
  totalHours: number | string;
  totalLessons: number | string;
  level: string;
  onAssignCourse?: () => void;
}

const CourseOverview = ({
  course,
  totalEnrolled,
  totalCompleted,
  totalHours,
  totalLessons,
  level,
  onAssignCourse,
}: CourseOverviewProps) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between lg:gap-16">
      <div className="gap-6 sm:gap-8 lg:gap-[30px] flex flex-col mt-6 sm:mt-8 lg:mt-10">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] text-neutrals-11 font-normal leading-tight">
            {course.title}
          </h1>
        </div>
        <div>
          <p className="text-neutrals-9 text-sm sm:text-base lg:text-[16px] font-normal max-w-full lg:max-w-[952px] leading-relaxed">
            {course.description ||
              'This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools.'}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 mt-4 sm:mt-6">
            <StarRating rating={course.rating} showValue={true} />

            <div className="gap-2 sm:gap-3 flex sm:flex-row flex-col sm:items-center items-start">
              <div className="text-neutrals-9 hidden sm:block">|</div>

              <div className="text-sm sm:text-md text-black-4">
                {totalHours} Total Hours. {totalLessons} Lessons.
              </div>

              <div className="text-neutrals-9 hidden sm:block">|</div>

              <div className="text-sm sm:text-md text-black-4">{level}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center mt-4 sm:mt-5 gap-4 sm:gap-2">
            <div className="flex items-center gap-2.5">
              <CircularProgress
                progress={
                  totalEnrolled && totalCompleted > 0
                    ? Math.round((totalCompleted / totalEnrolled) * 100)
                    : 0
                }
                size={24}
                strokeWidth={4}
                className=""
                color="#FF8000"
                backgroundColor="rgba(255, 149, 0, 0.5)"
              />

              <span className="text-academy-orange text-sm sm:text-base">
                {totalEnrolled} learners enrolled
              </span>
            </div>

            <div className="text-muted-foreground hidden sm:block">|</div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 flex-shrink-0">
                <Image src="/assets/icons/check.svg" alt="check" width={24} height={24} />
              </div>
              <span className="text-academy-orange text-sm sm:text-base">
                {totalCompleted} learners completed course
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-2 items-start sm:items-center">
        
            <Avatar className="shadow-md w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0">
              <AvatarImage src={course.instructor.avatar} />
              <AvatarFallback>
                {getInitials(`${course.instructor.firstname} ${course.instructor.lastname}`)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 sm:gap-2">
              <p className="text-neutrals-9 text-sm sm:text-md font-normal leading-relaxed">
                Created on {new Date(course.dateCreated).toLocaleDateString()} by{' '}
                {course.instructor.firstname} {course.instructor.lastname} (
                {course.instructor.department})
              </p>
              <p className="text-academy-orange text-sm sm:text-md font-normal">
                Updated on {new Date(course.dateUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {onAssignCourse && (
        <Button
          className="bg-academy-orange px-[15px] py-2.5 self-end lg:self-start text-white font-normal font-be-vietnam-pro text-sm mt-3 gap-2.5 hover:bg-orange-600"
          onClick={onAssignCourse}
        >
          <PlusIcon className="w-5 h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">Assign Course</span>
        </Button>
      )}
    </div>
  );
};

export default CourseOverview;
